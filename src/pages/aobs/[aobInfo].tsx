/**
 * @file AobInfo.tsx
 * @description AOB (Asset on Blockchain) 信息展示组件
 * @copyright Copyright (c) 2023 DDN FOUNDATION
 * @license Licensed under the AGPL 3.0 License.
 * @author Imfly <kubying@qq.com>
 * @version 1.0.0
 * @created 2024-09-13
 * @last-modified 2024-09-13
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useIntl } from 'umi';
import { Table, message, Card } from 'antd';
import dayjs from 'dayjs';
import { useModel } from '@umijs/max';
import { i18n } from '@/utils/i18n';
import { AuditOutlined, TransactionOutlined } from '@ant-design/icons';
import LimitText from '@/components/LimitText';
import services from '@/services/ddn-explorer';
import utils_slots from '@/utils/slots';
import styles from './aobInfo.less';

const AobInfo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [aobData, setAobData] = useState<any>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { aobInfo } = useParams<{ aobInfo: string }>();
  const i18n = useIntl();
  const { initialState } = useModel('@@initialState');
  const getAobInfo = useCallback(async () => {
    setLoading(true);
    try {
      const res = await services.aob.getAobInfo({ name: aobInfo });
      if (res.success) {
        setAobData(res.asset);
      } else {
        message.error(res.error);
      }
    } catch (error) {
      console.error('Failed to fetch AOB info:', error);
      message.error('Failed to fetch AOB info');
    } finally {
      setLoading(false);
    }
  }, [aobInfo]);

  const getBlocks = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await services.block.getBlocksList(params);
      if (res.success) {
        setBlocks(res.blocks);
        setPagination(prev => ({
          ...prev,
          total: res.count,
        }));
      } else {
        message.error(res.error);
      }
    } catch (error) {
      console.error('Failed to fetch blocks:', error);
      message.error('Failed to fetch blocks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAobInfo();
    getBlocks({ offset: 0, limit: 10, orderBy: 'height:desc' });
  }, [getAobInfo, getBlocks]);

  const handleTableChange = (paginationInfo: any) => {
    getBlocks({
      current: paginationInfo.current,
      limit: paginationInfo.pageSize,
      offset: (paginationInfo.current - 1) * paginationInfo.pageSize,
      orderBy: 'height:desc',
    });
  };

  const columns = [
    {
      title: i18n.formatMessage({ id: 'block.height' }),
      dataIndex: 'height',
      key: 'height',
      width: '10%',
      render: (text: string) => (
        <a href={`/blocks/${text}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: i18n.formatMessage({ id: 'block.numberOfTransactions' }),
      dataIndex: 'numberOfTransactions',
      key: 'numberOfTransactions',
      width: '9%',
    },
    {
      title: i18n.formatMessage({ id: 'block.confirmations' }),
      dataIndex: 'confirmations',
      key: 'confirmations',
      width: '9%',
    },
    {
      title: `${i18n.formatMessage({ id: 'block.reward' })} (${initialState?.tokenName})`,
      dataIndex: 'reward',
      key: 'reward',
      width: '13%',
      render: (text: string) => Math.floor(Number(text) / 100000000),
    },
    {
      title: `${i18n.formatMessage({ id: 'block.totalAmount' })} (${initialState?.tokenName})`,
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '12%',
      render: (text: string) => Math.floor(Number(text) / 100000000),
    },
    {
      title: `${i18n.formatMessage({ id: 'block.totalFee' })} (${initialState?.tokenName})`,
      dataIndex: 'totalFee',
      key: 'totalFee',
      width: '12%',
      render: (text: string) => `${Number(text) / 100000000.0}`,
    },
    {
      title: i18n.formatMessage({ id: 'block.generatorId' }),
      dataIndex: 'generatorId',
      key: 'generatorId',
      width: '17%',
      render: (text: string) => (
        <LimitText link="/accounts/" title={text} length={15} target="_blank" />
      ),
    },
    {
      title: i18n.formatMessage({ id: 'block.timestamp' }),
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: '18%',
      render: (text: string) =>
        dayjs(utils_slots.getRealTime(Number(text))).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  if (!aobData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pageWrap}>
      <Card
        title={
          <div className={styles.cardText}>
            <AuditOutlined className={styles.icon} />
            资产详情
          </div>
        }
      >
        <table>
          <tbody className={styles.aobTable}>
            <tr>
              <td className={styles.col_one}>资产名称</td>
              <td className={styles.col_two}>{aobData.name}</td>
            </tr>
            <tr>
              <td className={styles.col_one}>持币账户</td>
              <td className={styles.col_two}>{aobData.issuerId}</td>
            </tr>
            <tr>
              <td className={styles.col_one}>发行商</td>
              <td className={styles.col_two}>{aobData.issuer}</td>
            </tr>
            <tr>
              <td className={styles.col_one}>发行上限</td>
              <td className={styles.col_two}>{aobData.maximum}</td>
            </tr>
            <tr>
              <td className={styles.col_one}>已发行量</td>
              <td className={styles.col_two}>{aobData.quantity}</td>
            </tr>
            <tr>
              <td className={styles.col_one}>精度</td>
              <td className={styles.col_two}>{aobData.precision}</td>
            </tr>
            <tr>
              <td className={styles.col_one}>发行时间</td>
              <td className={styles.col_two}>
                {dayjs(utils_slots.getRealTime(Number(aobData.timestamp))).format('YYYY-MM-DD HH:mm:ss')}
              </td>
            </tr>
            <tr>
              <td className={styles.col_one}>发行商地址</td>
              <td className={styles.col_two}>{aobData.issuerId}</td>
            </tr>
            <tr>
              <td className={styles.col_one}>资产描述</td>
              <td className={styles.col_two}>{aobData.desc}</td>
            </tr>
          </tbody>
        </table>
      </Card>
      <Card
        style={{ marginTop: '20px' }}
        title={
          <div className={styles.cardText}>
            <TransactionOutlined className={styles.icon} />
            资产交易列表
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={blocks}
          rowKey="height"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          rowClassName={(record, index) => (index % 2 !== 0 ? styles.tabRowB : styles.tabRow)}
        />
      </Card>
    </div>
  );
};

export default AobInfo;