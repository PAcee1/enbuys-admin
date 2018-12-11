/*
 * @Author: Pace 
 * @Date: 2018-12-11 09:43:52 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-11 11:13:14
 */
import React from 'react';
import PageTitle from 'componect/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import {Link} from 'react-router-dom';
import EBUtil from 'util/eb.jsx';
import Product from 'service/product-service.jsx';
import './index.scss';

const _eb = new EBUtil();
const _product = new Product();

class CategoryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : [], // list需要初始化为数组
            parentCategoryId : this.props.match.params.categoryId || 0
        };
    }
    //页面加载调用方法
    componentDidMount(){
        this.loadCategoryList();
    }
    // 更新页面
    componentDidUpdate(prevProps,prevState){ //上个页面的参数与状态
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.categoryId || 0;
        // 判断路径是否相同，不相同刷新页面并传入分类id
        if(oldPath !== newPath){
            this.setState({
                parentCategoryId : newId
            },()=>{
                this.loadCategoryList();
            });
        }
    }
    //获取品类列表
    loadCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId).then(res =>{
            this.setState({
                list : res
            });
        },(errMsg)=>{
            this.setState({
                list : []
            });
            _eb.errorTips(errMsg);
        });
    }
    // 修改品类名称
    onUpdateName(categoryId,categoryName){
        //弹窗 让用户输入新名称
        let newName = window.prompt('请输入新的品类名称',categoryName);
        if(newName){
            // 有新品类名称
            _product.updateCategoryName({
                categoryId: categoryId,
                categoryName : newName
            }).then(res=>{
                _eb.successTips(res);
                //重新加载列表
                this.loadCategoryList();
            },err =>{
                _eb.errorTips(err);
            });
        }
    }
    render(){
        let tableHeads = [
            {name : '品类Id',width:'10%'},
            {name : '品类名称',width:'10%'},
            {name : '操作',width:'10%'},
        ];
        let listBody = this.state.list.map((category,index)=>{
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                    <div className="oper-wrapper">
                        <span className="link"
                            onClick={(e)=>this.onUpdateName(category.id,category.name)}>修改名称</span>
                        {
                            category.parentId == 0?    
                            <Link to={`/product-category/index/${category.id}`} className="link" >查看子品类</Link>
                            : null
                        }
                    </div>
                    </td>
                    
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表"/>
                <div className="row">
                    <div className="col-md-12 category">
                        <span>当前位置ID：{this.state.parentCategoryId}
                            {
                                this.state.parentCategoryId == 0? ' (根品类)':null
                            }
                        </span>
                        <a className="link" href="/product-category/index" >返回根品类</a>
                        <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-info" style={{width:'130px'}}>
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                    </div>
                </div>
                <TableList tableHeads = {tableHeads}>
                    {listBody}
                </TableList>
            </div>
        );
    }
}

export default CategoryList;