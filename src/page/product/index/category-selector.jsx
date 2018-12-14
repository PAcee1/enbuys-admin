/*
 * @Author: Pace 
 * @Date: 2018-12-09 11:51:34 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-09 23:54:30
 */
import React from 'react';
import './category-selector.scss';
import EBUtil from 'util/eb.jsx';
import Product from 'service/product-service.jsx';
const _eb = new EBUtil();
const _product = new Product();

//分类选择组件
class CategorySelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstCategoryList : [],
            firstCategoryId : 0,
            secondCategoryList : [],
            secondCategoryId : 0
        }
    }
    //页面一渲染就加载的方法
    componentDidMount(){
        this.loadFirstCategory();
    }
    componentWillReceiveProps(nextProps){ // 处理回显分类
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
        //数据没有发生变化，不做处理
        if(!categoryIdChange && !parentCategoryIdChange){
            return;
        }
        //只有一级品类
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId : nextProps.categoryId,
                secondCategoryId : 0
            });
        }else{ // 有二级品类
            this.setState({
                firstCategoryId : nextProps.parentCategoryId,
                secondCategoryId : nextProps.categoryId
            },()=>{//加载二级列表
                parentCategoryIdChange && this.loadSecondCategory();
            });
        }
    }
    //加载一级分类
    loadFirstCategory(){
        _product.getCategoryList().then(res=>{
            this.setState({
                firstCategoryList : res
            })
        },errMsg=>{
            _eb.errorTips(errMsg);
        })
    }
    //加载二级品类
    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then(res=>{
            this.setState({
                secondCategoryList : res
            })
        },errMsg=>{
            _eb.errorTips(errMsg);
        })
    }
    // 选择一级品类
    onFirstCategoryChange(e){
        //判断是否可选择
        if(this.props.ReadOnly){
            return;
        }
        let newValue = e.target.value || 0;
        // 设置一级分类，清空二级分类
        this.setState({
            firstCategoryId : newValue,
            secondCategoryList:[],
            secondCategoryId : 0
        },()=>{
            //异步回调
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        });
    }
    // 选择二级品类
    onSecondCategoryChange(e){
        //判断是否可选择
        if(this.props.ReadOnly){
            return;
        }
        let newValue = e.target.value || 0;
        // 设置一级分类，清空二级分类
        this.setState({
            secondCategoryId : newValue
        },()=>{
            this.onPropsCategoryChange();
        });
    }
    // 传给父组件选中的结果
    onPropsCategoryChange(){
        // 判断props里的回调函数存在
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        // 如果是有二级品类
        if(this.state.secondCategoryId){
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
        }
        // 如果只有一级品类
        else{
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }
    }
    //渲染页面
    render(){
        return (
            <div className="col-md-10">
                <select className="form-control cate-select" 
                    value={this.state.firstCategoryId}
                    readOnly = {this.props.ReadOnly}
                    onChange={(e)=>this.onFirstCategoryChange(e)}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map(
                           (category,index)=> <option value={category.id} key={index}>{category.name}</option>
                        )
                    }
                </select>
                {this.state.secondCategoryList.length ?
                <select className="form-control cate-select"
                    value={this.state.secondCategoryId}
                    readOnly = {this.props.ReadOnly}
                    onChange={(e)=>this.onSecondCategoryChange(e)}>
                    <option value="">请选择二级分类</option>
                    {
                        this.state.secondCategoryList.map(
                           (category,index)=> <option value={category.id} key={index}>{category.name}</option>
                        )
                    }
                </select> : null
                }
            </div>
        )
    }
}

export default CategorySelector;