/**
 * 账户页面： 仅仅显示基本信息
 */
import React, { Component } from 'react';
import { Table } from 'antd';
//import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
//import DataSet from '@antv/data-set'
import 'whatwg-fetch'
import qs from 'qs'
import {I18n} from 'react-i18nify'
import {Link} from "react-router-dom"
import Cnf from "./config"

//const { Html } = Guide
//const dv = new DataSet.View();

const columns = (self) => [{
  title: I18n.t('account.address'),
  dataIndex: 'address',
  sorter: false,
  width: '30%',
  render: (text) =>{ return <Link to={"/accounts/"+text} target="_blank">{text}</Link>}
}, {
  title: I18n.t('account.balance') + `(${Cnf.coinName})`,
  dataIndex: 'balance',
  sorter: false,
  width: '20%',
  render: (text, record, index) => {
    if (record.balance > 100000000) {
      return Number(record.balance / 100000000)
    } else {
      return Number(record.balance) + 'd'
    }
  }
}, {
  title: I18n.t('account.publicKey'),
  dataIndex: 'publicKey',
}];

class AccountView extends Component {
  state = {
    data: [],
    pagination: {pageSize: 20},
    loading: false,
    filterDropdownVisible: false,
    searchText: '',
    barData: []
  }

  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
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

    // Read total count from server
    const pager = { ...this.state.pagination };

    pager.current = 1;

    pager.total = 1;

    this.setState({
      pagination: pager,
      filterDropdownVisible: false,
      loading: false,
      data: data.account ? [data.account] : null,
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
      offset: (pagination.current - 1) * pagination.pageSize
    });
  }
  
  getBlocks = async (params = {}) => {
    this.setState({ loading: true });
    let query = qs.stringify(params);
    let url = `http://${localStorage.getItem("servicePeer")}/api/accounts/top?${query}`
    
    const response = await fetch(url, {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    })

    const data = await response.json()

    const pagination = { ...this.state.pagination };
 
    pagination.total = data.totalCount ? data.totalCount : 100;

    if(this.state.barData.length < 1){
      let barData = data.accounts.map((item)=>{
        let col = {};
        col.item = item.address
        col.count = item.balance
        return col;
      });
      this.setState({barData: barData})
    }

    this.setState({
      loading: false,
      data: data.accounts,
      pagination,
    });
  }

  componentDidMount() {
    this.getBlocks({ offset: 1, limit: 20 });
  }

  render() {
    // dv.source(this.state.barData).transform({
    //   type: 'percent',
    //   field: 'count',
    //   dimension: 'item',
    //   as: 'percent'
    // });
    // const cols = {
    //   percent: {
    //     formatter: val => {
    //       val = (val * 100).toFixed(2) + '%';
    //       return val;
    //     }
    //   }
    // }     
    return (
      <div>
         {/* <Chart height={400} data={dv} scale={cols} padding={[ 80, 100, 80, 0 ]} forceFit>
          <Coord type={'theta'} radius={0.9} innerRadius={0.7} />
          <Axis name="percent" />
          <Tooltip 
            showTitle={false} 
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            />
          <Guide >
            <Html position ={[ '50%', '50%' ]} html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">前<br><span style="color:#262626;font-size:2.5em">20个</span><br>账户</div>' alignX='middle' alignY='middle'/>
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color='item'
            tooltip={['item*percent',(item, percent) => {
              percent = percent * 100 + '%';
              return {
                name: item,
                value: percent
              };
            }]}
            style={{lineWidth: 1,stroke: '#fff'}}
            >
            <Label content='percent' 
                htmlTemplate={(val, item, index)=>{
                  // text 为每条记录 x 属性的值
                  // item 为映射后的每条数据记录，是一个对象，可以从里面获取你想要的数据信息
                  // index 为每条记录的索引
                  var point = item.point; // 每个弧度对应的点
                  var percent = point['percent'];
                  percent = (percent * 100).toFixed(2) + '%';
                  // 自定义 html 模板
                  return `<span style="color:${point.color}">${point.item}:${val}</span>`;
                }}
                />
          </Geom>
        </Chart>  */}
        <Table columns={columns(this)}
          bordered
          rowKey={record => record.address}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />        
      </div>
    );
  }
}

export default AccountView;
