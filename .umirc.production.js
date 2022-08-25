// ref: https://umijs.org/config/
export default {
  antd: {},
  dva: {},
  title: 'DDN Explore',
  dynamicImport: {},
  locale: {
    default: 'en-US',
    antd: true,
  },
  theme: {
    'logo-bg-color': '#013A6A',
    'primary-color': '#5bc5f4',
    'light-primary-color': '#5bc5f4',
    'transparent-primary-color': '#5bc5f44a',
    'dark-primary-color': '#013A6A',
    'card-actions-background': '#f5f8fa',
    'font-size-base': '16px',
    'font-size-secondary': '14px',
    'text-color': 'rgba(0, 0, 0, 0.65)',
    'text-color-secondary': 'rgba(0, 0, 0, .45)',
  },
  define: {
    'process.env.request_url': 'http://117.78.28.81:8000',
  },
};
