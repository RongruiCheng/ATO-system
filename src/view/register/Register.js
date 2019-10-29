import React, {Component} from 'react';
import LayoutTop from '../../layout/LayoutTop.js';
import UploadCard from './StepTwo/UploadCard.js';
import UploadPic from './StepThree/UploadPic.js';
import RegisterForm from './StepOne/RegisterForm.js';
import ShowResults from './StepFour/ShowResults.js';
import {connect} from 'dva';
import {Steps} from 'antd';
const {Step} = Steps;
import './Register.less';

@connect(({registerModel})=>({
    ...registerModel
}))
export default class Register extends Component {
    render () {
        return (
            <LayoutTop>
                <div className='registerpage'>
                    <Steps current={this.props.step} className='steps'>
                        <Step title="资料填写" description="用户注册资料填写" />
                        <Step title="上传证件照" description="上传证件照正反面" />
                        <Step title="上传详情照" description="上传车辆详情照" />
                        <Step title="注册成功" description="注册成功" />
                    </Steps>
                </div>
                <div className="form">
                    {(_=>{
                        switch (this.props.step){
                        case 0 :
                            return <RegisterForm/>;
                        case 1 :
                            return <UploadCard/>;
                        case 2 :
                            return <UploadPic/>;
                        case 3 :
                            return <ShowResults/>;
                        default :
                            break;
                        }
                    })()}
                </div>
            </LayoutTop>
        );
    }
}