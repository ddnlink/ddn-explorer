export default {
    "en-US": "English",
    "zh-CN": "中文",

    'menu.home': '首页',
    'menu.block': '区块',
    'menu.trs': '剩余',
    'menu.peer': '节点',
    'menu.aob': '资产',
    'menu.account': '账户',
    'menu.delegate': '受托人',
    'menu.evidence':' 存证',


    'not_content': "没有更多数据",

    'tools.title': '工具',
    'tools.new_account': '创建账户',
    'tools.new_delegate': '注册受托人',
    'tools.new_transfer': '转账',
    'tools.new_vote': '投票',


    'search.button': "搜索",
    'search.placeholder': "输入区块高度、剩余ID或者账户地址",


    'home.height': "区块高度:",
    'home.supply': "供应总量:",
    'home.transfers': "账户总数:",
    'home.tokenAmount': "供应总量:",
    'home.transaction_count':'剩余总数:',
    'home.init_time': "初始运行日期:",
    'home.run_time': "运行时间:",
    'home.latest_transactions': "最新剩余",
    'home.latest_blocks': "最新区块",
    'home.latest_assets': "最新数字资产",
    'home.days': "天",
    'home.more': "更多",
    'home.left_time': "秒前",
    'home.peer_count': `网络节点数量`,
    'home.peer_button':'点击查看节点',
    'home.assets':'存证类型占比',
    'home.no_data':'暂无数据',
    'home.aweek_title':'七天剩余量',

    'block.id': "区块ID",
    'block.height': "区块高度",
    'block.numberOfTransactions': "剩余数",
    'block.reward': "锻造奖励",
    'block.totalAmount': "总金额",
    'block.totalFee': "总费用",
    'block.confirmations': "确认数",
    'block.generatorId': "铸造者",
    'block.timestamp': "日期",
    'block.block_detail': "区块详情",
    'block.no_detail': "该区块不存在",
    'block.previousBlock': "上一区块 ID",
    'block.version': "版本",
    'block.payloadLength': "剩余数量",
    'block.payloadHash': "剩余哈希",
    'block.generatorPublicKey': "锻造者公钥",
    'block.blockSignature': "区块签名",
    'block.totalForged': "奖励总量",


    'trs.id': "剩余ID",
    'trs.type': "剩余类型",
    'trs.senderId': "发起者",
    'trs.recipientId': "接收者",
    'trs.senderAddress': "发送者地址",
    'trs.receipientAddress': "接收者地址",
    'trs.amount': "剩余金额",
    'trs.fee': "剩余费",
    'trs.height': "块高度",
    'trs.timestamp': "时间",
    'trs.trs_detail': "剩余详情",
    'trs.no_detail': '该剩余不存在',
    'trs.blockid': '区块 ID',
    'trs.senderPublicKey': '发送者公钥',
    'trs.signature': '剩余签名',
    'trs.signSignature': '节点签名',
    'trs.args': '其他参数',
    'trs.message': '备注',
    'trs.confirmations':'确认数',

    'evidence.ba':'血液通路',
    'evidence.dia':'透析信息',
    'evidence.da':'医嘱信息',
    'evidence.ss':'阶段小结',
    'evidence.hcode':'医院代码',
    'evidence.hash':'数据哈希',
    'evidence.type':'存证类型',

    'types.0': "转账", // DDN TRANSFER
    'types.1': "签名", // SETUP SECOND_PASSWORD
    'types.2': "受托人", // DELEGATE
    'types.3': "投票", // VOTE FOR DELEGATE
    'types.4': "多重签名", // MULTISIGNATURE
    'types.5': "DAPP", // DAPP REGISTER
    'types.6': "转入", // DAPP DEPOSIT
    'types.7': "转出", // DAPP WITHDRAW
    'types.8': "组合转账",
    'types.9': "用户",
    'types.20': "存证",
    // DAO
    'types.40': "媒体号申请/修改",
    'types.41': "媒体号剩余",
    'types.42': "投稿",
    'types.43': "投稿确认",
    'types.49': "申请券发行商审核权限",
    'types.50': "券发行商申请",
    'types.51': "审核券发行商申请",
    'types.52': "更新券发行商信息",
    'types.53': "冻结券发行商",
    'types.54': "解冻券发行商",
    'types.55': "发行新券",
    'types.56': "关闭券的出售",
    'types.57': "重启券的出售",
    'types.58': "购买券",
    'types.59': "兑换券",
    //  AOB: ASSET ON BLOCKCHAIN
    'types.60': " AOB发行商注册", //  AOB ISSUER REGISTER
    'types.61': " AOB资产", //  AOB ASSET REGISTER
    'types.62': " AOB_FLAGS", //  AOB FLAGS UPDATE
    'types.63': " AOB_ACL", //  AOB ACL UPDATE
    'types.64': " AOB发行", //  AOB ISSUE
    'types.65': " AOB转账", //  AOB TRANSFER
    'types.71': "券转让申请",
    'types.72': "券转让确认",
    'types.73': "券销毁",
    'types.99': "不知道是什么",

    'types.100': "锁仓",// ACCOUNT LOCK

    'peer.ip': "IP",
    'peer.port': "端口号",
    'peer.state': "状态",
    'peer.os': "操作系统",
    'peer.version': "版本",


    'account.address': '地址',
    'account.percent': '占比',
    'account.balance': '余额',
    'account.unconfirmedBalance': '未确认余额',
    'account.publicKey': '公钥',
    'account.all': "全部",
    'account.recipient': "接收",
    'account.sender': "发送",
    'account.scan': "扫描获取地址",
    'account.copyAddress': "复制地址成功",
    'account.copyPublicKey': "复制公钥成功",
    'account.lockHeight': '锁仓高度',


    'delegate.username': '用户名',
    'delegate.address': '地址',
    'delegate.approval': '得票率',
    'delegate.productivity': '生成率',
    'delegate.forged': '收入',

    'node.currentIP': '当前节点地址：',
    'node.setIP': '设置节点地址',
    'node.done': '确定',


    'detail.blockTip': '本区块剩余列表',
    'detail.trsTip': '本剩余详情',
    'detail.label': '标签',
    'detail.content': '内容',

    'assets.title': '标题',
    'assets.author': '作者',
    'assets.publishTime': '存证时间',
    'assets.contentHash': '内容哈希',
    'assets.size': '大小',
    'assets.ipidNumber': '版权ID',
    'assets.copyrightBelongs': '版权归属地址',
    'assets.transId': '剩余ID',
    'assets.identifyInfo': '存证信息',
    'assets.fileLink': '链接',
    'assets.downloadDcert': '下载证书',
    'date': "YYYY年MMMDD HH:mm:ss"
}
