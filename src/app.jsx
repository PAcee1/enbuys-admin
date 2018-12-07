/*
 * @Author: Pace 
 * @Date: 2018-12-05 15:52:57 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-07 20:24:16
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom';

import Layout from 'componect/layout/index.jsx';
//页面
import Home from 'page/home/index.jsx';

class App extends React.Component{
    render(){
        return (
            <Router>
                <Layout >
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route  path="/product" component={Home}/>
                        <Route  path="/product-category" component={Home}/>
                    </Switch>
                </Layout>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />
    ,
    document.getElementById('app')
);