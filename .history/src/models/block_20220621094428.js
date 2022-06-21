import { queryBlocks,  queryAccountSum } from '../services/api'

export default {
    namespace: 'block',

    state: {
        data: {               //最近剩余
            latestBlocks: {},  
            pagination: {},
        },
        account: 0            //账户总数
    },
    effects: {
        *getBlocksList({ payload, callback }, { call, put }) {
            const response = yield call(queryBlocks, payload);
            if (response.success === true) {
                yield put({
                    type: 'blocksState',
                    payload: {
                        data: {
                            latestBlocks: response,
                            pagination: { current: payload.current, total: response.count ? response.count : 100, pageSize: 10 }
                        }
                    },
                });
            } else {
            }
            callback(response)

        },
   
        *queryAccountSum({ payload, callback }, { call, put }) {
            const response = yield call(queryAccountSum, payload);
            console.log('the stuats result', response)
            if (response.success === true) {
                yield put({
                    type: 'blocksAccount',
                    payload: {
                        account: response.count
                    },
                });
            } else {
            }
            callback(response)

            // * redirect({ payload }, { put }) {
            //     yield put(routerRedux.push(`/userCenter/${payload.uuid}`));
            // },
        },
    },

    reducers: {
        blocksState(state, { payload }) {
            return {
                ...state,
                data: payload.data
            };
        },
   
        blocksAccount(state, { payload }) {
            return {
                ...state,
                account: payload.account
            };
        },
    },
}