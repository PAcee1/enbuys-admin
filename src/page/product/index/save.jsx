/*
 * @Author: Pace 
 * @Date: 2018-12-09 10:46:49 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-09 23:32:42
 */
import React from 'react';
import CategorySelector from './category-selector.jsx';
import EBUtil from 'util/eb.jsx';
import Product from 'service/product-service.jsx';
import PageTitle from 'componect/page-title/index.jsx';
import FileUpload from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';

import './save.scss';


const _eb = new EBUtil();
const _product = new Product();

//新增，编辑商品
class ProductSave extends React.Component{
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
            //如果有id，说明是编辑商品,需要表单回显
            _product.getProduct(this.state.id).then((res)=>{ // 根据id查询商品
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri)=>{
                    return {
                        uri : imgUri,
                        url : res.imageHost+imgUri,
                    }
                });
                res.defaultDetail = res.detail;
                this.setState(res);
            },(errMsg)=>{
                _eb.errorTips(errMsg);
            });
        }
    }
    //简单字段改变，商品名称，描述，库存，价格
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        })
    }
    // 分类修改
    onCategoryChange(categoryId,parentCategoryId){
        this.setState({
            categoryId : categoryId,
            parentCategoryId : parentCategoryId
        });
    }
    // 上传图片成功
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages : subImages
        });
    }
    //上传图片失败
    onError(err){
        _eb.errorTips(err);
    }
    // 删除图片
    onImageDelete(e){
        let index = parseInt(e.target.getAttribute('index')),
            subImages = this.state.subImages;
        subImages.splice(index,1);//删除对应下标的元素
        this.setState({
            subImages : subImages
        })
    }
    // 富文本内容变动事件
    onRichEditorChange(value){
        console.log(value);
        this.setState({
            detail : value
        });
    }
    getSubImagesString(){
        return this.state.subImages.map((image)=>image.uri).join(',');
    }
    //提交表单
    onSubmit(e){
        let product = {
            name : this.state.name,
            subtitle : this.state.subtitle,
            categoryId : parseInt(this.state.categoryId),
            subtitle : this.state.subtitle,
            subImages : this.getSubImagesString(),
            detail : this.state.detail,
            price : parseFloat(this.state.price),
            stock : parseInt(this.state.stock),
            status : this.state.status,
        },
        //表单验证
        productCheckResult = _product.checkProduct(product);
        if(this.state.id){
            product.id = this.state.id;
        }
        if(productCheckResult.status){ // 验证成功，保存商品信息
            _product.saveProduct(product).then((res)=>{
                _eb.successTips(res);
                this.props.history.push('/product/index');
            },(errMsg)=>{
                _eb.errorTips(errMsg);
            })
        }else{ // 表单验证失败
            _eb.errorTips(productCheckResult.msg);
        }
    }
    render(){
        return (
            <div className="myProduct" id="page-wrapper">
                <PageTitle title="添加商品" />
                <div className="form-horizontal form-horizontal-primary">
                    <div className="form-group">
                        <label  className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="请输入商品名称"
                            onChange={(e)=>this.onValueChange(e)} name="name" value={this.state.name}
                        />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="请输入商品描述"
                            onChange={(e)=>this.onValueChange(e)} name="subtitle" value={this.state.subtitle}
                        />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector
                             categoryId={this.state.categoryId}
                             parentCategoryId={this.state.parentCategoryId}
                             onCategoryChange={(categoryId,parentCategoryId)=>
                                    this.onCategoryChange(categoryId,parentCategoryId)}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-2">
                            <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-rmb"></i></span>
                            <input type="number" className="form-control" placeholder="请输入商品价格"
                                onChange={(e)=>this.onValueChange(e)} name="price" value={this.state.price}
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
                                onChange={(e)=>this.onValueChange(e)} name="stock" value={this.state.stock}
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
                                        <i className="fa fa-close" index={index} onClick={(e)=>this.onImageDelete(e)}></i>
                                    </div>
                                    ))
                                : (<div>请上传图片</div>)
                            }
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-con">
                            <FileUpload onError={(err)=>{this.onError(err)}}
                                onSuccess={(res)=>{this.onUploadSuccess(res)}} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <RichEditor detail={this.state.detail} defaultDetail={this.state.defaultDetail}
                                onValueChange={(value) => this.onRichEditorChange(value)}/>
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
        )
    }
}

export default ProductSave;