
// src/components/Header/index.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Row, Col, Input, Layout, Menu, Dropdown } from 'antd';
import { DownOutlined, NotificationOutlined, SearchOutlined } from '@ant-design/icons';
import { i18n, setLocale, getLocale } from '@/utils/i18n';
import utils_crypto from '@/utils/crypto';
import en_US from '@/assets/images/lang/en_US.png';
import zh_CN from '@/assets/images/lang/zh_CN.png';
import styles from './Header.less';
import { DayjsLocale } from '@/utils/dayjs';
import { Link, useModel } from '@umijs/max';

const { Header } = Layout;

DayjsLocale();

const AppHeader: React.FC = () => {
  const [searchText, setSearchText] = useState<string | null>(null);
  const [lang, setLang] = useState(getLocale());
  const [appinfo, setAppinfo] = useState(null);
  const [mainWidth, setMainWidth] = useState('100%');
  const { initialState } = useModel("@@initialState");

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // 初始化时调用一次

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const switchLang = (value: string) => {
    setLocale(value);
    setLang(value);
  };

  const handleSearch = () => {
    let searchTxt = (document.getElementById('searchTxt') as HTMLInputElement)?.value;
    searchTxt = searchTxt?.trim();
    toSearch(searchTxt);
  };

  const onPressEnter = () => {
    let searchTxt = (document.getElementById('searchTxt') as HTMLInputElement)?.value;
    searchTxt = searchTxt?.trim();
    toSearch(searchTxt);
  };

  const toSearch = (searchText: string) => {
    if (utils_crypto.isAddress(searchText)) {
      window.location.href = `/accounts/${searchText}`;
    } else if (/^([1-9][0-9]*)$/.test(searchText)) {
      window.location.href = `/blocks/${searchText}`;
    } else {
      window.location.href = `/transactions/${searchText}`;
    }
  };

  // 根据屏幕宽度设置mainWidth
  const handleResize = () => {
    // console.log('window.innerWidth', window.innerWidth);

    // if (window.innerWidth <= 768) {
    //   setMainWidth('768px');
    // } else if (window.innerWidth <= 980) {
    //   setMainWidth('980px');
    // } else {
    // }
    setMainWidth('100%');
  };

  const items = [
    {
      key: 'zh-CN',
      label: (
        <div className="Header-Language-Menu-Item" onClick={() => switchLang('zh-CN')}>
          <img src={zh_CN} width="16px" className={styles.lang_img} alt="中文" />
          {i18n.formatMessage({ id: 'zh-CN' })}
        </div>
      ),
    },
    {
      key: 'en-US',
      label: (
        <div className="Header-Language-Menu-Item" onClick={() => switchLang('en-US')}>
          <img src={en_US} width="16px" className={styles.lang_img} alt="English" />
          {i18n.formatMessage({ id: 'en-US' })}
        </div>
      ),
    },
  ];

  // 使用 useMemo 来计算当前选中的菜单项，只有在 location.pathname 变化时才重新计算
  const selectedKeys = useMemo(() => {
    const pathname = location.pathname;
    if (pathname === '/home') return ['1'];
    if (pathname.startsWith('/blocks')) return ['2'];
    if (pathname.startsWith('/transactions')) return ['3'];
    if (pathname.startsWith('/evidences')) return ['4'];
    if (pathname.startsWith('/peers')) return ['5'];
    if (pathname.startsWith('/accounts')) return ['6'];
    if (pathname.startsWith('/delegates')) return ['7'];
    return [];
  }, [location.pathname]);

  const menuItems = [
    { key: '1', path: '/home', label: i18n.formatMessage({ id: 'menu.home' }) },
    { key: '2', path: '/blocks', label: i18n.formatMessage({ id: 'menu.block' }) },
    { key: '3', path: '/transactions', label: i18n.formatMessage({ id: 'menu.trs' }) },
    { key: '4', path: '/evidences', label: i18n.formatMessage({ id: 'menu.evidence' }) },
    { key: '5', path: '/peers', label: i18n.formatMessage({ id: 'menu.peer' }) },
    { key: '6', path: '/accounts', label: i18n.formatMessage({ id: 'menu.account' }) },
    { key: '7', path: '/delegates', label: i18n.formatMessage({ id: 'menu.delegate' }) },
    // { key: '8', path: '/aobs', label: i18n.formatMessage({ id: 'menu.aob' }) },
  ];

  return (
    <Header className={styles.header} style={{ width: mainWidth, margin: '0 auto' }}>
      <Row type="flex" justify="start">
        <Col span={2}>
          <NavLink to="/">
            <span className={styles.logo_wrap}>
              <span
                className={`${styles['App-logo']} ${styles[`App-${initialState?.tokenName}-logo`]}`}
                style={appinfo ? { backgroundImage: `url(${appinfo.logo_url})` } : {}}
              />
            </span>
          </NavLink>
        </Col>
        <Col span={12}>
          <Menu
            className={styles.Menus}
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            style={{ lineHeight: '64px' }}
          >
            {menuItems.map(item => (
              <Menu.Item key={item.key} className={styles.Menus_Item}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Col>
        <Col span={7}>
          <div className={styles.search_wrap}>
            <Input
              id="searchTxt"
              type="text"
              className={styles.search_input}
              placeholder={i18n.formatMessage({ id: 'search.placeholder' })}
              onPressEnter={onPressEnter}
            />
            <SearchOutlined className={styles.search_icon} onClick={handleSearch} />
          </div>
        </Col>
        {/* <Col span={1}>
          <div style={{ textAlign: 'right', marginRight: '5px' }}>
            <a
              href="http://47.92.0.84:7005/"
              target="_blank"
              rel="noopener noreferrer"
              title="举报，反馈"
            >
              <NotificationOutlined />
            </a>
          </div>
        </Col> */}
        <Col span={2} className={styles.lang}>
          <Dropdown menu={{ items }} placement="bottomRight">
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <img
                src={lang === 'zh-CN' ? zh_CN : en_US}
                className={styles.lang_img}
                alt={lang === 'zh-CN' ? '中文' : 'English'}
              />
              {i18n.formatMessage({ id: lang })} <DownOutlined />
            </a>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;