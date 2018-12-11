/*
 * @Author: Pace 
 * @Date: 2018-12-11 10:59:02 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-11 11:35:33
 */

import React from 'react';
import PageTitle from 'componect/page-title/index.jsx';
import EBUtil from 'util/eb.jsx';
import Product from 'service/product-service.jsx';
import './index.scss';

const _eb = new EBUtil();
const _product = new Product();

class CategoryAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryList : [], // list需要初始化为数组
            parentId : 0,
            categoryName : ''
        };
    }
    //页面加载调用方法
    componentDidMount(){
        this.loadCategoryList();
    }
    //获取品类列表,显示父品类列表
    loadCategoryList(){
        _product.getCategoryList().then(res =>{
            this.setState({
                categoryList : res
            });
        },(errMsg)=>{
            _eb.errorTips(errMsg);
        });
    }
    //修改字段时，同步绑定
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name] : value
        });
    }
    onSubmit(e){
        let categoryName = this.state.categoryName.trim();
        if(!this.state.categoryName){
            // 没有name
            _eb.errorTips('请输入品类名称');
        }
        _product.saveCategory({
            categoryName : categoryName,
            parentId: this.state.parentId
        }).then((res)=>{
            _eb.successTips(res);
            this.props.history.push('/product-category/index'); // 成功跳到主页
        },(errMsg)=>{
            _eb.errorTips(errMsg);
        })
    }
    render(){
        return (
            <div className="myProduct" id="page-wrapper">
                <PageTitle title='添加品类'/>
                <div className="form-horizontal form-horizontal-primary" style={{'width':'75%'}}>
                <div className="form-group">
                            <label  className="col-md-2 control-label">所属品类</label>
                            <div className="col-md-4">
                                <select name="parentId" className="form-control"
                                    onChange={(e)=>this.onValueChange(e)}>
                                    <option value="0">根品类</option>
                                    {
                                       this.state.categoryList.map((category,index)=>{
                                           return <option value={category.id} key={index}>根品类/{category.name}</option>
                                       })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className="col-md-2 control-label">品类名称</label>
                            <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="请输入品类名称"
                                onChange={(e)=>this.onValueChange(e)} name="categoryName" value={this.state.name}
                            />
                            </div>
                        </div>
                        <div className="form-group">
                        <div className="col-md-offset-2 col-md-2 ">
                        <button type="submit" className="btn btn-info btn-block"
                            onClick={(e) => {this.onSubmit(e)}}>提交</button>
                        </div>
                </div>
            </div>
            </div>
        );
    }
}

export default CategoryAdd;