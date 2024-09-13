import React, { useState, useEffect } from 'react';
import { Card, message, Tabs, Table, Button, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import QRCode from 'qrcode';
import { i18n } from '@/utils/i18n';
import Cnf from '@/config';
import styles from './address.less';
import { useModel } from '@umijs/max';

interface AccountInfoProps {
  address: string;
  accountDetail: any;
  handleAssetChange: (asset: string) => void;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ address, accountDetail, handleAssetChange }) => {
  const { initialState } = useModel('@@initialState');
  const [qrImgUrl, setQrImgUrl] = useState('');
  const [activeKey, setActiveKey] = useState(initialState?.tokenName);
  const [unit, setUnit] = useState(initialState?.tokenName);

  useEffect(() => {
    generateQRCode(address);
  }, [address]);

  const generateQRCode = async (qrUrl: string) => {
    const url = await QRCode.toDataURL(qrUrl);
    setQrImgUrl(url);
  };

  const handleSizeChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    if (newActiveKey === initialState?.tokenName) {
      setUnit(newActiveKey);
    } else {
      const asset = accountDetail.assets?.find((item: any) => item.currency === newActiveKey);
      if (asset) {
        setUnit(newActiveKey.split('.')[1]);
      }
    }
    handleAssetChange(newActiveKey);
  };

  const onCopyClick = (text: string, successMessage: string) => {
    copy(text);
    message.success(successMessage);
  };

  if (!accountDetail) {
    return <div></div>;
  }

  const columns = [
    {
      title: '字段',
      dataIndex: 'field',
      key: 'field',
      render: (text: string) => i18n.formatMessage({ id: `account.${text}` }),
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
      render: (text: string, record: any) => {
        if (record.field === 'address' || record.field === 'publicKey') {
          return (
            <span>
              {text}
              <Tooltip title={`复制${record.field === 'address' ? '地址' : '公钥'}`}>
                <Button
                  type="link"
                  icon={<CopyOutlined />}
                  onClick={() => onCopyClick(text, i18n.formatMessage({ id: `account.copy${record.field === 'address' ? 'Address' : 'PublicKey'}` }))}
                />
              </Tooltip>
            </span>
          );
        }
        if (record.field === 'balance' || record.field === 'unconfirmedBalance') {
          return `${Number(text) / 100000000} ${unit}`;
        }
        return text;
      },
    },
  ];

  const dataSource = [
    { key: 'address', field: 'address', value: accountDetail.address },
    { key: 'balance', field: 'balance', value: accountDetail.balance },
    { key: 'unconfirmedBalance', field: 'unconfirmedBalance', value: accountDetail.unconfirmed_balance },
    { key: 'publicKey', field: 'publicKey', value: accountDetail.publicKey },
  ];

  if (accountDetail.lockHeight) {
    dataSource.push({ key: 'lockHeight', field: 'lockHeight', value: accountDetail.lockHeight });
  }

  return (
    <div className={styles['pageWrap']}>
      <Card>
        <div className={styles['accountHead']}>
          <div style={{ width: '100%' }}>
            <Tabs
              onChange={handleSizeChange}
              type="card"
              activeKey={activeKey}
              tabBarStyle={{ width: '100%' }}
            >
              <Tabs.TabPane tab={initialState?.tokenName} key={initialState?.tokenName} />
              {accountDetail.assets?.map((item: any) => (
                <Tabs.TabPane tab={item.currency} key={item.currency} />
              ))}
            </Tabs>
            <div
              className={styles['accountForm']}
              style={{ paddingTop: 10, display: 'flex', width: '100%' }}
            >
              <div className={styles['accountScan']} style={{ padding: 0 }}>
                <img id={styles['imgQrCode']} src={qrImgUrl} className={styles['qrImg']} alt="" />
                <div className={styles['qrdesc']}>
                  {i18n.formatMessage({ id: 'account.scan' })}
                </div>
              </div>
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                className={styles['accountTable']}
                showHeader={false}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountInfo;