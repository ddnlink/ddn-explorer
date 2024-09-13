// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取受托人列表 获取系统中的受托人列表 GET /api/delegates */
export async function getDelegatesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDelegatesListParams,
  options?: { [key: string]: any },
) {
  return request<API.DelegateList>('/api/delegates', {
    method: 'GET',
    params: {
      // limit has a default value: 20
      limit: '20',
      // orderBy has a default value: rate:asc
      orderBy: 'rate:asc',
      ...params,
    },
    ...(options || {}),
  });
}
