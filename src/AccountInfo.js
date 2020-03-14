import React, { Component } from 'react'
import { Icon, message, Tabs } from "antd"
import copy from "copy-to-clipboard"
import qs from "qs"
import { I18n } from "react-i18nify"
import QRCode from 'qrcode'

import Cnf from "./config"

class AccountInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      assets: [],
      qrImgUrl: "",
      activeKey: Cnf.coinName,
      unit: Cnf.coinName,
    }
  }

  handleSizeChange = (activeKey) =>{
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

  componentDidMount = () => {
    try {
      const params = this.props
      const qrUrl = params.address
      let self = this
      this.getAccount(params)
      this.getOtherAsset(params)
      QRCode.toDataURL(qrUrl, (err, url) => {
        if (!err) {
          self.setState({qrImgUrl: url})
        }
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  getAccount = async (params = {}) => {
    let query = qs.stringify(params);
    let url = `http://${localStorage.getItem(
      "servicePeer"
    )}/api/accounts?${query}`;
    const response = await fetch(url, {
      method: "get",
      heaaders: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if(data.success){
      this.setState({
        data: data
      })
    } else {
      this.setState({
        data: null
      })
    }
  }
  getOtherAsset = async (params) => {
    try {
      let url = `http://${localStorage.getItem(
        "servicePeer"
      )}/api/aob/balances/${params.address}`;
      const response = await fetch(url, {
        method: "get",
        heaaders: {
          "Content-Type": "application/json"
        }
      });
      const assets = await response.json();
      if (assets.success) {
        this.setState({assets: assets.balances})
      } else {
        this.setState({assets: []})
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  onPublicKeyCopyClick = () => {
    var copy2 = document.getElementById("publicKeyCopy");
    copy(copy2.innerHTML)
    message.success(I18n.t('account.copyPublicKey'))
  };

  onAddressCopyClick = () => {
    var copy1 = document.getElementById("addressCopy");
    copy(copy1.innerHTML)
    message.success(I18n.t('account.copyAddress'))
  };

  render () {
    const { data, assets, activeKey, qrImgUrl, unit } = this.state
    if (!data) {
      return <div></div>
    }
    if (assets.length === 0) {
      return (
        <div className="accountHead">
          <div className="accountScan">
            <img id="imgQrCode" src={qrImgUrl} className="qrImg" alt="" />
            <div className="qrdesc">{I18n.t("account.scan")}</div>
          </div>
          <div className="accountForm">
            <table className="accountTable" style={{width: "100%"}}>
              <tbody>
                <tr>
                  <td className="col_one">{I18n.t('account.address')}</td>
                  <td className="col_two">
                    <span id="addressCopy">{this.state.data.account.address}</span>
                    <Icon type="copy" onClick={this.onAddressCopyClick} title='复制地址' className="iconButton"/>
                  </td>
                </tr>
                <tr>
                  <td className="col_one">{I18n.t('account.balance')}</td>
                  <td className="col_two">
                    <span>{this.state.data.account.balance / 100000000}</span>
                    <span className="unit">{Cnf.coinName}</span>
                  </td>
                </tr>                
                <tr>
                  <td className="col_one">{I18n.t('account.unconfirmedBalance')}</td>
                  <td className="col_two" id="copy">
                    <span>{this.state.data.account.unconfirmedBalance ? this.state.data.account.unconfirmedBalance / 100000000 : 0}</span>
                    <span className="unit">{Cnf.coinName}</span>
                  </td>
                </tr>
                <tr>
                  <td className="col_one">{I18n.t('account.publicKey')}</td>
                  <td className="col_two">
                    <span id="publicKeyCopy">{this.state.data.account.publicKey}</span>
                    <Icon type="copy" onClick={this.onPublicKeyCopyClick} title='复制公钥' className="iconButton"/>
                  </td>
                </tr>
                <tr>
                  <td className="col_one">{I18n.t('account.lockHeight')}</td>
                  <td className="col_two">
                    <span className="unit">{this.state.data.account.lockHeight}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }
    return (
      <div className="accountHead">
        <div style={{width: "100%"}}>
          <Tabs onChange={this.handleSizeChange} type="card" activeKey={activeKey} tabBarStyle={{width: "100%"}}>
            <Tabs.TabPane tab={Cnf.coinName} key={Cnf.coinName} />
            {
              assets.map(item => <Tabs.TabPane tab={item.currency} key={item.currency} />)
            }
          </Tabs>
          <div className="accountForm" style={{paddingTop: 10, display: "flex", width: "100%"}}>
            <div className="accountScan" style={{padding: 0}}>
              <img id="imgQrCode" src={qrImgUrl} className='qrImg' alt="" />
              <div className='qrdesc'>{I18n.t('account.scan')}</div>
            </div>
            <div style={{flex: 1}}>
              <table className="accountTable" style={{width: "100%"}}>
                <tbody>
                  <tr>
                    <td className="col_one">address</td>
                    <td className="col_two">
                      <span id="addressCopy">{this.state.data.account.address}</span>
                      <Icon type="copy" onClick={this.onAddressCopyClick} title='复制地址' className="iconButton"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="col_one">unconfirmedBalance</td>
                    <td className="col_two" id="copy">
                      <span>{this.state.data.account.unconfirmedBalance ? this.state.data.account.unconfirmedBalance / 100000000 : 0}</span>
                      <span className="unit">{unit}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="col_one">balance</td>
                    <td className="col_two">
                      <span>{this.state.data.account.balance / 100000000}</span>
                      <span className="unit">{unit}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="col_one">publicKey</td>
                    <td className="col_two">
                      <span id="publicKeyCopy">{this.state.data.account.publicKey}</span>
                      <Icon type="copy" onClick={this.onPublicKeyCopyClick} title='复制公钥' className="iconButton"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="col_one">lockHeight</td>
                    <td className="col_two">
                      <span className="unit">{this.state.data.account.lockHeight}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default AccountInfo