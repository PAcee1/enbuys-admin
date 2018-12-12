/*
 * @Author: Pace 
 * @Date: 2018-12-11 16:18:19 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-12 17:31:22
 */
import React from 'react';
import PageTitle from 'componect/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import {Link} from 'react-router-dom';
import EBUtil from 'util/eb.jsx';
import Order from 'service/order-service.jsx';
import ListSearch from './index-list-search.jsx';
import TableList from 'util/table-list/index.jsx';

const _eb = new EBUtil();
const _order = new Order();

class OrderList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : [], // list需要初始化为数组
            pageNum : 1,
            pageSize : 10,
            listType : 'list' // list或search
        };
    }
    //页面加载调用方法
    componentDidMount(){
        this.loadOrderList();
    }
    //获取商品列表
    loadOrderList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        listParam.pageSize = this.state.pageSize;
        //如果是搜索
        if(this.state.listType == 'search'){
            listParam.orderNo = this.state.orderNo;
        }
        //请求接口
        _order.getOrderList(listParam).then(res =>{
            this.setState(res);
        },(errMsg)=>{
            this.setState({
                list : []
            });
            _eb.errorTips(errMsg);
        });
    }
    //搜索商品
    onSearch(orderNumber){
        let listType = orderNumber === ''?'list' : 'search';
        this.setState({
            listType : listType,
            pageNum : 1,
            orderNo : orderNumber
        },()=>{
            this.loadOrderList();
        });
    }
    //页数变化，修改分页信息
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        },()=>{ // 修改完后需要回调
            this.loadOrderList();
        });
    }
    // 发货
    onSendGoods(e){
        let orderNo = e.target.getAttribute('index');
        _order.sendGoods(orderNo).then((res)=>{
            _eb.successTips(res);
            this.loadOrderList();
        },(errMsg)=>{
            _eb.errorTips(errMsg);
        });
    }
    //渲染页面
    render(){
        let tableHeads = [
            {name : '订单号',width:'20%'},
            {name : '收件人',width:'15%'},
            {name : '订单状态',width:'15%'},
            {name : '订单总价',width:'15%'},
            {name : '创建时间',width:'19%'},
            {name : '操作',width:'18%'},
        ];
        return (
            <div className="myProduct" id="page-wrapper">
                <PageTitle title="订单列表">
                </PageTitle>
                <ListSearch onSearch={(orderNumber)=>this.onSearch(orderNumber)}/>
                <TableList tableHeads={tableHeads}>
                {
                    this.state.list.map((order,index)=>{
                        return (
                            <tr key={index}>
                                <td> 
                                    <Link to={`/order/detail/${order.orderNo}`} className="link" >
                                    {order.orderNo}</Link>
                                </td>
                                <td>{order.receiverName}</td>
                                <td>{order.statusDesc}</td>
                                <td>￥{order.payment}</td>
                                <td>{order.createTime}</td>
                                <td>
                                    <Link to={`/order/detail/${order.orderNo}`}>
                                    <span className="oper-item btn btn-info"
                                        >查看详情</span>
                                    </Link>
                                    {
                                        order.statusDesc === "已付款"?
                                        <span className="oper-item btn btn-info" index={order.orderNo}
                                        onClick={(e) => {this.onSendGoods(e)}}>立即发货</span>
                                        :null
                                    }
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

export default OrderList;