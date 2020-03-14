import React, { Component } from 'react';
import { Table } from 'antd';
import 'whatwg-fetch'
import qs from 'qs'
import {I18n} from 'react-i18nify'

const columns = (self) => [{
  title: I18n.t('peer.ip'),
  dataIndex: 'ip',
  sorter: false,
  width: '15%',
  render: (text) =>{ 
    let iplist=text.split('.')
    iplist[0] = '*'
    iplist[1] = '*'
    iplist[2] = '*'
    return iplist.join('.') }
}, {
  title: I18n.t('peer.port'),
  dataIndex: 'port',
  sorter: false,
  width: '10%',
}, {
  title: I18n.t('peer.state'),
  dataIndex: 'state',
  sorter: false,
  width: '15%',
}, {
  title: I18n.t('peer.os'),
  dataIndex: 'os',
  sorter: false,
  width: '10%',
}, {
  title: I18n.t('peer.version'),
  dataIndex: 'version',
  width: '10%',
}];

class PeerView extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    const start = (pagination.current-1)*pagination.pageSize
    const length = (this.allPeers.length - start) > 10 ? 10 : (this.allPeers.length - start) 
    this.setState({
      loading: false,
      data: this.allPeers.slice(start, start+length),
      pager,
    });
    // this.getBlocks({
    //   limit: pagination.pageSize,
    //   offset: (pagination.current-1)*pagination.pageSize
    // });
  }

  getBlocks = async (params = {}) => {
    this.setState({ loading: true });
    let query = qs.stringify(params);
    let url = `http://${localStorage.getItem("servicePeer")}/api/peers?${query}`
    
    const response = await fetch(url, {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    })

    const data = await response.json()
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = data.peers.length;
      this.allPeers = data.peers
      this.setState({
        loading: false,
        data: this.allPeers.slice(0,10),
        pagination,
      });
  }

  componentDidMount() {
    this.getBlocks({offset:0, limit:10});
  }

  render() {
    return (
      <Table columns={columns(this)}
        bordered
        rowKey={record => record.ip+record.port}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default PeerView;
