import React, {Component} from 'react';
import {Result, Button} from 'antd';

export default class ShowResults extends Component {
    render () {
        return (
            <div>
                <Result
                    status="success"
                    title="恭喜完成提交注册!"
                    subTitle="点击按钮进入首页"
                    extra={[
                        <Button key='backTo'>
                            返回
                        </Button>,
                        <Button type="primary" key='goIndex'>去首页</Button>
                    ]}
                />
            </div>
        );
    }
}
