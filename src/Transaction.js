import React, { Component } from 'react'
import { Table } from 'antd'
import 'whatwg-fetch'
import qs from 'qs'
import { I18n } from 'react-i18nify'
import { Link } from 'react-router-dom'

import Cnf from "./config"
import utils_slots from "./utils/slots"
import LimitText from './component/LimitText'

const columns = (self) => [{
    title: I18n.t('trs.id'),
    dataIndex: 'id',
    sorter: false,
    width: '15%',
    render: (text) => <LimitText link="/transactions/" target="_blank" title={text} />    
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
    width: '14%',
    render: text => <LimitText link="/accounts/" target="_blank" title={text} />  
  }, {
    title: I18n.t('trs.recipientId'),
    dataIndex: 'recipientId',
    sorter: false,
    width: '14%',
    render: (text) =>{ 
      var str=text;
      var arr=str.split('|');
      return <div>
        {
          arr.map((item, index) => { return <div key={index}><LimitText link="/accounts/" target="_blank" title={item} length={15} /></div> })
        }
      </div>
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
    width: '8%',
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
    width: '14%',
    render: text => `${I18n.l(utils_slots.getRealTime(Number(text)), {dateFormat: 'date'})}`
  }
];

class TransactionView extends Component {
  state = {
    data: [],
    pagination: {pageSize:10, current:0},
    loading: false,
    searchText: '',
  };

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchText !== this.state.searchText){
      this.setState({ searchText: nextProps.searchText }, function(){this.onSearch()});
    }
  }

  onSearch = async () => {
    const { searchText } = this.state;

    if (!searchText) {
      return
    }

    let url=''
    this.setState({ loading: true });
    let query = qs.stringify({ id: searchText });
    let patt1=new RegExp("D");
    if (patt1.test(query)) {
      let search = {
        offset: 0,
        limit: 10,
        orderBy: "t_timestamp:desc"
      }
      this.state.searchAddress = searchText
      this.getBlocks(search)
      return
    } else {
      url = `http://${localStorage.getItem("servicePeer")}/api/transactionss?${query}`
    }
    const response = await fetch(url, {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json()

    // Read total count from server
    const pager = { ...this.state.pagination };
    pager.current = 1;
    pager.total = 1;
    this.setState({
      pagination: pager,
      filterDropdownVisible: false,
      loading: false,
      data: data.transaction ? [data.transaction] : null,
    });
  }

  getBlocks = async (params = {}) => {
    this.setState({ loading: true });
    let query = qs.stringify(params);
    let url = ''

    if(this.state.searchAddress){
      query = `address=${this.state.searchAddress}&${query}`
      url = `http://${localStorage.getItem("servicePeer")}/api/getTransactionsByUser?${query}`
    }else{
      url = `http://${localStorage.getItem("servicePeer")}/api/transactions?${query}`
    }

    const response = await fetch(url, {
      method: 'get',
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

  componentDidMount() {
    this.getBlocks({ offset: 0, limit: 10, orderBy: "t_timestamp:desc"});
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

export default TransactionView;
