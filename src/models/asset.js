
import {
    // queryEvidenceList,
    queryEvidenceCert,
} from '../services/api'
const DefaultCert = {
    "transaction_id": "b879c99732343aa351efdcb68cd6821645edd0056933093ca09d1f8a3252b024",
    "address": 'TFRDKQYukVYiMqE5c3fFvqvqd27Yv4Thhj',
    "transaction_type": 71,
    "timestamp": 31848676,
    "hash": "fe20add6df0607edd7be6a623a3b2e1c",
    "type": "html",
    "tags": "test, article",
    "url": "dat://helloworld/index.html",
    "message": "TEST",
    "extend": ""
}
const DefaultEvidence = {
    "evidenceList": [
        {
            "transaction_id": "b879c99732343aa351efdcb68cd6821645edd0056933093ca09d1f8a3252b024",
            "address": 'TFRDKQYukVYiMqE5c3fFvqvqd27Yv4Thhj',
            "transaction_type": 71,
            "timestamp": 31848676,
            "hash": "fe20add6df0607edd7be6a623a3b2e1c",
            "type": "html",
            "tags": "test, article",
            "url": "dat://helloworld/index.html",
            "message": "TEST",
            "extend": ""
        }, {
            "transaction_id": "b879c99732343aa351efdcb68cd6821645edd0056933093ca09d1f8a3252b025",
            "address": 'TFRDKQYukVYiMqE5c3fFvqvqd27Yv4Thhj',
            "transaction_type": 71,
            "timestamp": 31848676,
            "hash": "fe20add6df0607edd7be6a623a3b2e1c",
            "type": "html",
            "tags": "test, article",
            "url": "dat://helloworld/index.html",
            "message": "TEST",
            "extend": ""
        }, {
            "transaction_id": "b879c99732343aa351efdcb68cd6821645edd0056933093ca09d1f8a3252b026",
            "address": 'TFRDKQYukVYiMqE5c3fFvqvqd27Yv4Thhj',
            "transaction_type": 71,
            "timestamp": 31848676,
            "hash": "fe20add6df0607edd7be6a623a3b2e1c",
            "type": "html",
            "tags": "test, article",
            "url": "dat://helloworld/index.html",
            "message": "TEST",
            "extend": ""
        }, {
            "transaction_id": "b879c99732343aa351efdcb68cd6821645edd0056933093ca09d1f8a3252b027",
            "address": 'TFRDKQYukVYiMqE5c3fFvqvqd27Yv4Thhj',
            "transaction_type": 71,
            "timestamp": 31848676,
            "hash": "fe20add6df0607edd7be6a623a3b2e1c",
            "type": "html",
            "tags": "test, article",
            "url": "dat://helloworld/index.html",
            "message": "TEST",
            "extend": ""
        }, {
            "transaction_id": "b879c99732343aa351efdcb68cd6821645edd0056933093ca09d1f8a3252b028",
            "address": 'TFRDKQYukVYiMqE5c3fFvqvqd27Yv4Thhj',
            "transaction_type": 71,
            "timestamp": 31848676,
            "hash": "fe20add6df0607edd7be6a623a3b2e1c",
            "type": "html",
            "tags": "test, article",
            "url": "dat://helloworld/index.html",
            "message": "TEST",
            "extend": ""
        }
    ],
    "pagenation": {
        "total": 5
    }
}
export default {
    namespace: 'assert',
    state: {
        evidenceListData: {      //资产列表
            evidenceList: [],
            pagination: {
            },
        },
        certificate:{},
    },
    effects: {
        /**获取资产列表 */
        *getEvidenceList({ payload, callback }, { call, put }) {
            console.log('获取交易类型占比', payload)
            // const response = yield call(queryEvidenceList, payload);
            // if (response.success === true && response.data.total > 0) {
            //     yield put({
            //         type: 'evidenceList',
            //         payload: {
            //             evidenceData: {
            //                 evidenceList: response.data.rows,
            //                 pagination: {
            //                     current: payload.current,
            //                     total: response.data.total
            //                 }
            //             },
            //         }
            //     });
            // } else {
                console.log("add DefaultEvidence")
                yield put({
                    type: 'evidenceList',
                    payload: {
                        evidenceData: DefaultEvidence,
                    }
                });
            // }
            // callback(response)
        },
        *getCertificate({ payload, callback }, { call, put }) {
            const response = yield call(queryEvidenceCert, payload.hash)
            if (response.success === true && response.data) {
                yield put({
                    type: 'certificate',
                    payload: {
                        certificate: response.data
                    },
                });
            } else {
                yield put({
                    type: 'certificate',
                    payload: {
                        certificate: DefaultCert
                    },
                });
            }
            callback(response)
        }
    },
    reducers: {
        evidenceList(state, { payload }) {
            return {
                ...state,
                evidenceListData: payload.evidenceData
            };
        },
        certificate(state, { payload }) {
            return {
                ...state,
                certificate: payload.certificate
            }
        },

    },
}
