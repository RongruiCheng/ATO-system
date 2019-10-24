import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
const {Header} = Layout;
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import './LayoutTop.less';

@connect(({routing})=>({
    routing
}))
export default class LayoutTop extends Component {
    constructor () {
        super();
    }
    render () {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        tyle={{lineHeight: '104px'}}
                        onSelect={({key})=>{
                            if (key === 'purchase') {
                                this.props.dispatch(routerRedux.push('/purchase/car'));
                            } else if (key === 'register') {
                                this.props.dispatch(routerRedux.push('/user/register'));
                            }
                        }}
                    >
                        <Menu.Item key="register">注册</Menu.Item>
                        <Menu.Item key="purchase">买车</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    {this.props.children}
                </Layout>
            </Layout>
        );
    }
}
