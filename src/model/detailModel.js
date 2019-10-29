import axios from 'axios';
export default {
    namespace: 'detailModel',
    state: {
        id : 0,
        result : {}
    },
    reducers: {
        INIT (state, {id, result}) {
            return {
                ...state,
                id,
                result
            };
        }
    },
    effects: {
        *INITDETAIL ({id}, {put}) {
            //拉取车辆详情数据
            const {result} = yield axios.get('/api/car/' + id).then(data=>data.data);
            yield put({'type': 'INIT', id, result});
        }
    }
};