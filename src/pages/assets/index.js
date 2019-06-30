import React, { Component } from 'react'
import { Table, message, Card } from 'antd'
import 'whatwg-fetch'
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import Cnf from "../../utils/config"
import utils_slots from "../../utils/slots"
import LimitText from '../../component/LimitText'
import moment from "moment"
import styles from "./index.less"

const columns = (self) => [{
  title: formatMessage({ id: 'trs.id' }),
  dataIndex: 'transaction_id',
  sorter: false,
  width: '20%',
  render: (text) => <LimitText link="/transactions/" target="_blank" title={text} />
}, {
  title: formatMessage({ id: 'account.address' }),
  dataIndex: 'address',
  sorter: false,
  width: '20%',
  // render: text =>
}, {
  title:formatMessage({ id: 'evidence.type' }),
  dataIndex: 'type',
  sorter: false,
  width: '10%',
},
{
  title: formatMessage({ id: 'evidence.hash' }),
  dataIndex: 'hash',
  sorter: false,
  width: '15%',
  render: (text, record, index) =><LimitText link="/assets/" target="_blank" title={text} />
}, {
  title: formatMessage({ id: 'trs.timestamp' }),
  dataIndex: 'timestamp',
  width: '20%',
  render: text => moment(utils_slots.getRealTime(Number(text))).format('YYYY-MM-DD HH:mm:ss')
}
];
@connect(({  assert }) => ({
  evidenceListData: assert.evidenceListData,
  certificate: assert.certificate
}))
class TransactionView extends Component {
  state = {
    loading: false,
    searchText: '',
    aweekData: {}
  };
  componentDidMount() {
    this.getEvidence({ offset: 0, limit: 10, orderBy: "t_timestamp:desc" });
  }
  handleTableChange = (pagination, filters, sorter) => {
    // const pager = { ...this.state.pagination };
    // pager.current = pagination.current;
    this.getEvidence({
      current: pagination.current,
      limit: pagination.pageSize,
      offset: (pagination.current - 1) * pagination.pageSize,
      orderBy: "t_timestamp:desc"
    });
  }
  getEvidence = async (params = {}) => {
      this.props.dispatch({
        type: 'assert/getEvidenceList',
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
    const { evidenceListData } = this.props
    console.log('this state evidenceListData', evidenceListData, this.state.pagination)
    return (
      <div className={styles.pageWrap}>
        <Card>
          <Table
            columns={columns(this)}
            rowKey={record => record.id}
            dataSource={evidenceListData.evidenceList}
            pagination={evidenceListData.pagination}
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
