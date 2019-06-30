import React, { Component } from "react"
import qs from "qs"
import "whatwg-fetch"
import { I18n } from "react-i18nify"

import "./AccountDetial.css"
import TransactionHistory from "./TransactionHistory"
import AccountInfo from "./AccountInfo"
import { Radio } from 'antd'
import Cnf from "./config"

export default class AccountDetial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      params: null,
      role: 'all',
      qrImgUrl: '',
      currency: Cnf.coinName,
    };
  }
  componentDidMount() {
    let params = this.props.match.params;
    this.getAccount(params);
  }
  getAccount = async (params = {}) => {
    this.setState({ loading: true });
    let query = qs.stringify(params);
    let url = `http://${localStorage.getItem(
      "servicePeer"
    )}/api/accounts?${query}`;
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if(data.success){
      this.setState({
        loading: false,
        data: data
      })
    } else {
      this.setState({
        loading: false,
        data: null
      })
    }
  };
  handleSizeChange = (e) =>{
    this.setState({ role: e.target.value });
  }
  handleAssetChange = async (currency) => {
    this.setState({ currency })
  }
  render() {
    const { data, currency } = this.state
    if(!data){
      return <div style={{ textAlign: "center", margin:"100px" }}>找不到该地址</div>
    }
    return (
      <div>
        <AccountInfo address={this.props.match.params.address} handleAssetChange={this.handleAssetChange} />
        <div>
          <div className='trans_title'>
            <Radio.Group value={this.state.role} onChange={this.handleSizeChange}>
              <Radio.Button value="all">{I18n.t('account.all')}</Radio.Button>
              <Radio.Button value="recipient">{I18n.t('account.recipient')}</Radio.Button>
              <Radio.Button value="sender">{I18n.t('account.sender')}</Radio.Button>
            </Radio.Group>
          </div>
          <TransactionHistory curRole={this.state.role} currency={currency} params={this.props.match.params}/>  
        </div>
      </div>
    );
  }
}
