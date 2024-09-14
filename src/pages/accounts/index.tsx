/**
 * 账户页面： 仅仅显示基本信息
 */
/**
 * @file AccountView.tsx
 * @description 账户列表视图组件
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
import { i18n } from '@/utils/i18n';

import services from '@/services/ddn-explorer';
import styles from './index.less';

const AccountView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 20,
    current: 1,
  });
  const [supply, setSupply] = useState(0);

  const { initialState } = useModel('@@initialState');

  const getAccounts = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await services.account.getAccountList(params);
      if (res.success) {
        setAccounts(res.accounts);
        setPagination(prev => ({
          ...prev,
          total: res.count,
        }));
      } else {
        message.error(res.error);
      }
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
      message.error('Failed to fetch accounts');
    } finally {
      setLoading(false);
    }
  }, []);

  const getSupply = useCallback(async () => {
    try {
      const res = await services.block.getStatus();
      if (res.success) {
        setSupply(res.supply);
      } else {
        message.error(res.error);
      }
    } catch (error) {
      console.error('Failed to fetch supply:', error);
      message.error('Failed to fetch supply');
    }
  }, []);

  useEffect(() => {
    getAccounts({ offset: 0, limit: 20 });
    getSupply();
  }, [getAccounts, getSupply]);

  const handleTableChange = (paginationInfo: any) => {
    getAccounts({
      offset: (paginationInfo.current - 1) * paginationInfo.pageSize,
      limit: paginationInfo.pageSize,
    });
  };

  const columns = [
    {
      title: i18n.formatMessage({ id: 'account.address' }),
      dataIndex: 'address',
      width: '30%',
      render: (text: string) => (
        <Link to={`/accounts/${text}`} target="_blank">
          {text}
        </Link>
      ),
    },
    {
      title: `${i18n.formatMessage({ id: 'account.balance' })} (${initialState?.tokenName})`,
      dataIndex: 'balance',
      width: '20%',
      render: (text: string, record: any) => {
        if (record.balance > 100000000) {
          return Number(record.balance / 100000000);
        } else {
          return Number(record.balance) + 'd';
        }
      },
    },
    {
      title: i18n.formatMessage({ id: 'account.publicKey' }),
      dataIndex: 'publicKey',
      width: '30%',
      render: (text: string) => {
        return <div>{text && text.slice(0, 20) + '...'}</div>;
      },
    },
    {
      title: i18n.formatMessage({ id: 'account.percent' }),
      dataIndex: 'percent',
      width: '20%',
      render: (text: string, record: any) => {
        if (record.balance > 100000000) {
          let balance = record.balance;
          return Number((balance / supply) * 100).toFixed(4) + '%';
        } else {
          return Number(record.balance) + 'd';
        }
      },
    },
  ];

  return (
    <div className={styles.pageWrap}>
      <Card>
        <Table
          columns={columns}
          rowKey={record => record.address}
          dataSource={accounts}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default AccountView;