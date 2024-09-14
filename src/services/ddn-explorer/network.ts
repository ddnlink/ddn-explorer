// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Get network information GET /api/network */
export async function getNetwork(options?: { [key: string]: any }) {
  return request<API.NetworkResponse>('/api/network', {
    method: 'GET',
    ...(options || {}),
  });
}
