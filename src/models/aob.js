import { queryAobs } from '../services/api';

export default {
    namespace: 'aob',

    state: {
        data: {
            lastestAobs: {},
            pagination: {}
        }
    },
    effect: {
        *getAobsList({ payload, callback }, { call, put }) {
            const response = yield call(queryAobs, payload);
            console.log('获取成功，response的值：', response);
            if (response.success === true) {
                yield put(
                    {
                        type: 'aobsState',
                        payload: {
                            lastestAobs: response,
                            pagination: { current: response.current, total: response.counts ? response.counts : 100, pageSize: 10 }
                        }
                    }
                );

            } else {
                console.log("获取失败，response的值：",{ response });
            }
            callback(response);
        }
    },

    reducers: {
        aobsState(state, { payload }) {
            return {
                ...state,
                data: payload.data
            }
        },
        aobsAccount(state, { payload }) {
            return {
                ...state,
                account: payload.account
            };
        }
    }
}