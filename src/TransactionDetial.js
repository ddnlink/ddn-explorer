import React, { Component } from "react";
import qs from "qs";
import { I18n } from "react-i18nify"

import utils_slots from "./utils/slots"
import "./TransactionDetial.css";
import Cnf from "./config"

export default class TransactionDetial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      params: null
    };
  }
  componentDidMount() {
    let params = this.props.match.params;
    this.getBlocks(params);
  }
  getBlocks = async (params = {}) => {
    this.setState({ loading: true });
    let query = qs.stringify(params);
    let url = `http://${localStorage.getItem(
      "servicePeer"
    )}/api/transactions/get?${query}`;

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
      });
    }else{
      this.setState({
        loading: false,
        data: null
      });      
    }
  };

  render() {
    let { data } = this.state
    if (!data) {
      return <div style={{ textAlign: "center", margin:"100px" }}>{I18n.t("trs.no_detail")}</div>;
    }
    return (
      <div>
        <div className="title">
          <span className="col_one">{I18n.t("trs.trs_detail")}</span>
          <span> # {data.transaction.id}</span>
        </div>
        <div className="content">
          <div className="content_d">
            <span className="col_one">{I18n.t("trs.height")}</span>
            <span className="col_two">
              {data.transaction.height}
            </span>
          </div>
          <div className="content_d">
            <span className="col_one">{I18n.t("trs.blockid")}</span>
            <span className="col_two">
              {data.transaction.blockId}
            </span>
          </div>
          <div className="content_d">
            <span className="col_one">{I18n.t("trs.type")}</span>
            <span className="col_two">{I18n.t("types."+data.transaction.type)}</span>
          </div>
          <div className="content_d">
            <span className="col_one">{I18n.t("trs.timestamp")}</span>
            <span className="col_two">
              {
                I18n.l(utils_slots.getRealTime(Number(data.transaction.timestamp)), {dateFormat: "date"})
              }
            </span>
          </div>
          <div className="content_d">
            <span className="col_one">{I18n.t("trs.senderPublicKey")}</span>
            <span className="col_two">
              {data.transaction.senderPublicKey}
            </span>
          </div>
          <div className="content_d">
            <span className="col_one">{I18n.t("trs.senderAddress")}</span>
            <span className="col_two">
              {data.transaction.senderId}
            </span>
          </div>
          <div className="content_d">
            <span className="col_one">{I18n.t("trs.receipientAddress")}</span>
            <span className="col_two">
              {data.transaction.recipientId}
            </span>
          </div>
          <div className="content_d">
            <span className="col_one">{I18n.t("trs.amount")}</span>
            <span className="col_two">
              {data.transaction.amount / 100000000} {Cnf.coinName}
            </span>
          </div>
          <div className="content_d">
            <span className="col_one">{I18n.t("trs.fee")}</span>
            <span className="col_two">
              {data.transaction.fee / 100000000} {Cnf.coinName}
            </span>
          </div>
          <div className="content_d">
            <span className="col_one">{I18n.t("trs.signature")}</span>
            <span className="col_two">
              {data.transaction.signature}
            </span>
          </div>
          <div className="content_d">
            <span className="col_one">{I18n.t("trs.signSignature")}</span>
            <span className="col_two">
              {data.transaction.signSignature}
            </span>
          </div>
          <div className="content_d">
            <span className="col_one">{I18n.t("trs.confirmations")}</span>
            <span className="col_two">
              {data.transaction.confirmations}
            </span>
          </div>
          <div className="content_d">
            <span className="col_one">{I18n.t("trs.args")}</span>
            <span className="col_two">{Array.isArray(data.transaction.args) ? data.transaction.args.join(",") : data.transaction.args}</span>
          </div>
          <div className="content_d">
            <span className="col_one">{I18n.t("trs.message")}</span>
            <span className="col_two">
              {data.transaction.message}
            </span>
          </div>
        </div>
        {data.transaction.asset.article &&
        <div className="footer">
          <div className="left">交易内容</div>
          <div className="right">
            <div className="right_content">
              <span className="col_one">文件名称:</span>
              <span className="col_two">
                {data.transaction.asset.article.title}
              </span>
            </div>
            <div className="right_content">
              <span className="col_one">内容hash:</span>
              <span className="col_two">
                {data.transaction.asset.article.fileHash}
              </span>
            </div>
            <div className="right_content">
              <span className="col_one">创作:</span>
              <span className="col_two">
                data.transaction.asset.article.filename
              </span>
            </div>
            <div className="right_content">
              <span className="col_one">描述:</span>
              <span className="col_two">
                {
                  JSON.parse(
                    data.transaction.asset.article.description
                  ).des
                }
              </span>
            </div>
            <div className="right_content">
              <span className="col_one">url:</span>
              <span className="col_two">
                {
                  JSON.parse(
                    data.transaction.asset.article.description
                  ).url
                }
              </span>
            </div>
            <div className="right_content" id="right_content_b">
              <span className="col_one">size:</span>
              <span className="col_two">
                {
                  JSON.parse(
                    data.transaction.asset.article.description
                  ).size
                }
              </span>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}
