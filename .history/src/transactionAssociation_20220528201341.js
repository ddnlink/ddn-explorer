import React, { Component } from "react"
import { Table, Input } from "antd"
import "whatwg-fetch"
import qs from "qs"
import { Row, Button, Icon } from "antd"

import Cnf from "./config"

const ButtonGroup = Button.Group;

const columns = [
  {
    title: "交换ID",
    dataIndex: "id",
    width: "15%"
  },
  {
    title: "状态",
    dataIndex: "state",
    width: "5%"
  },

  {
    title: "转出金额",
    width: "15%",

    render: (text, record, index) => {
      if (record.asset.amount > 100000000) {
        return Number(record.asset.amount / 100000000) + Cnf.coinName;
      } else {
        return Number(record.asset.amount) + "e";
      }
    }
  },
  {
    title: "交换备注",
    width: "15%",
    render: (text, record, index) => {
      return record.asset.remarks;
    }
  },
  {
    title: "转出地址",
    dataIndex: "asset",
    width: "15%",
    render: (text, record, index) => {
      return record.asset.recipientId;
    }
  },
  {
    title: "<--发起账户",
    width: "15%",
    render: (text, record, index) => {
      return record.address;
    }
  },
  {
    title: "<--中转账户",
    width: "15%",
    render: (text, record, index) => {
      if (record.middleAccount) {
        return record.middleAccount;
      } else {
        return "0或1级交换没有中转账户";
      }
    }
  }
];
class AssociationView extends Component {
  state = {
    data: [],
    datatransaction1: [],
    datatransaction2: [],
    datatransactionOne1: [],
    datatransactionOne2: [],
    datatransactionTwo1: [],
    datatransactionTwo2: [],
    data1: "",
    data2: 0,
    dataE1: 0,
    status: "否",
    Txt: "",
    Txt2: "",
    pagination: { pageSize: 10, current: 0 },
    loading: false,
    searchText: "",
    columns: columns
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    // this.getBlocks({
    //   limit: pagination.pageSize,
    //   offset: (pagination.current-1)*pagination.pageSize
    // });
  };
  componentWillReceiveProps(nextProps) {
    console.log("nextProps=============", nextProps);
    // if (nextProps.searchText !== this.state.searchText){
    //   this.setState({ searchText: nextProps.searchText }, function(){this.onSearch()});
    // }
  }
  onSearch = async (Txt, Txt2) => {
    this.setState({ loading: true });
    this.state.data = [];
    this.state.datatransaction1 = [];
    this.state.datatransaction2 = [];
    this.state.datatransaction1 = await this.getTransaction(Txt, Txt2);
    //this.state.datatransaction2 = await this.RecipientId(Txt,Txt2)
    const pagination = { ...this.state.pagination };
    pagination.total = this.state.data.length;
    this.setState({
      loading: false,
      data: this.state.data,
      pagination,
      Txt,
      Txt2
    });
    return
  };
  RecipientId = async (searchText, Txt2) => {
    if (!searchText) {
      return;
    }
    let query = `recipientId=${searchText}`;
    let url = `http://${localStorage.getItem(
      "servicePeer"
    )}/api/getTrsByRecipient?${query}`
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    let transactions = data.transactions ? data.transactions : null;
    let transactions2 = [];
    for (let trs of transactions) {
      if (trs.type === 0) {
        transactions2.push(trs);
        trs.address === Txt2 && this.setState({data: this.state.data.push(trs)})
      }
    }
    return transactions2;
  };
  getAccount = async searchText => {
    if (!searchText) {
      return;
    }
    this.setState({ loading: true });
    let query = qs.stringify({ address: searchText });
    let url = `http://${localStorage.getItem(
      "servicePeer"
    )}/api/getAccount?${query}`;
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    // console.log('data',data.account)
    // // Read total count from server
    // console.log('data.account.balance',data.account.balance)
    const balance = data.account
      ? Number(data.account.balance / 100000000) + Cnf.coinName
      : null;

    this.setState({
      filterDropdownVisible: false,
      loading: false,
      data1: data.account ? balance : null
    });
  };
  getTransaction = async (Txt, Txt2, address) => {
    let query = `address=${Txt}`;
    let url = `http://${localStorage.getItem(
      "servicePeer"
    )}/api/getTransactionsByUser?${query}`;
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    let datatransaction = data.transactions ? data.transactions : null;
    let datatransaction2 = [];
    if (address) {
      for (let trs of datatransaction) {
        if (trs.type === 0) {
          datatransaction2.push(trs);
          trs.asset.recipientId === Txt2 && await this.middleAccount(trs, address)
        }
      }
    } else {
      for (let trs of datatransaction) {
        if (trs.type === 0) {
          datatransaction2.push(trs);
          trs.asset.recipientId === Txt2 && this.setState({data: this.state.data.push(trs)})
        }
      }
    }
    return datatransaction2;
  };
  OneSearch = async () => {
    let Txt = document.getElementById("Txt").value;
    let Txt2 = document.getElementById("Txt2").value;
    Txt = Txt.trim();
    Txt2 = Txt2.trim();
    if (!Txt && !Txt2) {
      return;
    }
    this.state.datatransactionOne1 = [];
    this.state.datatransactionOne2 = [];
    this.state.data = [];
    this.setState({ loading: true });
    if (!Txt === this.state.Txt && !Txt2 === this.state.Txt2) {
      await this.search();
    }
    for (let trs of this.state.datatransaction1) {
      if (
        trs.asset.recipientId !== "7752275658006432135E" ||
        trs.asset.recipientId !== "1670247850439486879E" ||
        trs.asset.recipientId !== "10681075344889869527E"
      ) {
        this.state.datatransactionOne1 = this.state.datatransactionOne1.concat(
          await this.getTransaction(trs.asset.recipientId, Txt2)
        );
      }
      console.log("==============this", this.state.datatransactionOne1.length);
    }
    //    for(let trs of this.state.datatransactionOne2){
    //     this.state.datatransactionTwo2 += await this.RecipientId(trs.asset.recipientId,Txt2)
    //  }
    console.log(
      "this.state.datatransactionOne1.length",
      this.state.datatransactionOne1.length
    );
    console.log("this.state.data.length", this.state.data);
    console.log(
      "this.state.datatransactionOne2.length",
      this.state.datatransactionOne2.length
    );

    const pagination = { ...this.state.pagination };
    pagination.total = this.state.data.length;
    this.setState({
      loading: false,
      data: this.state.data,
      pagination
    });
  };
  TwoSearch = async () => {
    let Txt = document.getElementById("Txt").value;
    let Txt2 = document.getElementById("Txt2").value;
    Txt = Txt.trim();
    Txt2 = Txt2.trim();
    if (!Txt && !Txt2 && Txt === Txt2) {
      return;
    }
    this.setState({ loading: true });
    this.state.datatransactionTwo1 = [];
    this.state.datatransactionTwo2 = [];
    this.state.data = [];
    if (!Txt === this.state.Txt && !Txt2 === this.state.Txt2) {
      await this.search();
      await this.OneSearch();
    } else if (this.state.datatransactionOne1.length < 0) {
      await this.OneSearch();
    }
    for (let trs of this.state.datatransactionOne1) {
      if (
        trs.asset.recipientId !== "7752275658006432135E" ||
        trs.asset.recipientId !== "1670247850439486879E" ||
        trs.asset.recipientId !== "10681075344889869527E"
      ) {
        let transactions = await this.getTransaction(
          trs.asset.recipientId,
          Txt2,
          trs.address
        );
      }
    }
    //    for(let trs of this.state.datatransactionOne2){
    //     this.state.datatransactionTwo2 += await this.RecipientId(trs.asset.recipientId,Txt2)
    //  }
    console.log(
      "this.state.datatransactionTwo1.length",
      this.state.datatransactionTwo1.length
    );
    console.log("this.state.data.length", this.state.data);
    console.log(
      "this.state.datatransactionOne2.length",
      this.state.datatransactionTwo1.length
    );

    const pagination = { ...this.state.pagination };
    pagination.total = this.state.data.length;
    this.setState({
      loading: false,
      data: this.state.data,
      pagination
    });
  };
  middleAccount = async (transaction, address) => {
    transaction.middleAccount = address;
    this.state.data.push(transaction);
  };
  search = async () => {
    let Txt = document.getElementById("Txt").value;
    let Txt2 = document.getElementById("Txt2").value;
    Txt = Txt.trim();
    Txt2 = Txt2.trim();
    if (!Txt && !Txt2 && Txt === Txt2) {
      return;
    }
    await this.onSearch(Txt, Txt2);
  };
  componentDidMount() {
    //this.getBlocks({offset:0, limit:10});
  }
  render() {
    return (
      <div>
        <Row type="flex" justify="space-between">
          <Input
            id="Txt"
            type="text"
            style={{ width: "200px", height: "30px" }}
            placeholder=" 钱包地址1,不能为空"
          />
          <Input
            id="Txt2"
            type="text"
            style={{ width: "200px", height: "30px" }}
            placeholder="钱包地址2,不能为空"
          />
          <button
            type="button"
            onClick={this.search}
            style={{
              width: "50px",
              height: "30px",
              lineHeight: "26px",
              color: "#000",
              marginLeft: "10px"
            }}
          >
            搜索
          </button>
          <ButtonGroup>
            <Button type="primary" onClick={this.OneSearch}>
              <Icon type="left" />一级查询
            </Button>
            <Button type="primary" onClick={this.TwoSearch}>
              二级查询<Icon type="right" />
            </Button>
          </ButtonGroup>
        </Row>
        <Table
          columns={columns}
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

export default AssociationView;
