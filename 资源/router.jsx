/*
 * @Author: Pace 
 * @Date: 2018-12-06 23:23:35 
 * @Last Modified by:   Pace 
 * @Last Modified time: 2018-12-06 23:23:35 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';

class A extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                Component A
                
                <Switch>
                    <Route exact path={`${this.props.match.path}`}
                     render={(route) => {
                         return <div>不代餐组件A</div>
                     }}/>
                     <Route path={`${this.props.match.path}/sub`}
                     render={(route) => {
                         return <div>sub</div>
                     }}/>
                    <Route path={`${this.props.match.path}/:id`}
                     render={(route) => {
                         return <div>代餐组件A，参数是: {route.match.params.id}</div>
                     }}/>
                </Switch>
            </div>
        )
    }
}

class B extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div>Component B</div>
    }
}

class Wrapper extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Link to="/a">组件A</Link><br/>
                <Link to="/a/123">组件A 123</Link>
                <br/>
                <Link to="/b">组件B</Link>
                <br/>
                <Link to="/a/sub">sub</Link>
                {this.props.children}
            </div>
        )
    }
}

ReactDOM.render(
    <Router>
        <Wrapper>
            <Route path="/a" component={A} />
            <Route path="/b" component={B} />
        </Wrapper>
    </Router>
    ,
    document.getElementById('app')
);