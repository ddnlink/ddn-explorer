// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取最新交易 获取系统中的最新交易列表 GET /api/transactions */
export async function getLatestTrans(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLatestTransParams,
  options?: { [key: string]: any },
) {
  return request<API.TransactionListResponse>('/api/transactions', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取交易详情 GET /api/transactions/get */
export async function getTransactionDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTransactionDetailParams,
  options?: { [key: string]: any },
) {
  return request<API.TransactionDetailResponse>('/api/transactions/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
