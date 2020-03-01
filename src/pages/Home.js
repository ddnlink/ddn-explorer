import React, { Component } from 'react';
import qs from 'qs';
import { Link } from 'react-router-dom';
import { Table, message, Input, Select, Row, Col, Card, Icon, Empty } from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-locale';
import GeoPattern from 'geopattern';
import moment from 'moment';
import Cnf from '../utils/config';
import styles from './Home.less';
import utils_slots from '../utils/slots';
import LimitText from '../component/LimitText';
import Curved from '../component/Curve';
import CountDown from '../component/CountDown';
import HeightCount from '../component/HeightCount'
// import Donut from '../component/Donut';
// import Lizi from '../component/Lizi';
let beginEpochTime = utils_slots.beginEpochTime();
let initTimestamp = beginEpochTime.valueOf();
console.log(initTimestamp, '**********6666');

const transColumns = self => [
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

const blockColumns = self => [
  {
    title: formatMessage({ id: "block.id" }),
    dataIndex: "id",
    ellipsis: true,
    sorter: false,
    width: "15%",
    render: text => <LimitText title={text} />
  },
  {
    title: formatMessage({ id: "block.height" }),
    dataIndex: "height",
    sorter: false,
    width: "9%",
    render: (text) => {
      return (
        <Link to={"/blocks/" + text} target="_blank">
          {text}
        </Link>
      );
    }
  },
  {
    title: formatMessage({ id: "block.numberOfTransactions" }),
    dataIndex: "numberOfTransactions",
    sorter: false,
    width: "8%"
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
    dataIndex: "totalAmount",
    sorter: false,
    width: "12%",
    render: text => {
      return Math.floor(Number(text) / 100000000)
    }
  },
  {
    title: formatMessage({ id: "block.totalFee" }) + `(${Cnf.coinName})`,
    dataIndex: "totalFee",
    sorter: false,
    width: "12%",
    render: text => `${text / 100000000.0}`
  },
  {
    title: formatMessage({ id: "block.generatorId" }),
    dataIndex: "generatorId",
    ellipsis: true,
    sorter: false,
    width: "16%",
    render: text => <LimitText link="/accounts/" title={text} target="_blank" length={15} />
  },
  {
    title: formatMessage({ id: "block.timestamp" }),
    dataIndex: "timestamp",
    width: "12%",
    render: text => {
      let timeStamp = new Date().getTime();
      let leftTime = timeStamp - utils_slots.getRealTime(Number(text));
      return utils_slots.formatDuring(leftTime);
    },
  }
];

@connect(({ global, peers, block, transaction, aob }) => ({
  block,
  transaction,
  global,
  peers,
  aob,
}))

class Home extends Component {
  state = {
    blockLoading: false,
    currentHeight: 0,
    // initTime: "",
    duration: 0,
    typesPer: [],
    aweekData: [],
    backgroundImg: '',
  };
  componentDidMount() {
    console.log('调用componentDidMount');
    this.getBlocks({ offset: 0, limit: 5, orderBy: 'height:desc' });
    this.getTransactions({ offset: 0, limit: 5, orderBy: 't_timestamp:desc' });
    this.getStatus();
    this.getAccountsNum();
    this.getTimeData();
    this.getPeers();
    this.getAobs();
    // this.getCurveData(); //获取一周内的交易记录
    // this.getPercentByType(); // 获取存证类型占比图
    // this.generateBackImg()
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  getTimeData = () => {
    let beginEpochTime = utils_slots.beginEpochTime();
    console.log('beginTime', beginEpochTime.valueOf());
    // var initTime = moment(beginEpochTime.valueOf()).format('YYYY-MM-DD HH:mm:ss');
    let duration = moment().diff(beginEpochTime, 'days');
    this.setState({
      // initTime: initTime,
      duration: duration,
    });
  };
  getStatus = async () => {
    console.log('请求getsSSttatuss');
    this.props.dispatch({
      type: 'global/getStatus',
      callback: res => {
        if (res.success !== true) {
          message.error(res.error);
        }
      },
    });
    let self = this;
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(function () {
      self.getStatus();
    }, 10000);
  };
  getAccountsNum = async () => {
    this.props.dispatch({
      type: 'block/queryAccountSum',
      callback: res => {
        console.log('******************status', res);
        if (res.success !== true) {
          message.error(res.error);
        }
      },
    });
  };
  getBlocks = async (params = {}) => {
    this.setState({ blockLoading: true });
    this.props.dispatch({
      type: 'block/getBlocksList',
      payload: {
        ...params,
      },
      callback: res => {
        if (res.success !== true) {
          message.error(res.error);
        }
        this.setState({
          blockLoading: false,
        });
      },
    });
  };
  getPeers = (params = { ip: '' }) => {
    this.props.dispatch({
      type: 'peers/getPeersList',
      payload: {
        ...params,
      },
      callback: res => {
        if (res.success !== true) {
          message.error(res.error);
        }
        this.setState({
          loading: false,
        });
      },
    });
  };
  getTransactions = async (params = {}) => {
    this.setState({ tansLoading: true });
    this.props.dispatch({
      type: 'transaction/getLatestTrans',
      payload: {
        ...params,
      },
      callback: res => {
        if (res.success !== true) {
          message.error(res.error);
        }
        this.setState({
          tansLoading: false,
        });
      },
    });
  };
  getAobs = async (params = {}) => {
    this.setState({ blockLoading: true });
    this.props.dispatch({
      type: 'aob/getAobsList',
      payload: {
        ...params,
      },
      callback: res => {
        if (res.success !== true) {
          message.error(res.error);
        }
        this.setState({
          blockLoading: false,
        });
      },
    });
  };

  /**求过去一周的数据 */
  getCurveData = async (params = {}) => {
    this.props.dispatch({
      type: 'transaction/getCurveData',
      payload: {
        ...params,
      },
      callback: res => {
        if (res.success !== true) {
          message.error(res.error);
        }
      },
    });
    // let url = `http://127.0.0.1:8001/api/transactions/spell`
    // const response = await fetch(url, {
    //   method: 'get',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    // })
    // const data = await response.json()
    // if (data.success) {
    //   this.setState({
    //     aweekData: data.data
    //   })
    // }
  };
  /**请求数据类型占比 */
  getPercentByType = async (params = {}) => {
    this.props.dispatch({
      type: 'transaction/getPercentByType',
      payload: {
        ...params,
      },
      callback: res => {
        if (res.success !== true) {
          message.error(res.error);
        }
        console.log('获取存证类型', res);
      },
    });
  };
  rowClassName = (record, index) => {
    if (index % 2 !== 0) {
      return 'stripe';
    }
  };
  /**点击更多 */
  more = id => {
    console.log('eeeeeeee', id);
    this.props.dispatch({
      type: 'global/selectedMenu',
      payload: {
        id,
      },
    });
  };
  generateBackImg = () => {
    const options = { color: '#ccc', generator: 'squares' }
    const bgImgUrl = GeoPattern.generate('should derive the pattern from the hash', options).toDataUri()
    this.setState({ backgroundImg: bgImgUrl })
  }
  render() {
    const { tansLoading, blockLoading, duration, backgroundImg } = this.state;
    const { block, transaction, peers, global } = this.props;
    let count;
    JSON.stringify(peers.peersData.peers) !== '{}'
      ? (count = peers.peersData.peers.totalCount[0] ? peers.peersData.peers.totalCount[0] : 0)
      : (count = 0);
    let currentHeight = global.status.height;
    const typePercent = transaction.PercentByType;
    const curveData = transaction.curveData;
    return (
      <div className={styles.homePage}>
        <div className={styles.banner}>
          <div className={styles.bgImageWrap}>
            {/* <img alt='background' src={backgroundImg} width="600" height="320px" className={styles.bgImage} /> */}
          </div>
          <div className={styles.height}>
            <div className={styles.heightTitle}>
              {formatMessage({ id: 'home.height' })}
              <CountDown timeCount={10} />
            </div>
            <HeightCount numbers={`${currentHeight}`} />
          </div>
        </div>
        <div className={styles.subBanner}>
          <div className={styles.subWrap}>
            <div className={styles['pannel']}>
              <Icon className={styles['icon']} type="user" />
              <div className={styles['ptitle']}>{formatMessage({ id: 'home.transfers' })}</div>
              <div className={styles['number']}>{block.account}</div>
            </div>
            <div className={styles['pannel']}>
              <Icon className={styles['icon']} type="user" />
              <div className={styles['ptitle']}>{formatMessage({ id: 'home.tokenAmount' })}</div>
              <div className={styles['number']}>{global.status.supply / 100000000}</div>
            </div>
            <div className={styles.pannel}>
              <div className='icon-wrap'>
                <Icon className={styles['icon']} type="audit" />
              </div>

              <div className={styles.ptitle}>
                {formatMessage({ id: 'home.transaction_count' })}
              </div>
              <span className={styles.number}>{transaction.data.latestTrans.count}</span>
            </div>
            <div className={styles['pannel']}>
              <Icon className={styles['icon']} type="history" />
              <div className={styles['ptitle']}>{formatMessage({ id: 'home.run_time' })}</div>
              <div className={styles['number']}>
                {duration} {formatMessage({ id: 'home.days' })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.pageWrap}>
          <Card>
            <div className={styles.chartWrap}>
              <div className={styles.Curved} style={{ textAlign: 'center' }}>
                <div className={styles['title_main']}>
                  {formatMessage({ id: 'home.aweek_title' })}
                </div>
                {curveData.length === 0 ? (
                  <div className={styles['text_secondary']} style={{ marginTop: '132px' }}>
                    {formatMessage({ id: 'home.no_data' })}
                  </div>
                ) : (
                    <Curved data={curveData} />
                  )}
              </div>
            </div>
          </Card>

          <div style={{ minHeight: '500px' }}>

            <div className={styles['lastest']} >
              <Card
                title={
                  <div className={styles.cardText}>
                    <Icon className={styles['icon']} type="transaction" />
                    {formatMessage({ id: 'home.latest_transactions' })}
                  </div>
                }
                extra={
                  <div className={styles['moreText']} >
                    <Link onClick={this.more.bind(this, '3')} to="/transactions">
                      查看{formatMessage({ id: 'home.more' })}
                    </Link>
                    <Icon style={{ marginTop: '1px' }} type="right" />
                  </div>
                }
              >
                <Table
                  columns={transColumns(this)}
                  size="middle"
                  pagination={false}
                  rowKey={record => record.id}
                  dataSource={transaction.data.latestTrans.transactions}
                  loading={tansLoading}
                  rowClassName={(record, index) => {
                    if (index % 2 == 0) {
                      return styles.tabRow;
                    }
                    return styles.tabRowB;
                  }
                  }
                  style={{ minHeight: '294px' }}
                />
              </Card>
            </div>

            <div className={styles['lastest']} id="ddd" >
              <Card
                title={
                  <div className={styles.cardText}>
                    <Icon className={styles['icon']} type="codepen" />
                    {formatMessage({ id: 'home.latest_blocks' })}
                  </div>
                }
                extra={
                  <div className={styles['moreText']} >
                    <Link onClick={this.more.bind(this, '2')} to="/blocks">
                      查看{formatMessage({ id: 'home.more' })}
                    </Link>
                    <Icon style={{ marginTop: '1px' }} type="right" />
                  </div>
                }
              >
                <Table
                  columns={blockColumns(this)}
                  size="middle"
                  pagination={false}
                  rowKey={record => record.height}
                  dataSource={block.data.latestBlocks.blocks}
                  loading={blockLoading}
                  rowClassName={(record, index) => {
                    if (index % 2 == 0) {
                      console.log("Index的值：" + { index });
                      return styles.tabRow;
                    }
                    return styles.tabRowB;
                  }
                  }
                  style={{ minHeight: '294px' }}
                />
              </Card>
            </div>

          </div>
          {/* <div
            className={styles['lastest']}
            id="ddd"
            style={{ width: '100%', textAlign: 'center', display: "flex" }}
          >
            <div style={{ width: "90%" }}>
              <Card>
                <Donut typeData={typePercent} />
              </Card>
            </div>
            <div style={{ width: "90%" }}>
              <Card>
                <Lizi count={3} />
              </Card>
            </div>
          </div> */}
        </div>

      </div>
    );
  }
}

export default Home;
