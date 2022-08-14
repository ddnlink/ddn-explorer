import React, { Component } from 'react';
import { Row, Popover, Button, Input, Layout, message } from 'antd';
import { i18n } from '@/utils/i18n';
// import utils_crypto from "../utils/crypto"
import { getTokenName } from '../utils/token';
import styles from './css/Footer.less';
import { connect } from 'dva';
import imgWeibo from '@/assets/images/weibo.svg';
import imgWeixin from '@/assets/images/weixin.svg';
import imgTwitter from '@/assets/images/twitter.svg';
import imgFacebook from '@/assets/images/facebook2.svg';
import imgInstagram from '@/assets/images/instagram.svg';
import imgSlack from '@/assets/images/slack.svg';
import imgTelegram from '@/assets/images/telegram.svg';
const { Footer } = Layout;
@connect(({ peers }) => ({
  peers,
}))
class AppFooter extends Component {
  state = {
    visible: false,
    peers: [],
    show: false,
    inputValue: localStorage.getItem('servicePeer'),
  };
  hide = async () => {
    const { inputValue } = this.state;
    if (inputValue) {
      localStorage.setItem('setPeer', inputValue);
      localStorage.setItem('servicePeer', inputValue);
    }
    this.setState({
      visible: false,
      current: ((Number(this.state.current) + 1) % 13).toString(),
    });
    let self = this;
    setTimeout(function() {
      self.setState({
        current: '1',
      });
    }, 0);
    await getTokenName();
    window.location.reload(true);
  };
  onChangePeer = e => {
    const value = e.target.value;
    localStorage.setItem('secrecy', false);
    this.setState({
      inputValue: value,
    });
  };
  handleVisibleChange = visible => {
    this.setState({ visible, searchText: null });
  };
  handleClick = e => {
    var e = e;
    this.setState({
      searchText: null,
      current: e.key,
    });
  };

