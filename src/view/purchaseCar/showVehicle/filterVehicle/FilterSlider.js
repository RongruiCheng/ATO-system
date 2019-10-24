import React, {Component} from 'react';
import {Row, Col, Slider} from 'antd';
import {connect} from 'dva';
@connect(({tableModel})=> ({
    ...tableModel
}))
export default class FilterSlider extends Component {
    render () {
        return (
            <div style={{'marginBottom':20}}>
                <Row>
                    <Col span={2}>
                        <b>价格</b>
                    </Col>
                    <Col span={17}>
                        <Slider
                            min={0}
                            max={120}
                            range
                            defaultValue={[10, 30]}
                            marks={{
                                10: '10万',
                                50: '50万',
                                80: '80万',
                                120: '120万'
                            }}
                            onAfterChange={(v)=>{
                                this.props.dispatch({'type': 'tableModel/ASYNCFILTEROPTION', 'k': 'price', v});
                            }}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
