/*
 * @Author: Pace 
 * @Date: 2018-12-05 15:50:19 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-05 17:31:31
 */
var webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');

module.exports = {
    // 入口
    entry : './src/app.jsx',
    // 出口
    output : {
        path : path.resolve(__dirname,'dist'),
        publicPath : '/dist/', //devServer打包后路径前缀
        filename : 'js/app.js'
    },
    //模块设置
    module: {
        //模块解析规则
        rules: [
            //react处理
            {
                test: /\.jsx?$/, // 对jsx做react转换语法
                exclude: /(node_modules)/,
                use : {
                    loader: 'babel-loader', //babel插件，打包时把es6语法转化为es5
                    options:{
                        // env:根据环境打包，例如浏览器或node环境；react:React框架
                        presets : ['env','react']
                    }
                }
            },
            //css文件规则处理
            {
                test: /\.css$/,
                //可以使css独立出来，这样页面就不会加载完js才加载样式
                use: ExtractTextPlugin.extract({
                    fallback : "style-loader",
                    use : "css-loader"
                })
            },
            //sass文件处理规则
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                })
            },
            //图片处理
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name : 'resource/[name].[ext]'
                    }
                  }
                ]
            },
            //字体文件解析
            {
                test: /\.(eot|svg|ttf|woff|woff2|ootf)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name : 'resource/[name].[ext]'
                    }
                  }
                ]
            },
        ]
    },
    // 插件
    plugins: [
        // html打包插件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 单独处理css
        new ExtractTextPlugin("css/[name].css"),
        //提成公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        })
    ],
    devServer: {
        port : 8086
    }
};