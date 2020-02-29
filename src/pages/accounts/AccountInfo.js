import React, { Component } from 'react'
import { Icon, message, Tabs, Card } from "antd"
import copy from "copy-to-clipboard"
import QRCode from 'qrcode'
import { formatMessage } from 'umi-plugin-locale';
import Cnf from "../../utils/config"
import styles from './address.less'
import { connect } from 'dva'
@connect(({ accounts }) => ({
  accounts
}))
class AccountInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qrImgUrl: "",
      activeKey: Cnf.coinName,
      unit: Cnf.coinName,
    }
  }
  componentDidMount = () => {
    try {
      const params = this.props
      const qrUrl = params.address
      let self = this
      this.getAccount(params)
      // this.getOtherAsset(params)
      QRCode.toDataURL(qrUrl, (err, url) => {
        if (!err) {
          self.setState({ qrImgUrl: url })
        }
      })
    } catch (e) {
      console.log(e.message)
    }
  }
  handleSizeChange = (activeKey) => {
    try {
      if (activeKey === Cnf.coinName) {
        const params = this.props
        this.setState({
          unit: activeKey
        })
        this.getAccount(params)
      } else {
        const { assets, data } = this.state
        assets.forEach(item => {
          if (item.currency === activeKey) {
            this.setState({
              data: {
                account: {
                  address: data.account.address,
                  balance: item.balanceShow * 100000000,
                  unconfirmedBalance: 0,
                  publicKey: data.account.publicKey,
                  lockHeight: data.account.lockHeight,
                }
              },
              unit: activeKey.split(".")[1]
            })
          }
        })
      }
      this.props.handleAssetChange(activeKey)
    } catch (e) {
      console.log(e.message)
    } finally {
      this.setState({ activeKey });
    }
  }
  getAccount = async (params = {}) => {
    this.props.dispatch({
      type: 'accounts/getAccountDetail',
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
  getOtherAsset = async (params) => {
    this.props.dispatch({
      type: 'accounts/getAsset',
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

  onPublicKeyCopyClick = () => {
    var copy2 = document.getElementById("publicKeyCopy");
    copy(copy2.innerHTML)
    message.success(formatMessage({ id: 'account.copyPublicKey' }))
  };

  onAddressCopyClick = () => {
    var copy1 = document.getElementById("addressCopy");
    copy(copy1.innerHTML)
    message.success(formatMessage({ id: 'account.copyAddress' }))
  };

  render() {
    const { activeKey, qrImgUrl, unit } = this.state
    const { accounts } = this.props
    console.log('99999999', accounts, assets)
    const data = JSON.stringify(accounts.accountDetail) !== '{}' ? accounts.accountDetail : null
    const assets = accounts.assets
    if (!data) {
      return <div></div>
    }
    if (assets.length === 0) {
      return (
        <div className={styles["accountHead"]}>
          <div className={styles["accountScan"]}>
            <img id={styles["imgQrCode"]} src={qrImgUrl} className={styles["qrImg"]} alt="" />
            <div className={styles["qrdesc"]}>{formatMessage({ id: "account.scan" })}</div>
          </div>
          <div className={styles["accountForm"]}>
            <table className={styles["accountTable"]} style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td className={styles["col_one"]}>{formatMessage({ id: 'account.address' })}</td>
                  <td className={styles["col_two"]}>
                    <span id="addressCopy">{data.account.address}</span>
                    <Icon type="copy" onClick={this.onAddressCopyClick} title='复制地址' className={styles["iconButton"]} />
                  </td>
                </tr>
                <tr>
                  <td className={styles["col_one"]}>{formatMessage({ id: 'account.aaa' })}</td>
                  <td className={styles["col_two"]}>
                    <span className={styles["unit"]}>{data.account.lockHeight}</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles["col_one"]}>{formatMessage({ id: 'account.bbb' })}</td>
                  <td className={styles["col_two"]}>
                    <span className={styles["unit"]}>{data.account.lockHeight}</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles["col_one"]}>{formatMessage({ id: 'account.publicKey' })}</td>
                  <td className={styles["col_two"]}>
                    <span id="publicKeyCopy">{data.account.publicKey}</span>
                    <Icon type="copy" onClick={this.onPublicKeyCopyClick} title='复制公钥' className={styles["iconButton"]} />
                  </td>
                </tr>
                <tr>
                  <td className={styles["col_one"]}>{formatMessage({ id: 'account.lockHeight' })}</td>
                  <td className={styles["col_two"]}>
                    <span className={styles["unit"]}>{data.account.lockHeight}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }
    return (
      <div className={styles["pageWrap"]}>
        <Card>
          <div className={styles["accountHead"]}>
            <div style={{ width: "100%" }}>
              <Tabs onChange={this.handleSizeChange} type="card" activeKey={activeKey} tabBarStyle={{ width: "100%" }}>
                <Tabs.TabPane tab={Cnf.coinName} key={Cnf.coinName} />
                {
                  assets.map(item => <Tabs.TabPane tab={item.currency} key={item.currency} />)
                }
              </Tabs>
              <div className={styles["accountForm"]} style={{ paddingTop: 10, display: "flex", width: "100%" }}>
                <div className={styles["accountScan"]} style={{ padding: 0 }}>
                  <img id={styles["imgQrCode"]} src={qrImgUrl} className={styles['qrImg']} alt="" />
                  <div className={styles['qrdesc']}>{formatMessage({ id: 'account.scan' })}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <table className={styles["accountTable"]} style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <td className={styles["col_one"]}>address</td>
                        <td className={styles["col_two"]}>
                          <span id="addressCopy">{this.state.data.account.address}</span>
                          <Icon type="copy" onClick={this.onAddressCopyClick} title='复制地址' className="iconButton" />
                        </td>
                      </tr>
                      <tr>
                        <td className={styles["col_one"]}>unconfirmedBalance</td>
                        <td className={styles["col_two"]} id={styles["copy"]}>
                          <span>{this.state.data.account.unconfirmedBalance ? this.state.data.account.unconfirmedBalance / 100000000 : 0}</span>
                          <span className={styles["unit"]}>{unit}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className={styles["col_one"]}>balance</td>
                        <td className={styles["col_two"]}>
                          <span>{this.state.data.account.balance / 100000000}</span>
                          <span className={styles["unit"]}>{unit}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className={styles["col_one"]}>publicKey</td>
                        <td className={styles["col_two"]}>
                          <span id="publicKeyCopy">{this.state.data.account.publicKey}</span>
                          <Icon type="copy"onClick={this.onPublicKeyCopyClick} title='复制公钥' className="iconButton" />
                        </td>
                      </tr>
                      <tr>
                        <td className={styles["col_one"]}>lockHeight</td>
                        <td className={styles["col_two"]}>
                          <span className={styles["unit"]}>{this.state.data.account.lockHeight}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}
export default AccountInfo