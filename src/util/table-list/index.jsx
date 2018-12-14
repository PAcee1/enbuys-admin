/*
 * @Author: Pace 
 * @Date: 2018-12-08 16:45:14 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 20:49:27
 */
import React from 'react';

//通用列表
class TableList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFirstLoading :true
        }
    }
    //组件更新修改
    componentWillReceiveProps(){
        this.setState({
            isFirstLoading : false
        });
    }
    render(){
        //表头信息
        let tableHeader = this.props.tableHeads.map(
            (tableHeader,index)=>{
                if(typeof tableHeader === 'object'){
                    return <th key={index} width={tableHeader.width}>{tableHeader.name}</th>
                }else if(typeof tableHeader==='string'){
                    return <th key={index}>{tableHeader}</th>
                }
                
            }
        )
        //列表内容
        let listBody = this.props.children;
        //列表信息
        let listInfo = (
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                {this.state.isFirstLoading ? '正在加载数据': '没有找到相应的结果'}</td>
            </tr>
        );
        let tableBody = listBody.length > 0 ? listBody:listInfo;
        return (
            
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-default">
                    <table className="table">
                        <thead>
                            <tr>
                                {tableHeader}
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );
    }
}

export default TableList;