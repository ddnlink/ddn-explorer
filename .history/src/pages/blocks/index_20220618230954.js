import React, { Component } from "react";
import { Table, message, Card, Icon } from "antd";
import "whatwg-fetch";
import { Link } from "react-router-dom";
import moment from "moment"
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import Cnf from "../../config"
import utils_slots from "../../utils/slots";
import LimitText from '../../component/LimitText';
import styles from './index.less'

const columns = self => [
  {
    title: formatMessage({ id: "block.height" }),
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
    title: formatMessage({ id: "block.numberOfTransactions" }),
    dataIndex: "number_of_transactions",
    sorter: false,
    width: "9%"
  },
  {
    title: formatMessage({ id: "block.confirmations" }),
    dataIndex: "confirmations",
    sorter: false,
    width: "9%"
  },
  {
    title: formatMessage({ id: "block.reward" }) + `(${Cnf.coinName})`,
    dataIndex: "reward",
    sorter: false,
    width: "13%",
    render: (text, record, index) => {
      return Math.floor(Number(record.reward) / 100000000)
    }
  },
  {
    title: formatMessage({ id: "block.totalAmount" }) + `(${Cnf.coinName})`,
    dataIndex: "total_amount",
    sorter: false,
    width: "12%",
    render: text => {
      return Math.floor(Number(text) / 100000000)
    }
  },
  {
    title: formatMessage({ id: "block.totalFee" }) + `(${Cnf.coinName})`,
    dataIndex: "total_fee",
    sorter: false,
    width: "12%",
    render: text => `${text / 100000000.0}`
  },

  {
    title: formatMessage({ id: "block.generatorId" }),
    dataIndex: "generator_id",
    ellipsis: true,
    sorter: false,
    width: "17%",
    render: text => <LimitText link="/accounts/" title={text} length={15} target="_blank" />
  },
  {
    title: formatMessage({ id: "block.timestamp" }),
    dataIndex: "timestamp",
    width: "18%",
    render: text =>
      `${moment(utils_slots.getRealTime(Number(text))).format('YYYY-MM-DD HH:mm:ss')}`
  }
];
@connect(({ block }) => ({
  block

}))
class BlockView extends Component {
  state = {

    loading: false,
    searchText: ""
  };

  componentDidMount() {
    this.getBlocks({ offset: 0, limit: 10, orderBy: "height:desc" });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.getBlocks({
      current: pagination.current,
      limit: pagination.pageSize,
      offset: (pagination.current - 1) * pagination.pageSize,
      orderBy: "height:desc"
    });
  };

  getBlocks = async (params = {}) => {
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'block/getBlocksList',
      payload: {
        ...params
      },
      callback: (res) => {
        if (res.success !== true) {
          message.error(res.error)
        }
        this.setState({
          loading: false,
        });
      }
    });
  };

  render() {
    const { block } = this.props
    const data = block.data.latestBlocks.blocks
    const pagination = block.data.pagination
    return (
      <div className={styles.pageWrap}>
        <Card>
          <Table
            columns={columns(this)}
            rowKey={record => record.height}
            dataSource={data}
            pagination={pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
            rowClassName={(record, index) => 
              index % 2 === 0 ? styles.tabRow : styles.tabRowB
            }
          />
        </Card>
      </div>
    );
  }
}

export default BlockView;
