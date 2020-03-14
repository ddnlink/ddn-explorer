import React, { Component } from 'react';
import { Table } from 'antd';
import 'whatwg-fetch'
import qs from 'qs'
import {I18n} from 'react-i18nify'
import {Link} from 'react-router-dom'

import './TransactionHistory.css'
import Cnf from "./config"
import utils_slots from "./utils/slots"
import LimitText from "./component/LimitText"

const columns = (self) => [
  {
    title: I18n.t('trs.id'),
    dataIndex: 'id',
    sorter: false,
    width: '15%',
    render: text => <LimitText link="/transactions/" target="_blank" title={text} />        
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
    width: '15%',
    render: (text) => <LimitText target="_blank" title={text} link="/accounts/" />
  }, {
    title: I18n.t('trs.recipientId'),
    dataIndex: 'recipientId',
    sorter: false,
    width: '15%',
    render: (text) =>{ 
      var str=text;
      if (str) {
        var arr=str.split('|');
        return <div>
          {
            arr.map((item,index) => <div key={index}><LimitText link="/accounts/" target="_blank" title={item} /></div>)
          } 
        </div>
      } else {
        return <span></span>
      }
      
    }
  }, {
    title: I18n.t('trs.amount') + `(${Cnf.coinName})`,
    dataIndex: 'amount',
    sorter: false,
    width: '8%',
    render: text => `${text / 100000000.0}`
  }, {
    title: I18n.t('trs.fee') + `(${Cnf.coinName})`,
    dataIndex: 'fee',
    sorter: false,
    width: '6%',
    render: text => `${text / 100000000.0}`
  }, {
    title: I18n.t('trs.height'),
    dataIndex: 'height',
    sorter: false,
    width: '8%',
    render: (text, record, index) =>{ return  <Link to={"/blocks/"+text} target="_blank">{text}</Link>}
  }, {
    title: I18n.t('trs.timestamp'),
    dataIndex: 'timestamp',
    width: "15%",
    render: text => `${I18n.l(utils_slots.getRealTime(Number(text)), {dateFormat: 'date'})}`
  }
];

export default class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: { pageSize: 10, current: 0 },
      loading: false,
      searchText: "", 
      url: true,
      url2: true,
      currency: Cnf.coinName,
    };
  }

  componentDidMount() {
    let query = {
      senderId: this.props.params.address,
      recipientId: this.props.params.address,
      offset: 0,
      limit: 10,
      orderBy: "t_timestamp:desc"
    }
    let currency = this.state
    this.setState({currency: this.props.currency})
    if (this.props.currency === Cnf.coinName) {
      this.getBlocks(query);
    } else {
      query = {
        offset: 0,
        limit: 10,
      }
      this.getCurrencyBlocks(query, this.props.curRole, currency)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.curRole !== this.props.curRole || nextProps.currency !== this.props.currency){
      this.setState({currency: nextProps.currency})
      this.handleUpdate(nextProps.curRole, nextProps.currency)
    }
  }
  handleTableChange = (pagination, filters, sorter) => {
    const { currency } = this.state
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;

    this.setState({
      pagination: pager
    });
    if (currency === Cnf.coinName) {
      let query = {
        offset: (pagination.current - 1) * pagination.pageSize,
        limit: pagination.pageSize,
        orderBy: "t_timestamp:desc"
      }
      if(this.props.curRole === 'all'){
        query.senderId = this.props.params.address
        query.recipientId = this.props.params.address
      }else if(this.props.curRole === 'sender'){
        query.senderId = this.props.params.address
      }else if(this.props.curRole === 'recipient'){
        query.recipientId = this.props.params.address
      }else{
        console.log(query)
      }
      this.getBlocks(query);
    } else {
      let query = {
        offset: (pagination.current - 1) * pagination.pageSize,
        limit: pagination.pageSize,
      }
      this.getCurrencyBlocks(query, this.props.curRole, currency)
    }
  }
  handleUpdate = (role, currency) =>{
    
    if (currency === Cnf.coinName) {
      let query = {
        offset: 0,
        limit: 10,
        orderBy: "t_timestamp:desc"
      }
      if(role === 'all'){
        query.senderId = this.props.params.address
        query.recipientId = this.props.params.address
      }else if(role === 'sender'){
        query.senderId = this.props.params.address
      }else if(role === 'recipient'){
        query.recipientId = this.props.params.address
      }else{
        console.log(query)
      }
      this.getBlocks(query);
    } else {
      let query = {
        offset: 0,
        limit: 10,
      }
      this.getCurrencyBlocks(query, role, currency);
    }
  }
  getBlocks = async (params = {}) => {
    this.setState({ loading: true });
    let query = qs.stringify(params);
    let url = "";

    if (this.state.searchAddress) {
      query = `address=${this.state.searchAddress}&${query}`;
      url = `http://${localStorage.getItem(
        "servicePeer"
      )}/api/getTransactionsByUser?${query}`;
    } else {
      url = `http://${localStorage.getItem(
        "servicePeer"
      )}/api/transactions?${query}`;
    }
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    const pagination = { ...this.state.pagination };

    pagination.total = data.count ? data.count : 100;
    this.setState({
      loading: false,
      data: data.transactions,
      pagination
    });
  };

  getCurrencyBlocks = async (query, role, currency) => {
    this.setState({ loading: true })
    let address = this.props.params.address
    let transactions = []
    let url = `http://${localStorage.getItem(
      "servicePeer"
    )}/api/aob/transactions/my/${address}/${currency}?${qs.stringify(query)}`;
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if (data.success) {
      if (role === "sender") {
        transactions = data.transactions.filter(item => item.senderId === address )
      } else if (role === "recipient") {
        transactions = data.transactions.filter(item => item.recipientId === address)
      } else if (role === "all") {
        transactions = data.transactions
      }
      const pagination = { ...this.state.pagination }
      pagination.total = data.count ? data.count : 100
      this.setState({
        loading: false,
        data: transactions,
        pagination
      });
    }
  }

  render() {
    return (
      <Table
        columns={columns(this)}
        bordered
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}
