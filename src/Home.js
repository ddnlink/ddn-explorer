import React, { Component } from "react"
import qs from "qs"
import { Link } from "react-router-dom"
import { Table } from "antd"
import { I18n } from "react-i18nify"
import moment from "moment"

import Cnf from "./config"
import "./Home.css"
import utils_slots from "./utils/slots"
import LimitText from './component/LimitText'

const transColumns = self => [
  {
    title: I18n.t("trs.id"),
    dataIndex: "id",
    sorter: false,
    width: "15%",
    render: text => <LimitText title={text} link="/transactions/" />
  },
  {
    title: I18n.t("trs.type"),
    dataIndex: "type",
    sorter: false,
    width: "8%",
    render: text => I18n.t("types." + text)
  },
  {
    title: I18n.t("trs.senderId"),
    dataIndex: "senderId",
    sorter: false,
    width: "15%",
    render: text => <LimitText link="/accounts/" title={text} target="_blank" />
  },
  {
    title: I18n.t("trs.recipientId"),
    dataIndex: "recipientId",
    sorter: false,
    width: "15%",
    render: (text) => {
      let str = text;
      if (str) {
        let arr = str.split("|");
        return (
          <div>
            { arr.map((item, index) => <div key={index}><LimitText target="_blank" title={item} link="/accounts/" /></div>) }
          </div>
        )
      } else {
        return (<span></span>)
      }
    }
  },
  {
    title: I18n.t("trs.amount") + `(${Cnf.coinName})`,
    dataIndex: "amount",
    sorter: false,
    width: "6%",
    render: text => `${text / 100000000.0}`
  },
  {
    title: I18n.t("trs.fee") + `(${Cnf.coinName})`,
    dataIndex: "fee",
    sorter: false,
    width: "6%",
    render: text => `${text / 100000000.0}`
  },
  {
    title: I18n.t("trs.height"),
    dataIndex: "height",
    sorter: false,
    width: "10%",
    render: text => (
      <Link to={"/blocks/" + text} target="_blank">
        {text}
      </Link>
    )
  },
  {
    title: I18n.t("trs.timestamp"),
    dataIndex: "timestamp",
    width: "12%",
    render: text =>
      `${I18n.l(utils_slots.getRealTime(Number(text)), {
        dateFormat: "date"
      })}`
  }
];

