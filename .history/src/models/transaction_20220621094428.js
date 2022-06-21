
import {
    queryAweekTran,
    queryTransactions,
    queryTransactionsGet,
    queryTransactionsByUser,
    queryTransactionsByMy,
    queryPercentByType,
} from '../services/api'

const DefaultEvidence = {
  "evidenceList": [
      {
        "transaction_id": "b879c99732343aa351efdcb68cd6821645edd0056933093ca09d1f8a3252b024",
        "transaction_type": 71,
        "timestamp": 31848676,
        "hash": "fe20add6df0607edd7be6a623a3b2e1c",
        "type": "ba",
        "dia_id": "2f8e3833-a6e4-4a9a-8825-45fb7e5e23f0",
        "hcode": "124",
        "message": "",
        "extend": ""
      },{
        "transaction_id": "b879c99732343aa351efdcb68cd6821645edd0056933093ca09d1f8a3252b025",
        "transaction_type": 71,
        "timestamp": 31848676,
        "hash": "1dac7879074df80a71967243cf5601a9",
        "type": "ba",
        "dia_id": "ede69fe9-e98b-4ecf-8afd-41825b77e513",
        "hcode": "124",
        "message": "",
        "extend": ""
      },{
        "transaction_id": "b879c99732343aa351efdcb68cd6821645edd0056933093ca09d1f8a3252b026",
        "transaction_type": 71,
        "timestamp": 31848676,
        "hash": "d3e905fb95a035521bad4df4a2f28f97",
        "type": "ba",
        "dia_id": "434a5d8d-f0f3-4a8b-b06d-96859ffc68ec",
        "hcode": "124",
        "message": "",
        "extend": ""
    },{
        "transaction_id": "b879c99732343aa351efdcb68cd6821645edd0056933093ca09d1f8a3252b027",
        "transaction_type": 71,
        "timestamp": 31848676,
        "hash": "30dccda85246262a006408e2ea5c0501",
        "type": "dia",
        "dia_id": "db7a21dd-c2ae-49f1-9319-6e632409c32f",
        "hcode": "124",
        "message": "",
        "extend": ""
    },{
        "transaction_id": "b879c99732343aa351efdcb68cd6821645edd0056933093ca09d1f8a3252b028",
        "transaction_type": 71,
        "timestamp": 31848676,
        "hash": "a8a5007c242ca21022382b3bc188a7c3",
        "type": "dia",
        "dia_id": "e0f18e6e-afd5-4acd-92bc-8206c4538640",
        "hcode": "124",
        "message": "",
        "extend": ""
    }
  ],
  "pagenation": {
    "total": 5
  }
}
export default {
    namespace: 'transaction',

    state: {
        data: {              //最近剩余
            latestTrans: {},
            pagination: {}
        },                   //最近剩余
        oneTransDetail: {},  //剩余详情  
     
        PercentByType:[],     //存证类型占比
        curveData:[]  ,        //一周内剩余量
     

    },
    effects: {
        *getLatestTrans({ payload, callback }, { call, put }) {
            const response = yield call(queryTransactions, payload);
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
        *getOneTransDetail({ payload, callback }, { call, put }) {
            console.log('ddddddddddddddd')
            const response = yield call(queryTransactionsGet, payload);
            console.log('1111111111', response)
            if (response.success === true) {
                yield put({
                    type: 'oneTransactions',
                    payload: {
                        oneTransDetail: response
                    }
                });
            } else {
            }
            callback(response)
        },

        /**获取一周内剩余记录 */
        *getCurveData({ payload, callback }, { call, put }) {
            console.log('获取账户列表', payload)
            const response = yield call(queryAweekTran, payload);
            if (response.success === true) {
                yield put({
                    type: 'curveData',
                    payload: {
                        curveData: response.data
                    }
                });
            } else {
            }
            callback(response)
        },
        /**获取剩余类型占比 */
        *getPercentByType({ payload, callback }, { call, put }) {
            console.log('获取剩余类型占比', payload)
            const response = yield call(queryPercentByType, payload);
            if (response.success === true) {
                yield put({
                    type: 'PercentByType',
                    payload: {
                        PercentByType: response.data
                    }
                });
            } else {
            }
            callback(response)
        },
       

    },
    reducers: {
        transactions(state, { payload }) {
             return {
                ...state,
                data: payload.latestTrans
            };
        },
        oneTransactions(state, { payload }) {
            return {
                ...state,
                oneTransDetail: payload.oneTransDetail
            };
        },
       
       
      
        curveData(state, { payload }) {
            return {
                ...state,
                curveData: payload.curveData
            };
        },
        PercentByType(state, { payload }) {
            return {
                ...state,
                PercentByType: payload.PercentByType
            };
        },
     

    },
}