  handleFocus = () => {
    this.setState({
      show: true,
    });
  };
  secrecyShow = text => {
    let iplist = text.split('.');
    iplist[0] = '*';
    iplist[1] = '*';
    iplist[2] = '*';
    return iplist.join('.');
  };
  clickChangePeer = async e => {
    const value = e.target.getAttribute('value');
    if (value) {
      localStorage.setItem('secrecy', true);
      await this.setState({
        inputValue: value,
      });
      this.hide();
    }
  };
  onPressEnter = async e => {
    const { inputValue } = this.state;
    if (inputValue) {
      await localStorage.setItem('secrecy', false);
      this.hide();
    }
  };
  clickHideSelect = e => {
    const targetClass = e.target.getAttribute('class');
    if (targetClass !== 'option' && targetClass !== 'ant-input') {
      this.setState({
        show: false,
      });
    }
  };
  getPeers = (params = { ip: '120.77.211.219:8001' }) => {
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
  render() {
    let mainWidth = '100%';
    // mainWidth = '1080px'
    console.log('**********', localStorage.getItem('servicePeer'));
    const { show, inputValue } = this.state;
    const { peers } = this.props;
    // eslint-disable-next-line no-unused-vars
    let peersData;
    peersData = JSON.stringify(peers.peersData.peers) !== '{}' ? peers.peersData.peers.peers : [];

    // let imgWeixinGzh = "/static/images/weixin_gzh.jpg";

    return (
      <Footer style={{ textAlign: 'center', width: mainWidth }}>
        {/* <p
        onClick={this.clickHideSelect}
      >
        {i18n.formatMessage({ id: "node.currentIP" })}
        <Popover
          content={
            <Row type="flex" justify="center" style={{ width: 300 }}>
              <div
                style={{ width: "100%", height: "auto", textAlign: "center" }}
              >
                <div className={styles["select-container"]}>
                  <Input
                    onFocus={this.handleFocus}
                    style={{ height: 30 }}
                    defaultValue={
                      localStorage.getItem('secrecy') === 'true' ? this.secrecyShow((inputValue || localStorage.getItem("servicePeer"))) : (inputValue || localStorage.getItem("servicePeer"))
                    }
                    placeholder={i18n.formatMessage({ id: "node.setIP" })}
                    onChange={this.onChangePeer}
                    onPressEnter={this.onPressEnter}
                  />
                  <div
                    className={styles["option-container"]}
                    style={{ display: show ? "block" : "none" }}
                    onClick={this.clickChangePeer}
                  >
                    {
                      peersData.length > 0 ?
                      peersData.map(item => <div className={styles["option"]} key={item.ip} value={`${item.ip}:${item.port}`}>{this.secrecyShow(item.ip)}</div>)
                        :
                        <span>{i18n.formatMessage({ id: "not_content" })}</span>
                    }
                  </div>
                </div>
                <Button type="primary" style={{ marginTop: 30 }} onClick={this.hide}>
                  {i18n.formatMessage({ id: "node.done" })}
                </Button>
              </div>
            </Row>
          }
          title={i18n.formatMessage({ id: "node.setIP" })}
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <Button type="primary">
            {
              localStorage.getItem('secrecy') === 'true' ? this.secrecyShow(localStorage.getItem("servicePeer")) : localStorage.getItem("servicePeer")
            }
          </Button>
        </Popover> */}
        {/* </p> */}
        <div
          style={{
            height: '100px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <div>
            <span
              className={`${styles['App-logo']} ${
                styles[`App-${localStorage.getItem('tokenName')}-logo`]
              }`}
            />
          </div>
          <div>
            <div className="Footer-Item-Title" style={{ fontWeight: 'lighter' }}>
              {/* <FormattedMessage id="footer_title4" /> */}
            </div>
            <div style={{ textAlign: 'left', margin: '30px 0px 20px 0px' }}>
              <a href="javascript:void(0)" onClick={this.openWeixinBarcode} ref="weixinIcon">
                <img
                  src={imgWeixin}
                  width="24px"
                  height="24px"
                  alt="微信公众号"
                  title="微信公众号"
                />
              </a>
              <div style={{ width: '15px', display: 'inline-block' }}></div>
              <a href="http://weibo.com/ddnlink" target="_blank">
                <img src={imgWeibo} width="24px" height="24px" alt="微博" title="微博" />
              </a>
              <div style={{ width: '15px', display: 'inline-block' }}></div>
              <a href="https://twitter.com/DDN_link" target="_blank">
                <img src={imgTwitter} width="24px" height="24px" alt="Twitter" title="Twitter" />
              </a>
              <div style={{ width: '15px', display: 'inline-block' }}></div>
              <a href="https://www.facebook.com/DDNlink" target="_blank">
                <img src={imgFacebook} width="24px" height="24px" alt="Facebook" title="Facebook" />
              </a>
              <div style={{ width: '15px', display: 'inline-block' }}></div>
              <a href="https://www.instagram.com/ddn_link/" target="_blank">
                <img
                  src={imgInstagram}
                  width="24px"
                  height="24px"
                  alt="Instagram"
                  title="Instagram"
                />
              </a>
              <div style={{ width: '15px', display: 'inline-block' }}></div>
              <a href="https://ddnlink.slack.com" target="_blank">
                <img src={imgSlack} width="24px" height="24px" alt="Slack" title="Slack" />
              </a>
              <div style={{ width: '15px', display: 'inline-block' }}></div>
              <a href="https://t.me/joinchat/H-kmwQ0dbU9fofIgd1nvVg" target="_blank">
                <img src={imgTelegram} width="24px" height="24px" alt="Telegram" title="Telegram" />
              </a>
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>
            {localStorage.getItem('tokenName') === 'EOK' && (
              <div>区块链备案: 京网信备11010519864491550014号</div>
            )}
            Copyright ©2018 Powered by DDN FOUNDATION
          </div>
        </div>
      </Footer>
    );
  }
}
export default AppFooter;
