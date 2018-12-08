/*
 * @Author: Pace 
 * @Date: 2018-12-08 16:37:10 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 21:31:12
 */
import EBUtil from 'util/eb.jsx'
const _eb = new EBUtil();

class Product{
     //获取product列表
    getProductList(listParam){
        let url = '',
            data = {};
        if(listParam.listType === 'list'){
            url = '/manage/product/list.do';
            data.pageNum = listParam.pageNum;
            data.pageSize = listParam.pageSize;
        }else if(listParam.listType === 'search'){
            url = '/manage/product/search.do'
            data.pageNum = listParam.pageNum;
            data.pageSize = listParam.pageSize;
            data[listParam.searchType] = listParam.searchKeyword;
        }
        return _eb.request({
            type : 'post',
            url : url,
            data : data
        });
    }
    // 改变商品状态
    setProductStatus(productInfo){
        return _eb.request({
            type : 'post',
            url : '/manage/product/setSaleStatus.do',
            data : productInfo
        });
    }
}

export default Product;