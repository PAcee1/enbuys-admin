/*
 * @Author: Pace 
 * @Date: 2018-12-11 16:29:43 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-12 16:56:36
 */
import EBUtil from 'util/eb.jsx'
const _eb = new EBUtil();

class Order{
     //获取order列表
    getOrderList(listParam){
        let url = '',
            data = {};
        if(listParam.listType === 'list'){
            url = '/manage/order/list.do';
            data.pageNum = listParam.pageNum;
            data.pageSize = listParam.pageSize;
        }else if(listParam.listType === 'search'){
            url = '/manage/order/search.do'
            data.pageNum = listParam.pageNum;
            data.pageSize = listParam.pageSize;
            data.orderNo = listParam.orderNo;
        }
        return _eb.request({
            type : 'post',
            url : url,
            data : data
        });
    }
    // 获取订单详情
    getOrderDetail(orderNo){
        return _eb.request({
            type : 'post',
            url : '/manage/order/detail.do',
            data : {
                orderNo : orderNo
            }
        });
    }
    sendGoods(orderNo){
        return _eb.request({
            type : 'post',
            url : '/manage/order/sendGoods.do',
            data : {
                orderNo : orderNo
            }
        });
    }
}

export default Order;