/*
 * @Author: Pace 
 * @Date: 2018-12-09 20:52:05 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-09 23:27:22
 */
import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
import './index.scss';

//通用富文本编辑器
class RichEditor extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.loadEditor();
    }
    //回显查询后的数据
    componentWillReceiveProps(nextProps){
        //判断是否相同,只有不相同时，才设置value
        if(this.props.defaultDetail !== nextProps.defaultDetail){
            //回显数据
            this.simditor.setValue(nextProps.defaultDetail);
        }
    }
    //初始化富文本编辑器
    loadEditor(){
        let element = this.refs['textarea'];
        this.simditor = new Simditor({
            textarea : $(element),
            defaultValue : this.props.placeholder || '请输入内容',
            upload : {
                url : '/manage/product/richtext_img_upload.do',
                defaultImage : '',
                fileKey : 'upload_file'
            }
        });
        this.bindEditorEvent();
    }
    //绑定编辑器修改内容
    bindEditorEvent(){
        this.simditor.on('valuechanged',e=>{
            this.props.onValueChange(this.simditor.getValue());
        })
    }
    render(){
        return (
            <div className="rich-editor" style={{'maxWidth': '770px'}}>
                <textarea ref="textarea" placeholder=""></textarea>
            </div>
        );
    }
}

export default RichEditor;