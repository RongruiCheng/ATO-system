import React, {Component} from 'react';
import {Form, Input, Row, Col, Button, notification} from 'antd';
import UploadUtils from './UploadUtils.js';
import {connect} from 'dva';

@Form.create({
    name : 'uploadCard'
})
@connect(({registerModel})=>({
    ...registerModel
}))
export default class UploadCard extends Component {
    render () {
        //getFieldsValue()不加参数能得到所有控件的值
        //getFieldValue得到某一个控件的值
        const {getFieldDecorator, getFieldsValue, getFieldValue} = this.props.form;
        //栅格
        const FormItemLayout = {
            labelCol : {
                span : 3,
                offset:6
            },
            wrapperCol : {
                span : 10
            },
            labelAlign : 'left'
        };
        return (
            <Form {...FormItemLayout}>
                <Form.Item label='身份证号码'>
                    {
                        getFieldDecorator('idcard', {
                            rules : [
                                {
                                    required: true,
                                    message : '请输入身份证号码'
                                },
                                {
                                    pattern: new RegExp('^[0-9]{17}[0-9X]$'),
                                    message: '请输入正确的身份证号码'
                                }
                            ]
                        })(<Input/>)
                    }
                </Form.Item>
                <Form.Item label='证件正面照'>
                    <UploadUtils/>
                </Form.Item>
                <Form.Item label='证件反面照'>
                    <UploadUtils/>
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col offset={22}>
                            <Button type="primary" onClick={_=>{
                                notification.open({
                                    message: 'Notification Title',
                                    description:<div>hhhhhhhhhhhh</div>
                                });
                                // this.props.dispatch({'type':'registerModel/CHANGESTEPS', 'step': 2});
                            }}>
                                下一步
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        );
    }
}
