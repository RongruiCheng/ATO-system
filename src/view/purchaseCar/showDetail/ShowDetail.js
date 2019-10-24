import React, {Component} from 'react';
import {Descriptions, Spin} from 'antd';
import {connect} from 'dva';
import moment from 'moment';
import RcViewer from '@hanyk/rc-viewer';
import LayoutSider from '../../../layout/LayoutSider.js';

@connect(({detailModel})=>({
    ...detailModel
}))
export default class ShowDetail extends Component {
    constructor () {
        super();
    }
    componentWillMount () {
        this.props.dispatch({'type': 'detailModel/INITDETAIL', 'id' : this.props.match.params.id});
    }
    render () {
        //页面等待异步
        if (Object.keys(this.props.result).length === 0) {
            return <div style={{'textAlign' : 'center'}}>
                <Spin
                    size="large"
                />
            </div>;
        }
        const result = this.props.result;
        return (
            <LayoutSider>
                <Descriptions title={`${result.brand}${result.series}的详细:`} bordered>
                    <Descriptions.Item label="编号">{this.props.match.params.id}</Descriptions.Item>
                    <Descriptions.Item label="品牌">{result.brand}</Descriptions.Item>
                    <Descriptions.Item label="车系">{result.series}</Descriptions.Item>
                    <Descriptions.Item label="颜色">{result.color}</Descriptions.Item>
                    <Descriptions.Item label="购买日期">{moment(result.buydate).format('YYYY-MM-DD')}</Descriptions.Item>
                    <Descriptions.Item label="公里数">{result.km.toString().replace(/\B(?=(...)+$)/g, ',')}</Descriptions.Item>
                    <Descriptions.Item label="售价">{result.price}</Descriptions.Item>
                    <Descriptions.Item label="燃料">{result.fuel}</Descriptions.Item>
                    <Descriptions.Item label="排放">{result.exhaust}</Descriptions.Item>
                    <Descriptions.Item label="发动机">{result.engine}</Descriptions.Item>
                    <Descriptions.Item label="变速箱">{result.gearbox}</Descriptions.Item>
                    <Descriptions.Item label="是否有拍照">{result.license ? '有' : '暂无'}</Descriptions.Item>
                </Descriptions>
                <div>
                    <h3>车辆外观图片</h3>
                    <RcViewer options = {{
                        url : (image)=>{
                            return image.src.replace('carimages_small', 'carimages');
                        }
                    }}>
                        {
                            result.images.view.map((item)=> {
                                return <img
                                    style={{'marginRight': 10, 'cursor': 'pointer'}}
                                    key={item}
                                    src={`http://aiqianduan.com:7897/images/carimages_small/${this.props.id}/view/${item}`}/>;
                            })
                        }
                    </RcViewer>
                </div>
                <div>
                    <h3>车辆内饰图片</h3>
                    <RcViewer options = {{
                        url : (image)=>{
                            return image.src.replace('carimages_small', 'carimages');
                        }
                    }}>
                        {
                            result.images.inner.map((item)=> {
                                return <img
                                    style={{'marginRight': 10, 'cursor': 'pointer'}}
                                    key={item}
                                    src={`http://aiqianduan.com:7897/images/carimages_small/${this.props.id}/inner/${item}`}/>;
                            })
                        }
                    </RcViewer>
                </div>
            </LayoutSider>
        );
    }
}
