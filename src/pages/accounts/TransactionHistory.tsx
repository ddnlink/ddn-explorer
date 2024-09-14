import React, { useState, useEffect, useCallback } from 'react';
import { Table, message } from 'antd';
import { useRequest, Link } from 'umi';
import services from '@/services/ddn-explorer';

import { i18n } from '@/utils/i18n';
import utils_slots from '@/utils/slots';
import LimitText from '@/components/LimitText';
import styles from './TransactionHistory.less';
import { useModel } from '@umijs/max';

interface TransactionHistoryProps {
  address: string;
  curRole: string;
  currency: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ address, curRole, currency }) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const { initialState } = useModel('@@initialState');

  // AoB 资产管理
  // const getTransactions = (query: any) => {
  //   let url = '/api/transactions';
  //   if (currency !== initialState?.tokenName) {
  //     url = '/api/aob/transactions';
  //   }
  //   return ;
  // };

  const fetchTransactions = async (query: any) => {
    setLoading(true);
    const res = await services.transaction.getLatestTrans(query);
    if (res.success) {
      setTransactions(res.transactions || []);
      setPagination(prev => ({
        ...prev,
        total: res.count || 0,
      }));
    } else {
      message.error(res.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const query: any = {
      offset: 0,
      limit: pagination.pageSize,
      orderBy: 't_timestamp:desc',
    };

    if (currency === initialState?.tokenName) {
      if (curRole === 'all') {
        query.senderId = address;
        query.recipientId = address;
      } else if (curRole === 'sender') {
        query.senderId = address;
      } else if (curRole === 'recipient') {
        query.recipientId = address;
      }
    } else {
      query.address = address;
      query.currency = currency;
    }

    fetchTransactions(query);
  }, [address, curRole, currency, pagination.pageSize]);

  const handleTableChange = async (newPagination: any, filters: any, sorter: any) => {
    const query: any = {
      offset: (newPagination.current - 1) * newPagination.pageSize,
      limit: newPagination.pageSize,
      orderBy: 't_timestamp:desc',
    };

    if (currency === initialState?.tokenName) {
      if (curRole === 'all') {
        query.senderId = address;
        query.recipientId = address;
      } else if (curRole === 'sender') {
        query.senderId = address;
      } else if (curRole === 'recipient') {
        query.recipientId = address;
      }
    } else {
      query.address = address;
      query.currency = currency;
    }

    await fetchTransactions(query);
    setPagination(newPagination);
  };

  const columns = [
    {
      title: i18n.formatMessage({ id: 'trs.id' }),
      dataIndex: 'id',
      ellipsis: true,
      width: '14%',
      render: (text: string) => <LimitText title={text} link="/transactions/" />,
    },
    {
      title: i18n.formatMessage({ id: 'trs.type' }),
      dataIndex: 'type',
      width: '9%',
      render: (text: string) => i18n.formatMessage({ id: 'types.' + text }),
    },
    {
      title: i18n.formatMessage({ id: 'trs.senderId' }),
      dataIndex: 'senderId',
      ellipsis: true,
      width: '15%',
      render: (text: string) => <LimitText link="/accounts/" title={text} target="_blank" />,
    },
    {
      title: i18n.formatMessage({ id: 'trs.recipientId' }),
      dataIndex: 'recipientId',
      ellipsis: true,
      width: '15%',
      render: (text: string) => {
        if (text) {
          const arr = text.split('|');
          return (
            <div>
              {arr.map((item, index) => (
                <div key={index}>
                  <LimitText target="_blank" title={item} link="/accounts/" />
                </div>
              ))}
            </div>
          );
        }
        return <span></span>;
      },
    },
    {
      title: i18n.formatMessage({ id: 'trs.amount' }) + `(${currency})`,
      dataIndex: 'amount',
      width: '12%',
      render: (text: string) => `${Number(text) / 100000000}`,
    },
    {
      title: i18n.formatMessage({ id: 'trs.fee' }) + `(${initialState?.tokenName})`,
      dataIndex: 'fee',
      width: '11%',
      render: (text: string) => `${Number(text) / 100000000}`,
    },
    {
      title: i18n.formatMessage({ id: 'trs.height' }),
      dataIndex: 'block_height',
      width: '9%',
      render: (text: string) => (
        <Link to={'/blocks/' + text} target="_blank">
          {text}
        </Link>
      ),
    },
    {
      title: i18n.formatMessage({ id: 'trs.timestamp' }),
      dataIndex: 'timestamp',
      width: '12%',
      render: (text: string) => {
        const timeStamp = new Date().getTime();
        const leftTime = timeStamp - utils_slots.getRealTime(Number(text), initialState?.beginDate || '');
        return utils_slots.formatDuring(leftTime);
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={transactions}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      rowKey="id"
      rowClassName={(record, index) => (index % 2 === 0 ? styles.tabRow : styles.tabRowB)}
    />
  );
};

export default TransactionHistory;