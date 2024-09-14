/**
 * @file AobView.tsx
 * @description AOB (Asset on Blockchain) 列表视图组件
 * @copyright Copyright (c) 2023 DDN FOUNDATION
 * @license Licensed under the AGPL 3.0 License.
 * @author Imfly <kubying@qq.com>
 * @version 1.0.0
 * @created 2024-09-13
 * @last-modified 2024-09-13
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'umi';
import { useModel } from '@umijs/max';
import { Table, Card, message } from 'antd';
import dayjs from 'dayjs';
import { i18n } from '@/utils/i18n';
import LimitText from '@/components/LimitText';
import services from '@/services/ddn-explorer';
import utils_slots from '@/utils/slots';
import styles from './AobView.less';

const AobView: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);
  const [aobList, setAobList] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const getAobsList = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await services.aob.getAobsList(params);
      if (res.success) {
        setAobList(res.aobs || []);
        setPagination(prev => ({
          ...prev,
          total: res.count || 0,
        }));
      } else {
        message.error(res.error);
      }
    } catch (error) {
      console.error('Failed to fetch AOBs list:', error);
      message.error('Failed to fetch AOBs list');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAobsList({ offset: 0, limit: 10, orderBy: 'aob:desc' });
  }, [getAobsList]);

  const handleTableChange = (paginationInfo: any) => {
    getAobsList({
      current: paginationInfo.current,
      limit: paginationInfo.pageSize,
      offset: (paginationInfo.current - 1) * paginationInfo.pageSize,
      orderBy: 'aob:desc',
    });
  };

  const columns = [
    {
      title: i18n.formatMessage({ id: '资产名称' }),
      dataIndex: 'name',
      key: 'name',
      width: '18%',
      render: (text: string, record: any) => (
        <Link to={`/aobs/${record.name}`}>{text}</Link>
      ),
    },
    {
      title: i18n.formatMessage({ id: '积分发行商' }),
      dataIndex: 'issuer_name',
      key: 'issuer_name',
      width: '17%',
    },
    {
      title: i18n.formatMessage({ id: '积分总量' }),
      dataIndex: 'maximum',
      key: 'maximum',
      width: '18%',
      render: (text: string) => (
        <LimitText link="/accounts/" title={text} length={15} target="_blank" />
      ),
    },
    {
      title: i18n.formatMessage({ id: '已释放量' }),
      dataIndex: 'quantity',
      key: 'quantity',
      width: '17%',
      render: (text: string) => (
        <LimitText link="/accounts/" title={text} length={15} target="_blank" />
      ),
    },
    {
      title: i18n.formatMessage({ id: '精度' }),
      dataIndex: 'precision',
      key: 'precision',
      width: '16%',
    },
    {
      title: i18n.formatMessage({ id: '释放时间' }),
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: '14%',
      render: (text: string) =>
        dayjs(utils_slots.getRealTime(Number(text), initialState?.beginDate || '')).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  return (
    <div className={styles.aobTable}>
      <Card>
        <Table
          columns={columns}
          dataSource={aobList}
          rowKey="name"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          rowClassName={(record, index) =>
            index % 2 === 0 ? styles.row_Style : styles.row_StyleB
          }
        />
      </Card>
    </div>
  );
};

export default AobView;