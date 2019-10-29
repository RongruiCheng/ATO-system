import React, {Component} from 'react';
import UploadPicUtils from './UploadPicUtils.js';
import {Button, Row, Col, notification} from 'antd';
import {connect} from 'dva';
@connect(({registerModel})=>({
    ...registerModel
}))
export default class UploadPic extends Component {
    render () {
        return (
            <div>
                <Row>
                    <Col>
                        <UploadPicUtils title='外观'/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <UploadPicUtils title='内饰'/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <UploadPicUtils title='引擎'/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <UploadPicUtils title='更多'/>
                    </Col>
                </Row>
                <Row>
                    <Col offset={2}>
                        <Button type='primary' onClick={_=>{
                            this.props.dispatch({'type':'registerModel/CHANGESTEPS', 'step': 3});
                        }}>下一步</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
