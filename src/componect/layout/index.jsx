/*
 * @Author: Pace 
 * @Date: 2018-12-07 15:14:33 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-09 10:50:48
 */
import React from 'react';
import TopNav from 'componect/top-nav/index.jsx';
import SideNav from 'componect/side-nav/index.jsx';

import './theme.css';
import './index.scss';

//页面主样式和结构
class Layout extends React.Component{
    constructor(props){
        super(props);
    }
    render (){
        return (
            <div id="wrapper">
                 <TopNav /> {/*头部导航 */}
                <SideNav /> {/*侧边导航 */}
                {this.props.children}
            </div>
        )
    }
}

export default Layout;