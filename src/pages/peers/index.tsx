import React, { Component } from 'react';
import { Table, message, Card } from 'antd';
import 'whatwg-fetch';
import { i18n } from '@/utils/i18n';
import services from '@/services/ddn-explorer';
import styles from './index.less';

const columns = self => [
  {
    title: i18n.formatMessage({ id: 'peer.ip' }),
    dataIndex: 'host',
    sorter: false,
    width: '15%',
    render: text => {
      let iplist = text.split('.');
      iplist[0] = '*';
      iplist[1] = '*';
      iplist[2] = '*';
      return iplist.join('.');
    },
  },
  {
    title: i18n.formatMessage({ id: 'peer.port' }),
    dataIndex: 'port',
    sorter: false,
    width: '10%',
  },
  {
    title: i18n.formatMessage({ id: 'peer.state' }),
    dataIndex: 'status',
    sorter: false,
    width: '15%',
    render: (text) => text == 2 ? "正常" : "锁定"
  },
  {
    title: i18n.formatMessage({ id: 'peer.os' }),
    dataIndex: 'family',
    sorter: false,
    width: '10%',
  },
  {
    title: i18n.formatMessage({ id: 'peer.version' }),
    dataIndex: 'id',
    width: '10%',
  },
];

class PeerView extends Component {
  state = {
    loading: false,
    peers: [],
    pagination: {
      current: 1,
      total: 20,
      pageSize: 10,
    }
  };

  componentDidMount() {
    this.getPeersList({ offset: 0, limit: 10 });
  }
  handleTableChange = (pagination, filters, sorter) => {
    this.getPeersList({
      current: pagination.current,
      limit: pagination.pageSize,
      offset: (pagination.current - 1) * pagination.pageSize,
    });
  };
  getPeersList = async (params = {}) => {
    this.setState({ loading: true });
    const res = await services.peer.getPeersList(params);
    console.log('res', res);

    if (res.success !== true) {
      message.error(res.error?.message);
    }
    this.setState({
      peers: res.peers,
      pagenation: {
        ...this.state.pagination,
        total: res.totalCount,
      },
      loading: false,
    });
  };
  render() {
    const { peers, pagination } = this.state;

    return (
      <div className={styles.pageWrap}>
        <Card>
          <Table
            columns={columns(this)}
            rowKey={record => record.ip + record.port}
            dataSource={peers}
            // pagination={pagination}
            loading={this.state.loading}
            // onChange={this.handleTableChange}
          />
        </Card>
      </div>
    );
  }
}

export default PeerView;
