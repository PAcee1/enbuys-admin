/*
 * @Author: Pace 
 * @Date: 2018-12-07 16:02:58 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-09 00:56:39
 */
import React from 'react';
import EBUtil from 'util/eb.jsx'
import User from 'service/user-service.jsx'
import {Link} from 'react-router-dom';

const _eb = new EBUtil();
const _user = new User();

// 头部导航
class TopNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : _eb.getStorage('userInfo').username || ''
        }
    }
    // 退出登录
    onLogout(){
        _user.logout().then(res=>{
            _eb.removeStorage('userInfo');//删除本地存储
            window.location.href = '/login'; // 回到登录页
        },errMsg => {
            _eb.errorTips(errMsg);
        });
    }
    render (){
        return (
            <div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link className="enbuy-logo" to="/"><b>En</b>Buy</Link>
            </div>
            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:;">
                        <i className="fa fa-user-circle-o fa-fw"></i>
                        {this.state.username 
                         ?<span>欢迎，{this.state.username}</span>
                         :<span>欢迎</span> }
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                            <a onClick={()=>{this.onLogout()}}>
                                <i className="fa fa-sign-out fa-fw"></i> 
                                退出登录
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        )
    }
}

export default TopNav;