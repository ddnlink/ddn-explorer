import React, { Component } from 'react';
import { Table, Button } from 'antd';
import 'whatwg-fetch'
import qs from 'qs'
import {I18n} from 'react-i18nify'
import { Row } from 'antd/lib/grid';
import Cnf from "./config"
import utils_slots from "./utils/slots"
import utils_crypto from "./utils/crypto"

const columns = (self) => [{
  title: I18n.t('detail.label'),
  dataIndex: 'key',
  sorter: false,
  width: '15%',
}, {
  title: I18n.t('detail.content'),
  dataIndex: 'value',
  sorter: false,
  width: '35%',
}]
const trsColumns = (self) => [{
  title: I18n.t('trs.id'),
  dataIndex: 'id',
  sorter: false,
  width: '20%',
  render: (text, record, index) =>{ return <a onClick={self.toDetail.bind(self, text)} >{text}</a> }  
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
  render: (text, record, index) =>{ return <a onClick={self.toDetail.bind(self, text)} >{text}</a> }  
}, {
  title: I18n.t('trs.recipientId'),
  dataIndex: 'recipientId',
  sorter: false,
  width: '15%',
  render: (text, record, index) =>{ return <a onClick={self.toDetail.bind(self, text)} >{text}</a> }  
}, {
  title: I18n.t('trs.amount'),
  dataIndex: 'amount',
  sorter: false,
  width: '8%',
  render: text => `${text / 100000000.0}`+Cnf.coinName
}, {
  title: I18n.t('trs.fee'),
  dataIndex: 'fee',
  sorter: false,
  width: '6%',
  render: text => `${text / 100000000.0}`+Cnf.coinName
}, {
  title: I18n.t('trs.height'),
  dataIndex: 'height',
  sorter: false,
  width: '5%',
  render: (text, record, index) =>{ return <a onClick={self.toDetail.bind(self, text)} >{text}</a> }
}, {
  title: I18n.t('trs.timestamp'),
  dataIndex: 'timestamp',
  width: '12%',
  render: text => `${I18n.l(utils_slots.getRealTime(Number(text)), {dateFormat: 'date'})}`
}];
const obj2arr = (obj)=>{
  const array = []
  Object.keys(obj).forEach(item=>{
    if (Array.isArray(obj[item]) || typeof obj[item] === "object") {
      
    } else {
      array.push({key: item, value: obj[item]})          
    }
  })
  return array
}

class SearchView extends Component {

  state = {
    data: [],
    trs: null,    
    loading: false,
    searchText: '',
    pagination: {pageSize:10, current:0},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchText !== this.state.searchText) {
      this.setState({ searchText: nextProps.searchText }, function () { this.onSearch(nextProps.searchText) });
    }
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;

    this.setState({
      pagination: pager,
    });

    this.getUserTrs({
      limit: pagination.pageSize,
      offset: (pagination.current - 1) * pagination.pageSize,
      orderBy: "t_timestamp:desc"
    });
  }
  getUserTrs = async (params) => {
    console.log(this.state.searchText)
    const searchText = this.state.searchText
    if (!params) {
      params = {limit: 10, offset: 0, orderBy: "t_timestamp:desc"}
    }
    let url = `http://${localStorage.getItem("servicePeer")}/api/transactions?`
    params.ownerAddress = searchText
    let query = qs.stringify(params);
    const response = await fetch(url+query, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    const pagination = { ...this.state.pagination };

    pagination.total = data.count ? data.count : 100;
    console.log(data)
    if (data.success) {
      this.setState({
        trs: data.transactions,
        pagination
      });
    }
  }
  onSearch = async (searchText) => {
    //console.log('searchText11111111',searchText)
    if (!searchText) {
      return
    }
    let url = ''
    const params = {}

    this.setState({ loading: true, data:[], asset:[], trs:[] });

    if (utils_crypto.isAddress(searchText)) {
      params['address'] = searchText
      url = `http://${localStorage.getItem("servicePeer")}/api/accounts?`
    } else if (/^([1-9][0-9]*)$/.test(searchText)) {
      params['height'] = searchText
      url = `http://${localStorage.getItem("servicePeer")}/api/blocks/full?`
    } else {
      params['id'] = searchText
      url = `http://${localStorage.getItem("servicePeer")}/api/transactions/get?`
    }

    let query = qs.stringify(params);
    
    const response = await fetch(url+query, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    console.log(data)
    if (data.success) {
      const obj = data.block ? data.block : (data.transaction ? data.transaction : (data.account ? data.account : null))

      const array = []
      Object.keys(obj).forEach(item=>{
        if (item === 'transactions') {
          this.state.trs = obj[item]
        } else if (item === 'asset' && typeof obj[item] === 'object' ) {
          const arr = Object.values(obj[item])
          if (arr && arr.length>0 ) this.state.asset = obj2arr(arr[0])
        } else if (item === 'type') {
          array.push({key: item, value: I18n.t('types.'+obj[item])})           
        } else if (['balance', 'unconfirmedBalance', 'amount', 'fee', 'totalAmount', 'totalFee', 'reward'].indexOf(item) > -1 ) {
          array.push({key: item, value: `${obj[item]/100000000.0}`+Cnf.coinName})     
        } else {
          array.push({key: item, value: obj[item]})                    
        }
      })
      this.setState({
        loading: false,
        data: array,
      });
    } else {
      alert(data.error ? data.error : "Search Error")
    }
  }

  componentDidMount(nextProps) {
    this.setState({ searchText: this.props.searchText }, function () { this.onSearch(this.props.searchText) });
  }

  toDetail( text, e) {
    console.log('ssss',text)
    this.props.toSearch(text)
  }

  render() {
    return (
      <div>
      <Table columns={columns(this)}
      bordered
        rowKey={record => record.key}
        dataSource={this.state.data}
        loading={this.state.loading}
        showHeader={false}
        pagination={false}
      />
      {utils_crypto.isAddress(this.state.searchText) ? <Row>    <Button  type="primary" onClick={()=>{this.getUserTrs({limit: 10, offset: 0, orderBy: "t_timestamp:desc"})}}>交易记录</Button>
</Row>:null }
      {this.state.trs && this.state.trs.length > 0 ? (
        <div>
        <p style={{marginTop:"20px"}}>{I18n.t('detail.blockTip')}</p>
        <Table columns={trsColumns(this)}
       bordered
         rowKey={record => record.id}
         dataSource={this.state.trs}
         loading={this.state.loading}
         pagination={this.state.pagination}
         onChange={this.handleTableChange}
         /></div>
      ) : null}

{this.state.asset && this.state.asset.length > 0 ? (
        <div>
        <p style={{marginTop:"20px"}}>{I18n.t('detail.trsTip')}</p>
        <Table columns={columns(this)}
       bordered
         rowKey={record => record.key}
         dataSource={this.state.asset}
         loading={this.state.loading}
         pagination={false}
       /></div>
      ) : null}
      
</div>
    );
  }
}

export default SearchView;
