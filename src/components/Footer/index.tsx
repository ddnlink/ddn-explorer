/**
 * @file Footer.tsx
 * @description 应用程序底部组件,包含版权信息和社交媒体链接
 * @copyright Copyright (c) 2023 DDN FOUNDATION
 * @license Licensed under the ASD 3.0 License.
 * @author Imfly <kubying@qq.com>
 * @version 1.0.0
 * @created 2024-09-13
 * @last-modified 2024-09-13
 */

import React, { useState, useEffect } from 'react';
import { Layout, message } from 'antd';
import imgWeibo from '@/assets/images/weibo.svg';
import imgWeixin from '@/assets/images/weixin.svg';
import imgTwitter from '@/assets/images/twitter.svg';
import imgFacebook from '@/assets/images/facebook2.svg';
import imgInstagram from '@/assets/images/instagram.svg';
import imgSlack from '@/assets/images/slack.svg';
import imgTelegram from '@/assets/images/telegram.svg';
import styles from './Footer.less';
import { useModel } from '@umijs/max';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  const [appinfo, setAppinfo] = useState<any>(null);
  const { initialState } = useModel("@@initialState");

  useEffect(() => {
    const storedAppinfo = sessionStorage.getItem('appinfo');
    if (storedAppinfo) {
      setAppinfo(JSON.parse(storedAppinfo));
    }
    // getPeers();
  }, []);

  const openWeixinBarcode = () => {
    // 实现微信二维码展示逻辑
  };

  const mainWidth = '100%';

  return (
    <Footer style={{ textAlign: 'center', width: mainWidth }}>
      <div
        style={{
          height: '100px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <div>
          <span
            className={`${styles['App-logo']} ${styles[`App-${initialState?.tokenName}-logo`]}`}
            style={appinfo ? { backgroundImage: `url(${appinfo.logo_url})` } : {}}
          />
        </div>
        <div>
          <div className="Footer-Item-Title" style={{ fontWeight: 'lighter' }}>
            {/* <FormattedMessage id="footer_title4" /> */}
          </div>
          <div style={{ textAlign: 'left', margin: '30px 0px 20px 0px' }}>
            <a href="javascript:void(0)" onClick={openWeixinBarcode}>
              <img
                src={imgWeixin}
                width="24px"
                height="24px"
                alt="微信公众号"
                title="微信公众号"
              />
            </a>
            <div style={{ width: '15px', display: 'inline-block' }}></div>
            <a href="http://weibo.com/ddnlink" target="_blank" rel="noopener noreferrer">
              <img src={imgWeibo} width="24px" height="24px" alt="微博" title="微博" />
            </a>
            <div style={{ width: '15px', display: 'inline-block' }}></div>
            <a href="https://twitter.com/DDN_link" target="_blank" rel="noopener noreferrer">
              <img src={imgTwitter} width="24px" height="24px" alt="Twitter" title="Twitter" />
            </a>
            <div style={{ width: '15px', display: 'inline-block' }}></div>
            <a href="https://www.facebook.com/DDNlink" target="_blank" rel="noopener noreferrer">
              <img src={imgFacebook} width="24px" height="24px" alt="Facebook" title="Facebook" />
            </a>
            <div style={{ width: '15px', display: 'inline-block' }}></div>
            <a href="https://www.instagram.com/ddn_link/" target="_blank" rel="noopener noreferrer">
              <img
                src={imgInstagram}
                width="24px"
                height="24px"
                alt="Instagram"
                title="Instagram"
              />
            </a>
            <div style={{ width: '15px', display: 'inline-block' }}></div>
            <a href="https://ddnlink.slack.com" target="_blank" rel="noopener noreferrer">
              <img src={imgSlack} width="24px" height="24px" alt="Slack" title="Slack" />
            </a>
            <div style={{ width: '15px', display: 'inline-block' }}></div>
            <a href="https://t.me/joinchat/H-kmwQ0dbU9fofIgd1nvVg" target="_blank" rel="noopener noreferrer">
              <img src={imgTelegram} width="24px" height="24px" alt="Telegram" title="Telegram" />
            </a>
          </div>
        </div>
        <div style={{ marginTop: '10px' }}>
          {initialState?.tokenName === 'DDN' && (
            <div>区块链备案: 京网信备11010519864491550014号</div>
          )}
          Copyright © {appinfo ? appinfo.Ccpyright : '2018 Powered by DDN FOUNDATION'}
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;