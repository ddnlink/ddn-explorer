import { stringify } from 'qs';
import request from '../utils/request';

// ------------------------- POST  -------------------
// export async function postAccountLogin(params) {
//   return request('/api/user/login', {
//     method: 'POST',
//     body: params,
//   });
// }

// ------------------------- Query  -------------------
// // 获取所有应用列表
// export async function queryApps(params) {
//   return request(`/api/app/getListAndCount`);
// }/api/peers
// ------------------------- Global  -------------------

/**获取节点列表 */
export async function queryPeersList(params) {
  return request(`/api/peers?${stringify(params)}`);
}

/**获取委托人的列表 */
export async function queryDelegates(params) {
  return request(`/api/delegates?${stringify(params)}`);
}
/**获取存证列表 */
export async function queryEvidence(params) {
  return request(`/api/evidence/list/?${stringify(params)}`);
}

/**获取节点信息 */
export async function queryPeerInfo(params) {
  return request(`/api/network${params}`);
}

// ------------------------- Blocks  -------------------

/**获取区块状态 */
export async function queryStatus(params) {
  return request(`/api/blocks/getStatus`);
}
/**获取区块总数*/
export async function queryAccountSum(params) {
  return request(`/api/accounts/count`);
}
/**获取最近区块列表 */
export async function queryBlocks(params) {
  return request(`/api/blocks?${stringify(params)}`);
}

// ------------------------- Transactions  -------------------
/**获取最近交易列表 */
export async function queryTransactions(params) {
  return request(`/api/transactions?${stringify(params)}`);
}

/**根据用户获取交易列表 */
export async function queryTransactionsByUser(params) {
  return request(`/api/getTransactionsByUser?${stringify(params)}`);
}

/**根据用户地址获取交易列表 */
export async function queryTransactionsByMy(params) {
  const query = params.query
  return request(`/api/aob/transactions/my/${params.address}/${params.currency}?${stringify(query)}`);
}

/**获取单个交易的详细信息 */
export async function queryTransactionsGet(params) {
  return request(`/api/transactions/get?${stringify(params)}`);
}
/**获取账户信息 */
export async function queryAccountDetail(params) {
  return request(`/api/accounts?${stringify(params)}`);
}

/**获取asset资产 */
export async function queryAsset(params) {
  console.log('这是地址', params.address)
  return request(`/api/aob/balances/${params.address}`);
}

/**获取账户列表 */
export async function queryAccountsList(params) {
  return request(`/api/accounts/top?${stringify(params)}`);
}

/**获取一周内的交易记录 */
export async function queryAweekTran(params) {
  return request(`/api/transactions/spell?${stringify(params)}`);
}
