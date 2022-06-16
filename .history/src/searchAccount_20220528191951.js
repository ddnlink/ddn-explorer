import React, { Component } from 'react';
import { Table ,Input} from 'antd';
import 'whatwg-fetch'
import qs from 'qs'
import moment from 'moment'
import { Row, Col ,Button ,Icon} from 'antd';
import Cnf from "./config"

const ButtonGroup = Button.Group;


const columns = [{
  title: '交易ID',
  dataIndex: 'id',
  sorter: false,
  width: '15%',
}, 
{
  title: '交易类型',
  dataIndex: 'type',
  sorter: false,
  width: '5%',
},{
  title: '状态',
  dataIndex: 'state',
  sorter: false,
  width: '5%',
},
{
title: '转出地址',
dataIndex: 'asset',
sorter: false,
width: '15%',
render: (text, record, index) =>{ return record.asset.recipientId}
},
{
title: '转出金额',
sorter: false,
width: '15%',
render: (text, record, index) =>{  
    if (record.asset.amount > 100000000) {
        return Number(record.asset.amount / 100000000) + Cnf.coinName
      } else {
        return Number(record.asset.amount) + 'e'
      }}
},
{
title: '交易备注',
sorter: false,
width: '15%',
render: (text, record, index) =>{ return record.asset.remarks}
},
{
    title: '发起账户',
    sorter: false,
    width: '15%',
    render: (text, record, index) =>{ return crypto.getAddress(record.senderPublicKey)}
}
];
class SearchAccountView extends Component {
  state = {
    data: [],
    dataE: [],
    dataO:[],
    data1: '',
    data2: 0,
    dataE1: 0,
    status:'否',
    pagination: {pageSize:10, current:0},
    loading: false,
    searchText: '',
    columns: columns,
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    // this.getBlocks({
    //   limit: pagination.pageSize,
    //   offset: (pagination.current-1)*pagination.pageSize
    // });
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
    let patt1=new RegExp("E");
    console.log('query',query)
    if(patt1.test(query)){
      let search = {
                    offset:0,
                    limit:1000
                  }
      this.state.searchAddress = searchText
      await this.getBlocks() 
      await this.getAccount(searchText)
      await this.RecipientId(searchText)
       return
    }else{

    }
 
  }
  RecipientId = async (searchText) =>{
    if (!searchText) {
        return
      }
      this.setState({ loading: true });
        let  query = `recipientId=${this.state.searchAddress}`
        let url = `http://${localStorage.getItem("servicePeer")}/api/getTrsByRecipient?${query}`
          console.log('url',url)
    
        const response = await fetch(url, {
          method: 'get',
          headers: {
            "Content-Type": "application/json"
          },
        })
        const data = await response.json()
          for(let trs of data.transactions){
              console.log('---RecipientId----',trs.asset.amount)
              this.state.dataE1 += Number(trs.asset.amount)
              //this.state.data.push(trs)
          }
          this.state.dataE = data.transactions
          this.state.dataE1 = Number(this.state.dataE1 / 100000000) + Cnf.coinName
           console.log('this.state.dataE1----------',this.state.dataE1)
           this.setState({
            loading: false, 
          });
          const pagination = { ...this.state.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          
          this.setState({
            loading: false,
            pagination,
          }); 
      
  }
  getAccount = async (searchText) =>{
        if (!searchText) {
          return
        }
        this.setState({ loading: true });
        let query = qs.stringify({ address: searchText });
        let url = `http://${localStorage.getItem("servicePeer")}/api/getAccount?${query}`
        const response = await fetch(url, {
          method: 'get',
          headers: {
            "Content-Type": "application/json"
          },
        })
        const data = await response.json()
        // console.log('data',data.account)
        // // Read total count from server
        // console.log('data.account.balance',data.account.balance)
        const balance = data.account ? Number(data.account.balance / 100000000) + Cnf.coinName : null
       
        this.setState({
          filterDropdownVisible: false,
          loading: false,
          data1: data.account ?  balance : null,
        });
        console.log(this.state.data1)
  }
  getBlocks = async (params = {}) => {
    this.setState({ loading: true });
    let query = qs.stringify(params);
    let url = ''

    if(this.state.searchAddress){
    //   query = `recipientId=${this.state.searchAddress}&${query}`
    //   url = `http://${localStorage.getItem("servicePeer")}/api/getTrsByRecipient?${query}`
    query = `address=${this.state.searchAddress}&${query}`
    url = `http://${localStorage.getItem("servicePeer")}/api/getTransactionsByUser?${query}`
      console.log('url',url)
    }else{
     // url = `http://${localStorage.getItem("servicePeer")}/api/transactions?${query}`
    }

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
      pagination.total = data.count ? data.count : 0;
      this.state.dataO = data.transactions ? data.transactions : null
      this.setState({
        loading: false,
        data: data.transactions,
        pagination,
      });
      for(let trs of data.transactions){
          console.log('---',data.count)
          if(trs.asset.recipientId == '1670247850439486879E'){
              this.state.status = '是'
          }
          this.state.data2 += Number(trs.asset.amount)
      }
       this.state.data2 = Number(this.state.data2 / 100000000) + Cnf.coinName
  }
  TurnIn= async () =>{
   this.setState({ loading: true });
   const pagination = { ...this.state.pagination };
   pagination.total = this.state.dataE.length
   this.setState({
    loading: false,
    data: this.state.dataE,
    pagination,
  });
  
  }
  TurnOut= async () =>{
    this.setState({ loading: true });
    const pagination = { ...this.state.pagination };
    pagination.total = this.state.dataO.length
    this.setState({
     loading: false,
     data: this.state.dataO,
     pagination,
   });
  }
  componentDidMount() {
    //this.getBlocks({offset:0, limit:10});
  }
  render() {
    return (
    <div>
      <Row type="flex" justify="space-between">
        <Col span={4}>
       当前余额：<span style={{color:"red"}}>{this.state.data1}</span>
       </Col>
       <Col span={4}>
       转出金额：<span style={{color:"red"}}>{this.state.data2}</span>
       </Col>
       <Col span={4}>
       转入金额：<span style={{color:"red"}}>{this.state.dataE1}</span>
       </Col>
       <Col span={4}>
       是否进入过交易市场：<span style={{color:"red"}}>{this.state.status}</span>
       </Col>
    <ButtonGroup>
      <Button  type={this.state.data === this.state.dataE ? "primary" : ""} onClick={this.TurnIn}><Icon type="left" />转入</Button>
      <Button  type={this.state.data === this.state.dataO ? "primary" : ""}  onClick={this.TurnOut}><Icon type="right" />转出</Button>
    </ButtonGroup>
    </Row>
      <Table columns={columns}
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

export default SearchAccountView;
