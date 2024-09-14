import React, { useState, useEffect } from 'react';
import { useParams } from 'umi';
import { message, Card, Table } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useModel } from '@umijs/max';
import { i18n } from '@/utils/i18n';
import utils_slots from '@/utils/slots';
import services from '@/services/ddn-explorer';
import styles from './height.less';
import { CodepenOutlined } from '@ant-design/icons';
import LimitText from '@/components/LimitText';
import TransactionTable from '@/components/TransactionTable';

const BlockDetail: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState<any>({});
  const { height } = useParams<{ height: string }>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  
  useEffect(() => {
    if (height) {
      getBlock({ height });
    }
  }, [height]);

  const getBlock = async (params: { height: string }) => {
    setLoading(true);
    try {
      const res = await services.block.getBlockByIdOrHeight(params);
      if (res.success) {
        setBlock(res.block);
        setPagination({
          ...pagination,
          total: res.block.number_of_transactions,
        });
      } else {
        message.error(res.error?.message);
      }
    } catch (error) {
      console.error('获取区块信息失败:', error);
      message.error('获取区块信息失败');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '字段',
      dataIndex: 'field',
      key: 'field',
      width: '30%',
      ellipsis: true,
      render: (text: string) => i18n.formatMessage({ id: `block.${text}` }),
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
      ellipsis: true,
      render: (text: string, record: any) => {
        switch (record.field) {
          case 'previousBlock':
            return (
              <Link to={`/blocks/${Number(block.height) - 1}`} target="_blank">
                {text}
              </Link>
            );
          case 'timestamp':
            return dayjs(utils_slots.getRealTime(Number(text), initialState?.beginDate || '')).format('YYYY-MM-DD HH:mm:ss');
          case 'totalForged':
            return `${Number(text) / 100000000} ${initialState?.tokenName}`;
          default:
            return text;
        }
      },
    },
  ];

  const dataSource = [
    { field: 'height', value: block.height },
    { field: 'id', value: block.id },
    { field: 'previousBlock', value: block.previous_block },
    { field: 'version', value: block.version },
    { field: 'timestamp', value: block.timestamp },
    { field: 'numberOfTransactions', value: block.number_of_transactions },
    { field: 'payloadLength', value: block.payload_length },
    { field: 'payloadHash', value: block.payload_hash },
    { field: 'generatorPublicKey', value: block.generator_public_key },
    { field: 'generatorId', value: block.generator_id },
    { field: 'blockSignature', value: block.block_signature },
    { field: 'totalForged', value: block.totalForged },
  ];

  if (Object.keys(block).length === 0) {
    return (
      <div style={{ textAlign: 'center', margin: '100px' }}>
        {i18n.formatMessage({ id: 'block.no_detail' })}
      </div>
    );
  }

  const transactionsColumns = () => [
    {
      title: i18n.formatMessage({ id: 'trs.id' }),
      dataIndex: 'id',
      sorter: false,
      width: '15%',
      render: text => <LimitText link="/transactions/" target="_blank" title={text} />,
    },
    {
      title: i18n.formatMessage({ id: 'trs.type' }),
      dataIndex: 'type',
      sorter: false,
      width: '8%',
      render: text => i18n.formatMessage({ id: 'types.' + text }),
    },
    {
      title: i18n.formatMessage({ id: 'trs.senderAddress' }),
      dataIndex: 'senderId',
      sorter: false,
      width: '14%',
      render: text => <LimitText link="/accounts/" target="_blank" title={text} />,
    },
    {
      title: i18n.formatMessage({ id: 'trs.recipientId' }),
      dataIndex: 'recipientId',
      sorter: false,
      width: '14%',
      render: text => {
        let arr = [];
        if (text) {
          arr = text.split('|');
        }
        return (
          <div>
            {arr.map((item, index) => {
              return (
                <div key={index}>
                  <LimitText link="/accounts/" target="_blank" title={item} length={15} />
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: i18n.formatMessage({ id: 'trs.amount' }) + `(${initialState?.tokenName})`,
      dataIndex: 'amount',
      sorter: false,
      width: '8%',
      render: text => `${text / 100000000.0}`,
    },
    {
      title: i18n.formatMessage({ id: 'trs.fee' }) + `(${initialState?.tokenName})`,
      dataIndex: 'fee',
      sorter: false,
      width: '8%',
      render: text => `${text / 100000000.0}`,
    },
    {
      title: i18n.formatMessage({ id: 'trs.height' }),
      dataIndex: 'block_height',
      sorter: false,
      width: '8%',
      render: (text, record, index) => {
        return (
          <Link to={'/blocks/' + text} target="_blank">
            {text}
          </Link>
        );
      },
    },
    {
      title: i18n.formatMessage({ id: 'trs.timestamp' }),
      dataIndex: 'timestamp',
      width: '14%',
      render: text => dayjs(utils_slots.getRealTime(Number(text), initialState?.beginDate || '')).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  return (
    <div className={styles.pageWrap}>
      <Card
        title={
          <div className={styles.cardText}>
            <CodepenOutlined className={styles['icon']} />
            {i18n.formatMessage({ id: 'block.block_detail' })}
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          loading={loading}
          rowKey={record => record.field}
          rowClassName={(record, index) =>
            index % 2 === 0 ? styles.tabRow : styles.tabRowB
          }
          className={styles['blockTable']}
          style={{ width: '100%' }}
          showHeader={false}
        />

        {block.transactions.length > 0 && (
          <div>
            <h3>{i18n.formatMessage({ id: 'block.transactions' })}</h3>
            <TransactionTable
              transactions={block.transactions}
              loading={loading}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default BlockDetail;