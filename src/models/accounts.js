
import {
    queryAccountDetail,
    queryAsset,
    queryTransactionsByUser,
    queryTransactionsByMy,
    queryAccountsList,
} from '../services/api'


export default {
    namespace: 'accounts',

    state: {
       
        accountDetail: {},   //账户详情
        assets: [],          //资产证书
        accountList: {       //账户列表
            account: {},
            pagination: {}
        },      //一周内交易量
       

    },
    effects: {
      
        *getTransByUser({ payload, callback }, { call, put }) {
            const response = yield call(queryTransactionsByUser, payload);
            if (response.success === true) {
                yield put({
                    type: 'transactions',
                    payload: {
                        latestTrans: {
                            latestTrans: response,
                            pagination: { current: payload.current, total: response.count ? response.count : 100, pageSize: 10 }
                        },
                    }
                });
            } else {
            }
            callback(response)
        },
        *getTransByMyAddress({ payload, callback }, { call, put }) {
            const response = yield call(queryTransactionsByMy, payload);
            if (response.success === true) {
                let transactions = []
                if (payload.role === "sender") {
                    transactions = response.transactions.filter(item => item.senderId === payload.address)
                } else if (payload.role === "recipient") {
                    transactions = response.transactions.filter(item => item.recipientId === payload.address)
                } else if (payload.role === "all") {
                    transactions = response.transactions
                }
                response.transactions = transactions
                yield put({
                    type: 'transactions',
                    payload: {
                        latestTrans: {
                            latestTrans: response,
                            pagination: { current: payload.current, total: response.count ? response.count : 100, pageSize: 10 }
                        },
                    }
                });
            } else {
            }
            callback(response)
        },
      
        *getAccountDetail({ payload, callback }, { call, put }) {
            console.log('ddddddddddddddd', payload)
            const response = yield call(queryAccountDetail, payload);
            console.log('1111111111', response)
            if (response.success === true) {
                yield put({
                    type: 'accountDetail',
                    payload: {
                        accountDetail: response
                    }
                });
            } else {
            }
            callback(response)
        },
        *getAsset({ payload, callback }, { call, put }) {
            console.log('ddddddddddddddd333', payload)
            const response = yield call(queryAsset, payload);
            console.log('111111111112222', response, typeof response)
            if (response.success === true) {
                yield put({
                    type: 'asset',
                    payload: {
                        asset: response.balances
                    }
                });
            } else {
            }
            callback(response)
        },

        *getAccountList({ payload, callback }, { call, put }) {
            console.log('获取账户列表', payload)
            const response = yield call(queryAccountsList, payload);
            if (response.success === true) {
                yield put({
                    type: 'accountList',
                    payload: {
                        data: {
                            account: response,
                            pagination: { current: payload.current, total: response.count ? response.count : 100, pageSize: 20 }
                        }
                    }
                });
            } else {
            }
            callback(response)
        },
      
    },
    reducers: {
 
        accountDetail(state, { payload }) {
            return {
                ...state,
                accountDetail: payload.accountDetail
            };
        },
        asset(state, { payload }) {
            return {
                ...state,
                assets: payload.asset
            };
        },
        accountList(state, { payload }) {
            return {
                ...state,
                accountList: payload.data
            };
        },
      
        },
    
}
