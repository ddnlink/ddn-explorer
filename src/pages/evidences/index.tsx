/**
 * @file EvidenceView.tsx
 * @description 存证列表视图组件
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
import utils_slots from '@/utils/slots';
import LimitText from '@/components/LimitText';
import dayjs from 'dayjs';
import styles from './index.less';

const EvidenceView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [evidences, setEvidences] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { initialState } = useModel('@@initialState');

  const getEvidences = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await services.evidence.getEvidenceList(params);
      if (res.success) {
        setEvidences(res.evidences);
        setPagination(prev => ({
          ...prev,
          total: res.total,
        }));
      } else {
        message.error(res.error);
      }
    } catch (error) {
      console.error('Failed to fetch evidences:', error);
      message.error('Failed to fetch evidences');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getEvidences({ offset: 0, limit: 10, orderBy: 't_timestamp:desc' });
  }, [getEvidences]);

  const handleTableChange = (paginationInfo: any) => {
    getEvidences({
      offset: (paginationInfo.current - 1) * paginationInfo.pageSize,
      limit: paginationInfo.pageSize,
      orderBy: 't_timestamp:desc',
    });
  };

  const columns = [
    {
      title: i18n.formatMessage({ id: 'trs.id' }),
      dataIndex: 'transaction_id',
      width: '20%',
      render: (text: string) => (
        <LimitText link={`/transactions/${text}`} target="_blank" title={text} />
      ),
    },
    {
      title: i18n.formatMessage({ id: 'account.address' }),
      dataIndex: 'address',
      width: '20%',
      render: (text: string) => (
        <LimitText link={`/accounts/${text}`} target="_blank" title={text} />
      ),
    },
    {
      title: i18n.formatMessage({ id: 'evidence.type' }),
      dataIndex: 'type',
      width: '10%',
    },
    {
      title: i18n.formatMessage({ id: 'evidence.hash' }),
      dataIndex: 'hash',
      width: '15%',
      render: (text: string) => (
        <LimitText link={`/assets/${text}`} target="_blank" title={text} />
      ),
    },
    {
      title: i18n.formatMessage({ id: 'trs.timestamp' }),
      dataIndex: 'timestamp',
      width: '20%',
      render: (text: string) => 
        dayjs(utils_slots.getRealTime(Number(text)), initialState?.beginDate || '').format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  return (
    <div className={styles.pageWrap}>
      <Card>
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={evidences}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          rowClassName={styles.rowStyle}
        />
      </Card>
    </div>
  );
};

export default EvidenceView;