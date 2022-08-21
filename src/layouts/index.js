// import styles from './index.css';
import Header from './Header.js';
import Footer from './Footer.js';
import { Layout } from 'antd';
import styles from './index.less';
import I18n from '@/utils/i18n';
const { Content } = Layout;
let className;
let moreHeightRouter = ['/', '/accounts', '/assets/:id'];
function BasicLayout(props) {
  console.log('**********', props.location.pathname);

  // if(moreHeightRouter.includes(props.location.pathname)){
  className = styles['noHeightLayout'];
  // }else{
  //   className=styles['layout']
  // }
  return (
    <Layout className={className}>
      <I18n />
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </Layout>
  );
}

export default BasicLayout;
