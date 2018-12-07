/*
 * @Author: Pace 
 * @Date: 2018-12-07 14:34:23 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-07 20:59:45
 */
import React from 'react';
import './index.css';
import PageTitle from 'componect/page-title/index.jsx';

class Home extends React.Component{
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="Home" >
                    <small>show products</small>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        body
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;