/*
 * @Author: Pace 
 * @Date: 2018-12-08 13:50:11 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 15:41:51
 */
import React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

//分页组件
class Pagination extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="row mypagination ">
                <div className="col-md-12">
                    <RcPagination {...this.props} showQuickJumper /> 
                </div>
            </div>
        );
    }
}

export default Pagination;