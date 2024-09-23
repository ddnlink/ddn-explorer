import React, { useState, useEffect } from 'react';
import { message, Card } from 'antd';
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
    getTransactions(pagination);
  }, []);

  const getTransactions = async (newPagination: any) => {
    const params = {
      offset: (newPagination.current - 1) * newPagination.pageSize,
      limit: newPagination.pageSize,
      orderBy: 't_timestamp:desc',
    }

    setLoading(true);
    try {
      const res = await services.transaction.getLatestTrans(params);
      if (res.success) {
        setTransactions(res.transactions || []);
        setPagination({
          ...newPagination,
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

  const handleTableChange = async (newPagination: any) => {
    await getTransactions(newPagination);
  };

  console.log('pagination:', pagination);

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