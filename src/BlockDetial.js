import React, { Component } from "react";
import qs from "qs";
import { I18n } from "react-i18nify"

import Cnf from "./config"
import utils_slots from "./utils/slots"
import "./BlockDetial.css"
export default class BlockDetail extends Component {
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
    )}/api/blocks/?${query}`;

    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if(data.count){
      this.setState(
        {
          loading: false,
          data: data
        },
        () => {
          console.log("finished");
        }
      );
    }else{
      this.setState(
        {
          loading: false,
          data: null,
        })      
    }

  };

  render() {
    if (!this.state.data) {
      return <div style={{ textAlign: "center", margin:"100px" }}>{I18n.t("block.no_detail")}</div>;
    }
    return (
      <div>
        <div className="title" style={{textAlign:"center"}}>
          <span># {I18n.t("block.block_detail")}</span>
          {/* <span> # {this.state.data.block[0].id}</span> */}
        </div>
        <table>
          <tbody className="blockTable">
            <tr>
              <td className="col_one">{I18n.t("block.height")}</td>
              <td className="col_two">{this.state.data.blocks[0].height}</td>
            </tr>
            <tr>
              <td className="col_one">{I18n.t("block.id")}</td>
              <td className="col_two">{this.state.data.blocks[0].id}</td>
            </tr>
            <tr>
              <td className="col_one">{I18n.t("block.previousBlock")}</td>
              <td className="col_two">
                {this.state.data.blocks[0].previousBlock}
              </td>
            </tr>
            <tr>
              <td className="col_one">{I18n.t("block.version")}</td>
              <td className="col_two">{this.state.data.blocks[0].version}</td>
            </tr>
            <tr>
              <td className="col_one">{I18n.t("block.timestamp")}</td>
              <td className="col_two">{I18n.l(utils_slots.getRealTime(Number(this.state.data.blocks[0].timestamp)), {dateFormat: "date"})}</td>
            </tr>
            <tr>
              <td className="col_one">{I18n.t("block.numberOfTransactions")}</td>
              <td className="col_two">
                {this.state.data.blocks[0].numberOfTransactions}
              </td>
            </tr>
            <tr>
              <td className="col_one">{I18n.t("block.totalAmount")}</td>
              <td className="col_two">
                {this.state.data.blocks[0].totalAmount / 100000000} {Cnf.coinName}
              </td>
            </tr>
            <tr>
              <td className="col_one">{I18n.t("block.totalFee")}</td>
              <td className="col_two">
                {this.state.data.blocks[0].totalFee / 100000000} {Cnf.coinName}
              </td>
            </tr>
            <tr>
              <td className="col_one">{I18n.t("block.reward")}</td>
              <td className="col_two">
                {this.state.data.blocks[0].reward / 100000000} {Cnf.coinName}
              </td>
            </tr>
            <tr>
              <td className="col_one">{I18n.t("block.payloadLength")}</td>
              <td className="col_two">
                {this.state.data.blocks[0].payloadLength}
              </td>
            </tr>
            <tr>
              <td className="col_one">{I18n.t("block.payloadHash")}</td>
              <td className="col_two">
                {this.state.data.blocks[0].payloadHash}
              </td>
            </tr>
            <tr>
              <td className="col_one">{I18n.t("block.generatorPublicKey")}</td>
              <td className="col_two">
                {this.state.data.blocks[0].generatorPublicKey}
              </td>
            </tr>
            <tr>
              <td className="col_one">{I18n.t("block.generatorId")}</td>
              <td className="col_two">
                {this.state.data.blocks[0].generatorId}
              </td>
            </tr>
            <tr>
              <td className="col_one">{I18n.t("block.blockSignature")}</td>
              <td className="col_two">
                {this.state.data.blocks[0].blockSignature}
              </td>
            </tr>
            <tr>
              <td className="col_one">{I18n.t("block.totalForged")}</td>
              <td className="col_two">
                {this.state.data.blocks[0].totalForged / 100000000} {Cnf.coinName}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
