// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取账户详情 GET /api/accounts */
export async function getAccountDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountDetailParams,
  options?: { [key: string]: any },
) {
  return request<API.AccountDetailResponse>('/api/accounts', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询账户总数 获取系统中的账户总数 GET /api/accounts/count */
export async function getAccountSum(options?: { [key: string]: any }) {
  return request<API.AccountSumResponse>('/api/accounts/count', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取账户列表 获取系统中的账户列表,默认按余额排序 GET /api/accounts/top */
export async function getAccountList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountListParams,
  options?: { [key: string]: any },
) {
  return request<API.AccountList>('/api/accounts/top', {
    method: 'GET',
    params: {
      // limit has a default value: 20
      limit: '20',
      // orderBy has a default value: balance:desc
      orderBy: 'balance:desc',
      ...params,
    },
    ...(options || {}),
  });
}
