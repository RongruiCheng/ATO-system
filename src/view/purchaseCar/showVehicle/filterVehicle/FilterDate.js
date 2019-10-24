import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import {connect} from 'dva';
import {DatePicker} from 'antd';
const {RangePicker} = DatePicker;

@connect(({tableModel})=> ({
    ...tableModel
}))
export default class FilterDate extends Component {
    constructor () {
        super();
        this.state = {
            buyDate : []
        };
    }
    render () {
        return (
            <div>
                <Row>
                    <Col span={2}>
                        <b>购买日期:</b>
                    </Col>
                    <Col span={17}>
                        <RangePicker
                            onChange={(dates)=>{
                                //dates =>包含Moment对象的数组,表示开始日期和结束日期
                                const v = dates.map(item=>item.unix() * 1000);
                                this.setState({
                                    buyDate : v
                                });
                            }}
                        />
                    </Col>
                    <Col span={3}>
                        <Button
                            onClick={_=> {
                                this.props.dispatch({'type': 'tableModel/ASYNCFILTEROPTION', 'k': 'buyDate', 'v': this.state.buyDate});
                            }}
                        >确定</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
