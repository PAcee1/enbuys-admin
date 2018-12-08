/*
 * @Author: Pace 
 * @Date: 2018-12-08 16:30:15 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-08 16:32:24
 */
import React from 'react';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom';

//页面
import ProductList from 'page/product/index/index.jsx';

class ProductRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/product/index" component={ProductList} />
                <Redirect exact path="/product" to="/product/index"/>
            </Switch>
        )
    }
}

export default ProductRouter;