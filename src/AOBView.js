import React, { Component } from 'react';
import 'whatwg-fetch'
import AOBTransaction from './component/AOBTransaction'
import { Icon, message } from 'antd'
import copy from "copy-to-clipboard"
import { I18n } from "react-i18nify";
import "./AOBView.css"

class AOBView extends Component {
  state = {
    assetInfo: {}
  };

  componentDidMount() {
    const params = this.props.match.params;
    const { name } = params
    this.getAssetInfo(name)
    //this.getBlocks({ offset: 0, limit: 10, orderBy: "t_timestamp:desc"});
  }
  getAssetInfo = async(name) =>{
    let url = `http://${localStorage.getItem("servicePeer")}/api/aob/assets/`
    const response = await fetch(url, {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json();
    console.log("AOBdata", data)
    this.setState({assetInfo: data.asset || {}})
  }
  onAddressCopyClick = () => {
    var copy1 = document.getElementById("addressCopy");
    copy(copy1.innerHTML)
    message.success(I18n.t('account.copyAddress'))
  };

  render() {
    const { assetInfo } = this.state
    if(!assetInfo || JSON.stringify(assetInfo) === '{}' ){
      return <div>未找到该资产</div>
    }
    const assetName = assetInfo.name.split('.')[1]
    const issuerName = assetInfo.name.split('.')[0]
    return (
      <div style={{maxWidth:"1060px", margin:"0 auto"}}>
        <div className="aobForm">
          <table className="accountTable">
            <tbody>
              <tr>
                <td className="col_one">资产名称</td>
                <td className="col_two">
                  <span>{assetName}</span>
                </td>
              </tr>
              <tr>
                <td className="col_one">发行商名称</td>
                <td className="col_two" id="copy">
                  <span>{issuerName}</span>
                </td>
              </tr>
              <tr>
                <td className="col_one">发行商地址</td>
                <td className="col_two">
                  <span id="addressCopy">{assetInfo.issuerId}</span>
                  <Icon type="copy" onClick={this.onAddressCopyClick} title='复制地址' className="iconButton"/>
                </td>
              </tr>
              <tr>
                <td className="col_one">资产上限</td>
                <td className="col_two">
                  <span>{assetInfo.maximumShow} <span>{assetName}</span></span>
                </td>
              </tr>
              <tr>
                <td className="col_one">已发行资产</td>
                <td className="col_two">
                  <span>{assetInfo.quantityShow} <span>{assetName}</span></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <AOBTransaction assetInfo={assetInfo}/>
      </div>
    );
  }
}

export default AOBView;
