import React, {Component} from 'react';
import {Form, Input, Select, Button, Row, Col, Cascader, Spin, message} from 'antd';
const {Option} = Select;
import {connect} from 'dva';

@Form.create({
    name:'register'
})
@connect(({tableModel})=>({
    ...tableModel
}))
@connect(({registerModel})=>({
    ...registerModel
}))
export default class RegisterForm extends Component {
    constructor () {
        super();
        this.state = {
            countdown:6,
            isSend : false
        };
    }
    componentWillMount () {
        this.props.dispatch({'type': 'tableModel/FETCHBSDATA'});
    }
    render () {
        if (Object.keys(this.props.allBS).length === 0) {
            return <div style={{'textAlign':'center'}}>
                <Spin
                    size="large"
                />
            </div>;
        }
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
        //电话前缀
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue:'86'
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );
        //品牌车系级联数组
        const options = Object.keys(this.props.allBS).map(letter => ({
            'label':letter,
            'value':letter,
            'children':Object.keys(this.props.allBS[letter]).map(brand => ({
                'label':brand,
                'value':brand,
                'children':this.props.allBS[letter][brand].map(series => ({
                    'label':series,
                    'value':series
                }))
            }))
        }));
        //表单被装饰,不需要div包裹
        return (
            <Form {...FormItemLayout}>
                <Form.Item label='姓名'>
                    {
                        getFieldDecorator('name', {
                            rules : [
                                {
                                    required: true,
                                    message : '请输入姓名'
                                },
                                {
                                    pattern: new RegExp('^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$'),
                                    message: '请输入中文名'
                                }
                            ]
                        })(<Input/>)
                    }
                </Form.Item>
                <Form.Item label='手机号'>
                    {
                        getFieldDecorator('phoneNumber', {
                            rules : [
                                {
                                    required: true,
                                    message : '请输入手机号'
                                },
                                {
                                    pattern: new RegExp(/^[1][3,4,5,6,7,8,9][0-9]{9}$/),
                                    message: '请输入正确手机号'
                                }
                            ]
                        })(<Input addonBefore={prefixSelector}/>)
                    }
                </Form.Item>
                <Form.Item label='验证码'>
                    <Row gutter={32}>
                        <Col span={16}>
                            {
                                getFieldDecorator('captcha', {
                                    rules : [
                                        {
                                            required: true,
                                            message : '请输入验证码'
                                        },
                                        {
                                            pattern: /^[0-9]{4}$/,
                                            message: '请输入四位数字验证码'
                                        }
                                    ]
                                })(<Input/>)
                            }
                        </Col>
                        <Col span={8}>
                            <Button
                                onClick={_=>{
                                    //点击-确认手机号是否有效
                                    const phoneNumber = getFieldValue('phoneNumber');
                                    if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(phoneNumber)) {
                                        message.error('请输入正确的手机号码');
                                        return;
                                    }
                                    this.setState({
                                        isSend:true
                                    });
                                    //开启定时器
                                    clearInterval(this.timer);
                                    this.timer = setInterval(()=>{
                                        this.setState({
                                            countdown:this.state.countdown - 1
                                        }, _=>{
                                            if (this.state.countdown <= 0) {
                                                this.setState({
                                                    countdown : 6,
                                                    isSend : false
                                                });
                                                clearInterval(this.timer);
                                            }
                                        });
                                    }, 1000);
                                    this.props.dispatch({'type': 'registerModel/SENDMESG', phoneNumber});
                                }}
                                disabled={this.state.isSend}
                            >
                                {
                                    (_=>{
                                        if (this.state.isSend) {
                                            return '验证码已发送(' + this.state.countdown + 's)';
                                        } else {
                                            return '发送验证码';
                                        }
                                    })()
                                }
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label='品牌和车系'>
                    {
                        getFieldDecorator('bs', {
                            rules : [
                                {
                                    required: true,
                                    message : '请输入品牌和车系'
                                }
                            ]
                        })(<Cascader options={options} placeholder='请选择汽车品牌和车系'/>)
                    }
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col offset={22}>
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
                {this.props.token}
            </Form>
        );
    }
}
