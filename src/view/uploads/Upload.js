import React, {Component} from 'react';
import {Button, Icon, message, Progress} from 'antd';
import axios from 'axios';

export default class Upload extends Component {
    constructor () {
        super();
        this.state = {
            afterUploadprevFile : '',
            beforUploadprevFile : '',
            percent : 0
        };
    }
    render () {
        return (
            <div className='uploadwrap'>
                <style>{`
                    .uploadwrap{
                        width:800px;
                        margin:50px auto;
                    }
                `}</style>
                <input type="file" ref='fileData' hidden onChange={_=>{
                    //上传前预览:
                    let thepic = this.refs.fileData.files[0];
                    //调用构造函数
                    let FR = new FileReader();
                    //读取这个文件
                    FR.readAsDataURL(thepic);
                    //读取之后
                    FR.onload = (e)=>{
                        this.setState({
                            beforUploadprevFile : e.currentTarget.result
                        });
                    };
                }}/>
                <Icon
                    type='plus-circle'
                    style={{'fontSize':80, 'cursor':'pointer'}}
                    onClick={_=> {
                        //创建事件对象
                        let eventObj = document.createEvent('MouseEvents');
                        // console.log(eventObj);
                        //初始化事件对象
                        eventObj.initMouseEvent('click', false, false);
                        //为需要点击的原色绑定click事件
                        this.refs.fileData.dispatchEvent(eventObj);
                    }}
                />
                <Button
                    onClick={_=> {
                        //ajax不能直接上传图片文件,需要创建虚拟表单
                        let form = new FormData();
                        //得到图片信息
                        // console.log(this.refs.fileData.files[0]);
                        form.append('file', this.refs.fileData.files[0]);
                        // console.log(form);
                        //ajax提交虚拟表单
                        axios.post('/api/uppic', form, {
                            headers : {
                                'Content-type':'multipart/form-data'
                            },
                            onUploadProgress : progressEvent => {
                                let complete = parseInt(progressEvent.loaded / progressEvent.total * 100);
                                this.setState({
                                    percent : complete
                                });
                            }
                        }).then(data=>{
                            console.log(data.data);
                            if (data.data.result === 200) {
                                message.success('上传成功!');
                                this.setState({
                                    afterUploadprevFile : data.data.filename
                                });
                            }
                        });

                    }}
                >点击上传图片</Button>
                {
                    this.state.percent === 0 ?
                        null :
                        <Progress status='active' percent={this.state.percent}/>
                }
                <div style={{'marginTop':20}}>
                    {
                        this.state.afterUploadprevFile ?
                            <img src={`http://192.168.2.250:3000/uploads/${this.state.afterUploadprevFile}`}/> :
                            null
                    }
                </div>
                <div style={{'marginTop':20}}>
                    {
                        this.state.beforUploadprevFile ?
                            <img src={this.state.beforUploadprevFile}/> :
                            null
                    }
                </div>
            </div>
        );
    }
}
