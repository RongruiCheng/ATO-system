import React, {Component} from 'react';
import {connect} from 'dva';
import FilterOption from './FilterOption.js';
import FilterTag from './FilterTag.js';
import FilterDate from './FilterDate.js';
import FilterBS from './FilterBS.js';
import FilterSlider from './FilterSlider.js';

@connect(({tableModel})=> ({
    ...tableModel
}))
export default class FilterVehicle extends Component {
    render () {
        return (
            <div className='filterbox'>
                <style>{`
                    .filterbox div{
                        margin-bottom:4px;
                    }
                `}</style>
                <div>
                    <FilterTag/>
                </div>
                <hr/>
                <div>
                    <FilterBS/>
                </div>
                <div>
                    <FilterOption
                        k='color'
                        options={['红', '橙', '黄', '绿', '蓝', '黑', '白', '灰', '香槟']}
                    />
                    <FilterOption
                        k='fuel'
                        options={['汽油', '柴油', '油电混合', '纯电动']}
                    />
                </div>
                <div>
                    <FilterDate/>
                </div>
                <div>
                    <FilterSlider/>
                </div>
            </div>
        );
    }
}
