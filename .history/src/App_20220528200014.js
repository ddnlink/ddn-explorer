import React, { Component } from "react";
import {  NavLink } from "react-router-dom"
import { Row, Col, Popover, Button, Input, Layout, Menu, Select, Icon } from "antd"
import { I18n } from "react-i18nify"

import "./App.css"
import config from "./utils/config"
import utils_crypto from "./utils/crypto"
import { getTokenName } from "./utils/token"
import Cnf from "./config"

const Option = Select.Option;

const { Header, Footer, Content } = Layout

if(!localStorage.getItem("servicePeer")){
  localStorage.setItem("servicePeer", Cnf.peerAddress);
}


if (window.location.hostname.toLowerCase().startsWith("mainnet.ddn.link") && !localStorage.getItem("setPeer")) {
  localStorage.setItem("servicePeer", "http://47.94.144.216:8000/");
  getTokenName()
}

class App extends Component {
  state = {
    current: "0",
    searchText: null,
    visible: false,
    lang: "zh",
    peers: [],
    show: false,
    inputValue: localStorage.getItem("servicePeer")
  };

  componentDidMount = () => {
    this.getPeers()
  }
  hide = async () => {
    const { inputValue } = this.state
    if (inputValue) {
      localStorage.setItem("setPeer", inputValue);
      localStorage.setItem("servicePeer", inputValue);
    }
    this.setState({
      visible: false,
      current: ((Number(this.state.current) + 1) % 13).toString()
    });
    let self = this;
    setTimeout(function() {
      self.setState({
        current: "1"
      });
    }, 0);
    await getTokenName();
    window.location.reload(true);
  };
  onChangePeer = (e) => {
    const value = e.target.value
    localStorage.setItem('secrecy', false)
    this.setState({
      inputValue: value
    })
  };
  handleVisibleChange = visible => {
    this.setState({ visible, searchText: null });
  };

