/*
 * @Author: Pace 
 * @Date: 2018-12-08 10:14:03 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 15:44:21
 */
import EBUtil from 'util/eb.jsx'
const _eb = new EBUtil();

class User{
    //登录
    login(loginInfo){
       return _eb.request({
            type : 'post',
            url : '/manage/user/login.do',
            data : loginInfo
        });
    }
    //登出
    logout(){
        return _eb.request({
             type : 'post',
             url : '/myUser/logout.do'
         });
     }
    //检查登录接口数据是否合法
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);
        //判断用户名不为空
        if(typeof loginInfo.username !== 'string' || loginInfo.username.length === 0){
            return {
                status :false,
                msg : '用户名不能为空！'
            }
        }
        //判断密码不为空
        if(typeof loginInfo.password !== 'string' || loginInfo.password.length === 0){
            return {
                status :false,
                msg : '密码不能为空！'
            }
        }
        return {
            status : true,
            msg : '验证通过'
        }
    }
    //获取user列表
    getUserList(pageNum,pageSize){
        return _eb.request({
            type : 'post',
            url : '/manage/user/list.do',
            data : {
                pageNum : pageNum,
                pageSize : pageSize
            }
        });
    }
}

export default User;