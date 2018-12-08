/*
 * @Author: Pace 
 * @Date: 2018-12-08 13:36:16 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 20:48:26
 */

import React from 'react';
import PageTitle from 'componect/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';
import {Link} from 'react-router-dom';
import EBUtil from 'util/eb.jsx';
import User from 'service/user-service.jsx';

const _eb = new EBUtil();
const _user = new User();

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : [], // list需要初始化为数组
            pageNum : 1,
            pageSize : 10
        };
    }
    //页面加载调用方法
    componentDidMount(){
        this.loadUserList();
    }
    //获取用户列表
    loadUserList(){
        _user.getUserList(this.state.pageNum,this.state.pageSize).then(res =>{
            this.setState(res);
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
        let tableHeads = [
            {name : 'Id',width:'10%'},
            {name : '用户名',width:'10%'},
            {name : '邮箱',width:'15%'},
            {name : '电话',width:'15%'},
            {name : '注册时间',width:'15%'},
            {name : '操作',width:'10%'},
        ];
        let listBody = this.state.list.map((user,index)=>{
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                    <td>
                    <div class="oper-wrapper">
                        <span class="oper-item btn btn-info">详情</span>
                        <span class="oper-item btn btn-info">操作</span>
                    </div>
                    </td>
                    
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <TableList tableHeads = {tableHeads}>
                    {listBody}
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total}
                   PageSize={this.state.pageSize} onChange={(pageNum)=>this.onPageNumChange(pageNum)}/>
            </div>
        );
    }
}

export default UserList;