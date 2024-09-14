// https://umijs.org/config/
import { join } from 'path';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

import { defineConfig } from '@umijs/max';

export default defineConfig({
  favicons: [
    // 完整地址
    // 'https://domain.com/favicon.ico',
    // 此时将指向 `/favicon.png` ，确保你的项目含有 `public/favicon.png`
    '/favicon.png'
  ],
  theme: { 
    'primary-color': '#1DA57A', 
    'logo-bg-color': '#013A6A',
    'light-primary-color': '#5bc5f4',
    'transparent-primary-color': '#5bc5f4',
    'dark-primary-color': '#013A6A',
    'card-actions-background': '#f5f8fa',
    'font-size-base': '16px',
    'font-size-secondary': '14px',
    'text-color': 'rgba(0, 0, 0, 0.65)',
    'text-color-secondary': 'rgba(0, 0, 0, .45)',
  },
  antd: {},
  access: {},
  model: {},
  routes,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  initialState: {},
  request: {},
  openAPI: {
    requestLibPath: "import { request } from 'umi'",
    // 或者使用在线的版本
    // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json",
    schemaPath: join(__dirname, 'oneapi.json'),
    mock: false,
  },
  layout: {
    title: 'DDN',
  },
  manifest: {
    basePath: '/',
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
    baseSeparator: '-',
  },
  plugins: ['@umijs/max-plugin-openapi'],
  npmClient: 'yarn'
});

