/*
 * @Author: Pace 
 * @Date: 2018-12-07 21:06:37 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 19:55:39
 */

class EBUtil{
    request(param){
        //封装异步ajax
        return new Promise((resolve,reject)=>{
            $.ajax({
                type : param.type || 'get',
                url : param.url || '',
                dataType : param.dataType || 'json',
                data : param.data || null,
                success : res => {
                    // 数据请求成功
                    if(0 === res.status){
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    }
                    // 没有登录状态，强制登录
                    else if(10 === res.status){
                        this.doLogin();
                    }
                    else{
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error : err => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    }
    //跳转登录
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    //获取url参数
    getUrlParam(name){
        // param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '', //分隔？后的参数
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"), // 匹配&与name=，获取后面的值
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    //成功提示
    successTips(successMsg){
        alert(successMsg || '操作成功');
    }
    //错误提示
    errorTips(errMsg){
        alert(errMsg || '出现问题了');
    }
    //本地存储
    setStorage(name,data){
        let dataType = typeof data;
        if(dataType === 'object'){
            //序列化
            window.localStorage.setItem(name,JSON.stringify(data));
        }else if(['number','string','boolean'].indexOf(dataType) >= 0){//基础类型
            window.localStorage.setItem(name,data);
        }else{//其他类型
            alert('该类型不能用于本地存储')
        }
    }
    //获取本地存储
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    }
    // 删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

 export default EBUtil;