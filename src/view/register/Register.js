import React, {Component} from 'react';
import LayoutTop from '../../layout/LayoutTop.js';
import RegisterForm from './RegisterForm.js';
import {Steps} from 'antd';
const {Step} = Steps;
import './Register.less';

export default class Register extends Component {
    render () {
        return (
            <LayoutTop>
                <div className='registerpage'>
                    <Steps current={0} className='steps'>
                        <Step title="资料填写" description="用户注册资料填写" />
                        <Step title="短信验证" subTitle="剩余 00:00:08" description="短信验证码填写" />
                        <Step title="注册成功" description="注册成功" />
                    </Steps>
                </div>
                <div className="form">
                    <RegisterForm/>
                </div>
            </LayoutTop>
        );
    }
}