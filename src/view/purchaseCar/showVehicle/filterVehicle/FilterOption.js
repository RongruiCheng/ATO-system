import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import {connect} from 'dva';
import columnsMap from '../columnsMap.js';
import classname from 'classnames';
import './filterOption.less';

@connect(({tableModel})=>({
    ...tableModel
}))
export default class FilterOption extends Component {
    constructor () {
        super();
        this.state = {
            isMutliple : false,
            ops: []
        };
    }
    //ops click event
    opsClickHandle (ops) {
        //判断单,多选情况
        if (!this.state.isMutliple) {
            //singel choose
            this.props.dispatch({'type': 'tableModel/ASYNCFILTEROPTION', 'k': this.props.k, 'v': [ops]});
        } else {
            //mutiple choose
            if (this.state.ops.includes(ops)) {
                //delete
                this.setState({
                    ops : this.state.ops.filter((item) => item !== ops)
                });
            } else {
                this.setState({
                    ops : [...this.state.ops, ops]
                });
            }
        }
    }
    //组件接收新的props
    componentWillReceiveProps (nextProps, nextState) {
        //引用类型值不能比较,但是reducer中的state是经过纯函数变化的总是返回新的,这里可以比较props的数组是不是内存中的同一个
        if (nextProps[this.props.k] !== this.props[this.props.k]) {
            //tag onclose event , back to single mode
            this.setState({
                isMutliple : false,
                ops : []
            });
        }
    }
    render () {
        return (
            <div className='filteritem' style={{'display' : this.props[this.props.k].length === 0 ? 'block' : 'none'}}>
                <Row>
                    <Col span={2}>
                        <b className='b'>{columnsMap[this.props.k].title}:</b>
                    </Col>
                    <Col span={17}>
                        {
                            this.props.options.map((ops)=> {
                                return <span
                                    key={ops}
                                    className={classname('options', {
                                        'cur1':this.state.isMutliple,
                                        'cur2':this.state.ops.includes(ops)
                                    })}
                                    onClick={_=> {
                                        this.opsClickHandle(ops);
                                    }}
                                >{ops}</span>;
                            })
                        }
                    </Col>
                    {
                        this.state.isMutliple ?
                            <Col span={3}>
                                <Button
                                    type='primary'
                                    onClick={_=> {
                                        this.props.dispatch({'type': 'tableModel/ASYNCFILTEROPTION', 'k': this.props.k, 'v': this.state.ops});
                                    }}
                                >确定</Button>
                            </Col> :
                            null
                    }
                    <Col span={2}>
                        <Button
                            type='dashed'
                            onClick={_=> {
                                this.setState({
                                    isMutliple : !this.state.isMutliple
                                });
                            }}
                        >
                            {
                                !this.state.isMutliple ?
                                    '多选' :
                                    '取消多选'
                            }
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
