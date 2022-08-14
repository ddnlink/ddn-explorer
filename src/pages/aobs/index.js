import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import { Table, Card, message } from 'antd';
import styles from './index.less';
import React, { Component } from 'react';
import { i18n } from '@/utils/i18n';
import { connect } from 'dva';
import Cnf from '../../config';
import utils_slots from '../../utils/slots';
import LimitText from '../../component/LimitText';
import moment from 'moment';

const columns = self => [
  {
    title: i18n.formatMessage({ id: '资产名称' }),
    dataIndex: 'name',
    sorter: false,
    width: '18%',
    render: (text, record, index) => {
      return (
        <Link to={'/aobs/:aobInfo?documentQuery=${this.props.location.query.documentQuery}'}>
          {text}
        </Link>
        /*<Link to={{
                    pathname: '/aobs/:aobInfo',
                    query: 'DDN',
                }} target="_blank" >
                    {text}
                </Link >*/
      );
    },
  },
  {
    title: i18n.formatMessage({ id: '发行商' }),
    dataIndex: 'issuer_name',
    sorter: false,
    width: '17%',
  },
  {
    title: i18n.formatMessage({ id: '发行上限' }),
    dataIndex: 'maximum',
    sorter: false,
    width: '18%',
    render: text => <LimitText link="/accounts/" title={text} length={15} target="_blank" />,
  },
  {
    title: i18n.formatMessage({ id: '已发行' }),
    dataIndex: 'quantity',
    ellipsis: true,
    sorter: false,
    width: '17%',
    render: text => <LimitText link="/accounts/" title={text} length={15} target="_blank" />,
  },
  {
    title: i18n.formatMessage({ id: '精度' }),
    dataIndex: 'precision',
    sorter: false,
    width: '16%',
  },
  {
    title: i18n.formatMessage({ id: '发行时间' }),
    dataIndex: 'timestamp',
    width: '14%',
    render: text =>
      `${moment(utils_slots.getRealTime(Number(text))).format('YYYY-MM-DD HH:mm:ss')}`,
  },
];

const data = [
  {
    name: 'EOK',
    issuer_name: 'EOK官方发行商',
    maximum: '10000000000',
    quantity: '50000000',
    precision: '19.9',
    timestam: '2020-03-02 1800234453',
  },
  {
    name: 'DDN',
    issuer_name: 'DDN区块链中国',
    maximum: '1000000000000',
    quantity: '3000000000',
    precision: '19.9',
    timestam: '2020-03-02 1800234453',
  },
  {
    name: 'BTC',
    issuer_name: 'BTC中国',
    maximum: '21000000',
    quantity: '15000000',
    precision: '1.9',
    timestam: '2020-03-02 1800234453',
  },
  {
    name: 'ETH',
    issuer_name: 'ETH官方发行商',
    maximum: '3000000000',
    quantity: '2330000000',
    precision: '8.9',
    timestam: '2020-03-02 1800234453',
  },
  {
    name: 'RMB',
    issuer_name: '中国人民银行',
    maximum: '999999999999999999999999999999999999999',
    quantity: '99999999999999999999999990000000',
    precision: '0.9',
    timestam: '2020-03-02 1800234453',
  },
];

@connect(({ aob, global }) => ({
  aob,
  global,
}))
class AobView extends Component {
  constructor(...args) {
    super(...args);
  }

  state = {
    loading: false,
    searchText: '',
  };

  componentDidMount() {
    //this.getAobs({ offset: 0, limit: 10, orderBy: "aob:desc" });
    console.log('八戒死了！');
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.getAobs({
      current: pagination.current,
      limit: pagination.pageSize,
      offset: (pagination.current - 1) * pagination.pageSize,
      orderBy: 'aob:desc',
    });
    console.log('悟空来也！');
  };

  getAobs = async (params = {}) => {
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'aob/getAobsList',
      payload: {
        ...params,
      },
      callback: res => {
        if (res.success !== true) {
          message.error(res.error);
        } else {
        }

        this.setState({
          loading: false,
        });
      },
    });
  };

  render() {
    const { aob } = this.props;
    console.log(aob);
    //const data = aob.data.dataSource;
    const pagination = aob.data.pagination;

    return (
      <div className={styles.aobTable}>
        <Card>
          <Table
            columns={columns(this)}
            rowKey={record => record.name}
            dataSource={data}
            pagination={pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
            rowClassName={(record, index) => {
              if (index % 2 != 0) {
                return styles.row_StyleB;
              }
              return styles.row_Style;
            }}
          />
        </Card>
      </div>
    );
  }
}

export default AobView;
/*export default () => (
    <Link to="/">返回首页</Link>
);*/

//console.log("我也不知道该说什么？！");
