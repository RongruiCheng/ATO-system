import React from 'react';
import moment from 'moment';
import {Link} from 'dva/router';
export default {
    'id' : {
        'title' : '编号'
    },
    'brand' : {
        'title' : '品牌'
    },
    'series' : {
        'title' : '车系'
    },
    'color' : {
        'title' : '颜色'
    },
    'price' : {
        'title' : '价格'
    },
    'km' : {
        'title' : '公里数',
        'render':(text) => {
            return <div>
                {text.toString().replace(/\B(?=(...)+$)/g, ',')}
            </div>;
        }
    },
    'engine' : {
        'title' : '引擎油量'
    },
    'buydate' : {
        'title' : '购买日期',
        'render':(text)=> {
            return <div>
                {moment(text).format('YYYY年MM月DD日')}
            </div>;
        }
    },
    'exhaust' : {
        'title' : '尾气'
    },
    'gearbox' : {
        'title' : '变速箱'
    },
    'fuel' : {
        'title' : '燃油类型'
    },
    'image' : {
        'title' : '图片',
        'render': (text, {id, img})=> {
            return <div>
                <Link to={`/purchase/car/${id}`}>
                    <img
                        src={`/api/images/carimages_small/${id}/view/${text}`}
                    />
                </Link>
            </div>;
        }
    }
};