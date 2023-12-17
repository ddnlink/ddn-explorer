import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Input, Layout, Menu, Select, Icon, Dropdown } from 'antd';
import { i18n, setLocale, getLocale } from '@/utils/i18n';
import moment from 'moment';
import styles from './css/Header.less';
import config from '../config';
import utils_crypto from '../utils/crypto';
import { getTokenName } from '../utils/token';
import en_US from '@/assets/images/lang/en_US.png';
import zh_CN from '@/assets/images/lang/zh_CN.png';
import { connect } from 'dva';
import { json } from 'd3';

const Option = Select.Option;
const Search = Input.Search;

const { Header } = Layout;

if (!localStorage.getItem('servicePeer')) {
  localStorage.setItem('servicePeer', config.peerAddress);
}
if (
  window.location.hostname.toLowerCase().startsWith('mainnet.ddn.link') &&
  !localStorage.getItem('setPeer')
) {
  localStorage.setItem('servicePeer', 'peer.ddn.link:8000');
  getTokenName();
}
moment.locale('zh', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'Ah点mm分',
    LTS: 'Ah点m分s秒',
    L: 'YYYY-MM-DD',
    LL: 'YYYY年MMMD日',
    LLL: 'YYYY年MMMD日Ah点mm分',
    LLLL: 'YYYY年MMMD日ddddAh点mm分',
    l: 'YYYY-MM-DD',
    ll: 'YYYY年MMMD日',
    lll: 'YYYY年MMMD日Ah点mm分',
    llll: 'YYYY年MMMD日ddddAh点mm分',
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function (hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
      return hour;
    } else if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12;
    } else {
      // '中午'
      return hour >= 11 ? hour : hour + 12;
    }
  },
  meridiem: function (hour, minute, isLower) {
    var hm = hour * 100 + minute;
    if (hm < 600) {
      return '凌晨';
    } else if (hm < 900) {
      return '早上';
    } else if (hm < 1130) {
      return '上午';
    } else if (hm < 1230) {
      return '中午';
    } else if (hm < 1800) {
      return '下午';
    } else {
      return '晚上';
    }
  },
  calendar: {
    sameDay: function () {
      return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
    },
    nextDay: function () {
      return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
    },
    lastDay: function () {
      return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
    },
    nextWeek: function () {
      var startOfWeek, prefix;
      startOfWeek = moment().startOf('week');
      prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '[本]';
      return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
    },
    lastWeek: function () {
      var startOfWeek, prefix;
      startOfWeek = moment().startOf('week');
      prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]';
      return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
    },
    sameElse: 'LL',
  },
  ordinalParse: /\d{1,2}(日|月|周)/,
  ordinal: function (number, period) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return number + '日';
      case 'M':
        return number + '月';
      case 'w':
      case 'W':
        return number + '周';
      default:
        return number;
    }
  },
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年',
  },
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
});
@connect(({ global }) => ({
  global,
}))
class AppHeader extends Component {
  state = {
    searchText: null,
    visible: false,
    lang: getLocale(),
    peers: [],
    show: false,
    inputValue: localStorage.getItem('servicePeer'),
    appinfo: null
  };

  componentDidMount = () => {
    // this.getPeers()
    this.getAppinfo()
  };

