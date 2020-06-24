import React, { Component } from "react";
import { formatMessage } from 'umi-plugin-locale';
import utils_slots from "../../utils/slots"
import styles from "./id.less";
import moment from "moment"
import { message, Card,Icon} from 'antd'
import { connect } from 'dva';
import Cnf from "../../config"
@connect(({ transaction }) => ({
  transaction
}))
class TransactionDetial extends Component {
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
    console.log('zheshijiaoyiid', params)
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'transaction/getOneTransDetail',
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
  };

  render() {
    const { transaction } = this.props
    const data = JSON.stringify(transaction.oneTransDetail) !== '{}' ? transaction.oneTransDetail : null
    console.log('000000000000000000000', transaction.oneTransDetail, data)
    if (!data) {
      return <div style={{ textAlign: "center", margin: "100px" }}>{formatMessage({ id: "trs.no_detail" })}</div>;
    }
    return (
      <div className={styles.pageWrap}>
        <Card title={
          <div className={styles.cardText}>
            <Icon className={styles['icon']} type="transaction" />
            {formatMessage({ id: "trs.trs_detail" })}
          </div>
        }>
          <div className={styles["content"]}>
            <div className={styles["content_d"]}>
              <span className={styles["col_one"]}>{formatMessage({ id: "trs.height" })}</span>
              <span className={styles["col_two"]}>
                {data.transaction.height}
              </span>
            </div>
            <div className={styles["content_d"]}>
              <span className={styles["col_one"]}>{formatMessage({ id: "trs.blockid" })}</span>
              <span className={styles["col_two"]}>
                {data.transaction.blockId}
              </span>
            </div>
            <div className={styles["content_d"]}>
              <span className={styles["col_one"]}>{formatMessage({ id: "trs.type" })}</span>
              <span className={styles["col_two"]}>{formatMessage({ id: "types." + data.transaction.type })}</span>
            </div>
            <div className={styles["content_d"]}>
              <span className={styles["col_one"]}>{formatMessage({ id: "trs.timestamp" })}</span>
              <span className={styles["col_two"]}>
                {
                  //    moment(data.transaction.timestamp*1000).format('YYYY-MM-DD HH:mm:ss')
                  moment(utils_slots.getRealTime(Number(data.transaction.timestamp))).format('YYYY-MM-DD HH:mm:ss')
                }
              </span>
            </div>
            <div className={styles["content_d"]}>
              <span className={styles["col_one"]}>{formatMessage({ id: "trs.senderPublicKey" })}</span>
              <span className={styles["col_two"]}>
                {data.transaction.senderPublicKey}
              </span>
            </div>
            <div className={styles["content_d"]}>
              <span className={styles["col_one"]}>{formatMessage({ id: "trs.senderAddress" })}</span>
              <span className={styles["col_two"]}>
                {data.transaction.senderId}
              </span>
            </div>
            <div className={styles["content_d"]}>
              <span className={styles["col_one"]}>{formatMessage({ id: "trs.receipientAddress" })}</span>
              <span className={styles["col_two"]}>
                {data.transaction.recipientId}
              </span>
            </div>
            {/* <div className={styles["content_d"]}>
                        <span className={styles["col_one"]}>{formatMessage({ id: "trs.amount" })}</span>
                        <span className={styles["col_two"]}>
                            {data.transaction.amount / 100000000} {Cnf.coinName}
                        </span>
                    </div>
                    <div className={styles["content_d"]}>
                        <span className={styles["col_one"]}>{formatMessage({ id: "trs.fee" })}</span>
                        <span className={styles["col_two"]}>
                            {data.transaction.fee / 100000000} {Cnf.coinName}
                        </span>
                    </div> */}
            <div className={styles["content_d"]}>
              <span className={styles["col_one"]}>{formatMessage({ id: "trs.signature" })}</span>
              <span className={styles["col_two"]}>
                {data.transaction.signature}
              </span>
            </div>
            <div className={styles["content_d"]}>
              <span className={styles["col_one"]}>{formatMessage({ id: "trs.signSignature" })}</span>
              <span className={styles["col_two"]}>
                {data.transaction.signSignature}
              </span>
            </div>
            <div className={styles["content_d"]}>
              <span className={styles["col_one"]}>{formatMessage({ id: "trs.confirmations" })}</span>
              <span className={styles["col_two"]}>
                {data.transaction.confirmations}
              </span>
            </div>
            <div className={styles["content_d"]}>
              <span className={styles["col_one"]}>{formatMessage({ id: "trs.args" })}</span>
              <span className={styles["col_two"]}>{Array.isArray(data.transaction.args) ? data.transaction.args.join(",") : data.transaction.args}</span>
            </div>
            <div className={styles["content_d"]}>
              <span className={styles["col_one"]}>{formatMessage({ id: "trs.message" })}</span>
              <span className={styles["col_two"]}>
                {data.transaction.message}
              </span>
            </div>
          </div>
          {data.transaction.asset.article &&
            <div className={styles["footer"]}>
              <div className={styles["left"]}>交易内容</div>
              <div className={styles["right"]}>
                <div className={styles["right_content"]}>
                  <span className={styles["col_one"]}>文件名称:</span>
                  <span className={styles["col_two"]}>
                    {data.transaction.asset.article.title}
                  </span>
                </div>
                <div className={styles["right_content"]}>
                  <span className={styles["col_one"]}>内容hash:</span>
                  <span className={styles["col_two"]}>
                    {data.transaction.asset.article.fileHash}
                  </span>
                </div>
                <div className={styles["right_content"]}>
                  <span className={styles["col_one"]}>创作:</span>
                  <span className={styles["col_two"]}>
                    {data.transaction.asset.article.filename}
                  </span>
                </div>
                <div className={styles["right_content"]}>
                  <span className={styles["col_one"]}>描述:</span>
                  <span className={styles["col_two"]}>
                    {
                      JSON.parse(
                        data.transaction.asset.article.description
                      ).des
                    }
                  </span>
                </div>
                <div className={styles["right_content"]}>
                  <span className={styles["col_one"]}>url:</span>
                  <span className={styles["col_two"]}>
                    {
                      JSON.parse(
                        data.transaction.asset.article.description
                      ).url
                    }
                  </span>
                </div>
                <div className={styles["right_content"]} id={styles["right_content_b"]}>
                  <span className={styles["col_one"]}>size:</span>
                  <span className={styles["col_two"]}>
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
        </Card>
      </div>
    );
  }
}
export default TransactionDetial
