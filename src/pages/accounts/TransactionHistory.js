import React, { Component } from 'react';
import { Table, message } from 'antd';
import 'whatwg-fetch';
import qs from 'qs'
// import {I18n} from 'react-i18nify'
import { Link } from 'react-router-dom';
import { formatMessage } from 'umi-plugin-locale';
import Styles from './TransactionHistory.less';
import Cnf from "../../config";
import moment from "moment";
import { connect } from 'dva';
import utils_slots from "../../utils/slots";
import LimitText from "../../component/LimitText";
//import { style } from 'd3';
// let Cnf = {}
// Cnf.coinName = 'EOK'
const columns = self => [
  {
    title: formatMessage({ id: "trs.id" }),
    dataIndex: "id",
    ellipsis: true,
    sorter: false,
    width: "14%",
    render: text => <LimitText title={text} link="/transactions/" />
  },
  {
    title: formatMessage({ id: "trs.type" }),
    dataIndex: "type",
    sorter: false,
    width: "9%",
    render: text => formatMessage({ id: "types." + text })
  },
  {
    title: formatMessage({ id: "trs.senderId" }),
    dataIndex: "senderId",
    ellipsis: true,
    sorter: false,
    width: "15%",
    render: text => <LimitText link="/accounts/" title={text} target="_blank" />
  },
  {
    title: formatMessage({ id: "trs.recipientId" }),
    dataIndex: "recipientId",
    ellipsis: true,
    sorter: false,
    width: "15%",
    render: (text) => {
      let str = text;
      if (str) {
        let arr = str.split("|");
        return (
          <div>
            {arr.map((item, index) => <div key={index}><LimitText target="_blank" title={item} link="/accounts/" /></div>)}
          </div>
        )
      } else {
        return (<span></span>)
      }
    }
  },
  {
    title: formatMessage({ id: "trs.amount" }) + `(${Cnf.coinName})`,
    dataIndex: "amount",
    sorter: false,
    width: "12%",
    render: text => `${text / 100000000.0}`
  },
  {
    title: formatMessage({ id: "trs.fee" }) + `(${Cnf.coinName})`,
    dataIndex: "fee",
    sorter: false,
    width: "11%",
    render: text => `${text / 100000000.0}`
  },
  {
    title: formatMessage({ id: "trs.height" }),
    dataIndex: "height",
    sorter: false,
    width: "9%",
    render: text => (
      <Link to={"/blocks/" + text} target="_blank">
        {text}
      </Link>
    )
  },
  {
    title: formatMessage({ id: "trs.timestamp" }),
    dataIndex: "timestamp",
    width: "12%",
    render: text => {
      let timeStamp = new Date().getTime();
      let leftTime = timeStamp - utils_slots.getRealTime(Number(text));
      return utils_slots.formatDuring(leftTime);
    },
  }
];

/*const columns = (self) => [
  {
    title: formatMessage({ id: 'trs.id' }),
    dataIndex: 'id',
    sorter: false,
    width: '15%',
    render: text => <LimitText link="/transactions/" target="_blank" title={text} />
  }, {
    title: formatMessage({ id: 'trs.type' }),
    dataIndex: 'type',
    sorter: false,
    width: '10%',
    render: text => formatMessage({ id: `types.` + text })
  }, {
    title: formatMessage({ id: 'trs.senderId' }),
    dataIndex: 'senderId',
    sorter: false,
    width: '15%',
    render: (text) => <LimitText target="_blank" title={text} link="/accounts/" />
  }, {
    title: formatMessage({ id: 'trs.recipientId' }),
    dataIndex: 'recipientId',
    sorter: false,
    width: '15%',
    render: (text) => {
      var str = text;
      if (str) {
        var arr = str.split('|');
        return <div>
          {
            arr.map((item, index) => <div key={index}><LimitText link="/accounts/" target="_blank" title={item} /></div>)
          }
        </div>
      } else {
        return <span></span>
      }

    }
  },
  //  {
  //   title: formatMessage({ id: 'trs.amount' }) + `(${Cnf.coinName})`,
  //   dataIndex: 'amount',
  //   sorter: false,
  //   width: '8%',
  //   render: text => `${text / 100000000.0}`
  // }, {
  //   title: formatMessage({ id: 'trs.fee' }) + `(${Cnf.coinName})`,
  //   dataIndex: 'fee',
  //   sorter: false,
  //   width: '6%',
  //   render: text => `${text / 100000000.0}`
  // },
  {
    title: formatMessage({ id: 'trs.height' }),
    dataIndex: 'height',
    sorter: false,
    width: '8%',
    render: (text, record, index) => { return <Link to={"/blocks/" + text} target="_blank">{text}</Link> }
  }, {
    title: formatMessage({ id: 'trs.timestamp' }),
    dataIndex: 'timestamp',
    width: "15%",
    render: text => moment(utils_slots.getRealTime(Number(text))).format('YYYY-MM-DD HH:mm:ss')
  }
];*/

