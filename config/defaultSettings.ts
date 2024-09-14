import { Settings as LayoutSettings } from '@ant-design/pro-layout';

// TODO: 使用抽屉定制一下
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  // primaryColor: '#1890ff',
  layout: 'top', // side
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'DATM',
  pwa: false,
  iconfontUrl: '',
};

export default Settings;
