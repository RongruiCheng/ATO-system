import React, {Component} from 'react';
import {Table, Icon, Modal} from 'antd';
import {connect} from 'dva';
import columnsMap from './columnsMap.js';
import ModalContent from './modal/ModalContent.js';
import FilterVehicle from './filterVehicle/FilterVehicle.js';
import './showVehicle.less';
import LayoutSider from '../../../layout/LayoutSider.js';

@connect(({tableModel})=> ({
    ...tableModel
}))
export default class ShowVehicle extends Component {
    constructor () {
        super();
        this.state = {
            adjustTitleModal : false
        };
    }
    componentWillMount () {
        //在reducer中初始化用户本地存储(表格标题)
        this.props.dispatch({'type': 'tableModel/GETCOLUMNSDATAFROMLOCALSTORAGE'});
        //拉取数据
        this.props.dispatch({'type': 'tableModel/INITDATA'});
    }
    //模态框隐藏事件(下传子组件,因为local state 存储切换模态框的状态)
    cancelHandler () {
        this.setState({
            adjustTitleModal : false
        });
    }
    //模态框确认按钮
    okHandeler (columnsArr) {
        this.props.dispatch({'type': 'tableModel/RESETCOLUMNSFROMUSER', columnsArr});
        this.setState({
            adjustTitleModal : false
        });
    }
    render () {
        return (
            <LayoutSider className='wrap'>
                <FilterVehicle/>
                <h4>共有{this.props.total}条结果:</h4>
                <div className='icon'>
                    <Icon
                        type="setting"
                        theme="twoTone"
                        className='setting'
                        onClick={_=> {
                            this.setState({
                                adjustTitleModal : true
                            });
                        }}
                    />
                </div>
                <div>
                    <Table
                        rowKey='id'
                        columns={
                            this.props.columnsArr.map((item)=> {
                                return {
                                    'key': item,
                                    'dataIndex': item,
                                    'align': 'center',
                                    ...columnsMap[item]
                                };
                            })
                        }
                        dataSource={this.props.dataSource}
                        pagination={{
                            'current': this.props.current,
                            'total': this.props.total,
                            'pageSize': this.props.pageSize,
                            'showSizeChanger':true,
                            'onShowSizeChange':(current, pageSize)=> {
                                this.props.dispatch({'type': 'tableModel/CHANGEPAGESIZE', pageSize});
                            }
                        }}
                    />
                </div>
                <div>
                    <Modal
                        title='自定义筛选标题'
                        visible={this.state.adjustTitleModal}
                        width={800}
                        onCancel={_=> {
                            this.setState({
                                adjustTitleModal : false
                            });
                        }}
                        onOk={_=> {
                            //被装饰器装饰的组件不能通过ref钩子拿到子组件的state数据了
                            //this.refs.modalCon为{}空对象,解决:在子组件做点击按钮
                            // console.log(this.refs.modalCon);
                        }}
                        footer={null}
                    >
                        <ModalContent
                            ref = 'modalCon'
                            cancelHandler={this.cancelHandler.bind(this)}
                            okHandeler={this.okHandeler.bind(this)}
                        />
                    </Modal>
                </div>
            </LayoutSider>
        );
    }
}
