/*
 * @Author: Pace 
 * @Date: 2018-12-08 16:37:10 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-09 22:48:14
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
    //检查商品详细信息
    checkProduct(product){
        let result = {
            status : true,
            msg : '验证通过'
        };
         //判断商品名称不为空
         if(typeof product.name !== 'string' || product.name.length ===0){
            return {
                status: false,
                msg: '商品名称不能为空！'
            }
        }
        // 判断描述不能为空
        if(typeof product.subtitle !== 'string' || product.subtitle.length ===0){
            return {
                status: false,
                msg: '商品描述不能为空！'
            }
        }
        // 验证品类ID
        if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
            return {
                status: false,
                msg: '请选择商品品类！'
            }
        }
        // 判断商品价格为数字，且大于0
        if(typeof product.price !== 'number' || !(product.price >= 0)){
            return {
                status: false,
                msg: '请输入正确的商品价格！'
            }
        }
        // 判断库存为数字，且大于或等于0
        if(typeof product.stock !== 'number' || !(product.stock >= 0)){
            return {
                status: false,
                msg: '请输入正确的库存数量！'
            }
        }
        return result;
    }
    //保存商品
    saveProduct(product){
        return _eb.request({
            type : 'post',
            url : '/manage/product/save.do',
            data : product
        });
    }
    //获取商品
    getProduct(productId){
        return _eb.request({
            type : 'post',
            url : '/manage/product/detail.do',
            data : {
                productId : productId || 0
            }
        });
    }

    // 获取品类信息
    getCategoryList(parentCategoryId){
        return _eb.request({
            type : 'post',
            url : '/manage/category/getCategory.do',
            data : {
                categoryId : parentCategoryId
            }
        });
    }
}

export default Product;