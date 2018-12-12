/*
 * @Author: Pace 
 * @Date: 2018-12-11 16:57:42 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-12 16:56:10
 */
import React from 'react';
import EBUtil from 'util/eb.jsx';
import Order from 'service/order-service.jsx';
import PageTitle from 'componect/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';

import './detail.scss';

const _eb = new EBUtil();
const _order = new Order();

//新增，编辑订单
class OrderDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderNumber : this.props.match.params.orderNumber,
            orderInfo : {}
        }
    }
    componentDidMount(){
        this.loadOrder(); // 加载订单信息
    }
    // 加载订单信息
    loadOrder(){
        _order.getOrderDetail(this.state.orderNumber).then((res)=>{
            this.setState({
                orderInfo : res
            });
        },(errMsg)=>{
            _eb.errorTips(errMsg);
        });
    }
    // 发货
    onSendGoods(e){
        _order.sendGoods(this.state.orderNumber).then((res)=>{
            _eb.successTips(res);
            this.loadOrder();
        },(errMsg)=>{
            _eb.errorTips(errMsg);
        });
    }
    render(){
        let receiverInfo = this.state.orderInfo.shippingVo || {},
            productList = this.state.orderInfo.orderItemVoList || [];
        let tableHeads = [
            {name : '商品图片',width:'15%'},
            {name : '商品信息',width:'55%'},
            {name : '商品单价',width:'10%'},
            {name : '商品数量',width:'10%'},
            {name : '合计',width:'15%'},
        ];
        return (
            <div className="myProduct" id="page-wrapper">
                <PageTitle title="订单详情" />
                <div className="form-horizontal form-horizontal-primary">
                    <div className="form-group">
                        <label  className="col-md-2 control-label">订单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                               {this.state.orderInfo.orderNo}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                               {this.state.orderInfo.createTime}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件人</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                               {receiverInfo.receiverName}
                               {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件地址</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {receiverInfo.receiverProvince}
                                {receiverInfo.receiverCity}
                                {receiverInfo.receiverDistrict}
                                {receiverInfo.receiverAddress}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                               {this.state.orderInfo.statusDesc}
                               {
                                this.state.orderInfo.status == 20
                                ?<button className="btn btn-info btn-sm btn-send-goods"
                                        onClick={(e) => {this.onSendGoods(e)}}>立即发货</button>
                                :null
                            }
                            </p>
                            
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">支付方式</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                               {this.state.orderInfo.paymentTypeDesc}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单总价</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                               ￥{this.state.orderInfo.payment}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品列表</label>
                        <div className="col-md-8">
                        <TableList tableHeads={tableHeads}>
                        {
                            productList.map((product,index)=>{
                                return (
                                    <tr key={index}>
                                        <td> 
                                            <img src={`${this.state.orderInfo.imageHost}${product.productImage}`}
                                                className="p-img" alt={product.productName}/>
                                        </td>
                                        <td>{product.productName}</td>
                                        <td>￥{product.currentUnitPrice}</td>
                                        <td>{product.quantity}</td>
                                        <td>￥{product.totalPrice}</td>
                                    </tr>
                                )}
                            )
                        }
                        </TableList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetail;