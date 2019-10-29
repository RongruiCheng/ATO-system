import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import UploadItem from './UploadItem.js';
import './UploadPicUtils.less';
export default class UploadPicUtils extends Component {
    constructor () {
        super();
        this.state = {
            //结构:一维数组包含多个对象
            files : []
        };
    }
    componentDidMount () {
        //涉及往目标区域拖拽图片,需要阻止浏览器的默认事件
        document.addEventListener('drag', function (e){
            e.preventDefault();
        });
        document.addEventListener('dragover', function (e){
            e.preventDefault();
        });
        document.addEventListener('drop', function (e){
            e.preventDefault();
        });
        document.body.addEventListener('drag', function (e){
            e.preventDefault();
        });
        document.body.addEventListener('dragover', function (e){
            e.preventDefault();
        });
        document.body.addEventListener('drop', function (e){
            e.preventDefault();
        });
        //用户拖拽提交时
        this.refs.fakebox.addEventListener('drop', (e)=> {
            e.preventDefault();
            this.setState({
                files : [...this.state.files, ...Array.from(e.dataTransfer.files).map(fileinfo=>({
                    id : Math.random(),
                    fileinfo
                }))]
            });
        }, false);
    }
    render () {
        return (
            <div>
                <Row>
                    <Col span={10} offset={2}>
                        <h3>请上传{this.props.title}详情照片:(可以拖拽批量上传)</h3>
                    </Col>
                    <Col span={4}>
                        <input type="file" hidden ref='fileCtrl' multiple onChange={_=>{
                            // 用户点击按钮提交时
                            this.setState({
                                files : [...this.state.files, ...Array.from(this.refs.fileCtrl.files).map(fileinfo=>({
                                    id : Math.random(),
                                    fileinfo
                                }))]
                            });
                        }}/>
                        <Button
                            onClick={_=>{
                                //模拟事件
                                const evt = document.createEvent('MouseEvents');
                                //初始化
                                evt.initEvent('click', false, false);
                                this.refs.fileCtrl.dispatchEvent(evt);
                            }}
                        >上传图片</Button>
                    </Col>
                </Row>
                <Row>
                    <Col offset={2}>
                        <div className='fakebox' ref='fakebox'>
                            {
                                this.state.files.map((o, index) => {
                                    return <UploadItem
                                        key={o.id}
                                        fileinfo={o.fileinfo}
                                        onSortItems={(files)=>{
                                            console.log(files);
                                            this.setState({
                                                files
                                            });
                                        }}
                                        items={this.state.files}
                                        //sortId必须为index
                                        sortId={index}
                                    />;
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
