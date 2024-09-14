import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Table, message, Input, Select, Row, Col, Card, Empty } from 'antd';
import GeoPattern from 'geopattern';
import dayjs from 'dayjs';
import services from '@/services/ddn-explorer';

import {i18n} from '@/utils/i18n';
import utils_slots from '@/utils/slots';
import LimitText from '@/components/LimitText';
// import Curved from '@/components/Curve';
import CountDown from '@/components/CountDown';
import HeightCount from '@/components/HeightCount';
import Cnf from '@/config';
import { AuditOutlined, CodepenOutlined, HistoryOutlined, RightOutlined, TransactionOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import styles from './Home.less';
import { useModel } from '@umijs/max';

const Home: React.FC = () => {    
    const [blockLoading, setBlockLoading] = useState(false);
    const [tansLoading, setTansLoading] = useState(false);
    const [currentHeight, setCurrentHeight] = useState(1);
    const [duration, setDuration] = useState(0);
    const [backgroundImg, setBackgroundImg] = useState('');
    const [globalStatus, setGlobalStatus] = useState({});
    const [blockData, setBlockData] = useState({ blocks: [], count: 0 });
    const [transactionData, setTransactionData] = useState({ transactions: [], count: 0 });
    const [peersData, setPeersData] = useState({ peers: [], count: 0 });
    const [aobData, setAobData] = useState([]);
    const { initialState } = useModel('@@initialState');
  
    useEffect(() => {
        getBlocks({ offset: 0, limit: 5, orderBy: 'height:desc' });
        getTransactions({ offset: 0, limit: 5, orderBy: 't_timestamp:desc' });
        getStatus();
        getAccountsNum();
        getTimeData();
        getPeers();
        getAobs();

        // return () => {
        //     // 清理定时器
        // };
    }, []);

    const getTimeData = () => {
        let beginEpochTime = utils_slots.beginEpochTime(initialState?.beginDate || '');
        let duration = dayjs().diff(beginEpochTime, 'days');
        setDuration(duration);
    };

    const getStatus = async () => {
        try {
            const res = await services.block.getStatus();
            
            if (res.success) {
                setGlobalStatus(res);
                setCurrentHeight(res.height);
            } else {
                message.error(res.error.message);
            }
          } catch (error) {
            message.error('获取状态失败');
          }
        setTimeout(getStatus, 10000);
    };

    const getAccountsNum = async () => {
        const res = await services.account.getAccountSum();

        if (res.success !== true) {
            message.error(res.error);
        }
    };

    const getBlocks = async (params = {}) => {
        setBlockLoading(true);
        const res = await services.block.getBlocksList(params);

        if (res.success !== true) {
            message.error(res.error.message);
        }
        setBlockData(res);
        setBlockLoading(false);
    };

    const getPeers = async (params = { ip: '' }) => {
        const res = await services.peer.getPeersList(params);
        if (res.success !== true) {
            message.error(res.error);
        }
        setPeersData(res.peers);
    };

    const getTransactions = async (params = {}) => {
        setTansLoading(true);
        const res = await services.transaction.getLatestTrans(params);

        if (res.success !== true) {
            message.error(res.error);
        }
        setTransactionData(res); 
        setTansLoading(false);
    };

    const getAobs = async (params = {}) => {
        setBlockLoading(true);
        const res = await services.aob.getAobsList(params);
        if (res.success !== true) {
            message.error(res.error);
        }
        setAobData(res.result);
        setBlockLoading(false);
    };

    const generateBackImg = () => {
        const options = { color: '#ccc', generator: 'squares' };
        const bgImgUrl = GeoPattern.generate(
            'should derive the pattern from the hash',
            options,
        ).toDataUri();
        setBackgroundImg(bgImgUrl);
    };

    const transColumns = () => [
        {
            title: i18n.formatMessage({ id: 'trs.id' }),
            dataIndex: 'id',
            ellipsis: true,
            sorter: false,
            width: '14%',
            render: text => <LimitText title={text} link="/transactions/" />,
        },
        {
            title: i18n.formatMessage({ id: 'trs.type' }),
            dataIndex: 'type',
            sorter: false,
            width: '9%',
            render: text => i18n.formatMessage({ id: 'types.' + text }),
        },
        {
            title: i18n.formatMessage({ id: 'trs.senderId' }),
            dataIndex: 'senderId',
            ellipsis: true,
            sorter: false,
            width: '15%',
            render: text => <LimitText link="/accounts/" title={text} target="_blank" />,
        },
        {
            title: i18n.formatMessage({ id: 'trs.recipientId' }),
            dataIndex: 'recipientId',
            ellipsis: true,
            sorter: false,
            width: '15%',
            render: text => {
                let str = text;
                if (str) {
                    let arr = str.split('|');
                    return (
                        <div>
                            {arr.map((item, index) => (
                                <div key={index}>
                                    <LimitText target="_blank" title={item} link="/accounts/" />
                                </div>
                            ))}
                        </div>
                    );
                } else {
                    return <span></span>;
                }
            },
        },
        {
            title: i18n.formatMessage({ id: 'trs.amount' }) + `(${initialState?.tokenName})`,
            dataIndex: 'amount',
            sorter: false,
            width: '12%',
            render: text => `${text / 100000000.0}`,
        },
        {
            title: i18n.formatMessage({ id: 'trs.fee' }) + `(${initialState?.tokenName})`,
            dataIndex: 'fee',
            sorter: false,
            width: '11%',
            render: text => `${text / 100000000.0}`,
        },
        {
            title: i18n.formatMessage({ id: 'trs.height' }),
            dataIndex: 'block_height',
            sorter: false,
            width: '9%',
            render: text => (
                <Link to={'/blocks/' + text} target="_blank">
                    {text}
                </Link>
            ),
        },
        {
            title: i18n.formatMessage({ id: 'trs.timestamp' }),
            dataIndex: 'timestamp',
            width: '12%',
            render: text => {
                let timeStamp = new Date().getTime();
                let leftTime = timeStamp - utils_slots.getRealTime(Number(text), initialState?.beginDate || '');
                return utils_slots.formatDuring(leftTime);
            },
        },
    ];
    
    const blockColumns = self => [
        {
            title: i18n.formatMessage({ id: 'block.id' }),
            dataIndex: 'id',
            ellipsis: true,
            sorter: false,
            width: '15%',
            render: text => <LimitText title={text} />,
        },
        {
            title: i18n.formatMessage({ id: 'block.height' }),
            dataIndex: 'height',
            sorter: false,
            width: '9%',
            render: text => {
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
            width: '8%',
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
            width: '16%',
            render: text => <LimitText link="/accounts/" title={text} target="_blank" length={15} />,
        },
        {
            title: i18n.formatMessage({ id: 'block.timestamp' }),
            dataIndex: 'timestamp',
            width: '12%',
            render: text => {
                let timeStamp = new Date().getTime();
                let leftTime = timeStamp - utils_slots.getRealTime(Number(text), initialState?.beginDate || '');
                return utils_slots.formatDuring(leftTime);
            },
        },
    ];
    
    return (
        <div className={styles.homePage}>
            <div className={styles.banner}>
                <div className={styles.bgImageWrap}>
                    {/* <img alt='background' src={backgroundImg} width="600" height="320px" className={styles.bgImage} /> */}
                </div>
                <div className={styles.height}>
                    <div className={styles.heightTitle}>
                        {i18n.formatMessage({ id: 'home.height' })}
                        <CountDown timeCount={10} />
                    </div>
                    <HeightCount numbers={`${currentHeight}`} />
                </div>
            </div>
            <div className={styles.subBanner}>
                <div className={styles.subWrap}>
                    <div className={styles['pannel']}>
                        <UsergroupAddOutlined className={styles['icon']}/>
                        <div className={styles['ptitle']}>{i18n.formatMessage({ id: 'home.transfers' })}</div>
                        <div className={styles['number']}>{blockData.count}</div>
                    </div>
                    {/* <div className={styles['pannel']}>
            <UsergroupAddOutlined className={styles['icon']}/>
            <div className={styles['ptitle']}>
              {i18n.formatMessage({ id: 'home.tokenAmount' })}
            </div>
            <div className={styles['number']}>{global.status.supply / 100000000}</div>
          </div> */}
                    <div className={styles.pannel}>
                        <div className="icon-wrap">
                            <AuditOutlined className={styles['icon']} />
                        </div>

                        <div className={styles.ptitle}>
                            {i18n.formatMessage({ id: 'home.transaction_count' })}
                        </div>
                        <span className={styles.number}>{transactionData.count}</span>
                    </div>
                    <div className={styles['pannel']}>
                        <HistoryOutlined className={styles['icon']} />
                        <div className={styles['ptitle']}>{i18n.formatMessage({ id: 'home.run_time' })}</div>
                        <div className={styles['number']}>
                            {duration} {i18n.formatMessage({ id: 'home.days' })}
                        </div>
                    </div>
                </div>
            </div>

            
            <div className={styles.pageWrap}>
                {/* {curveData.length !== 0 && (
                    <Card>
                        <div className={styles.chartWrap}>
                            <div className={styles.Curved} style={{ textAlign: 'center' }}>
                                <div className={styles['title_main']}>
                                    {i18n.formatMessage({ id: 'home.aweek_title' })}
                                </div>

                                <div className={styles['text_secondary']} style={{ marginTop: '132px' }}>
                                    {i18n.formatMessage({ id: 'home.no_data' })}
                                </div>
                            </div>
                        </div>
                    </Card>
                )} */}

                <div style={{ minHeight: '500px' }}>
                    <div className={styles['lastest']}>
                        <Card
                            title={
                                <div className={styles.cardText}>
                                    <TransactionOutlined className={styles['icon']} />
                                    {i18n.formatMessage({ id: 'home.latest_transactions' })}
                                </div>
                            }
                            extra={
                                <div className={styles['moreText']}>
                                    <Link to="/transactions">
                                        查看{i18n.formatMessage({ id: 'home.more' })}
                                    </Link>
                                    <RightOutlined style={{ marginTop: '1px' }}/>
                                </div>
                            }
                        >
                            <Table
                                columns={transColumns(this)}
                                size="middle"
                                pagination={false}
                                rowKey={record => record.id}
                                dataSource={transactionData.transactions}
                                loading={tansLoading}
                                rowClassName={(record, index) => {
                                    if (index % 2 == 0) {
                                        return styles.tabRow;
                                    }
                                    return styles.tabRowB;
                                }}
                                style={{ minHeight: '294px' }}
                            />
                        </Card>
                    </div>

                    <div className={styles['lastest']} id="ddd">
                        <Card
                            title={
                                <div className={styles.cardText}>
                                    <CodepenOutlined className={styles['icon']} />
                                    {i18n.formatMessage({ id: 'home.latest_blocks' })}
                                </div>
                            }
                            extra={
                                <div className={styles['moreText']}>
                                    <Link to="/blocks">
                                        查看{i18n.formatMessage({ id: 'home.more' })}
                                    </Link>
                                    <RightOutlined style={{ marginTop: '1px' }}/>
                                </div>
                            }
                        >
                            <Table
                                columns={blockColumns(this)}
                                size="middle"
                                pagination={false}
                                rowKey={record => record.height}
                                dataSource={blockData.blocks}
                                loading={blockLoading}
                                rowClassName={(record, index) => {
                                    if (index % 2 == 0) {
                                        // console.log('Index的值：' + { index });
                                        return styles.tabRow;
                                    }
                                    return styles.tabRowB;
                                }}
                                style={{ minHeight: '294px' }}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;