/*
 * @Author: Pace 
 * @Date: 2018-12-09 23:36:34 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-10 00:01:11
 */
import React from 'react';
import CategorySelector from './category-selector.jsx';
import EBUtil from 'util/eb.jsx';
import Product from 'service/product-service.jsx';
import PageTitle from 'componect/page-title/index.jsx';

import './detail.scss';

const _eb = new EBUtil();
const _product = new Product();

//新增，编辑商品
class ProductDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : this.props.match.params.pid,
            name : '',
            subtitle : '',
            categoryId : 0,
            parentCategoryId : 0,
            price : '',
            stock : '',
            detail : '',
            subImages : [], // 保存图片
            status : 1//商品在售状态
        }
    }
    componentDidMount(){
        this.loadProduct(); // 加载商品信息
    }
    // 加载商品信息
    loadProduct(){
        if(this.state.id){
            //如果有id，加载商品详情
            _product.getProduct(this.state.id).then((res)=>{ // 根据id查询商品
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri)=>{
                    return {
                        uri : imgUri,
                        url : res.imageHost+imgUri,
                    }
                });
                this.setState(res);
            },(errMsg)=>{
                _eb.errorTips(errMsg);
            });
        }
    }
    render(){
        return (
            <div className="myProduct" id="page-wrapper">
                <PageTitle title="添加商品" />
                <div className="form-horizontal form-horizontal-primary">
                    <div className="form-group">
                        <label  className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                               {this.state.name}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                               {this.state.subtitle}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector ReadOnly
                             categoryId={this.state.categoryId}
                             parentCategoryId={this.state.parentCategoryId}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-2">
                            <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-rmb"></i></span>
                            <input type="number" className="form-control" placeholder="请输入商品价格"
                                readOnly name="price" value={this.state.price}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-2">
                            <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-archive"></i></span>
                            <input type="number" className="form-control" placeholder="请输入商品库存"
                                readOnly name="stock" value={this.state.stock}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length 
                                ? this.state.subImages.map((image,index)=>(
                                    <div className="img-con" key={index} >
                                        <img className="img" src={image.url}></img>
                                    </div>
                                    ))
                                : (<div>暂无图片</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10" 
                            dangerouslySetInnerHTML={{__html:this.state.detail}}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;