@connect(({ transaction }) => ({
  transaction
}))
class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.setState({ currency: this.props.currency })
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
    if (nextProps.curRole !== this.props.curRole || nextProps.currency !== this.props.currency) {
      this.setState({ currency: nextProps.currency })
      this.handleUpdate(nextProps.curRole, nextProps.currency)
    }
  }
  handleTableChange = (pagination, filters, sorter) => {
    const { currency } = this.state

    if (currency === Cnf.coinName) {
      let query = {
        current: pagination.current,
        offset: (pagination.current - 1) * pagination.pageSize,
        limit: pagination.pageSize,
        orderBy: "t_timestamp:desc"
      }
      if (this.props.curRole === 'all') {
        query.senderId = this.props.params.address
        query.recipientId = this.props.params.address
      } else if (this.props.curRole === 'sender') {
        query.senderId = this.props.params.address
      } else if (this.props.curRole === 'recipient') {
        query.recipientId = this.props.params.address
      } else {
        console.log(query)
      }
      this.getBlocks(query);
    } else {
      let query = {
        current: pagination.current,
        offset: (pagination.current - 1) * pagination.pageSize,
        limit: pagination.pageSize,
      }
      this.getCurrencyBlocks(query, this.props.curRole, currency)
    }
  }
  handleUpdate = (role, currency) => {
    if (currency === Cnf.coinName) {
      let query = {
        offset: 0,
        limit: 10,
        orderBy: "t_timestamp:desc"
      }
      if (role === 'all') {
        query.senderId = this.props.params.address
        query.recipientId = this.props.params.address
      } else if (role === 'sender') {
        query.senderId = this.props.params.address
      } else if (role === 'recipient') {
        query.recipientId = this.props.params.address
      } else {
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
    //这里调用的接口为49...,上面调用的是perr....
    let type = ''
    if (this.state.searchAddress) {
      type = 'transaction/getTransByUser'
    } else {
      type = 'transaction/getLatestTrans'
    }
    this.setState({ loading: true });
    this.props.dispatch({
      type,
      payload: {
        ...params
      },
      callback: (res) => {
        if (res.success !== true) {
          message.error(res.error)
        } else {
        }
        this.setState({
          loading: false,
        });
      }
    });
  };

  getCurrencyBlocks = async (query, role, currency) => {
    let params = {}
    params.role = role
    params.currency = currency
    params.address = this.props.params.address
    params.query = query
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'transaction/getTransByMyAddress',
      payload: {
        ...params
      },
      callback: (res) => {
        if (res.success !== true) {
          message.error(res.error)
        } else {
        }
        this.setState({
          loading: false,
        });
      }
    });
  }

  render() {
    const { transaction } = this.props
    const data = transaction.data.latestTrans.transactions
    const pagination = transaction.data.pagination
    console.log('55555555555555', transaction, data, pagination)
    return (
      <Table
        columns={columns(this)}
        rowKey={record => record.id}
        dataSource={data}
        pagination={pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        rowClassName={(record, index) => {
          if (index % 2 == 0) {
            return Styles.tabRow;
          }
          return Styles.tabRowB;
        }
        }
      />
    );
  }
}
export default TransactionHistory
