import React, { Component } from 'react';
import { Table, message, Card } from 'antd';
import 'whatwg-fetch';
import { i18n } from '@/utils/i18n';
import services from '@/services/ddn-explorer';
import utils_slots from '../../utils/slots';
import LimitText from '../../components/LimitText';
import dayjs from 'dayjs';
import styles from './index.less';

const columns = self => [
  {
    title: i18n.formatMessage({ id: 'trs.id' }),
    dataIndex: 'transaction_id',
    sorter: false,
    width: '20%',
    render: text => <LimitText link="/transactions/" target="_blank" title={text} />,
  },
  {
    title: i18n.formatMessage({ id: 'account.address' }),
    dataIndex: 'address',
    sorter: false,
    width: '20%',
    // render: text =>
  },
  {
    title: i18n.formatMessage({ id: 'evidence.type' }),
    dataIndex: 'type',
    sorter: false,
    width: '10%',
  },
  {
    title: i18n.formatMessage({ id: 'evidence.hash' }),
    dataIndex: 'hash',
    sorter: false,
    width: '15%',
    render: (text, record, index) => <LimitText link="/assets/" target="_blank" title={text} />,
  },
  {
    title: i18n.formatMessage({ id: 'trs.timestamp' }),
    dataIndex: 'timestamp',
    width: '20%',
    render: text => dayjs(utils_slots.getRealTime(Number(text))).format('YYYY-MM-DD HH:mm:ss'),
  },
];

class TransactionView extends Component {
  state = {
    loading: false,
    searchText: '',
    aweekData: {},
    evidences: [],
    pagination: {
      current: 1,
      total: 20,
      pageSize: 10,
    }
  };
  componentDidMount() {
    this.getEvidences({ offset: 0, limit: 10, orderBy: 't_timestamp:desc' });
  }
  handleTableChange = (pagination, filters, sorter) => {
    this.getEvidences({
        current: pagination.current,
        limit: pagination.pageSize,
        offset: (pagination.current - 1) * pagination.pageSize,
        orderBy: 't_timestamp:desc',
      }
    );
  };
  getEvidences = async (params = {}) => {
    const res = await services.evidence.getEvidenceList(params);

    if (res.success !== true) {
      message.error(res.error?.message);
    } else {
    }
    this.setState({
      evidences: res.evidences,
      pagination: {
        ...this.state.pagination,
        total: res.total,
      },
      loading: false,
    });

  };
  render() {
    const { evidences, pagination } = this.state;
    return (
      <div className={styles.pageWrap}>
        <Card>
          <Table
            columns={columns(this)}
            rowKey={record => record.id}
            dataSource={evidences}
            pagination={pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
            rowClassName={styles.rowStyle}
          />
        </Card>
      </div>
    );
  }
}

export default TransactionView;
