/*
 * @Author: Pace 
 * @Date: 2018-12-07 14:34:23 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 12:20:04
 */
import React from 'react';
import './index.scss';
import PageTitle from 'componect/page-title/index.jsx';
import {Link} from 'react-router-dom';
import EBUtil from 'util/eb.jsx'
import Statistic from 'service/statistic-service.jsx'

const _eb = new EBUtil();
const _statistic = new Statistic();

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userCount : '-',
            productCount : '-',
            orderCount : '-',
        }
    }
    componentDidMount(){
        this.loadCount();
    }
    loadCount(){
        _statistic.getHomeCount().then(res => {
            this.setState(res);
        },errMsg=>{
            _eb.errorTips(errMsg);
        });
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="Home" >
                    <small>show products</small>
                </PageTitle>
            <div className="content home container-fluid" style={{height: '251px'}}>
                <div className="dash-board">
                <div className="col-lg-4 col-xs-6">
                    <div className="small-box default">
                        <div className="inner" style={{height: '200px'}}>
                            <h3>{this.state.orderCount}</h3>
                            <p>Order Count</p>
                        </div>
                        <div className="icon"><i className="fa fa-barcode"></i>
                        </div><Link className="small-box-footer" to="/orders">More  <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                <div className="col-lg-4 col-xs-6">
                    <div className="small-box default">
                        <div className="inner" style={{height: '200px'}}>
                            <h3>{this.state.productCount}</h3>
                            <p>Product Count</p>
                        </div>
                        <div className="icon"><i className="fa fa-linode"></i>
                        </div><Link className="small-box-footer" to="/product">More  <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
                <div className="col-lg-4 col-xs-12">
                    <div className="small-box default bottom">
                        <div className="inner" style={{height: '200px'}}>
                            <h3>{this.state.userCount}</h3>
                            <p>User Registrations</p>
                        </div>
                        <div className="icon"><i className="fa fa-user-circle-o"></i>
                        </div><Link className="small-box-footer" to="/user">More  <i className="fa fa-arrow-circle-right"></i></Link>
                    </div>
                </div>
            </div>
            </div>
            </div>
        );
    }
}

export default Home;