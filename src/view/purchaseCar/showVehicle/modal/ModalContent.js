import React, {Component} from 'react';
import {connect} from 'dva';
import _ from 'lodash';
import {Icon, Button} from 'antd';
import SortableTitle from './SortableTitle.js';
import columnsMap from '../columnsMap.js';
import './modalContent.less';

@connect(({tableModel})=> ({
    ...tableModel
}))
export default class ModalContent extends Component {
    constructor (props) {
        super();
        //props只读,用state过继处理修改业务
        this.state = {
            columnsArr: props.columnsArr.concat(),
            //备选title
            theRestArr: _.difference(Object.keys(columnsMap), props.columnsArr)
        };
    }
    //删除标题--下传子组件
    delTitle (title) {
        this.setState({
            columnsArr : this.state.columnsArr.filter(_title=> _title !== title),
            theRestArr : [...this.state.theRestArr, title]
        });
    }
    //增加显示标题
    addTitle (title) {
        this.setState({
            columnsArr: [...this.state.columnsArr, title],
            theRestArr: this.state.theRestArr.filter(_title=> _title !== title)
        });
    }
    render () {
        return (
            <div className='wrapTitles'>
                <div>
                    <h4>当前为您展示的列(可以拖拽排序):</h4>
                </div>
                <div>
                    {
                        this.state.columnsArr.map((item, index)=> {
                            return <SortableTitle
                                key={index}
                                onSortItems={(columnsArr)=> {
                                    this.setState({
                                        columnsArr
                                    });
                                }}
                                items={this.state.columnsArr}
                                sortId={index}
                                title={columnsMap[item].title}
                                title_en={item}
                                delTitle={this.delTitle.bind(this)}
                            >
                            </SortableTitle>;
                        })
                    }
                </div>
                <div style={{'clear': 'both'}}>
                    <h4>当前为您准备的备选列(点击可添加到展示列中):</h4>
                </div>
                <div>
                    {
                        this.state.theRestArr.map((ops)=> {
                            return <span
                                key={ops}
                                className='restOps'
                            >
                                {columnsMap[ops].title}
                                <Icon
                                    type="plus-square"
                                    theme="twoTone"
                                    className='addIcon'
                                    onClick={_=> {
                                        this.addTitle(ops);
                                    }}
                                />
                            </span>;
                        })
                    }
                </div>
                <div style={{'clear': 'both'}}></div>
                <hr/>
                <div className='btns'>
                    <Button
                        className='btn'
                        onClick={_=> {
                            this.props.cancelHandler();
                        }}
                    >取消</Button>
                    <Button
                        className='btn'
                        type='primary'
                        onClick={_=> {
                            this.props.okHandeler(this.state.columnsArr);
                        }}
                    >确认</Button>
                </div>
                <div style={{'clear': 'both'}}></div>
            </div>
        );
    }
}
