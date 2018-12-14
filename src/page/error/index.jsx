/*
 * @Author: Pace 
 * @Date: 2018-12-07 14:34:23 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 13:26:43
 */
import React from 'react';
import PageTitle from 'componect/page-title/index.jsx';
import {Link} from 'react-router-dom';

class Error extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="出错了"/>
                <div className="row">
                    <div className="col-md-12">
                        <span>找不到该路径</span>
                        <Link to="/">回到首页</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Error;