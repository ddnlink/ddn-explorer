import React, { useState, useEffect } from 'react';
import { useParams, request } from 'umi';
import { message, Card, Radio } from 'antd';
import { i18n } from '@/utils/i18n';
import services from '@/services/ddn-explorer';
import styles from './address.less';
import TransactionHistory from './TransactionHistory';
import AccountInfo from './AccountInfo';
import Cnf from '@/config';
import { useModel } from '@umijs/max';

const tabList = [
  {
    key: 'all',
    tab: '全部',
  },
  {
    key: 'recipient',
    tab: '接收',
  },
  {
    key: 'sender',
    tab: '发送',
  },
];

const AccountDetail: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { address } = useParams<{ address: string }>();
  const [loading, setLoading] = useState(true);
  const [accountDetail, setAccountDetail] = useState<any>({});
  const [role, setRole] = useState('all');
  const [currency, setCurrency] = useState(initialState?.tokenName);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    getAccount();
  }, [address]);

  const getAccount = async () => {
    setLoading(true);
    try {
      const res = await services.account.getAccountDetail({ address });
      console.log('获取账户详情结果:', res);

      if (res.success) {
        setAccountDetail(res.account);
      } else {
        message.error(res.error?.message);
      }
    } catch (error) {
      console.error('获取账户详情失败:', error);
      message.error('获取账户详情失败');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setRole(key);
  };

  const handleAssetChange = (newCurrency: string) => {
    setCurrency(newCurrency);
  };

  if (Object.keys(accountDetail).length === 0) {
    return <div style={{ textAlign: 'center', margin: '100px' }}>找不到该地址</div>;
  }

  return (
    <div className={styles.pageWrap}>
      <Card>
        <AccountInfo
          address={address as string}
          handleAssetChange={handleAssetChange}
          accountDetail={accountDetail}
        />
      </Card>
      <Card
        style={{ marginTop: '30px' }}
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={handleTabChange}
      >
        <TransactionHistory
          curRole={role}
          currency={currency}
          address={address}
        />
      </Card>
    </div>
  );
};

export default AccountDetail;