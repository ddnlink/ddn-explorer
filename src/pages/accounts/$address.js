import React, { Component, message } from "react"
import "whatwg-fetch"
import { formatMessage } from 'umi-plugin-locale';
import styles from "./address.less"
import TransactionHistory from "./TransactionHistory"
import AccountInfo from "./AccountInfo"
import { Radio, Card } from 'antd'
import { connect } from 'dva'
import Cnf from "../../config"

const tabList = [
  {
    key: 'all',
    tab: '全部',
  },
  {
    key: 'recipient',
    tab: '接收'
  },
  {
    key: 'sender',
    tab: '发送'
  }
];

const contentListNoTitle = {
  all: "",
  recipient: "",
  sender: "",
};

@connect(({ accounts }) => ({
  accounts
}))
class AccountDetial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      params: null,
      role: 'all',
      qrImgUrl: '',
      currency: Cnf.coinName,
      key: 'all'
    };
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key,role:key });
  };

  componentDidMount() {
    let params = this.props.match.params;
    this.getAccount(params);
  }
  getAccount = async (params = {}) => {
    this.setState({ loading: true });
    console.log('这是交易id', params)
    this.props.dispatch({
      type: 'accounts/getAccountDetail',
      payload: {
        ...params
      },
      callback: (res) => {
        if (res.success !== true) {
          message.error(res.error)

        } else {

        }
        this.setState({
          loading: false,
        });
      }
    });
  };
  handleSizeChange = (e) => {
    this.setState({ role: e.target.value });
  }
  handleAssetChange = async (currency) => {
    this.setState({ currency })
  }
  render() {
    const { currency } = this.state
    const { accounts } = this.props
    console.log('99999999', accounts)
    const data = JSON.stringify(accounts.accountDetail) !== '{}' ? accounts.accountDetail : null
    if (!data) {
      return <div style={{ textAlign: "center", margin: "100px" }}>找不到该地址</div>
    }
    return (
      <div className={styles["pageWrap"]}>
        <Card>
          <AccountInfo address={this.props.match.params.address} handleAssetChange={this.handleAssetChange} />
        </Card>
        <Card 
          //headStyle={styles.cardText} 
          style={{ marginTop: '30px' }}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => { this.onTabChange(key, 'key')}}
        >
          {contentListNoTitle[this.state.key]}
          <div >
            <TransactionHistory curRole={this.state.role} currency={currency} params={this.props.match.params} />
          </div>
        </Card>
      </div>
    );
  }
}
export default AccountDetial;

/*<div className={styles['trans_title']}>
<Radio.Group className={styles['radioGroup']} value={this.state.role} onChange={this.handleSizeChange}>
  <Radio.Button className={styles['radio']} value="all">{formatMessage({ id: 'account.all' })}</Radio.Button>
  <Radio.Button className={styles['radio']} value="recipient">{formatMessage({ id: 'account.recipient' })}</Radio.Button>
  <Radio.Button className={styles['radio']} value="sender">{formatMessage({ id: 'account.sender' })}</Radio.Button>
</Radio.Group>
</div>*/

