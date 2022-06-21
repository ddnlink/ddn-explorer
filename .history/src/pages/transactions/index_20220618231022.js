import React, { Component } from 'react'
import { Table, message, Card } from 'antd'
import 'whatwg-fetch'
import { Link } from 'react-router-dom'
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import Cnf from "../../config"
import utils_slots from "../../utils/slots"
import LimitText from '../../component/LimitText'
import moment from "moment"
import styles from "./index.less"

const columns = (self) => [{
  title: formatMessage({ id: 'trs.id' }),
  dataIndex: 'id',
  sorter: false,
  width: '15%',
  render: (text) => <LimitText link="/transactions/" target="_blank" title={text} />
}, {
  title: formatMessage({ id: 'trs.type' }),
  dataIndex: 'type',
  sorter: false,
  width: '8%',
  render: text => formatMessage({ id: 'types.' + text })
}, {
  title: formatMessage({ id: 'trs.senderAddress' }),
  dataIndex: 'senderId',
  sorter: false,
  width: '14%',
  render: text => <LimitText link="/accounts/" target="_blank" title={text} />
},
{
  title: formatMessage({ id:'trs.recipientId'}),
  dataIndex: 'recipientId',
  sorter: false,
  width: '14%',
  render: (text) =>{ 
    let arr = []
    if(text){
      arr=text.split('|');
    }
    return <div>
      {
        arr.map((item, index) => { return <div key={index}><LimitText link="/accounts/" target="_blank" title={item} length={15} /></div> })
      }
    </div>
  }

}, {
  title: formatMessage({ id:'trs.amount'}) + `(${Cnf.coinName})`,
  dataIndex: 'amount',
  sorter: false,
  width: '8%',
  render: text => `${text / 100000000.0}`
}, {
  title:formatMessage({ id:'trs.fee'}) + `(${Cnf.coinName})`,
  dataIndex: 'fee',
  sorter: false,
  width: '8%',
  render: text => `${text / 100000000.0}`
},
{
  title: formatMessage({ id: 'trs.height' }),
  dataIndex: 'block_height',
  sorter: false,
  width: '8%',
  render: (text, record, index) => { return <Link to={"/blocks/" + text} target="_blank">{text}</Link> }
}, {
  title: formatMessage({ id: 'trs.timestamp' }),
  dataIndex: 'timestamp',
  width: '14%',
  render: text => moment(utils_slots.getRealTime(Number(text))).format('YYYY-MM-DD HH:mm:ss')
}
];
@connect(({ block, transaction }) => ({
  transaction
}))
class TransactionView extends Component {
  state = {
    loading: false,
    searchText: '',
  };
  componentDidMount() {
    this.getBlocks({ offset: 0, limit: 10, orderBy: "t_timestamp:desc" });
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.getBlocks({
      current: pagination.current,
      limit: pagination.pageSize,
      offset: (pagination.current - 1) * pagination.pageSize,
      orderBy: "t_timestamp:desc"
    });
  }
  getBlocks = async (params = {}) => {
    this.setState({ loading: true });
    this.setState({ blockLoading: true });
    const pagination = { ...this.state.pagination };
    console.log('******pageddddddd', pagination)
    this.props.dispatch({
      type: 'transaction/getLatestTrans',
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
    console.log('this state', this.state.pagination)
    const { transaction } = this.props
    return (
      <div className={styles.pageWrap}>
        <Card>
          <Table
            columns={columns(this)}
            rowKey={record => record.id}
            dataSource={transaction.data.latestTrans.transactions}
            pagination={transaction.data.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
            rowClassName={styles.rowStyle}
          />
        </Card>
      </div>
    );
  }
}

export default TransactionView;
