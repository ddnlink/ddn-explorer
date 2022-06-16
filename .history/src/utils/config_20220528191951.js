import { I18n } from 'react-i18nify'

I18n.setTranslations({
    en: {
      menu: {
        home: 'Home',
        block: 'Block',
        trs: 'Transactions',
        peer: 'Peers',
        aob: 'AOB',
        account: 'Accounts',
        delegate: 'Delegates',
      },
      not_content: "No more",
      tools: {
        title: 'Tools',
        new_account: 'Create Account',
        new_delegate: 'Register Delegate',
        new_transfer: 'Transfer',
        new_vote: 'Votes',
      },
      search: {
        button: "GO",
        placeholder: "Input height、trs ID、address",
      },
      home: {
        height: "Height",
        supply: "Total Supply",
        transfers: "Transfers",
        init_time: "Initial Run Date",
        run_time: "Run Time",
        latest_transactions: "Latest Transactions",
        latest_blocks: "Latest Blocks",
        latest_assets: "Latest Assets",
        days: "Days",
        more: "More"
      },
      block: {
        id: "Block ID",
        height: "Height",
        numberOfTransactions: "Trs Count",
        reward: "Reward",
        totalAmount: "Amount",
        totalFee: "Fee",
        generatorId: "Generator",
        timestamp: "Date",
        block_detail: "Block Detail",
        no_detail: "This Block is not exist"
      },
      trs: {
        id: "Trs ID",
        type: "Type",
        senderId: "Sender",
        senderAddress: "Sender Address",
        receipientAddress: "Receipient Address",
        recipientId: "Recipient",
        amount: "Amount",
        fee: "Fee",
        height: "Height",
        timestamp: "Date",
        trs_detail: "Transaction Detail",
        no_detail: 'This Transaction is not exist',
        blockid: 'Block ID',
        senderPublicKey: 'Sender PublicKey',
        signature: 'Signature',
        signSignature: 'Sign Signature',
        args: 'Other Args',
        message: 'Message'
      },
      types: {
        0: "TRANSFER", // DDN TRANSFER
        1: "SIGNATURE", // SETUP SECOND_PASSWORD
        2: "DELEGATE", // DELEGATE
        3: "VOTE", // VOTE FOR DELEGATE
        4: "MULTISIGNATURE", // MULTISIGNATURE
        5: "DAPP", // DAPP REGISTER
        6: "DEPOSIT", // DAPP DEPOSIT
        7: "WITHDRAW", // DAPP WITHDRAW
        8: "MULTITRANSFER",
        9: "USERINFO",
        20: "EVIDENCE",
        // DAO
        40: "ORG",
        41: "EXCHANGE",
        42: "CONTRIBUTION",
        43: "CONFIRMATION",
        49: "COUPON_ISSUER_AUDITOR_APPLY",
        50: "COUPON_ISSUER_APPLY",
        51: "COUPON_ISSUER_CHECK",
        52: "COUPON_ISSUER_UPDATE",
        53: "COUPON_ISSUER_FREEZE",
        54: "COUPON_ISSUER_UNFREEZE",
        55: "COUPON_ISSUE_NEW",
        56: "COUPON_ISSUE_CLOSE",
        57: "COUPON_ISSUE_REOPEN",
        58: "COUPON_EXCH_BUY",
        59: "COUPON_EXCH_PAY",
        //  AOB: ASSET ON BLOCKCHAIN
        60: " AOB_ISSUER", //  AOB ISSUER REGISTER
        61: " AOB_ASSET", //  AOB ASSET REGISTER
        62: " AOB_FLAGS", //  AOB FLAGS UPDATE
        63: " AOB_ACL", //  AOB ACL UPDATE
        64: " AOB_ISSUE", //  AOB ISSUE
        65: " AOB_TRANSFER", //  AOB TRANSFER
        71: "COUPON_EXCH_TRANSFER_ASK",
        72: "COUPON_EXCH_TRANSFER_CONFIRM",
        73: "COUPON_EXCH_DESTORYED",
        100: "LOCK"// ACCOUNT LOCK
      },
      peer: {
        ip: "IP",
        port: "Port",
        state: "State",
        os: "OS",
        version: "Version"
      },
      account: {
        address: 'Address',
        balance: 'Balance',
        unconfirmedBalance: 'Unconfirmed Balance',
        publicKey: 'PublicKey',
        all: "All",
        recipient: "Received",
        sender: "Sent",
        scan: "Scan for address",
        copyAddress: "Copy Address Successfully",
        copyPublicKey: "Copy PublicKey Successfully",
        lockHeight: 'Lock Height'
      },
      delegate: {
        username: 'Username',
        address: 'Address',
        approval: 'Approval',
        productivity: 'Productivity',
        forged: 'Forged'
      },
      node: {
        currentIP: 'Current IP: ',
        setIP: 'Change Node IP',
        done: 'Done'
      },
      detail: {
        blockTip: 'Block Transactions',
        trsTip: 'Transaction Detail',
        label: 'Label',
        content: 'Content'
      },
      assets: {
        title: 'Title',
        author: 'Author',
        publishTime: 'Publish Time',
        contentHash: 'Content Hash',
        size: 'Size',
        ipidNumber: 'IPID Number',
        copyrightBelongs: 'Copyright Belongs',
        transId: 'Transactions ID',
        ipid:'IPID',
        identifyInfo: 'Identify Infomation',
        fileLink: 'File Link',
        downloadDcert: 'Download Dcert'
      },
      date: 'MMMM Do, YYYY HH:mm:ss'
    },
    zh: {
      menu: {
        home: '首页',
        block: '区块',
        trs: '交易',
        peer: '节点',
        aob: '资产',
        account: '账户',
        delegate: '受托人',
      },
      not_content: "没有更多数据",
      tools: {
        title: '工具',
        new_account: '创建账户',
        new_delegate: '注册受托人',
        new_transfer: '转账',
        new_vote: '投票',
      },
      search: {
        button: "搜索",
        placeholder: "输入区块高度、交易ID或者账户地址",
      },
      home: {
        height: "区块高度",
        supply: "供应总量",
        transfers: "交易账户",
        init_time: "初始运行日期",
        run_time: "运行时间",
        latest_transactions: "最新交易",
        latest_blocks: "最新区块",
        latest_assets: "最新数字资产",
        days: "天",
        more: "更多"
      },
      block: {
        id: "区块ID",
        height: "区块高度",
        numberOfTransactions: "交易数",
        reward: "锻造奖励",
        totalAmount: "总金额",
        totalFee: "总费用",
        generatorId: "锻造者地址",
        timestamp: "日期",
        block_detail: "区块详情",
        no_detail: "该区块不存在",
        previousBlock: "上一区块 ID",
        version: "版本",
        payloadLength: "交易数量",
        payloadHash: "交易哈希",
        generatorPublicKey: "锻造者公钥",
        blockSignature: "区块签名",
        totalForged: "奖励总量"
      },
      trs: {
        id: "交易ID",
        type: "交易类型",
        senderId: "发起者",
        recipientId: "接收者",
        senderAddress: "发送者地址",
        receipientAddress: "接收者地址",
        amount: "交易金额",
        fee: "交易费",
        height: "块高度",
        timestamp: "时间",
        trs_detail: "交易详情",
        no_detail: '该交易不存在',
        blockid: '区块 ID',
        senderPublicKey: '发送者公钥',
        signature: '交易签名',
        signSignature: '节点签名',
        args: '其他参数',
        message: '备注'
      },
      types: {
        0: "转账", // DDN TRANSFER
        1: "签名", // SETUP SECOND_PASSWORD
        2: "受托人", // DELEGATE
        3: "投票", // VOTE FOR DELEGATE
        4: "多重签名", // MULTISIGNATURE
        5: "DAPP", // DAPP REGISTER
        6: "转入", // DAPP DEPOSIT
        7: "转出", // DAPP WITHDRAW
        8: "组合转账",
        9: "用户",
        20: "存证",
        // DAO
        40: "媒体号申请/修改",
        41: "媒体号交易",
        42: "投稿",
        43: "投稿确认",
        49: "申请券发行商审核权限",
        50: "券发行商申请",
        51: "审核券发行商申请",
        52: "更新券发行商信息",
        53: "冻结券发行商",
        54: "解冻券发行商",
        55: "发行新券",
        56: "关闭券的出售",
        57: "重启券的出售",
        58: "购买券",
        59: "兑换券",
        //  AOB: ASSET ON BLOCKCHAIN
        60: " AOB发行商注册", //  AOB ISSUER REGISTER
        61: " AOB资产", //  AOB ASSET REGISTER
        62: " AOB_FLAGS", //  AOB FLAGS UPDATE
        63: " AOB_ACL", //  AOB ACL UPDATE
        64: " AOB发行", //  AOB ISSUE
        65: " AOB转账", //  AOB TRANSFER
        71: "券转让申请",
        72: "券转让确认",
        73: "券销毁",
        100: "锁仓"// ACCOUNT LOCK
      },
      peer: {
        ip: "IP",
        port: "端口号",
        state: "状态",
        os: "操作系统",
        version: "版本"
      },
      account: {
        address: '地址',
        balance: '余额',
        unconfirmedBalance: '未确认余额',
        publicKey: '公钥',
        all: "全部",
        recipient: "接收",
        sender: "发送",
        scan: "扫描获取地址",
        copyAddress: "复制地址成功",
        copyPublicKey: "复制公钥成功",
        lockHeight: '锁仓高度'
      },
      delegate: {
        username: '用户名',
        address: '地址',
        approval: '得票率',
        productivity: '生成率',
        forged: '收入'
      },
      node: {
        currentIP: '当前节点地址：',
        setIP: '设置节点地址',
        done: '确定'
      },
      detail: {
        blockTip: '本区块交易列表',
        trsTip: '本交易详情',
        label: '标签',
        content: '内容'
      },
      assets: {
        title: '标题',
        author: '作者',
        publishTime: '存证时间',
        contentHash: '内容哈希',
        size: '大小',
        ipidNumber: '版权ID',
        copyrightBelongs: '版权归属地址',
        transId: '交易ID',
        identifyInfo: '存证信息',
        fileLink: '链接',
        downloadDcert: '下载证书'
      },
      date: "YYYY年MMMDD HH:mm:ss"
    }
  });
  
I18n.setLocale('zh');


export default {
  "nethash": window.location.hostname.toLowerCase().startsWith('mainnet') ? "b11fa2f2" : "0ab796cd",
  "peer": {
    "port": 8001,
    "address": "47.92.0.84"
  },
  "en": "English",
  "zh": "中文",
}