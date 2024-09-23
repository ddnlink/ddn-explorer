import React, { useState, useEffect } from 'react';
import { useParams } from 'umi';
import { message, Card } from 'antd';
import { useModel } from '@umijs/max';
import { TransactionOutlined } from '@ant-design/icons';
import { i18n } from '@/utils/i18n';
import utils_slots from '@/utils/slots';
import services from '@/services/ddn-explorer';
import styles from './id.less';
import dayjs from 'dayjs';

const TransactionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState<any>(null);
  const [asset, setAsset] = useState<any>(null);
  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    getTransactionDetail(id);
  }, [id]);

  const getTransactionDetail = async (transactionId: string) => {
    setLoading(true);
    try {
      const res = await services.transaction.getTransactionDetail({ id: transactionId});
      console.log('res', res);
      if (res.success) {
        setTransaction(res.transaction);
        if (res.transaction?.asset) {
          setAsset(res.transaction.asset);
        }
      } else {
        message.error(res.error?.message || '获取交易详情失败');
      }
    } catch (error) {
      console.error('获取交易详情失败:', error);
      message.error('获取交易详情失败');
    } finally {
      setLoading(false);
    }
  };

  if (!transaction) {
    return (
      <div style={{ textAlign: 'center', margin: '100px' }}>
        {i18n.formatMessage({ id: 'trs.no_detail' })}
      </div>
    );
  }

  const trs = transaction;

  return (
    <div className={styles.pageWrap}>
      <Card
        title={
          <div className={styles.cardText}>
            <TransactionOutlined className={styles['icon']}/>
            {i18n.formatMessage({ id: 'trs.trs_detail' })}
          </div>
        }
      >
         {asset && asset.aobTransfer && (
          <div className={styles['footer']}>
            <div className={styles['left']}>智能资产</div>
            <div className={styles['right']}>
              <div className={styles['right_content']}>
                <span className={styles['col_one']}>积分名称:</span>
                <span className={styles['col_two']}>{asset.aobTransfer.currency}</span>
              </div>
              <div className={styles['right_content']}>
                <span className={styles['col_one']}>数量:</span>
                <span className={styles['col_two']}>
                  {asset.aobTransfer.amount / 1000}
                </span>
              </div>
              <div className={styles['right_content']}>
                <span className={styles['col_one']}>内容 Hash:</span>
                <span className={styles['col_two']}>
                  {asset.aobTransfer.content}
                </span>
              </div>
      
              {/* <div className={styles['right_content']}>
                <span className={styles['col_one']}>描述:</span>
                <span className={styles['col_two']}>
                  {JSON.parse(asset.aobTransfer.article.description).des}
                </span>
              </div> */}
            
              <div className={styles['right_content']} id={styles['right_content_b']}>
                <span className={styles['col_one']}> 资产交易 ID:</span>
                <span className={styles['col_two']}>
                  {asset.aobTransfer.transaction_id}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className={styles['content']}>
          <div className={styles['content_d']}>
            <span className={styles['col_one']}>{i18n.formatMessage({ id: 'trs.height' })}</span>
            <span className={styles['col_two']}>{trs.block_height}</span>
          </div>
          <div className={styles['content_d']}>
            <span className={styles['col_one']}>{i18n.formatMessage({ id: 'trs.blockid' })}</span>
            <span className={styles['col_two']}>{trs.block_id}</span>
          </div>
          <div className={styles['content_d']}>
            <span className={styles['col_one']}>{i18n.formatMessage({ id: 'trs.type' })}</span>
            <span className={styles['col_two']}>
              {i18n.formatMessage({ id: 'types.' + trs.type })}
            </span>
          </div>
          <div className={styles['content_d']}>
            <span className={styles['col_one']}>
              {i18n.formatMessage({ id: 'trs.timestamp' })}
            </span>
            <span className={styles['col_two']}>
              {dayjs(utils_slots.getRealTime(Number(trs.timestamp), initialState?.beginDate || '')).format(
                'YYYY-MM-DD HH:mm:ss',
              )}
            </span>
          </div>
          <div className={styles['content_d']}>
            <span className={styles['col_one']}>
              {i18n.formatMessage({ id: 'trs.senderPublicKey' })}
            </span>
            <span className={styles['col_two']}>{trs.senderPublicKey}</span>
          </div>
          <div className={styles['content_d']}>
            <span className={styles['col_one']}>
              {i18n.formatMessage({ id: 'trs.senderAddress' })}
            </span>
            <span className={styles['col_two']}>{trs.senderId}</span>
          </div>
          <div className={styles['content_d']}>
            <span className={styles['col_one']}>
              {i18n.formatMessage({ id: 'trs.receipientAddress' })}
            </span>
            <span className={styles['col_two']}>{trs.recipientId}</span>
          </div>
          <div className={styles['content_d']}>
            <span className={styles['col_one']}>{i18n.formatMessage({ id: 'trs.amount' })}</span>
            <span className={styles['col_two']}>
              {trs.amount / 100000000} {initialState?.tokenName}
            </span>
          </div>
          <div className={styles['content_d']}>
            <span className={styles['col_one']}>{i18n.formatMessage({ id: 'trs.fee' })}</span>
            <span className={styles['col_two']}>
              {trs.fee / 100000000} {initialState?.tokenName}
            </span>
          </div>
          <div className={styles['content_d']}>
            <span className={styles['col_one']}>
              {i18n.formatMessage({ id: 'trs.signature' })}
            </span>
            <span className={styles['col_two']}>{trs.signature}</span>
          </div>
          <div className={styles['content_d']}>
            <span className={styles['col_one']}>
              {i18n.formatMessage({ id: 'trs.signSignature' })}
            </span>
            <span className={styles['col_two']}>{trs.signSignature}</span>
          </div>
          <div className={styles['content_d']}>
            <span className={styles['col_one']}>
              {i18n.formatMessage({ id: 'trs.confirmations' })}
            </span>
            <span className={styles['col_two']}>{trs.confirmations}</span>
          </div>
          <div className={styles['content_d']}>
            <span className={styles['col_one']}>{i18n.formatMessage({ id: 'trs.args' })}</span>
            <span className={styles['col_two']}>
              {Array.isArray(trs.args)
                ? trs.args.join(',')
                : trs.args}
            </span>
          </div>
          <div className={styles['content_d']}>
            <span className={styles['col_one']}>{i18n.formatMessage({ id: 'trs.message' })}</span>
            <span className={styles['col_two']}>{trs.message}</span>
          </div>
        </div>
       
      </Card>
    </div>
  );
};

export default TransactionDetail;