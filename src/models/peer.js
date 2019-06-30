import { queryPeersList} from '../services/api'
export default {
    namespace: 'peers',

    state: {
        peersData: {
            peers: {},
            pagination: {}
        },
    },

    effects: {
        *getPeersList({ payload, callback }, { call, put }) {
            const response = yield call(queryPeersList, { ...payload})
            console.log(response)
            if (response.success === true) {
                yield put({
                    type: 'peers',
                    payload: {
                        data: {
                            peers: response,
                            pagination: { current: payload.current, total: response.totalCount ? response.count : 100, pageSize: 10 }
                        }
                    },
                });
            }
            callback(response)
        },
     
    },

    reducers: {
        peers(state, { payload }) {
            return {
                ...state,
                peersData: payload.data
            }
        },
       
    }
}
