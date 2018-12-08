/*
 * @Author: Pace 
 * @Date: 2018-12-08 16:30:18 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 22:04:26
 */
import React from 'react';
import './index.scss';
import PageTitle from 'componect/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx'
import {Link} from 'react-router-dom';
import EBUtil from 'util/eb.jsx'
import Product from 'service/product-service.jsx'
import ListSearch from './index-list-search.jsx'
import TableList from 'util/table-list/index.jsx'

const _eb = new EBUtil();
const _product = new Product();

class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : [], // list需要初始化为数组
            pageNum : 1,
            pageSize : 5,
            listType : 'list'
        };
    }
    //页面加载调用方法
    componentDidMount(){
        this.loadProductList();
    }
    //获取商品列表
    loadProductList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        listParam.pageSize = this.state.pageSize;
        //如果是搜索
        if(this.state.listType == 'search'){
            listParam.searchType = this.state.searchType;
            listParam.searchKeyword = this.state.searchKeyword;
        }
        //请求接口
        _product.getProductList(listParam).then(res =>{
            this.setState(res);
        },(errMsg)=>{
            this.setState({
                list : []
            });
            _eb.errorTips(errMsg);
        });
    }
    //搜索商品
    onSearch(searchType,searchKeyword){
        let listType = searchKeyword === ''?'list' : 'search';
        this.setState({
            listType : listType,
            pageNum : 1,
            searchType : searchType,
            searchKeyword : searchKeyword
        },()=>{
            this.loadProductList();
        });
    }
    //页数变化，修改分页信息
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        },()=>{ // 修改完后需要回调
            this.loadProductList();
        });
    }
    //改变商品状态
    onSetProductStatus(e,productId,currentStatus){
        let newStatus = currentStatus==1?2:1,
            confrimTips = currentStatus==1?'确定要下架该商品？': '确认要上架该商品？';
        if(window.confirm(confrimTips)){
            _product.setProductStatus({
                productId : productId,
                status : newStatus
            }).then(res=>{
                _eb.successTips(res);
                this.loadProductList();
            },errMsg=>{
                _eb.errorTips(errMsg);
            });
        }
    }
    //删除商品
    onDeleteProduct(e,productId){
        if(window.confirm('确定要删除该商品吗')){
            _product.setProductStatus({
                productId : productId,
                status : 3
            }).then(res=>{
                _eb.successTips('删除商品成功');
                this.loadProductList();
            },errMsg=>{
                _eb.errorTips(errMsg);
            });
        }
    }
    render(){
        let tableHeads = [
            {name : '商品Id',width:'6%'},
            {name : '图片',width:'8%'},
            {name : '商品信息',width:'42%'},
            {name : '价格',width:'10%'},
            {name : '状态',width:'6%'},
            {name : '',width:'0%'},
            {name : '操作',width:'18%'},
        ];
        return (
            <div className="myProduct" id="page-wrapper">
                <PageTitle title="商品列表"/>
                <ListSearch onSearch={(searchType,searchKeyword)=>this.onSearch(searchType,searchKeyword)}/>
                <TableList tableHeads={tableHeads}>
                {
                    this.state.list.map((product,index)=>{
                        return (
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>
                                    <div className="main-picture">
                                        <img src={product.imageHost+product.mainImage} title="pircture"/>
                                    </div>
                                </td>
                                <td>{product.name}</td>
                                <td>￥{product.price}</td>
                                {
                                    product.status == 1 
                                    ?<td className="on-sale"><i className="fa fa-circle on-sale-font"></i> 在售
                                        </td>
                                    : <td className="sale-out"><i className="fa fa-circle sale-out-font"></i> 已下架
                                        </td>
                                }
                               <td>
                                   {
                                    product.status == 1 
                                    ? 
                                        <button className="mybtn btn btn-danger oper-item"
                                        onClick={(e)=>{this.onSetProductStatus(e,product.id,product.status)}}>
                                            下架  <i className="fa fa-arrow-down"></i>
                                        </button>
                                    : 
                                    <button className="mybtn btn btn-success oper-item"
                                     onClick={(e)=>{this.onSetProductStatus(e,product.id,product.status)}}>
                                            上架<i className="fa fa-arrow-up"></i>
                                       </button>
                                   }
                               </td>
                                <td>
                                    <Link to={`/product/detail/${product.id}`}>
                                    <span className="oper-item btn btn-info"
                                        >详情</span>
                                    </Link>
                                    <Link to={`/product/edit/${product.id}`}>
                                    <span className="oper-item btn btn-info" 
                                        >编辑</span>
                                    </Link>
                                    <span className="oper-item btn btn-danger" 
                                      onClick={(e)=>{this.onDeleteProduct(e,product.id)}}>
                                      删除</span>
                                    
                                </td>
                            </tr>
                        )}
                    )
                }
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total}
                    PageSize={this.state.pageSize} defaultPageSize={this.state.pageSize} onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
            </div>
        );
    }
}

export default ProductList;