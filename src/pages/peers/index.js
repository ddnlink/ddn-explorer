import React, { Component } from 'react';
import { Table, message, Card } from 'antd';
import 'whatwg-fetch';
import { i18n } from '@/utils/i18n';
import { connect } from 'dva';
import styles from './index.less';

const columns = self => [
  {
    title: i18n.formatMessage({ id: 'peer.ip' }),
    dataIndex: 'ip',
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
    dataIndex: 'state',
    sorter: false,
    width: '15%',
  },
  {
    title: i18n.formatMessage({ id: 'peer.os' }),
    dataIndex: 'os',
    sorter: false,
    width: '10%',
  },
  {
    title: i18n.formatMessage({ id: 'peer.version' }),
    dataIndex: 'version',
    width: '10%',
  },
];
@connect(({ peers }) => ({
  peers,
}))
class PeerView extends Component {
  state = {
    loading: false,
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
    this.props.dispatch({
      type: 'peers/getPeersList',
      payload: {
        ...params,
      },
      callback: res => {
        if (res.success !== true) {
          message.error(res.error);
        }
        this.setState({
          loading: false,
        });
      },
    });
  };
  render() {
    const { peers } = this.props;
    console.log('节点数据', peers);
    const data = peers.peersData.peers.peers;
    const pagination = peers.peersData.pagination;
    return (
      <div className={styles.pageWrap}>
        <Card>
          <Table
            columns={columns(this)}
            rowKey={record => record.ip + record.port}
            dataSource={data}
            pagination={pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </Card>
      </div>
    );
  }
}

export default PeerView;
