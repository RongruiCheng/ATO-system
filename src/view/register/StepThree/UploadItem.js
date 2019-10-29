import React, {Component} from 'react';
import axios from 'axios';
import classnames from 'classnames';
import {sortable} from 'react-sortable';

@sortable
export default class UploadItem extends Component {
    constructor () {
        super();
        this.state = {
            base64 : '',
            precent: 0
        };
    }
    //每个小组件上树之前,读取父组件传的文件信息,实现上传前预览
    componentWillMount () {
        //得到文件
        const fileinfo = this.props.fileinfo;
        this.readFile(fileinfo);
        //每个小组件自己负责向服务器提交文件
        this.uploadToServer(fileinfo);
    }
    //upload
    uploadToServer (fileinfo) {
        //ajax不能直接上传图片文件,需要创建虚拟表单
        let form = new FormData();
        form.append('file', fileinfo);
        //ajax提交表单
        axios.post('/api/uppic', form, {
            'headers':{
                'Content-type':'multipart/form-data'
            },
            onUploadProgress:(progressEvent)=>{
                const percent = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                this.setState({
                    percent
                });
            }
        }).then(data=> console.log(data.data));
    }
    //读取文件的函数,绑定state,实现上传前预览
    readFile (file) {
        const FR = new FileReader();
        FR.readAsDataURL(file);
        FR.onload = (progressEvent)=>{
            this.setState({
                base64 : progressEvent.currentTarget.result
            });
        };
    }
    render () {
        return (
            <div {...this.props} className={classnames('prevpic', {
                'done': this.state.percent === 100
            })}style={{
                'backgroundImage':`url(${this.state.base64})`,
                'backgroundPosition':'center center',
                'backgroundSize':'cover'
            }}>
            </div>
        );
    }
}
