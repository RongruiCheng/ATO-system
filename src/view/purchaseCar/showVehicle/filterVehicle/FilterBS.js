import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Tabs} from 'antd';
const {TabPane} = Tabs;

@connect(({tableModel})=>({
    ...tableModel
}))
export default class FilterBS extends Component {
    constructor () {
        super();
        this.state = {
            letter : ''
        };
    }
    componentWillMount () {
        //fetch all brand series data
        this.props.dispatch({'type': 'tableModel/FETCHBSDATA'});
    }
    // componentWillReceiveProps (nextPops, nextState) {
    //     if (nextPops.brand === '') {
    //         this.setState({
    //             letter : ''
    //         });
    //     }
    // }
    render () {
        if (Object.keys(this.props.allBS).length === 0) {
            return <div></div>;
        }
        return (
            <div>
                <Row>
                    <Col span={2}>
                        <b>品牌:</b>
                    </Col>
                    <Col span={17}>
                        <Tabs defaultActiveKey='1'>
                            {
                                Object.keys(this.props.allBS).map((letter)=>{
                                    return <TabPane
                                        tab={letter}
                                        key={letter}
                                    >
                                        {
                                            Object.keys(this.props.allBS[letter]).map(brand => {
                                                return <a
                                                    key={brand}
                                                    style={{'marginRight':10}}
                                                    onClick={_=> {
                                                        //dispatch
                                                        this.props.dispatch({'type':'tableModel/ASYNCFILTEROPTION', 'k': 'brand', 'v' : brand});
                                                        this.setState({
                                                            letter
                                                        });
                                                    }}
                                                >{brand}</a>;
                                            })
                                        }
                                    </TabPane>;
                                })
                            }
                        </Tabs>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                        <b>车系:</b>
                    </Col>
                    <Col>
                        {
                            (()=>{
                                if (this.state.letter !== '' && this.props.brand !== '') {
                                    return this.props.allBS[this.state.letter][this.props.brand].map(series=> {
                                        return <a
                                            key={series}
                                            style={{'marginRight': 10}}
                                            onClick={_=> {
                                                this.props.dispatch({'type': 'tableModel/ASYNCFILTEROPTION', 'k': 'series', 'v': series});
                                            }}
                                        >{series}</a>;
                                    });
                                }
                            })()
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}
