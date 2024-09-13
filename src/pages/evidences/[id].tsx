/**
 * @file Assets.tsx
 * @description 资产证书展示组件
 * @copyright Copyright (c) 2023 DDN FOUNDATION
 * @license Licensed under the AGPL 3.0 License.
 * @author Imfly <kubying@qq.com>
 * @version 1.0.0
 * @created 2024-09-13
 * @last-modified 2024-09-13
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useIntl } from 'umi';
import { message } from 'antd';
import html2canvas from 'html2canvas';
import $ from 'jquery';
import dayjs from 'dayjs';
import QRCode from 'qrcode';
import { Link } from 'umi';
import services from '@/services/ddn-explorer';
import utils_slots from '@/utils/slots';
import styles from './Assets.less';
import i18n from '@/utils/i18n';

const getSizeStr = (size: number) => {
  if (size < 1024) return `${size}Bytes`;
  size /= 1024;
  if (size < 1024) return `${size.toFixed(0)} Kb`;
  size /= 1024;
  if (size < 1024) return `${size.toFixed(2)} Mb`;
  size /= 1024;
  if (size < 1024) return `${size.toFixed(2)} Gb`;
  size /= 1024;
  return `${size.toFixed(2)} Tb`;
};

const Assets: React.FC = () => {
  const [certificate, setCertificate] = useState<any>(null);
  const [address, setAddress] = useState('');

  const { id } = useParams<{ id: string }>();
  const intl = useIntl();

  const getCertificate = useCallback(async () => {
    try {
      const res = await services.evidence.getCertificate({ hash: id || '' });
      if (res.success) {
        setCertificate(res.data?.list?[0] || {});
        setAddress(res.data?.address || '');
        const qrUrl = `http://testnet.ddn.net/transactions/${res.data.list[0].transactionId}`;
        QRCode.toDataURL(qrUrl, (err, imgUrl) => {
          if (!err && document.getElementById('imgQrCode')) {
            (document.getElementById('imgQrCode') as HTMLImageElement).src = imgUrl;
          }
        });
      } else {
        message.error(res.error);
      }
    } catch (error) {
      console.error('Failed to fetch certificate:', error);
      message.error('Failed to fetch certificate');
    }
  }, [id]);

  useEffect(() => {
    getCertificate();
  }, [getCertificate]);

  const downloadCertImage = () => {
    window.pageYoffset = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    html2canvas(document.querySelector('#certInfo') as HTMLElement, {
      useCORS: true,
      logging: true,
      onrendered: (canvas) => {
        const url = canvas.toDataURL();
        const curDate = new Date();
        const fileName = `认证信息_${curDate.getFullYear()}-${String(curDate.getMonth() + 1).padStart(2, '0')}-${String(curDate.getDate()).padStart(2, '0')}-${String(curDate.getHours()).padStart(2, '0')}-${String(curDate.getMinutes()).padStart(2, '0')}-${String(curDate.getSeconds()).padStart(2, '0')}.png`;
        const triggerDownload = $('<a>').attr('href', url).attr('download', fileName).appendTo('body');
        triggerDownload[0].click();
        triggerDownload.remove();
      },
    });
  };

  if (!certificate) {
    return (
      <div style={{ textAlign: 'center', fontSize: '18px', paddingTop: '100px' }}>
        {intl.formatMessage({ id: 'assets.notExist' })}
        <a href="javascript:window.location.reload();">{intl.formatMessage({ id: 'assets.refresh' })}</a>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', height: '1020px', width: '100%' }}>
      <div style={{ top: '0', left: '0', right: '0', bottom: '0' }}>
        <div className={styles['detail-content']}>
          <div id="certInfo" className={styles['cert-info']} style={{ float: 'left' }}>
            <div className={styles['cert-item-lab']} style={{ marginTop: '260px' }}>
              {i18n.formatMessage({ id: 'assets.title' })}:
            </div>
            <div className={styles['cert-item-data']}>{certificate.title}</div>

            <div className={styles['cert-item-lab']}>
              {i18n.formatMessage({ id: 'assets.contentHash' })}:
            </div>
            <div className={styles['cert-item-data']}>{certificate.hash}</div>

            <div className={styles['cert-item-lab']}>
              {i18n.formatMessage({ id: 'assets.copyrightBelongs' })}:
            </div>
            <div className={styles['cert-item-data']}>{address}</div>
            <div className={styles['cert-item-lab']}>
              {i18n.formatMessage({ id: 'assets.size' })}:
            </div>
            <div className={styles['cert-item-data']}>{getSizeStr(certificate.size || 0)}</div>

            {/* <div className="cert-item-lab">发布时间:</div>
    <div className="cert-item-data">{timeStr}</div> */}

            <div style={{ paddingRight: '130px', marginTop: '30px' }}>
              <div style={{ float: 'left', paddingTop: '30px' }}>
                <div
                  className={styles['cert-item-lab']}
                  style={{ marginBottom: '15px', fontSize: '16px', color: '#666' }}
                >
                  {i18n.formatMessage({ id: 'assets.tags' })}:
                </div>
                <div
                  className={styles['cert-item-data']}
                  style={{ fontSize: '16px', fontFamily: 'arial' }}
                >
                  {certificate.tags}
                </div>
                {/* <div className="cert-item-lab" style={{marginBottom: '15px'}}>区块链网络高度 </div>
        <div className="cert-item-data">{certificate.blockHeight}</div> */}
              </div>
              {/* <QRCode
    value={window.location.host + '/assets/' + certificate.hash}
    style={{ float: 'right', width: '120px', height: '120px' }}
  ></QRCode> */}
              <img src={window.location.host + '/assets/' + certificate.hash} style={{ float: 'right', width: '120px', height: '120px' }} alt="" />

              {/* <img id="imgQrCode" s /> */}
            </div>

            <div style={{ clear: 'both', paddingTop: '40px', marginLeft: '98px' }}>
              <div style={{ margin: '20px 0' }}>
                <span className={styles['cert-item-lab inline-div']}>
                  {i18n.formatMessage({ id: 'assets.author' })}:
                </span>
                <span
                  className={styles['inline-div']}
                  style={{ marginLeft: '8px', color: '#666' }}
                >
                  {certificate.author}
                </span>
              </div>
              <div>
                <span className={styles['cert-item-lab inline-div']}>
                  {i18n.formatMessage({ id: 'assets.publishTime' })}:{' '}
                </span>
                <span
                  className={styles['inline-div']}
                  style={{ marginLeft: '8px', color: '#666' }}
                >
                  {/* {I18n.l(utils_slots.getRealTime(Number(certificate.timestamp)), { dateFormat: "date"})} */}
                  {dayjs(utils_slots.getRealTime(Number(certificate.timestamp))).format(
                    'YYYY-MM-DD HH:mm:ss',
                  )}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '100px', textAlign: 'center' }}>
              <div
                className={styles['cert-item-lab']}
                style={{ marginLeft: '0px', fontSize: '10px' }}
              >
                {i18n.formatMessage({ id: 'assets.transId' })}:{' '}
              </div>
              <div
                className={styles['cert-item-lab']}
                style={{ marginLeft: '0px', fontSize: '10px' }}
              >
                {certificate.transaction_id}
              </div>
            </div>
          </div>
          <div style={{ float: 'left', paddingLeft: '10px' }}>
            <div style={{ boxShadow: '0px 2px 4px #dddddd', padding: '20px' }}>
              <div style={{ fontSize: '18px', color: '#000' }}>
                {i18n.formatMessage({ id: 'assets.identifyInfo' })}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#999999',
                  lineHeight: '21px',
                  marginTop: '15px',
                }}
              >
                {i18n.formatMessage({ id: 'assets.contentHash' })}:
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#666666',
                  lineHeight: '21px',
                  marginBottom: '5px',
                  wordWrap: 'break-word',
                }}
              >
                {certificate.hash}
              </div>
              <hr style={{ background: '#eeeeee', margin: '0px', padding: '0px' }} />
              <div
                style={{
                  fontSize: '12px',
                  color: '#999999',
                  lineHeight: '21px',
                  marginTop: '15px',
                }}
              >
                {i18n.formatMessage({ id: 'assets.title' })}:
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#666666',
                  lineHeight: '21px',
                  marginBottom: '5px',
                  wordWrap: 'break-word',
                }}
              >
                {certificate.title}&nbsp;&nbsp;&nbsp;{sizeStr}
              </div>
              <hr style={{ background: '#eeeeee', margin: '0px', padding: '0px' }} />
              <div
                style={{
                  fontSize: '12px',
                  color: '#999999',
                  lineHeight: '21px',
                  marginTop: '15px',
                }}
              >
                {i18n.formatMessage({ id: 'assets.author' })}:
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#2971ad',
                  lineHeight: '21px',
                  marginBottom: '5px',
                }}
                target="_blank"
              >
                {certificate.author}
              </div>
              <hr style={{ background: '#eeeeee', margin: '0px', padding: '0px' }} />
              <div
                style={{
                  fontSize: '12px',
                  color: '#999999',
                  lineHeight: '21px',
                  marginTop: '15px',
                }}
              >
                {i18n.formatMessage({ id: 'assets.copyrightBelongs' })}:
              </div>
              <Link
                to={'/accounts/' + address}
                style={{
                  fontSize: '12px',
                  color: '#2971ad',
                  lineHeight: '21px',
                  marginBottom: '5px',
                  wordWrap: 'break-word',
                }}
                target="_blank"
              >
                {address}
              </Link>
              <hr style={{ background: '#eeeeee', margin: '0px', padding: '0px' }} />
              <div
                style={{
                  fontSize: '12px',
                  color: '#999999',
                  lineHeight: '21px',
                  marginTop: '15px',
                }}
              >
                {i18n.formatMessage({ id: 'assets.publishTime' })}:
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#666666',
                  lineHeight: '21px',
                  marginBottom: '5px',
                }}
              >
                {/* {I18n.l(utils_slots.getRealTime(Number(certificate.timestamp)), { dateFormat: "date"})} */}
                {dayjs(utils_slots.getRealTime(Number(certificate.timestamp))).format(
                  'YYYY-MM-DD HH:mm:ss',
                )}
              </div>
              <hr style={{ background: '#eeeeee', margin: '0px', padding: '0px' }} />
              <div
                style={{
                  fontSize: '12px',
                  color: '#999999',
                  lineHeight: '21px',
                  marginTop: '15px',
                }}
              >
                {i18n.formatMessage({ id: 'assets.fileLink' })}:
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#666666',
                  lineHeight: '21px',
                  marginBottom: '5px',
                  wordWrap: 'break-word',
                }}
              >
                <a href={certificate.source_address} target="_blank">
                  {certificate.source_address}
                </a>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button
                  style={{
                    background: '#044a84',
                    color: 'white',
                    border: 'none',
                    borderRadius: '2px',
                    marginTop: '15px',
                    width: '124px',
                    lineHeight: '32px',
                  }}
                  onClick={downloadCertImage}
                >
                  {i18n.formatMessage({ id: 'assets.downloadDcert' })}
                </button>
              </div>
            </div>
          </div>
          <div style={{ clear: 'both' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Assets;