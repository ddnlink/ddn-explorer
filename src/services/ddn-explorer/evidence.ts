// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Get certificate information GET /api/evidence/certificate */
export async function getCertificate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCertificateParams,
  options?: { [key: string]: any },
) {
  return request<API.CertificateResponse>('/api/evidence/certificate', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取所有证据列表 获取系统中所有的证据列表 GET /api/evidences/all */
export async function getEvidenceList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEvidenceListParams,
  options?: { [key: string]: any },
) {
  return request<API.EvidenceList>('/api/evidences/all', {
    method: 'GET',
    params: {
      // limit has a default value: 20
      // limit: '20',
      // // orderBy has a default value: timestamp:desc
      // orderBy: 'timestamp:desc',
      // ...params,
    },
    ...(options || {}),
  });
}
