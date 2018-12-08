/*
 * @Author: Pace 
 * @Date: 2018-12-07 20:30:18 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 11:52:11
 */
import React from 'react';

class PageTitle extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        document.title = 'EnBuy后台 - ' + this.props.title ;
    }
    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1 className="page-header">
                        {this.props.title}{this.props.children}
                    </h1>
                </div>
            </div>
        );
    }
}

export default PageTitle;