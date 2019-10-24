import React, {Component} from 'react';
import {sortable} from 'react-sortable';
import {Icon} from 'antd';
@sortable
export default class SortableTitle extends Component {
    constructor (props) {
        super();
    }
    render () {
        return (
            <div>
                <style>{`
                    .wrapTitles div{
                        margin-bottom:20px;
                    }
                    .titles{
                        float:left;
                        width:80px;
                        height:30px;
                        border:1px solid #1890ff;
                        flex:1;
                        font-size:16px;
                        line-height:30px;
                        text-align:center;
                        cursor:move;
                        margin-right:20px;
                        border-radius:3px;
                        position:relative;
                    }
                    .titles:hover{
                        background-color : #1890ff;
                    }
                    .delIcon{
                        position:absolute;
                        top:-20%;
                        right:-10%;
                    }
                `}</style>
                <div className='titles' {...this.props}>
                    {this.props.title}
                    <Icon
                        type="close-circle"
                        theme="twoTone"
                        className='delIcon'
                        onClick={_=> {
                            this.props.delTitle(this.props.title_en);
                        }}
                    />
                </div>
            </div>
        );
    }
}
