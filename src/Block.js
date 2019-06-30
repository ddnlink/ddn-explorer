import React, { Component } from "react";
import { Table } from "antd";
import "whatwg-fetch";
import qs from "qs";
import { I18n } from "react-i18nify";
import { Link } from "react-router-dom";

import Cnf from "./config"
import utils_slots from "./utils/slots";
import LimitText from "./component/LimitText"



const columns = self => [
  {
    title: I18n.t("block.id"),
    dataIndex: "id",
    sorter: false,
    width: "15%",
    render: text => <LimitText title={text} length={15} />
  },
  {
    title: I18n.t("block.height"),
    dataIndex: "height",
    sorter: false,
    width: "10%",
    render: (text, record, index) => {
      return (
        <Link to={"/blocks/" + text} target="_blank">
          {text}
        </Link>
      );
    }
  },
  {
    title: I18n.t("block.numberOfTransactions"),
    dataIndex: "numberOfTransactions",
    sorter: false,
    width: "10%"
  },
  {
    title: I18n.t("block.reward") + `(${Cnf.coinName})`,
    dataIndex: "reward",
    sorter: false,
    width: "10%",
    render: (text, record, index) => {
      return Math.floor(Number(record.reward) / 100000000)
    }
  },
  {
    title: I18n.t("block.totalAmount")+ `(${Cnf.coinName})`,
    dataIndex: "totalAmount",
    sorter: false,
    width: "10%",
    render: text => {
      return Math.floor(Number(text) / 100000000)
    }
  },
  {
    title: I18n.t("block.totalFee") + `(${Cnf.coinName})`,
    dataIndex: "totalFee",
    sorter: false,
    width: "10%",
    render: text => `${text / 100000000.0}` 
  },
  {
    title: I18n.t("block.generatorId"),
    dataIndex: "generatorId",
    sorter: false,
    width: "15%",
    render: text => <LimitText link="/accounts/" title={text} length={15} target="_blank" />
  },
  {
    title: I18n.t("block.timestamp"),
    dataIndex: "timestamp",
    width: "15%",
    render: text =>
      `${I18n.l(utils_slots.getRealTime(Number(text)), {
        dateFormat: "date"
      })}`
  }
];

class BlockView extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
    searchText: ""
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });

    this.getBlocks({
      limit: pagination.pageSize,
      offset: (pagination.current - 1) * pagination.pageSize,
      orderBy: "height:desc"
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchText !== this.state.searchText) {
      this.setState({ searchText: nextProps.searchText }, function() {
        this.onSearch();
      });
    }
  }

  onSearch = async () => {
    const { searchText } = this.state;
    if (!searchText) {
      return;
    }
    this.setState({ loading: true });
    let query = qs.stringify({ id: searchText });
    let url = `http://${localStorage.getItem(
      "servicePeer"
    )}/api/blocks?${query}`;
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    // Read total count from server
    const pager = { ...this.state.pagination };
    pager.current = 1;
    pager.total = 1;
    this.setState({
      pagination: pager,
      filterDropdownVisible: false,
      loading: false,
      data: data.block
    });
  };

  getBlocks = async (params = {}) => {
    this.setState({ loading: true });
    let query = qs.stringify(params);
    let url = `http://${localStorage.getItem(
      "servicePeer"
    )}/api/blocks?${query}`;

    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    const pagination = { ...this.state.pagination };
    // Read total count from server
    // pagination.total = data.totalCount;
    pagination.total = data.count ? data.count : 100;
    this.setState({
      loading: false,
      data: data.blocks,
      pagination
    });
  };

  componentDidMount() {
    this.getBlocks({ offset: 0, limit: 10, orderBy: "height:desc" });
  }

  render() {
    return (
      <Table
        columns={columns(this)}
        bordered
        rowKey={record => record.height}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default BlockView;
