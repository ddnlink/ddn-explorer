import React, { Component } from 'react';
import { Table } from 'antd';
import 'whatwg-fetch'
import qs from 'qs'
import {I18n} from 'react-i18nify'
import {Link} from 'react-router-dom'
import Cnf from "./config"
const columns = (self) => [
  {
    title: I18n.t('delegate.username'),
    dataIndex: 'username',
    sorter: false,
    width: '15%',
    render: (text, record, index) => {
      const length = text.length / 2
      return text.substr(0, length) + '***'
    }
  },
  {
    title: I18n.t('delegate.address'),
    dataIndex: 'address',
    sorter: false,
    width: '25%',
    render: (text, record, index) =>{ return <Link to={"/accounts/"+text} target="_blank">{text}</Link> }    
  }, {
    title:  I18n.t('delegate.approval'),
    dataIndex: 'approval',
    sorter: false,
    width: '20%',
    render: text => `${text}%`
  },
  {
    title:  I18n.t('delegate.productivity'),
    sorter: false,
    width: '15%',
    dataIndex: 'productivity',
    render: text => `${text}%`
  }, {
    title: I18n.t('delegate.forged') + `(${Cnf.coinName})`,
    sorter: false,
    width: '15%',
    dataIndex: 'forged',
    render: text => `${text / 100000000}`  
  }
];

class DelegateView extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.getBlocks({
      limit: pagination.pageSize,
      offset: (pagination.current - 1) * pagination.pageSize
    });
  }
  getBlocks = async (params = {}) => {
    this.setState({ loading: true });
    let query = qs.stringify(params);
    let url = `http://${localStorage.getItem("servicePeer")}/api/delegates?${query}`
    const response = await fetch(url, {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json()
    const pagination = { ...this.state.pagination };
    pagination.total = data.totalCount ? data.totalCount : 100;
    this.setState({
      loading: false,
      data: data.delegates,
      pagination,
    });
  }
  componentDidMount() {
    this.getBlocks({ offset: 0, limit: 10 });
  }

  render() {
    return (
      <Table columns={columns(this)}
        bordered
        rowKey={record => record.address}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default DelegateView;