  getPeers = async () => {
    let url = `http://${localStorage.getItem('servicePeer')}/api/peers`;
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.success) {
      this.setState({
        peers: data.peers,
      });
    }
  };
  // 如果存在获取网络图标
  getAppinfo = async () => {
    try {
      /**
       *  * {
          * title:'标题',
          * slogan:'标语',
          * logo_url:'图片地址',
          * copyright:'Copyright'
          * }
       */
      let url = `${config.appinfoUrl}`;
      const response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        this.setState({
          appinfo: data.result,
        });
        sessionStorage.setItem('appinfo', JSON.stringify(data.result))
      }

    } catch (error) {

    }
  };

  switchLang = (value) => {
    setLocale(value);
  };

  handleClick = (e) => {
    var e = e;
    this.props.dispatch({
      type: 'global/selectedMenu',
      payload: {
        id: e.key,
      },
    });
    this.setState({
      searchText: null,
      // current: e.key
    });
  };
  handleSearch = (e) => {
    let searchTxt = document.getElementById('searchTxt').value;
    searchTxt = searchTxt.trim();
    this.toSearch(searchTxt);
  };
  onPressEnter = () => {
    let searchTxt = document.getElementById('searchTxt').value;
    searchTxt = searchTxt.trim();
    this.toSearch(searchTxt);
  };
  toSearch = (searchText) => {
    if (utils_crypto.isAddress(searchText)) {
      window.location.href = `/accounts/${searchText}`;
    } else if (/^([1-9][0-9]*)$/.test(searchText)) {
      window.location.href = `/blocks/${searchText}`;
    } else {
      window.location.href = `/transactions/${searchText}`;
    }
  };

  render() {
    let mainWidth = '100%';
    const { peers, show, inputValue, appinfo } = this.state;
    // if (mainWidth < 980) {
    //   mainWidth = 980; //手机上看,网页全显示,按980像素缩放
    // }
    console.log(
      '****************7777',
      localStorage.getItem('servicePeer'),
      this.props.global.selectId,
    );
    const current = this.props.global.selectId;
    console.log(
      'clientWidth',
      document.documentElement.clientWidth,
      'bodyWidth',
      document.body.clientWidth,
    );
    if (document.documentElement.clientWidth <= 1080) {
      mainWidth = '1080px';
      let viewport = document.querySelector('meta[name=viewport]');
      console.log('viewport', viewport);
      viewport.setAttribute('content', 'width=1080');
    }
    const menuLang = (
      <Menu>
        <Menu.Item>
          <div className="Header-Language-Menu-Item" onClick={this.switchLang.bind(this, 'zh-CN')}>
            <img src={zh_CN} width="16px" className={styles.lang_img} />
            {i18n.formatMessage({ id: 'zh-CN' })}
          </div>
        </Menu.Item>
        <Menu.Item>
          <div className="Header-Language-Menu-Item" onClick={this.switchLang.bind(this, 'en-US')}>
            <img src={en_US} width="16px" className={styles.lang_img} />
            {i18n.formatMessage({ id: 'en-US' })}
          </div>
        </Menu.Item>
      </Menu>
    );
    return (
      // <Layout className={styles.Layout} style={{height: "100%"}}>
      <Header className={styles.header} style={{ width: mainWidth }}>
        <Row type="flex" justify="start">
          <Col span={2}>
            <NavLink to="/">
              <span className={styles.logo_wrap}>
                <span
                  className={`${styles['App-logo']} ${styles[`App-${localStorage.getItem('tokenName')}-logo`]
                    }`}
                  style={appinfo ? { backgroundImage: `url(${appinfo.logo_url})` } : {}}
                />
              </span>
            </NavLink>
          </Col>
          <Col span={12}>
            <Menu
              onClick={this.handleClick}
              className={styles.Menus}
              selectedKeys={[current]}
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1" className={styles.Menus_Item}>
                <NavLink to="/">{i18n.formatMessage({ id: 'menu.home' })}</NavLink>
              </Menu.Item>
              <Menu.Item key="2" className={styles.Menus_Item}>
                <NavLink to="/blocks"> {i18n.formatMessage({ id: 'menu.block' })} </NavLink>
              </Menu.Item>
              <Menu.Item key="3" className={styles.Menus_Item}>
                <NavLink to="/transactions">{i18n.formatMessage({ id: 'menu.trs' })}</NavLink>
              </Menu.Item>
              <Menu.Item key="4" className={styles.Menus_Item}>
                <NavLink to="/assets">{i18n.formatMessage({ id: 'menu.evidence' })}</NavLink>
              </Menu.Item>
              <Menu.Item key="7" className={styles.Menus_Item}>
                <NavLink to="/peers">{i18n.formatMessage({ id: 'menu.peer' })}</NavLink>
              </Menu.Item>
              <Menu.Item key="5" className={styles.Menus_Item}>
                <NavLink to="/accounts">{i18n.formatMessage({ id: 'menu.account' })}</NavLink>
              </Menu.Item>
              <Menu.Item key="6" className={styles['Menus_Item']}>
                <NavLink to="/delegates">{i18n.formatMessage({ id: 'menu.delegate' })}</NavLink>
              </Menu.Item>
              {/* <Menu.Item key="8" className={styles.Menus_Item}>
                <NavLink to="/aobs">
                  数字{i18n.formatMessage({ id: "menu.aob" })}
                </NavLink>
              </Menu.Item>  */}

              {/* <Menu.Item key="15">交易记录</Menu.Item> */}
            </Menu>
            {/* <Menu.Item key="17">关联交易</Menu.Item> */}
          </Col>
          <Col span={7}>
            <div className={styles.search_wrap}>
              <Input
                id="searchTxt"
                type="text"
                className={styles.search_input}
                placeholder={i18n.formatMessage({ id: 'search.placeholder' })}
                onPressEnter={this.onPressEnter}
              />
              <Icon type="search" className={styles.search_icon} onClick={this.handleSearch} />
              {/* <Button
                onClick={this.handleSearch}
                type='primary'
                shape="circle"
                icon="search"
              /> */}
            </div>
          </Col>
          <Col span={1}>
            <div style={{ textAlign: 'right', marginRight: '5px' }}>
              <a
                href="http://47.92.0.84:7005/"
                target="_blank"
                rel="noopener noreferrer"
                title="举报，反馈"
              >
                <Icon type="notification" />
              </a>
            </div>
          </Col>
          <Col span={2} className={styles.lang}>
            <Dropdown overlay={menuLang}>
              <a className="ant-dropdown-link" href="#">
                <img src={getLocale() === 'zh-CN' ? zh_CN : en_US} className={styles.lang_img} />
                {i18n.formatMessage({ id: getLocale() })} <Icon type="down" />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>

      // </Layout>
    );
  }
}

export default AppHeader;