  getPeers = async () => {
    let url = `http://${localStorage.getItem("servicePeer")}/api/peers`
    const response = await fetch(url, {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json()
    if (data.success) {
      this.setState({
        peers: data.peers
      })
    }
  }

  switchLang = value => {
    I18n.setLocale(value);
    this.setState({
      lang: value
    });
  };

  handleClick = e => {
    var e = e;
    this.setState({
      searchText: null,
      current: e.key
    });
  };
  handleSearch = e => {
    let searchTxt = document.getElementById("searchTxt").value;
    searchTxt = searchTxt.trim();
    this.toSearch(searchTxt);
  };
  toSearch = searchText => {
    if (utils_crypto.isAddress(searchText)) {
      window.location.href = `/accounts/${searchText}`
    } else if (/^([1-9][0-9]*)$/.test(searchText)) {
      window.location.href = `/blocks/${searchText}`
    } else {
      window.location.href = `/transactions/${searchText}`
    }
  };
  handleFocus = () => {
    this.setState({
      show:true
    })
  }
  secrecyShow = (text) => {
    let iplist=text.split('.')
    iplist[0] = '*'
    iplist[1] = '*'
    iplist[2] = '*'
    return iplist.join('.')
  }
  clickChangePeer = async (e) => {
    const value = e.target.getAttribute("value")
    if (value) {
      localStorage.setItem('secrecy', true)
      await this.setState({
        inputValue: value
      })
      this.hide()
    }
  }
  onPressEnter = async (e) => {
    const { inputValue } = this.state
    if (inputValue) {
      await localStorage.setItem('secrecy', false)
      this.hide()
    }
  }
  clickHideSelect = (e) => {
    const targetClass = e.target.getAttribute("class")
    if (targetClass !== "option" && targetClass !== "ant-input") {
      this.setState({
        show: false
      })
    }
  }
  render() {
    let mainWidth = '100%'
    const { peers, show, inputValue } = this.state
    // if (mainWidth < 980) {
    //   mainWidth = 980; //手机上看,网页全显示,按980像素缩放
    // }
    console.log('clientWidth', document.documentElement.clientWidth, 'bodyWidth', document.body.clientWidth)
    if(document.documentElement.clientWidth <= 1080){
      mainWidth = '1080px'
      let viewport = document.querySelector("meta[name=viewport]");
      console.log('viewport', viewport)
      viewport.setAttribute('content', 'width=1080')
    }
    return (
      <Layout className="layout" style={{height: "100%"}}>
        <Header style={{ width: mainWidth }}>
          <Row type="flex" justify="start" >
            <Col span={2}>
              <sapn className={`App-logo App-${localStorage.getItem("tokenName")}-logo`} />
            </Col>
            <Col span={12}>
              <Menu
                onClick={this.handleClick}
                className="Menus"
                selectedKeys={[this.state.current]}
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: "64px" }}
              >
                <Menu.Item key="1" className="Menus_Item">
                  <NavLink to="/">{I18n.t("menu.home")}</NavLink>
                </Menu.Item>
                <Menu.Item key="2" className="Menus_Item">
                  <NavLink to="/blocks" > {I18n.t("menu.block")}{" "} </NavLink>
                </Menu.Item>
                <Menu.Item key="3" className="Menus_Item">
                  <NavLink  to="/transactions" >{I18n.t("menu.trs")}</NavLink>
                </Menu.Item>
                <Menu.Item key="4" className="Menus_Item">
                  <NavLink to="/peers">{I18n.t("menu.peer")}</NavLink>
                </Menu.Item>
                <Menu.Item key="5" className="Menus_Item">
                  <NavLink to="/accounts">
                    {I18n.t("menu.account")}
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="6" className="Menus_Item">
                  <NavLink to="/delegates">{I18n.t("menu.delegate")}</NavLink>
                </Menu.Item>
                {/* <Menu.Item key="15">交易记录</Menu.Item> */}
              </Menu>
              {/* <Menu.Item key="17">关联交易</Menu.Item> */}
            </Col>
            <Col span={7}>
              <Input
                id="searchTxt"
                type="text"
                style={{ width: "62%", height: "30px" }}
                placeholder={I18n.t("search.placeholder")}
              />
              <Button
                onClick={this.handleSearch}
                style={{
                  height: "30px",
                  lineHeight: "26px",
                  marginLeft: "10px"
                }}
              >
                {I18n.t("search.button")}
              </Button>
            </Col>
            <Col span={1}>
              <div style={{textAlign:"right", marginRight:"5px"}}>
                <a href="http://47.92.0.84:7005/" target="_blank" rel="noopener noreferrer" title="举报，反馈"><Icon type="notification" /></a>
              </div>
            </Col>
            <Col span={2}>
              <Select
                defaultValue={config[this.state.lang]}
                style={{ width: 80, marginLeft: 10 }}
                onChange={this.switchLang}
              >
                <Option value="en">{config["en"]}</Option>
                <Option value="zh">{config["zh"]}</Option>
              </Select>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            padding: "20px 80px",
            margin: '0 auto',
            maxWidth: "1360px",
            background: "#fff",
            width: mainWidth
          }}
        >
          {this.props.children}
        </Content>}
        <Footer style={{ textAlign: "center", width: mainWidth }}>
          <p
            onClick={this.clickHideSelect}
          >
            {I18n.t("node.currentIP")}
            <Popover
              content={
                <Row type="flex" justify="center" style={{width: 300}}>
                  <div
                    style={{width: "100%", height: "auto", textAlign: "center"}} 
                  >
                    <div className="select-container">
                      <Input 
                        onFocus={this.handleFocus}
                        style={{height: 30}}
                        defaultValue={
                          localStorage.getItem('secrecy') === 'true' ? this.secrecyShow((inputValue || localStorage.getItem("servicePeer"))) : (inputValue || localStorage.getItem("servicePeer"))
                        }
                        placeholder={I18n.t("node.setIP")}
                        onChange={this.onChangePeer}
                        onPressEnter={this.onPressEnter}
                      />
                      <div 
                        className="option-container" 
                        style={{display: show ? "block" : "none"}}
                        onClick={this.clickChangePeer}
                      >
                        {
                          peers.length > 0 ? 
                          peers.map(item => <div className="option" key={item.ip} value={`${item.ip}:${item.port}`}>{this.secrecyShow(item.ip)}</div>)
                          :
                          <span>{I18n.t("not_content")}</span>
                        }
                      </div>
                    </div>
                    <Button type="primary" style={{marginTop: 30}} onClick={this.hide}>
                      {I18n.t("node.done")}
                    </Button>
                  </div>
                </Row>
              }
              title={I18n.t("node.setIP")}
              trigger="click"
              visible={this.state.visible}
              onVisibleChange={this.handleVisibleChange}
            >
              <Button type="primary">
                {
                  localStorage.getItem('secrecy') === 'true' ? this.secrecyShow(localStorage.getItem("servicePeer")) : localStorage.getItem("servicePeer")
                }
              </Button>
            </Popover>
          </p>
          {localStorage.getItem("tokenName") === 'EOK' && 
            <div>
              区块链备案: 京网信备11010519864491550014号
            </div>
          }
          {localStorage.getItem("tokenName")} Explorer ©2018 Created by DDN Team
        </Footer>
      </Layout>
    );
  }
}

export default App;
