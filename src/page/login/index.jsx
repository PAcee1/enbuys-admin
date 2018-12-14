/*
 * @Author: Pace 
 * @Date: 2018-12-08 08:46:23 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 11:20:28
 */
import React from 'react';
import EBUtil from 'util/eb.jsx'
import User from 'service/user-service.jsx'
import './index.scss';

const _eb = new EBUtil();
const _user = new User();

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            redirect : _eb.getUrlParam('redirect') || ''
        }
    }
    componentWillMount(){
        document.title = 'Enbuy后台 - 登录';
    }
    //input改变事件
    onInputChange(e){
        let inputName = e.target.name,
            inputValue = e.target.value;
        this.setState({ // 保存值
            [inputName] : inputValue
        });
    }
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    //用户提交表单，即登录
    onSubmit(e){
        let loginInfo = {
            username : this.state.username,
            password : this.state.password
            },
            checkResult = _user.checkLoginInfo(loginInfo);
        //表单校验
        if(checkResult.status){ // 通过
            _user.login(loginInfo).then((res) => {
                _eb.setStorage('userInfo', res);//本地存储登录状态
                this.props.history.push(this.state.redirect); // 跳转之前的页面
            }, (errMsg) => {
                _eb.errorTips(errMsg);
            });
        }else{
            _eb.errorTips(checkResult.msg);
        }
    }
    
    render(){
        return (
            <div className="col-md-4 col-md-offset-4 login-main">
                <div className="login-logo"><a><b>Admin</b></a>
                    <div className="sub-title">Login EnBuy-Admin</div>
                </div>
                <div className="panel panel-default login-panel">
                    <div className="panel-body">
                        <div className="login-box-msg">
                            <div className="login-box-msg-default">Please log into your account</div>
                            {/* <div className="login-box-msg-err">遇到未知错误</div> */}
                        </div>
                        <div>
                            <div className="form-group has-feedback">
                                <input type="text" name="username" className="form-control" placeholder="请输入用户名"
                                    onChange={e => this.onInputChange(e)}
                                    onKeyUp={e => this.onInputKeyUp(e)} />
                                <span className="glyphicon glyphicon-user form-control-feedback"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <input type="password" name="password" className="form-control" placeholder="请输入密码" 
                                    onChange={e => this.onInputChange(e)}
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                />
                                <span className="glyphicon glyphicon-certificate form-control-feedback"></span>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                onClick={e=>this.onSubmit(e)}>登录</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;