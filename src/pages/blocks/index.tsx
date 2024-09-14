import services from '@/services/ddn-explorer';
import React, { useState, useEffect } from 'react';
import { Table, message, Card } from 'antd';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import { useModel } from '@umijs/max';
import dayjs from 'dayjs';
import { i18n } from '@/utils/i18n';
import utils_slots from '@/utils/slots';
import LimitText from '@/components/LimitText';
import styles from './index.less';

const BlockView = () => {
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [pagination, setPagination] = useState({});
    const [data, setData] = useState([]);
    const { initialState } = useModel('@@initialState');

    useEffect(() => {
        getBlocks({ offset: 0, limit: 10, orderBy: 'height:desc' });
    }, []);

    const handleTableChange = (pagination, filters, sorter) => {
        getBlocks({
            current: pagination.current,
            limit: pagination.pageSize,
            offset: (pagination.current - 1) * pagination.pageSize,
            orderBy: 'height:desc',
        });
    };

    const getBlocks = async (
        params = {},
    ) => {
        setLoading(true);
        try {
            const res = await services.block.getBlocksList(params)
            setData(res.blocks);
            if (res.success) {
                setLoading(false);
                setPagination(() => ({
                    ...pagination,
                    total: res.count
                }));
            }
        } catch (error) {
            message.error(error.message);
            setLoading(false);
        }
    };

    const columns = () => [
        {
            title: i18n.formatMessage({ id: 'block.height' }),
            dataIndex: 'height',
            sorter: false,
            width: '10%',
            render: (text, record, index) => {
                return (
                    <Link to={'/blocks/' + text} target="_blank">
                        {text}
                    </Link>
                );
            },
        },
        {
            title: i18n.formatMessage({ id: 'block.numberOfTransactions' }),
            dataIndex: 'number_of_transactions',
            sorter: false,
            width: '9%',
        },
        {
            title: i18n.formatMessage({ id: 'block.confirmations' }),
            dataIndex: 'confirmations',
            sorter: false,
            width: '9%',
        },
        {
            title: i18n.formatMessage({ id: 'block.reward' }) + `(${initialState?.tokenName})`,
            dataIndex: 'reward',
            sorter: false,
            width: '13%',
            render: (text, record, index) => {
                return Math.floor(Number(record.reward) / 100000000);
            },
        },
        {
            title: i18n.formatMessage({ id: 'block.totalAmount' }) + `(${initialState?.tokenName})`,
            dataIndex: 'total_amount',
            sorter: false,
            width: '12%',
            render: text => {
                return Math.floor(Number(text) / 100000000);
            },
        },
        {
            title: i18n.formatMessage({ id: 'block.totalFee' }) + `(${initialState?.tokenName})`,
            dataIndex: 'total_fee',
            sorter: false,
            width: '12%',
            render: text => `${text / 100000000.0}`,
        },

        {
            title: i18n.formatMessage({ id: 'block.generatorId' }),
            dataIndex: 'generator_id',
            ellipsis: true,
            sorter: false,
            width: '17%',
            render: text => <LimitText link="/accounts/" title={text} length={15} target="_blank" />,
        },
        {
            title: i18n.formatMessage({ id: 'block.timestamp' }),
            dataIndex: 'timestamp',
            width: '18%',
            render: text =>
                `${dayjs(utils_slots.getRealTime(Number(text), initialState?.beginDate || '')).format('YYYY-MM-DD HH:mm:ss')}`,
        },
    ];

    return (
        <div className={styles.pageWrap}>
            <Card>
                <Table
                    columns={columns()}
                    rowKey={record => record.height}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    rowClassName={(record, index) =>
                        index % 2 === 0 ? styles.tabRow : styles.tabRowB
                    }
                />
            </Card>
        </div>
    );
};

export default BlockView;