const blockColumns = self => [
  {
    title: I18n.t("block.id"),
    dataIndex: "id",
    sorter: false,
    width: "15%",
    render: text => <LimitText title={text} />
  },
  {
    title: I18n.t("block.height"),
    dataIndex: "height",
    sorter: false,
    width: "10%",
    render: (text) => {
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
    render: text => <LimitText link="/accounts/" title={text} target="_blank" length={15} />
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

// const assetColumns = self => [
//   {
//     title: I18n.t("block.id"),
//     dataIndex: "id",
//     sorter: false,
//     width: "15%"
//   },
//   {
//     title: I18n.t("block.height"),
//     dataIndex: "height",
//     sorter: false,
//     width: "10%",
//     render: (text) => {
//       return (
//         <Link to={"/blocks" + text} target="_blank">
//           {text}
//         </Link>
//       );
//     }
//   },
//   {
//     title: I18n.t("block.numberOfTransactions"),
//     dataIndex: "numberOfTransactions",
//     sorter: false,
//     width: "10%"
//   },
//   {
//     title: I18n.t("block.reward"),
//     dataIndex: "reward",
//     sorter: false,
//     width: "10%",
//     render: (text, record, index) => {
//       return Math.floor(Number(record.reward) / 100000000) + Cnf.coinName;
//     }
//   },
//   {
//     title: I18n.t("block.totalAmount"),
//     dataIndex: "totalAmount",
//     sorter: false,
//     width: "15%",
//     render: text => {
//       return Math.floor(Number(text) / 100000000) + Cnf.coinName;
//     }
//   },
//   {
//     title: I18n.t("block.totalFee"),
//     dataIndex: "totalFee",
//     sorter: false,
//     width: "10%",
//     render: text => `${text / 100000000.0}`+Cnf.coinName
//   },
//   {
//     title: I18n.t("block.generatorId"),
//     dataIndex: "generatorId",
//     sorter: false,
//     width: "15%",
//     render: (text, record, index) => {
//       return (
//         <Link to={"/accounts" + text} target="_blank">
//           {text}
//         </Link>
//       );
//     }
//   },
//   {
//     title: I18n.t("block.timestamp"),
//     dataIndex: "timestamp",
//     render: text =>
//       `${I18n.l(utils_slots.getRealTime(Number(text)), {
//         dateFormat: "date"
//       })}`
//   }
// ];

class Home extends Component {
  state = {
    latestBlocks: [],
    latestTrans: [],
    // latestAssets: [],
    tansLoading: false,
    blockLoading: false,
    // assetLoading: false,
    ddnSupply: 0,
    totalAccounts: 0,
    currentHeight: 0,
    reward: 0,
    ddnBtc: 0,
    ddnEth: 0,
    initTime: "",
    duration: 0
  };
  componentDidMount() {
    this.getBlocks({ offset: 0, limit: 10, orderBy: "height:desc" });
    this.getTransactions({ offset: 0, limit: 10, orderBy: "t_timestamp:desc" });
    // this.getAssets({ offset: 0, limit: 10, orderBy: "t_timestamp:desc" });
    this.getStatus();
    this.getAccountsNum();
    this.getTimeData();
    //this.getDdnBtc();
    // this.getDdnEth();
  }

  componentWillUnmount(){
    this.timer && clearTimeout(this.timer);
  }
  getTimeData = () => {
    let beginEpochTime = utils_slots.beginEpochTime();
    let initTime = I18n.l(beginEpochTime, { dateFormat: "date"})
    let duration = moment().diff(beginEpochTime, "days");
    this.setState({
      initTime: initTime,
      duration: duration
    });
  };
  getDdnBtc = async () => {
    let url = "https://www.bit-z.com/api_v1/ticker?coin=ddn_btc";
    const response = await fetch(url, {
      method: "get",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    this.setState({ddnBtc: data.data.last})
  };
  getDdnEth = async () => {
    let url = "https://www.bit-z.com/api_v1/ticker?coin=ddn_eth";
    const response = await fetch(url, {
      method: "get",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    });
    const data = await response.json();
    this.setState({ ddnEth: data.data.last });
  };
  getStatus = async () => {
    let url = `http://${localStorage.getItem(
      "servicePeer"
    )}/api/blocks/getStatus`;
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    this.setState({
      ddnSupply: (data.supply / 100000000).toFixed(2),
      currentHeight: data.height,
      reward: Math.floor(data.reward / 100000000)
    });
    let self = this;
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(function() {
      self.getStatus();
    }, 10000);
  };
  getAccountsNum = async () => {
    let url = `http://${localStorage.getItem(
      "servicePeer"
    )}/api/accounts/count`;
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    this.setState({
      totalAccounts: data.count
    });
  };
  getBlocks = async (params = {}) => {
    this.setState({ blockLoading: true });
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
    this.setState({
      blockLoading: false,
      latestBlocks: data.blocks
    });
  };

  getTransactions = async (params = {}) => {
    this.setState({ tansLoading: true });
    let query = qs.stringify(params);
    let url = `http://${localStorage.getItem(
      "servicePeer"
    )}/api/transactions?${query}`;

    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    this.setState({
      tansLoading: false,
      latestTrans: data.transactions
    });
  };

  getAssets = async (params = {}) => {
    this.setState({ assetLoading: true });
    let query = qs.stringify(params);
    let url = `http://${localStorage.getItem(
      "servicePeer"
    )}/api/transactions?type=15&${query}`;
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    this.setState({
      assetLoading: false,
      latestAssets: data.transactions
    });
  };

  rowClassName = (record, index) => {
    if (index % 2 !== 0) {
      return "stripe";
    }
  };
  render() {
    const {
      latestBlocks,
      latestTrans,
      // latestAssets,
      tansLoading,
      blockLoading,
      // assetLoading,
      currentHeight,
      // ddnBtc,
      // ddnEth,
      ddnSupply,
      totalAccounts,
      initTime,
      duration
    } = this.state;
    return (
      <div>
        <div className="bigBanner">
          <div style={{ display: "flex" }}>
            <div className="pannel">
              <div className="ptitle">{I18n.t("home.height")}</div>
              <div className="number">{currentHeight}</div>
            </div>
            {/* <div className="pannel">
                <div>DDN/BTC</div>
                <div>{ddnBtc}</div>                
              </div>
              <div className="pannel">
                <div>DDN/ETH</div>
                <div>{ddnEth}</div>                 
              </div> */}
            <div className="pannel">
              <div className="ptitle">{I18n.t("home.supply")}</div>
              <div className="number">{ddnSupply}</div>
            </div>
            <div className="pannel">
              <div className="ptitle">{I18n.t("home.transfers")}</div>
              <div className="number">{totalAccounts}</div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="text">{I18n.t("home.init_time")}：{initTime} </div>
            <div className="text">{I18n.t("home.run_time")}：{duration} {I18n.t("home.days")}</div>
          </div>
          {/* <div className="pannel">
              <div>当前奖励</div>
              <div>{reward} {Cnf.coinName}</div>
            </div> */}
        </div>
        <div className="lastest">
          <div className="tableTitle">
            <div className="tableTitleL">{I18n.t("home.latest_transactions")}</div>
            <div className="tableTitleR">
              <Link to="/transactions">+ {I18n.t("home.more")}</Link>
            </div>
          </div>
          <Table
            columns={transColumns(this)}
            size="middle"
            pagination={false}
            rowKey={record => record.id}
            dataSource={latestTrans}
            loading={tansLoading}
            rowClassName={this.rowClassName}
          />
        </div>
        <div className="lastest">
          <div className="tableTitle">
            <div className="tableTitleL">{I18n.t("home.latest_blocks")}</div>
            <div className="tableTitleR">
              <Link to="/blocks">+ {I18n.t("home.more")}</Link>
            </div>
          </div>
          <Table
            columns={blockColumns(this)}
            size="middle"
            pagination={false}
            rowKey={record => record.height}
            dataSource={latestBlocks}
            loading={blockLoading}
            rowClassName={this.rowClassName}
          />
        </div>
        {/*
          <div className="lastest">
            <div className="tableTitle">
              <div className="tableTitleL">{I18n.t("home.latest_assets")}</div>
              <div className="tableTitleR">
                <Link to="/assets">+ {I18n.t("home.more")}</Link>
              </div>
            </div>
            <Table
              columns={assetColumns(this)}
              size="middle"
              pagination={false}
              rowKey={record => record.id}
              dataSource={latestAssets}
              loading={assetLoading}
              rowClassName={this.rowClassName}
            />
          </div>
        */}
        </div>
    );
  }
}

export default Home;
