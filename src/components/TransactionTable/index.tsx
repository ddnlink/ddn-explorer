import React from 'react';
import { Table } from 'antd';
import { Link } from 'umi';
import { i18n } from '@/utils/i18n';
import LimitText from '@/components/LimitText';
import dayjs from 'dayjs';
import Cnf from '@/config';
import utils_slots from '@/utils/slots';
import styles from './index.less';
import { useModel } from '@umijs/max';

interface TransactionTableProps {
  transactions: any[];
  loading: boolean;
  // 如果不需要从服务器获取，下面的两个选项就不提供
  // { pageSize: number; current: number; total: number }; 
  pagination?: any; 
  onChange?: (pagination: any, filters: any, sorter: any) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  loading,
  pagination,
  onChange,
}) => {
  const { initialState } = useModel('@@initialState');
  const columns = [
    {
      title: i18n.formatMessage({ id: 'trs.id' }),
      dataIndex: 'id',
      key: 'id',
      width: '15%',
      render: (text: string) => <LimitText link="/transactions/" target="_blank" title={text} />,
    },
    {
      title: i18n.formatMessage({ id: 'trs.type' }),
      dataIndex: 'type',
      key: 'type',
      width: '8%',
      render: (text: number) => i18n.formatMessage({ id: `types.${text}` }),
    },
    {
      title: i18n.formatMessage({ id: 'trs.senderAddress' }),
      dataIndex: 'senderId',
      key: 'senderId',
      width: '14%',
      render: (text: string) => <LimitText link="/accounts/" target="_blank" title={text} />,
    },
    {
      title: i18n.formatMessage({ id: 'trs.recipientId' }),
      dataIndex: 'recipientId',
      key: 'recipientId',
      width: '14%',
      render: (text: string) => {
        const arr = text ? text.split('|') : [];
        return (
          <div>
            {arr.map((item, index) => (
              <div key={index}>
                <LimitText link="/accounts/" target="_blank" title={item} length={15} />
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: `${i18n.formatMessage({ id: 'trs.amount' })} (${initialState?.tokenName})`,
      dataIndex: 'amount',
      key: 'amount',
      width: '8%',
      render: (text: string) => `${Number(text) / 100000000}`,
    },
    {
      title: `${i18n.formatMessage({ id: 'trs.fee' })} (${initialState?.tokenName})`,
      dataIndex: 'fee',
      key: 'fee',
      width: '8%',
      render: (text: string) => `${Number(text) / 100000000}`,
    },
    {
      title: i18n.formatMessage({ id: 'trs.height' }),
      dataIndex: 'block_height',
      key: 'block_height',
      width: '8%',
      render: (text: string) => (
        <Link to={`/blocks/${text}`} target="_blank">
          {text}
        </Link>
      ),
    },
    {
      title: i18n.formatMessage({ id: 'trs.timestamp' }),
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: '14%',
      render: (text: string) =>
        dayjs(utils_slots.getRealTime(Number(text))).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={transactions}
      rowKey="id"
      pagination={pagination}
      loading={loading}
      onChange={onChange}
      className={styles.transactionTable}
      scroll={{ x: 'max-content' }}
    />
  );
};

export default TransactionTable;