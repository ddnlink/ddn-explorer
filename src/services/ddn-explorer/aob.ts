// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取AOB列表 获取系统中的AOB（资产）列表 GET /api/aob/assets */
export async function getAobsList(options?: { [key: string]: any }) {
  return request<API.AobListResponse>('/api/aob/assets', {
    method: 'GET',
    ...(options || {}),
  });
}
