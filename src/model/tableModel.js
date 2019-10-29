import axios from 'axios';
import _ from 'lodash';
import querystring from 'querystring';
export default {
    namespace : 'tableModel',
    state : {
        //本地存储中的表格标题数组
        columnsArr: [],
        dataSource: [],
        //分页条
        total: 0,
        current: 1,
        pageSize: 10,
        //筛选数据
        color:[],
        fuel : [],
        buyDate : [],
        //品牌+车系
        allBS : {},
        brand : '',
        series : '',
        price : [],
        km : []
    },
    reducers : {
        //设置表格标题数组
        SETCOLUMNSFORMLOCALSTORAGE (state, {columnsArr}) {
            return {
                ...state,
                columnsArr
            };
        },
        //设置表格dataSource
        INITDATASOURCE (state, {dataSource, total}) {
            return {
                ...state,
                dataSource,
                total
            };
        },
        FILTEROPTION (state, {k, v}) {
            return {
                ...state,
                [k] : v
            };
        },
        SETBSDATA (state, {allBS}) {
            return {
                ...state,
                allBS
            };
        }
    },
    effects : {
        //读取用户本地存储
        *GETCOLUMNSDATAFROMLOCALSTORAGE (action, {put}) {
            const localData = localStorage.getItem('columns');
            if (localData === null) {
                //如果用户本地存储中没有表格标题的信息,就设置一个默认信息
                localStorage.setItem('columns', JSON.stringify(['id', 'image', 'price', 'color', 'brand']));
            }
            //重新读取
            const columnsArr = JSON.parse(localStorage.getItem('columns'));
            //同步action
            yield put({'type': 'SETCOLUMNSFORMLOCALSTORAGE', columnsArr});
        },
        //重置本地存储
        *RESETCOLUMNSFROMUSER ({columnsArr}, {put}) {
            localStorage.setItem('columns', JSON.stringify(columnsArr));
            //重新读取本地存储
            yield put({'type': 'GETCOLUMNSDATAFROMLOCALSTORAGE'});
        },
        //拉数据
        *INITDATA (state, {put, select}) {
            const {color, fuel, buyDate, brand, series, price} = yield select(({tableModel})=> tableModel);
            const {results, total} = yield axios.get(
                '/api/car?' + querystring.stringify({
                    'color': color.join('v'),
                    'fuel' : fuel.join('v'),
                    'buydate': buyDate.join('to'),
                    'price' : price.join('to'),
                    brand,
                    series
                })
            ).then(data=> data.data);
            yield put({'type': 'INITDATASOURCE', 'dataSource': results, total});
        },
        //筛选条件(抽象出来公用一个)
        *ASYNCFILTEROPTION ({k, v}, {put}) {
            //如果关闭品牌Tag标签,也要清空车系
            if (k === 'brand') {
                yield put({'type': 'FILTEROPTION', 'k':'series', 'v': ''});
            }
            yield put({'type': 'FILTEROPTION', k, v});
            yield put({'type': 'INITDATA'});
        },
        //拉取数据
        *FETCHBSDATA (action, {put}) {
            const allBS = yield axios.get('/api/allbs').then(data=>data.data);
            yield put({'type': 'SETBSDATA', allBS});
        }
    }
};