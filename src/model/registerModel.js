import axios from 'axios';
export default {
    namespace : 'registerModel',
    state : {
        token : '',
        step : 1
    },
    reducers : {
        INITTOKEN (state, {token}) {
            return {
                ...state,
                token
            };
        },
        CHANGESTEPS (state, {step}) {
            return {
                ...state,
                step
            };
        }
    },
    effects : {
        *SENDMESG ({phoneNumber}, {put}) {
            const token = yield axios.get('http://192.168.2.250:8494/sendmsg.php?phone=' + phoneNumber).then(data=>data.data);
            yield put({'type':'INITTOKEN', token});
        }
    }
};