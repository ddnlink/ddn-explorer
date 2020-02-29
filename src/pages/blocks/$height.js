import React, { Component } from "react";
import { message, Card,Icon } from 'antd'
import moment from "moment"
import { Link } from "react-router-dom";
import { formatMessage } from 'umi-plugin-locale';
import Cnf from "../../utils/config"
import utils_slots from "../../utils/slots"
import styles from "./height.less"
import { connect } from 'dva';
@connect(({ block }) => ({
  block

}))
class BlockDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.props.dispatch({
      type: 'block/getBlocksList',
      payload: {
        ...params
      },
      callback: (res) => {
        if (res.success !== true) {
          message.error(res.error)
        }
        this.setState({
          blockLoading: false,
        });
      }
    });

  };
  render() {
    const { block } = this.props
    const data = block.data.latestBlocks
    console.log('区块链高度', block, data)
    if (JSON.stringify(data) === '{}') {
      return <div style={{ textAlign: "center", margin: "100px" }}>{formatMessage({ id: "block.no_detail" })}</div>;
    }
    if (data.blocks.length === 0) {
      return <div style={{ textAlign: "center", margin: "100px" }}>{formatMessage({ id: "block.no_detail" })}</div>;
    }
    return (
      <div className={styles.pageWrap}>
        <Card title={
          <div className={styles.cardText}>
            <Icon className={styles['icon']} type="codepen" />
            {formatMessage({ id: "block.block_detail" })}
          </div>
          }
          >
          <table>
            <tbody className={styles["blockTable"]}>
              <tr>
                <td className={styles["col_one"]}>{formatMessage({ id: "block.height" })}</td>
                <td className={styles["col_two"]}>{data.blocks[0].height}</td>
              </tr>
              <tr>
                <td className={styles["col_one"]}>{formatMessage({ id: "block.id" })}</td>
                <td className={styles["col_two"]}>{data.blocks[0].id}</td>
              </tr>
              <tr>
                <td className={styles["col_one"]}>
                  {formatMessage({ id: "block.previousBlock" })}
                </td>
                <td className={styles["col_two"]}>
                  <Link to={`/blocks/${data.blocks[0].height - 1}`} target='_blank'>
                    {data.blocks[0].previousBlock}
                  </Link>
                </td>
              </tr>
              <tr>
                <td className={styles["col_one"]}>{formatMessage({ id: "block.version" })}</td>
                <td className={styles["col_two"]}>{data.blocks[0].version}</td>
              </tr>
              <tr>
                <td className={styles["col_one"]}>{formatMessage({ id: "block.timestamp" })}</td>
                <td className={styles["col_two"]}>{moment(utils_slots.getRealTime(Number(data.blocks[0].timestamp))).format('YYYY-MM-DD HH:mm:ss')}</td>
              </tr>
              <tr>
                <td className={styles["col_one"]}>{formatMessage({ id: "block.numberOfTransactions" })}</td>
                <td className={styles["col_two"]}>
                  {data.blocks[0].numberOfTransactions}
                </td>
              </tr>
              <tr>
                <td className={styles["col_one"]}>{formatMessage({ id: "block.payloadLength" })}</td>
                <td className={styles["col_two"]}>
                  {data.blocks[0].payloadLength}
                </td>
              </tr>
              <tr>
                <td className={styles["col_one"]}>{formatMessage({ id: "block.payloadHash" })}</td>
                <td className={styles["col_two"]}>
                  {data.blocks[0].payloadHash}
                </td>
              </tr>
              <tr>
                <td className={styles["col_one"]}>{formatMessage({ id: "block.generatorPublicKey" })}</td>
                <td className={styles["col_two"]}>
                  {data.blocks[0].generatorPublicKey}
                </td>
              </tr>
              <tr>
                <td className={styles["col_one"]}>{formatMessage({ id: "block.generatorId" })}</td>
                <td className={styles["col_two"]}>
                  {data.blocks[0].generatorId}
                </td>
              </tr>
              <tr>
                <td className={styles["col_one"]}>{formatMessage({ id: "block.blockSignature" })}</td>
                <td className={styles["col_two"]}>
                  {data.blocks[0].blockSignature}
                </td>
              </tr>
              <tr>
                <td className={styles["col_one"]}>{formatMessage({ id: "block.totalForged" })}</td>
                <td className={styles["col_two"]}>
                  {data.blocks[0].totalForged / 100000000} {Cnf.coinName}
                </td>
              </tr>
            </tbody>
          </table>
          {/* <Card title='交易列表' style={{marginTop:"20px"}}>

        </Card> */}
        </Card>
      </div>
    );
  }
}

export default BlockDetail
