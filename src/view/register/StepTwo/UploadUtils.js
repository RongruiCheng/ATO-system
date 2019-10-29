import React, {Component} from 'react';
import {Icon} from 'antd';
import './utils.less';

export default class UploadUtils extends Component {
    constructor () {
        super();
        this.state = {
            base64 : '',
            fileObj : ''
        };
    }
    render () {
        return (
            <div className='ulilswrap' style={{
                'backgroundImage':'url(' + this.state.base64 + ')'
            }}>
                <input type="file" hidden ref='upctrl' onChange={_=>{
                    //图片预览
                    //this.refs.upctrl.files为类数组对象
                    const fileObj = this.refs.upctrl.files[0];
                    if (fileObj === undefined) return;
                    const fr = new FileReader();
                    fr.readAsDataURL(fileObj);
                    fr.onload = (e)=>{
                        this.setState({
                            base64 : e.currentTarget.result
                        });
                    };
                }}/>
                <Icon
                    type="file-add"
                    theme="twoTone"
                    className='iconplus'
                    style={{'display':this.state.base64 === '' ? 'block' : 'none'}}
                    onClick={_=>{
                        //事件模拟
                        const evt = document.createEvent('MouseEvents');
                        //初始化事件
                        evt.initEvent('click', false, false);
                        //绑定元素
                        this.refs.upctrl.dispatchEvent(evt);
                    }}
                />
                <Icon
                    type='delete'
                    theme='twoTone'
                    className='icondel'
                    style={{'display':this.state.base64 === '' ? 'none' : 'block'}}
                    onClick={_=>{
                        this.setState({
                            base64:''
                        });
                    }}
                />
            </div>
        );
    }
}
