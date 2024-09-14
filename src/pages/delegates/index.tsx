/**
 * @file DelegateView.tsx
 * @description 受托人列表视图组件
 * @copyright Copyright (c) 2023 DDN FOUNDATION
 * @license Licensed under the AGPL 3.0 License.
 * @author Imfly <kubying@qq.com>
 * @version 1.0.0
 * @created 2024-09-13
 * @last-modified 2024-09-13
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Table, message, Card } from 'antd';
import { Link } from 'umi';
import { useModel } from '@umijs/max';
import services from '@/services/ddn-explorer';
import { i18n } from '@/utils/i18n';
import styles from './index.less';

const DelegateView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [delegates, setDelegates] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { initialState } = useModel('@@initialState');

  const getDelegates = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await services.delegate.getDelegatesList(params);
      if (res.success) {
        setDelegates(res.delegates || []);
        setPagination(prev => ({
          ...prev,
          total: res.totalCount || 0,
        }));
      } else {
        message.error(res.error);
      }
    } catch (error) {
      console.error('Failed to fetch delegates:', error);
      message.error('Failed to fetch delegates');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDelegates({ offset: 0, limit: 10 });
  }, [getDelegates]);

  const handleTableChange = (paginationInfo: any) => {
    getDelegates({
      offset: (paginationInfo.current - 1) * paginationInfo.pageSize,
      limit: paginationInfo.pageSize,
    });
  };

  const columns = [
    {
      title: i18n.formatMessage({ id: 'delegate.username' }),
      dataIndex: 'username',
      width: '15%',
      render: (text: string) => {
        const length = text.length / 2;
        return text.substr(0, length) + '***';
      },
    },
    {
      title: i18n.formatMessage({ id: 'delegate.address' }),
      dataIndex: 'address',
      width: '25%',
      render: (text: string) => (
        <Link to={`/accounts/${text}`} target="_blank">
          {text}
        </Link>
      ),
    },
    {
      title: i18n.formatMessage({ id: 'delegate.approval' }),
      dataIndex: 'approval',
      width: '20%',
      render: (text: string) => `${text}%`,
    },
    {
      title: i18n.formatMessage({ id: 'delegate.productivity' }),
      dataIndex: 'productivity',
      width: '15%',
      render: (text: string) => `${text}%`,
    },
    {
      title: `${i18n.formatMessage({ id: 'delegate.forged' })} (${initialState?.tokenName})`,
      dataIndex: 'forged',
      width: '15%',
      render: (text: string) => `${Number(text) / 100000000}`,
    },
  ];

  return (
    <div className={styles.pageWrap}>
      <Card>
        <Table
          columns={columns}
          rowKey={record => record.address}
          dataSource={delegates}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          rowClassName={styles.rowStyle}
        />
      </Card>
    </div>
  );
};

export default DelegateView;