/*
 * @Author: Pace 
 * @Date: 2018-12-08 13:36:16 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 15:44:05
 */

import React from 'react';
import PageTitle from 'componect/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx'
import {Link} from 'react-router-dom';
import EBUtil from 'util/eb.jsx'
import User from 'service/user-service.jsx'

const _eb = new EBUtil();
const _user = new User();

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : [], // list需要初始化为数组
            pageNum : 1,
            pageSize : 10,
            firstLoading : true
        };
    }
    //页面加载调用方法
    componentDidMount(){
        this.loadUserList();
    }
    //获取用户列表
    loadUserList(){
        _user.getUserList(this.state.pageNum,this.state.pageSize).then(res =>{
            this.setState(res, ()=>{
                this.setState({
                    firstLoading : false
                });
            });
        },(errMsg)=>{
            this.setState({
                list : []
            });
            _eb.errorTips(errMsg);
        });
    }
    //页数变化，修改分页信息
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        },()=>{ // 修改完后需要回调
            this.loadUserList();
        });
    }
    render(){
        let listBody = this.state.list.map((user,index)=>{
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            );
        });
        let listError = (
            <tr>
                <td colSpan="5" className="text-center">
                {this.state.firstLoading ? '正在加载数据': '没有找到相应的结果'}</td>
            </tr>
        );
        let tableBody = this.state.list.length > 0 ? listBody:listError;
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <div className="row user-list">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>用户名</th>
                                    <th>邮箱</th>
                                    <th>电话</th>
                                    <th>注册时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableBody}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination current={this.state.pageNum} total={this.state.total}
                   PageSize={this.state.pageSize} onChange={(pageNum)=>this.onPageNumChange(pageNum)}/>
            </div>
        );
    }
}

export default UserList;