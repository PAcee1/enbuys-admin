/*
 * @Author: Pace 
 * @Date: 2018-12-09 13:46:12 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-09 20:28:56
 */
import FileUpload from './react-fileupload.jsx';
import React from 'react';

class FileUploader extends React.Component{
    render(){
        /*指定参数*/
        var options={
            baseUrl:'/manage/product/upload.do', //指定url
            fileFieldName : 'upload_file', //指定字段
            dataType : 'json',
            chooseAndUpload : true,
            uploadSuccess : (res)=>{this.props.onSuccess(res.data)}, // 只取data字段
            uploadError : (err)=>{this.props.onError(err.message || '上传图片失败')}
        }
        /*调用FileUpload,传入options。然后在children中*/
        /*传入两个dom(不一定是button)并设置其ref值。*/
        return (
            <FileUpload options={options}>
                <button ref="chooseAndUpload" className="btn btn-sm btn-info">选择图片</button>
            </FileUpload>
        )	        
    }
}

export default FileUploader;