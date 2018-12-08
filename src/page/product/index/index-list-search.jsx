/*
 * @Author: Pace 
 * @Date: 2018-12-08 21:02:00 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 21:16:08
 */
import React from 'react';

class ListSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchType : 'productId', // productId,productName
            searchKeyword : ''
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
        this.props.onSearch(this.state.searchType,this.state.searchKeyword);
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
                        <select className="form-control" name="searchType" onChange={(e)=>this.onValueChange(e)}>
                            <option value="productId">按商品ID查询</option>
                            <option value="productName">按商品名称查询</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="关键词"
                         onChange={(e)=>this.onValueChange(e)} name="searchKeyword"
                            onKeyUp={(e)=>this.onSearchKeywordUp(e)}
                         />
                    </div>
                    <button className="btn btn-info" onClick={(e)=>this.onSearch()}>搜索</button>
                </div>
                </div>
            </div>
        )
    }
}

export default ListSearch;