/*
 * @Author: Pace 
 * @Date: 2018-12-11 16:30:05 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-11 16:49:53
 */

import React from 'react';
import './index.scss';

class ListSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderNumber : ''
        }
    }
    //数据变化时
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    //点击按钮时
    onSearch(e){
        this.props.onSearch(this.state.orderNumber);
    }
    //按回车提交
    onSearchKeywordUp(e){
        if(e.keyCode === 13){
            this.onSearch();
        }
    }
    render(){
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                <div className="form-inline">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="按订单号查询"
                         onChange={(e)=>this.onValueChange(e)} name="orderNumber"
                            onKeyUp={(e)=>this.onSearchKeywordUp(e)}
                         />
                    <button className="btn btn-info" onClick={(e)=>this.onSearch()}>搜索</button>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default ListSearch;