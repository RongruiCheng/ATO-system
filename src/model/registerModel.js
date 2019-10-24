import axios from 'axios';
export default {
    namespace : 'registerModel',
    state : {
        token : ''
    },
    reducers : {
        INITTOKEN (state, {token}) {
            return {
                ...state,
                token
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