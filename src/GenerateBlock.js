import React, { Component } from 'react';
import { Table , Button} from 'antd';
import 'whatwg-fetch'
import qs from 'qs'
import moment from 'moment'


const columns = [
{
title: '序号',
render: (text, record, index) =>{ return record.index+1}
},
{
title: '铸造者钱包地址',
render: (text, record, index) =>{ return crypto.getAddress(record.publicKey)}
},
{
  title: '铸造时间',
  render: (text, record, index) => {if(record.timestamp){
    return `${moment.unix(Number(record.timestamp)+Date.UTC(2017, 7, 20, 12, 20, 20, 20)/1000).format("YYYY年MMMDD HH:mm:ss")}`}}
},
{
  title: '区块高度',
  dataIndex: 'blockHeight',
  sorter: false,
  width: '15%',
}
,{
  title: '状态',
  sorter: false,
  width: '15%',
  render: (text, record, index) =>{return record.state}
},{
  title: '区块ID',
  dataIndex: 'blockId',
  sorter: false,
  width: '20%',
}];

class GenerateBlockView extends Component {
  state = {
    data: [],
    pagination: {pageSize:10, current:0},
    loading: false,
    searchText: '',
    index : 0
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
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
    let patt1=new RegExp("E");
    console.log('query',query)
    if(patt1.test(query)){
      let search = {
                    offset:0,
                    limit:10
                  }
                    this.state.searchAddress = searchText
       this.getBlocks(search) 
       return
    }else{
       url = `http://${localStorage.getItem("servicePeer")}/api/transaction?${query}`
    }
    const response = await fetch(url, {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json()
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
    let  url = `http://39.108.121.97:8000/api/round?${query}`
    const response = await fetch(url, {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json()
    let limitnum = data.round[0].endBlockHeight - data.round[0].startBlockHeight + 1
     query = qs.stringify({offset : 0 ,
                        limit :  limitnum });
                        console.log('query',query)
    let  url2 = `http://39.108.121.97:8000/api/blocks?${query}`
    const response2 = await fetch(url2, {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data2 = await response2.json()
    let generate = []
    if(!data && !data2 ){
        console.log('data or data2 is null')
        return
    }
    let i = 0
    let index = 0
    console.log(data2.blocks.length)
    data2.blocks.reverse()
    for(let delegate of data.round[0].delegates){
      let generateAccount = {
        publicKey : '',
        blockId : '',
        blockHeight : '',
        index: index++,
        timestamp:'',
        state:'',
          }
        if(data2.blocks[i] && delegate == data2.blocks[i].generatorPublicKey){
              generateAccount.publicKey = delegate
              generateAccount.blockId = data2.blocks[i].id
              generateAccount.blockHeight = data2.blocks[i].height
              generateAccount.index = index++
              generateAccount.timestamp = data2.blocks[i].timestamp
              generateAccount.state = '铸造成功'
            ++i
        }else{
          if(i<data2.blocks.length){
            generateAccount.publicKey = delegate,
            generateAccount.state = '铸造失败'
   
          }else{
            generateAccount.publicKey = delegate,
            generateAccount.state = '等待铸造' 
          } 
        }
        generate.push(generateAccount)
    }
    console.log('generate',generate.length)
    const pagination = { ...this.state.pagination };
 pagination.total = generate ? generate.length : 0;
      this.setState({
        loading: false,
        data : generate,
        pagination,
      });

  }
  componentDidMount() {
    this.getBlocks({offset:0,limit:1});
  }
chenge= async () =>{ //这里使用同步方法则会报错，显示this.setState()undefined
  this.setState({}, function(){this.getBlocks({offset:0,limit:1})});
}
  render() {
    return (
      <div>
        <Button  type="primary" onClick={this.chenge}>刷新</Button>
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

export default GenerateBlockView;
