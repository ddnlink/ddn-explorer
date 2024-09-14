// https://v2.umijs.org/zh/plugin/umi-plugin-react.html#locale
// => https://v3.umijs.org/zh-CN/plugins/plugin-locale
// TODO after migration all Class Components to Function Components => useIntl

import { useIntl } from 'umi';

// 每个页面中，如果要使用 i18n 的话，需要先调用该方法
export const i18n = {formatMessage: ({id}: {id: string})=>id}

// 先要在全局 app.ts 里调用该方法
export default function I18n(this: any) {
  const intl = useIntl();
  i18n.formatMessage = intl.formatMessage;
  return null;
}

export { getLocale, setLocale } from 'umi';
