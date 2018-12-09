/*
 * @Author: Pace 
 * @Date: 2018-12-08 16:30:15 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-09 23:56:48
 */
import React from 'react';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom';

//页面
import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import ProductDetail from 'page/product/index/detail.jsx';

//Product的路由
class ProductRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/product/index" component={ProductList} />
                <Route path="/product/save/:pid?" component={ProductSave} />
                <Route path="/product/detail/:pid" component={ProductDetail} />
                <Redirect exact path="/product" to="/product/index"/>
            </Switch>
        )
    }
}

export default ProductRouter;