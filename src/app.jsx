/*
 * @Author: Pace 
 * @Date: 2018-12-05 15:52:57 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-12 16:35:13
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom';

//样式
import Layout from 'componect/layout/index.jsx';
//页面
import Home from 'page/home/index.jsx';
//登录组件
import Login from 'page/login/index.jsx';
import ProductRouter from 'page/product/router.jsx';
import OrderList from 'page/order/index.jsx';
import OrderDetail from 'page/order/detail.jsx';
import UserList from 'page/user/index.jsx';
//error组件
import ErrorPage from 'page/error/index.jsx';


class App extends React.Component{
    render(){
        //设置路由，根据url路径的不同，往主页面body中添加内容
        let LayoutRouter=(
            <Layout > 
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route  path="/product" component={ProductRouter}/>
                    <Route  path="/product-category" component={ProductRouter}/>
                    <Route path="/order/index" component={OrderList}/>
                    <Route path="/order/detail/:orderNumber" component={OrderDetail}/>
                    <Route path="/user/index" component={UserList}/>
                    <Redirect exact from="/order" to="/order/index" />
                    <Redirect exact from="/user" to="/user/index" />
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={props =>LayoutRouter} />
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />
    ,
    document.getElementById('app')
);