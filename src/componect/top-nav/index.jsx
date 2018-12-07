/*
 * @Author: Pace 
 * @Date: 2018-12-07 16:02:58 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-07 19:56:59
 */
import React from 'react';
import {Link} from 'react-router-dom';

class TopNav extends React.Component{
    constructor(props){
        super(props);
    }
    // 退出登录
    onLogout(){

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
                        <i className="fa fa-user fa-fw"></i>
                        <span>欢迎，Pace</span>
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