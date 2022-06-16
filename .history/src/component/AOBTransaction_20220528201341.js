import React, { Component } from 'react';
import { Table } from 'antd';
import 'whatwg-fetch'
import qs from 'qs'
import {I18n} from 'react-i18nify'
import {Link} from 'react-router-dom'
import Cnf from "../config"
import utils_slots from "../utils/slots";
const columns = (self) => [{
  title: I18n.t('trs.id'),
  dataIndex: 'id',
  sorter: false,
  width: '16%',
render: (text, record, index) =>{ return  <Link to={"/transactions/"+text} target="_blank">{text.slice(1,10) + '...' + text.slice(-10)}</Link>}        
}, {
  title: I18n.t('trs.type'),
  dataIndex: 'type',
  sorter: false,
  width: '8%',
  render: text => I18n.t('types.'+text)
}, {
  title: I18n.t('trs.senderId'),
  dataIndex: 'senderId',
  sorter: false,
  width: '16%',
  render: (text, record, index) =>{return <Link to={"/accounts/"+text} target='_blank'>{text.slice(1,10) + '...' + text.slice(-10)}</Link>}  
}, {
  title: I18n.t('trs.recipientId'),
  dataIndex: 'recipientId',
  sorter: false,
  width: '16%',
  render: (text, record, index) =>{ 
    if(typeof text === 'string'){
      return <div key={index}><Link to={"/accounts/"+ text} target='_blank' >{text.slice(1,10) + '...' + text.slice(-10)}</Link></div>
    }
  }
}, {
  title: I18n.t('trs.amount'),
  dataIndex: 'amount',
  sorter: false,
  width: '8%',
  render: (text, record) => `${record.asset.aobTransfer.amountShow} ${record.asset.aobTransfer.currency.split('.')[1]}`
}, {
  title: I18n.t('trs.fee'),
  dataIndex: 'fee',
  sorter: false,
  width: '8%',
  render: text => `${text / 100000000.0}` + Cnf.coinName
}, {
  title: I18n.t('trs.height'),
  dataIndex: 'height',
  sorter: false,
  width: '8%',
  render: (text, record, index) =>{ return  <Link to={"/blocks/"+text} target="_blank">{text}</Link>}
}, {
  title: I18n.t('trs.timestamp'),
  dataIndex: 'timestamp',
  width: '10%',
  render: text => `${I18n.l(utils_slots.getRealTime(Number(text)), {dateFormat: 'date'})}`
}];

class AOBTransaction extends Component {
  state = {
    data: [],
    pagination: {pageSize:10, current:0},
    loading: false,
  };

  componentDidMount() {
    this.getTransactions({ offset: 0, limit: 10, orderBy: "t_timestamp:desc"});
  }

  getTransactions = async (params = {}) => {
    const { assetInfo } = this.props
    this.setState({ loading: true });
    let query = qs.stringify(params);
    let url = `http://${localStorage.getItem("servicePeer")}/api/aob/transactions/${assetInfo.name}?${query}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    })

    const data = await response.json();
    const pagination = { ...this.state.pagination };

    pagination.total = data.count ? data.count : 100;
    this.setState({
      loading: false,
      data: data.transactions,
      pagination,
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;

    this.setState({
      pagination: pager,
    });

    this.getBlocks({
      limit: pagination.pageSize,
      offset: (pagination.current - 1) * pagination.pageSize,
      orderBy: "t_timestamp:desc"
    });
  }
  render() {
    console.log("this.state.data", this.state.data)
    return (
      <div>
        <h3>交换记录</h3>
        <Table columns={columns(this)}
          bordered
          rowKey={record => record.id}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default AOBTransaction;
