import { queryStatus, queryPeerInfo } from '../services/api'


export default {
    namespace: 'global',

    state: {
        status: {},
        selectId: '1',
        peerInfo:{},
    },

    effects: {
        *getStatus({ payload, callback }, { call, put }) {
            const response = yield call(queryStatus, payload);
            console.log('the stuats result**************', response)
            if (response.success === true) {
                yield put({
                    type: 'Status',
                    payload: {
                        status: response
                    },
                });
            } else {
            }
            callback(response)
        },
        *getPeerInfo({ payload, callback }, { call, put }) {
            const response = yield call(queryPeerInfo, payload);
            console.log('the stuats result**************', response)
            if (response.success === true) {
                yield put({
                    type: 'peer',
                    payload: {
                        peerInfo: response
                    },
                });
            } else {
            }
            callback(response)
        },

    },

    reducers: {

        selectedMenu(state, { payload }) {
            console.log('palyod*************', payload)
            return {
                ...state,
                selectId: payload.id
            }
        },
        Status(state, { payload }) {
            return {
                ...state,
                status: payload.status
            };
        },
        peer(state, { payload }) {
            return {
                ...state,
                status: payload.peerInfo
            };
        },
    }
}
