// 运行时配置
import services from '@/services/ddn-explorer';
import I18n from "./utils/i18n";
import Header from "./components/Header";
import Footer from "./components/Footer";

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<API.NetworkResponse> {
  const res = await services.network.getNetwork();
  if (res.success) {
    return res;
  } else {
    return {
      success: false,
      nethash: '',
      tokenName: '',
      tokenPrefix: '',
      beginDate: '',
    };
  }
}

export const layout = () => {
  I18n();

  return {
    title: 'DATM',
    logo: '/logo.svg',
    menu: {
      locale: false,
    },
    layout: 'top',
    headerRender: () => <Header />,
    footerRender: () => <Footer />
  };
};
