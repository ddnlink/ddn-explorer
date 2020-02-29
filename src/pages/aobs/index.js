import "whatwg-fetch";
import { Link } from "react-router-dom";
import { Table, Card, message } from 'antd';
import styles from './index.less';
import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import Cnf from "../../utils/config"
import utils_slots from "../../utils/slots";
import LimitText from '../../component/LimitText';
import moment from "moment"

const columns = self => [
    {
        title: formatMessage({ id: "aob.name" }),
        dataIndex: "name",
        sorter: false,
        width: "10%",
        render: (text, record, index) => {
            return (
                <Link to={"/aobs/" + text} target="_blank">
                    {text}
                </Link>
            );
        }
    },
    {
        title: formatMessage({ id: "aob.numberOfTransactions" }),
        dataIndex: "fxs",
        sorter: false,
        width: "9%"
    },
    {
        title: formatMessage({ id: "aob.confirmations" }),
        dataIndex: "fxsx",
        sorter: false,
        width: "9%"
    },
    {
        title: formatMessage({ id: "aob.generatorId" }),
        dataIndex: "yfx",
        ellipsis: true,
        sorter: false,
        width: "17%",
        render: text => <LimitText link="/accounts/" title={text} length={15} target="_blank" />
    },
    {
        title: formatMessage({ id: "aob.confirmations" }),
        dataIndex: "jd",
        sorter: false,
        width: "9%"
    },
    {
        title: formatMessage({ id: "aob.timestamp" }),
        dataIndex: "timestamp",
        width: "18%",
        render: text =>
            `${moment(utils_slots.getRealTime(Number(text))).format('YYYY-MM-DD HH:mm:ss')}`
    }
];

const data = [
    {
        name: "1",
        fxs: "4234",
        fxsx: "435",
        yfx: "646",
        jd: "56",
        timestam: "653",
    },
    {
        name: "2",
        fxs: "3532",
        fxsx: "656",
        yfx: "75",
        jd: "865",
        timestam: "345",
    },
];

@connect(({ aob }) => ({
    aob
}))

class AobView extends Component {
    state = {

        loading: false,
        searchText: ""
    };

    componentDidMount() {
        this.getBlocks({ offset: 0, limit: 10, orderBy: "height:desc" });
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
        const { aob } = this.props;
        //const data = aob.data.latestBlocks.aob
        //const pagination =aob.data.pagination;

        return (
            <div>
                <Card>
                    <Table
                        columns={columns(this)}
                        rowKey={record => record.height}
                        dataSource={data}
                        //pagination={pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}
                        rowClassName={(record, index) => {
                            if (index % 2 != 0) {
                                return styles.rowStyleB;
                            }
                            return styles.rowStyle;
                        }
                        }
                    />
                </Card>
            </div>
        );
    }
}

export default AobView;
/*export default () => (
    <Link to="/">返回首页</Link>
);*/

//console.log("我也不知道该说什么？！");