import styles from './aobInfo.less';
import React, { Component } from "react";
import { Table, message, Card, Icon } from "antd";
import "whatwg-fetch";
import { Link } from "react-router-dom";
import moment from "moment"
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import Cnf from "../../utils/config"
import utils_slots from "../../utils/slots";
import LimitText from '../../component/LimitText';

const columns = self => [
    {
        title: formatMessage({ id: "block.height" }),
        dataIndex: "height",
        sorter: false,
        width: "10%",
        render: (text, record, index) => {
            return (
                <Link to={"/blocks/" + text} target="_blank">
                    {text}
                </Link>
            );
        }
    },
    {
        title: formatMessage({ id: "block.numberOfTransactions" }),
        dataIndex: "numberOfTransactions",
        sorter: false,
        width: "9%"
    },
    {
        title: formatMessage({ id: "block.confirmations" }),
        dataIndex: "confirmations",
        sorter: false,
        width: "9%"
    },
    {
        title: formatMessage({ id: "block.reward" }) + `(${Cnf.coinName})`,
        dataIndex: "reward",
        sorter: false,
        width: "13%",
        render: (text, record, index) => {
            return Math.floor(Number(record.reward) / 100000000)
        }
    },
    {
        title: formatMessage({ id: "block.totalAmount" }) + `(${Cnf.coinName})`,
        dataIndex: "totalAmount",
        sorter: false,
        width: "12%",
        render: text => {
            return Math.floor(Number(text) / 100000000)
        }
    },
    {
        title: formatMessage({ id: "block.totalFee" }) + `(${Cnf.coinName})`,
        dataIndex: "totalFee",
        sorter: false,
        width: "12%",
        render: text => `${text / 100000000.0}`
    },

    {
        title: formatMessage({ id: "block.generatorId" }),
        dataIndex: "generatorId",
        ellipsis: true,
        sorter: false,
        width: "17%",
        render: text => <LimitText link="/accounts/" title={text} length={15} target="_blank" />
    },
    {
        title: formatMessage({ id: "block.timestamp" }),
        dataIndex: "timestamp",
        width: "18%",
        render: text =>
            `${moment(utils_slots.getRealTime(Number(text))).format('YYYY-MM-DD HH:mm:ss')}`
    }
];
@connect(({ block, aob }) => ({
    block,
    aob
}))

class AobInfo extends Component {
    constructor(...args) {
        super(...args);
    }
    state = {

        loading: false,
        searchText: ""
    };

    componentDidMount() {
        this.getBlocks({ offset: 0, limit: 10, orderBy: "height:desc" });
        console.log("传入的值是：", this.props.location.query.documentQuery);
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.getBlocks({
            current: pagination.current,
            limit: pagination.pageSize,
            offset: (pagination.current - 1) * pagination.pageSize,
            orderBy: "height:desc"
        });
    };

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
                    loading: false,
                });
            }
        });
    };

    render() {
        const { block } = this.props
        const data = block.data.latestBlocks.blocks
        const pagination = block.data.pagination

        return (
            <div className={styles.pageWrap}>
                <Card title={
                    <div className={styles.cardText}>
                        <Icon className={styles['icon']} type="audit" />
                        资产详情
                    </div>
                }
                >
                    <table>
                        <tbody className={styles.aobTable}>
                            <tr>
                                <td className={styles["col_one"]}>资产名称</td>
                                <td className={styles["col_two"]}>{this.props.location.query.documentQuery}</td>
                            </tr>
                            <tr>
                                <td className={styles["col_one"]}>持币账户</td>
                                <td className={styles["col_two"]}>8efwfr734jhkfjoow773523jffew043k4nf4fnnnnkdnfnrenrf34312nf</td>
                            </tr>
                            <tr>
                                <td className={styles["col_one"]}>发行商</td>
                                <td className={styles["col_two"]}>DDN区块链中国区</td>
                            </tr>
                            <tr>
                                <td className={styles["col_one"]}>发行上限</td>
                                <td className={styles["col_two"]}>100000000000000000000000</td>
                            </tr>
                            <tr>
                                <td className={styles["col_one"]}>已发行量</td>
                                <td className={styles["col_two"]}>50000000000000000</td>
                            </tr>
                            <tr>
                                <td className={styles["col_one"]}>精度</td>
                                <td className={styles["col_two"]}>19.2</td>
                            </tr>
                            <tr>
                                <td className={styles["col_one"]}>发行时间</td>
                                <td className={styles["col_two"]}>2020-02-29 1083812124</td>
                            </tr>
                            <tr>
                                <td className={styles["col_one"]}>发行商地址</td>
                                <td className={styles["col_two"]}>98wrgjmohpttphjmbvjon315n514fwghrwrh6gdfhgjhjty67652345ghhhtr2463fqerghtrw676143n5m123lm413l2mofjerfgerwg039514858136jnowgnwenr45hiogngnwnfef</td>
                            </tr>
                            <tr>
                                <td className={styles["col_one"]}>资产描述</td>
                                <td className={styles["col_two"]}>轻资产</td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
                <Card style={{ marginTop: '20px' }}
                    title={
                        <div className={styles.cardText}>
                            <Icon className={styles['icon']} type="transaction" />
                            资产交易列表
                        </div>
                    }
                >
                    <Table
                        columns={columns(this)}
                        rowKey={record => record.height}
                        dataSource={data}
                        pagination={pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}
                        rowClassName={(record, index) => {
                            if (index % 2 != 0) {
                                return styles.tabRowB;
                            }
                            return styles.tabRow;
                        }
                        }
                    />
                </Card>
            </div>
        );
    }
}

export default AobInfo;
