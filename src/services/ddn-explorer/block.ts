// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取区块列表 获取规则列表 GET /api/blocks */
export async function getBlocksList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBlocksListParams,
  options?: { [key: string]: any },
) {
  return request<API.BlockList>('/api/blocks', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取指定区块的详细信息 根据区块ID或高度获取区块的详细信息,包括交易信息 GET /api/blocks/full */
export async function getBlockByIdOrHeight(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBlockByIdOrHeightParams,
  options?: { [key: string]: any },
) {
  return request<API.BlockResponse>('/api/blocks/full', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取系统状态 获取当前系统的状态信息 GET /api/blocks/getStatus */
export async function getStatus(options?: { [key: string]: any }) {
  return request<API.StatusResponse>('/api/blocks/getStatus', {
    method: 'GET',
    ...(options || {}),
  });
}
