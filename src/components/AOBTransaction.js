/**
 * @file AOBTransaction.tsx
 * @description AOB交易列表组件
 * @copyright Copyright (c) 2023 DDN FOUNDATION
 * @license Licensed under the AGPL 3.0 License.
 * @author Imfly <kubying@qq.com>
 * @version 1.0.0
 * @created 2024-09-13
 * @last-modified 2024-09-13
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'antd';
import services from '@/services/ddn-explorer';
import utils_slots from '@/utils/slots';
import { useModel } from '@umijs/max';
import i18n from '@/utils/i18n';

const AOBTransaction: React.FC<{ assetInfo: any }> = ({ assetInfo }) => {
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ pageSize: 10, current: 1, total: 0 });
  const [loading, setLoading] = useState(false);

  const { initialState } = useModel('@@initialState');

  const getTransactions = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await services.aob.getAobTransactions(assetInfo.name, params);
      if (response.success) {
        setData(response.transactions);
        setPagination(prev => ({
          ...prev,
          total: response.count || 100
        }));
      }
    } catch (error) {
      console.error('Failed to fetch AOB transactions:', error);
    } finally {
      setLoading(false);
    }
  }, [assetInfo.name]);

  useEffect(() => {
    getTransactions({ offset: 0, limit: 10, orderBy: "t_timestamp:desc" });
  }, [getTransactions]);

  const handleTableChange = (paginationInfo: any) => {
    getTransactions({
      limit: paginationInfo.pageSize,
      offset: (paginationInfo.current - 1) * paginationInfo.pageSize,
      orderBy: "t_timestamp:desc"
    });
  };

  const columns = [
    {
      title: i18n.formatMessage({ id: 'trs.id' }),
      dataIndex: 'id',
      width: '16%',
      render: (text: string) => (
        <Link to={`/transactions/${text}`} target="_blank">
          {text.slice(1, 10) + '...' + text.slice(-10)}
        </Link>
      )
    },
    {
      title: i18n.formatMessage({ id: 'trs.type' }),
      dataIndex: 'type',
      width: '8%',
      render: (text: string) => i18n.formatMessage({ id: `types.${text}` })
    },
    {
      title: i18n.formatMessage({ id: 'trs.senderId' }),
      dataIndex: 'senderId',
      width: '16%',
      render: (text: string) => (
        <Link to={`/accounts/${text}`} target='_blank'>
          {text.slice(1, 10) + '...' + text.slice(-10)}
        </Link>
      )
    },
    {
      title: i18n.formatMessage({ id: 'trs.recipientId' }),
      dataIndex: 'recipientId',
      width: '16%',
      render: (text: string) => {
        if (typeof text === 'string') {
          return (
            <Link to={`/accounts/${text}`} target='_blank'>
              {text.slice(1, 10) + '...' + text.slice(-10)}
            </Link>
          );
        }
        return null;
      }
    },
    {
      title: i18n.formatMessage({ id: 'trs.amount' }),
      dataIndex: 'amount',
      width: '8%',
      render: (text: string, record: any) => 
        `${record.asset.aobTransfer.amountShow} ${record.asset.aobTransfer.currency.split('.')[1]}`
    },
    {
      title: i18n.formatMessage({ id: 'trs.fee' }),
      dataIndex: 'fee',
      width: '8%',
      render: (text: string) => `${Number(text) / 100000000.0}${initialState?.tokenName}`
    },
    {
      title: i18n.formatMessage({ id: 'trs.height' }),
      dataIndex: 'height',
      width: '8%',
      render: (text: string) => <Link to={`/blocks/${text}`} target="_blank">{text}</Link>
    },
    {
      title: i18n.formatMessage({ id: 'trs.timestamp' }),
      dataIndex: 'timestamp',
      width: '10%',
      render: (text: string) => i18n.formatMessage(
        { id: 'date' },
        { val: utils_slots.getRealTime(Number(text)) }
      )
    }
  ];

  return (
    <div>
      <h3>{i18n.formatMessage({ id: 'aob.transactionRecords' })}</h3>
      <Table 
        columns={columns}
        bordered
        rowKey={record => record.id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default AOBTransaction;