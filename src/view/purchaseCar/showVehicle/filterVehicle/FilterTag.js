import React, {Component} from 'react';
import {connect} from 'dva';
import {Tag} from 'antd';
import moment from 'moment';

@connect(({tableModel})=>({
    ...tableModel
}))
export default class FilterTag extends Component {
    constructor () {
        super();
    }
    showTags (category) {
        let v = null;
        switch (category.k) {
        case 'color':
        case 'fuel':
            v = this.props[category.k].join('或');
            break;
        case 'buyDate':
            v = this.props[category.k].map(item => moment(item).format('YYYY年MM月DD日')).join('到');
            break;
        case 'brand':
        case 'series':
            v = this.props[category.k];
            break;
        case 'price' :
        case 'km' :
            v = this.props[category.k].map(c => c + '万元').join('到');
            break;
        default:
            break;
        }
        //tag show or hidden
        if (this.props[category.k].length === 0) {
            return null;
        } else {
            return <Tag
                key={category.k}
                closable
                onClose={_=> {
                    if (category.k === 'brand' || category.k === 'series') {
                        //如果关闭的是品牌或车系标签,那么reducer state 值重新归于空字符串
                        this.props.dispatch({'type': 'tableModel/ASYNCFILTEROPTION', 'k': category.k, 'v': ''});
                        return;
                    }
                    this.props.dispatch({'type': 'tableModel/ASYNCFILTEROPTION', 'k': category.k, 'v': []});
                }}
            >{category.c}:{v}</Tag>;
        }
    }
    render () {
        return (
            <div>
                {
                    [
                        {'k' : 'color', 'c' : '颜色'},
                        {'k' : 'fuel', 'c' : '燃油类型'},
                        {'k' : 'buyDate', 'c' : '购买日期'},
                        {'k' : 'brand', 'c' : '品牌'},
                        {'k' : 'series', 'c' : '车系'},
                        {'k' : 'price', 'c' : '价格'},
                        {'k' : 'km', 'c' : '公里数'}
                    ].map(category => this.showTags(category))
                }
            </div>
        );
    }
}
