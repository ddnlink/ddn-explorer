/**
 * 账户页面： 仅仅显示基本信息
 */
import React, { Component } from 'react';
import { Table, message, Card } from 'antd';
import 'whatwg-fetch'
import { formatMessage } from 'umi-plugin-locale';
import { Link } from "react-router-dom"
import Cnf from "../../utils/config"
import { connect } from 'dva';
import styles from './index.less'

const columns = (self) => [{
    title: formatMessage({ id: 'account.address' }),
    dataIndex: 'address',
    sorter: false,
    width: '30%',
    render: (text) => {
        console.log('/////////////', self)
        return <Link to={"/accounts/" + text} target="_blank">{text}</Link>
    }
}, {
    title: formatMessage({ id: 'account.balance' }) + `(${Cnf.coinName})`,
    dataIndex: 'balance',
    sorter: false,
    width: '20%',
    render: (text, record, index) => {
        if (record.balance > 100000000) {
            return Number(record.balance / 100000000)
        } else {
            return Number(record.balance) + 'd'
        }
    }
}, {
    title: formatMessage({ id: 'account.publicKey' }),
    dataIndex: 'publicKey',
    width: '30%',
    render: (text) => {
        return <div>{text.slice(0,20) + '...'}</div>
    }
}, {
    title: formatMessage({ id: 'account.percent' }),
    dataIndex: 'pecent',
    width: '20%',
    render: (text, record, index) => {
        if (record.balance > 100000000) {
            let balance=record.balance
            let supply=self.props.global.status.supply
            console.log('total',supply,balance)
            return Number(balance / supply *100).toFixed(4) + '%'
        } else {
            return Number(record.balance) + 'd'
        }
    }
}
];
@connect(({ accounts, global }) => ({
    accounts,
    global
}))
class AccountView extends Component {
    state = {
        loading: false,
        filterDropdownVisible: false,
        searchText: '',
    }

    componentDidMount() {
        this.getBlocks({ offset: 1, limit: 20 });
    }

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.getBlocks({
            current: pagination.current,
            limit: pagination.pageSize,
            offset: (pagination.current - 1) * pagination.pageSize
        });
    }

    getBlocks = async (params = {}) => {
        this.setState({ loading: true });
        this.props.dispatch({
            type: 'accounts/getAccountList',
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
    }

    render() {
        const { accounts } = this.props
        console.log(accounts)
        const data = accounts.accountList.account.accounts
        const pagination = accounts.accountList.pagination
        return (
            <div className={styles.pageWrap}>
                <Card>
                    <Table 
                        columns={columns(this)}
                        rowKey={record => record.address}
                        dataSource={data}
                        pagination={pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}
                    />
                </Card>
            </div>
        );
    }
}

export default AccountView;
