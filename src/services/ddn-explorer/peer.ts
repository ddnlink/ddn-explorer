// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取节点列表 获取系统中的节点列表 GET /api/peers */
export async function getPeersList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPeersListParams,
  options?: { [key: string]: any },
) {
  return request<API.PeersListResponse>('/api/peers', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
