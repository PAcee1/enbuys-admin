/*
 * @Author: Pace 
 * @Date: 2018-12-05 15:52:57 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 13:36:39
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
import UserList from 'page/user/index.jsx';
//error组件
import ErrorPage from 'page/error/index.jsx';

class App extends React.Component{
    render(){
        let LayoutRouter=(
            <Layout >
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route  path="/product" component={Home}/>
                    <Route  path="/product-category" component={Home}/>
                    <Route path="/user/index" component={UserList}/>
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