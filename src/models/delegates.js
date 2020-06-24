import { queryDelegates } from '../services/api'


export default {
    namespace: 'delegatesModel',

    state: {
        delegatesList: {
            delegates: {},
            pagination: {}
        },
    },

    effects: {
    
        *getDelegates({ payload, callback }, { call, put }) {
            const response = yield call(queryDelegates, payload)
            // console.log('委托人列表', response.totalCount)
            if (response.success === true) {
                yield put({
                    type: 'delegates',
                    payload: {
                        data: {
                            delegates: response,
                            pagination: { current: payload.current, total: response.totalCount ? response.totalCount : 100, pageSize: 10 }
                        }
                    },
                });
            }
            callback(response)
        },
       
    },

    reducers: {
     
        delegates(state, { payload }) {
            return {
                ...state,
                delegatesList: payload.data
            }
        },
    
    }
}
