import React, { useState, useEffect } from 'react';
import { message, Card } from 'antd';
import { i18n } from '@/utils/i18n';
import services from '@/services/ddn-explorer';
import TransactionTable from '@/components/TransactionTable';
import styles from './index.less';

const TransactionView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    getTransactions({ offset: 0, limit: 10, orderBy: 't_timestamp:desc' });
  }, []);

  const getTransactions = async (params: any) => {
    setLoading(true);
    try {
      const res = await services.transaction.getLatestTrans(params);
      if (res.success) {
        setTransactions(res.transactions || []);
        setPagination({
          ...pagination,
          total: res.count || 0,
        });
      } else {
        message.error(res.error || '获取交易列表失败');
      }
    } catch (error) {
      console.error('获取交易列表失败:', error);
      message.error('获取交易列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
    getTransactions({
      offset: (newPagination.current - 1) * newPagination.pageSize,
      limit: newPagination.pageSize,
      orderBy: 't_timestamp:desc',
    });
  };

  return (
    <div className={styles.pageWrap}>
      <Card>
        <TransactionTable
          transactions={transactions}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default TransactionView;