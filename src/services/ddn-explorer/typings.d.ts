declare namespace API {
  type Account = {
    address?: string;
    balance?: string;
    unconfirmedBalance?: string;
    publicKey?: string;
    secondPublicKey?: string;
    username?: string;
    isDelegate?: boolean;
    vote?: string;
    producedblocks?: number;
    missedblocks?: number;
    rate?: number;
    approval?: number;
    productivity?: number;
  };

  type AccountDetailResponse = {
    success?: boolean;
    account?: Account;
    error?: { message?: string };
  };

  type AccountList = {
    success?: boolean;
    accounts?: Account[];
    /** 账户总数 */
    count?: number;
    error?: { message?: string };
  };

  type AccountSumResponse = {
    success?: boolean;
    /** 账户总数 */
    count?: number;
  };

  type Aob = {
    name?: string;
    description?: string;
    maximum?: string;
    precision?: number;
    quantity?: string;
  };

  type AobListResponse = {
    success?: boolean;
    aobs?: Aob[];
    /** AOB总数 */
    count?: number;
  };

  type Asset = true;

  type AssetAOBAcl = {
    currency: string;
    operator: string;
    flag: number;
    list: string[];
  };

  type AssetAOBAclList = {
    assetAOBAcls?: AssetAOBAcl[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type AssetAOBAsset = {
    name: string;
    desc: string;
    maximum: string;
    precision: number;
    strategy?: string;
    allow_writeoff?: number;
    allow_whitelist?: number;
    allow_blacklist?: number;
  };

  type AssetAOBAssetList = {
    assetAOBAssets?: AssetAOBAsset[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type AssetAOBFlags = {
    currency: string;
    flag_type: number;
    flag: number;
  };

  type AssetAOBFlagsList = {
    assetAOBFlags?: AssetAOBFlags[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type AssetAOBIssue = {
    currency: string;
    amount: string;
  };

  type AssetAOBIssueList = {
    assetAOBIssues?: AssetAOBIssue[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type AssetAOBIssuer = {
    name: string;
    desc: string;
  };

  type AssetAOBIssuerList = {
    assetAOBIssuers?: AssetAOBIssuer[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type AssetAOBTransfer = {
    currency: string;
    amount: string;
  };

  type AssetAOBTransferList = {
    assetAOBTransfers?: AssetAOBTransfer[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type AssetContract = {
    name: string;
    gas_limit?: number;
    owner: string;
    desc: string;
    version: string;
    code: string;
  };

  type AssetContractList = {
    assetContracts?: AssetContract[];
    count?: number;
  };

  type AssetDApp = {
    category: number;
    name: string;
    type: number;
    link: string;
    description?: string;
    tags?: string;
    icon?: string;
    delegates?: string[];
    unlock_delegates: number;
  };

  type AssetDAppList = {
    assetDApps?: AssetDApp[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type AssetInTransfer = {
    dapp_id: string;
    currency?: string;
    amount?: string;
  };

  type AssetInTransferList = {
    assetInTransfers?: AssetInTransfer[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type AssetList = {
    assets?: Asset[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type AssetMultisignature = {
    min: number;
    lifetime: number;
    keysgroup: string[];
  };

  type AssetMultisignatureList = {
    assetMultisignatures?: AssetMultisignature[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type AssetOutTransfer = {
    dapp_id: string;
    transaction_id: string;
    currency?: string;
    amount?: string;
  };

  type AssetOutTransferList = {
    assetOutTransfers?: AssetOutTransfer[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type AssetSignature = {
    publicKey: string;
  };

  type AssetSignatureList = {
    assetSignatures?: AssetSignature[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type AssetTransfer = true;

  type AssetTransferList = {
    assetTransfers?: AssetTransfer[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type AssetUserinfo = {
    username: string;
  };

  type AssetUserinfoList = {
    assetUserinfos?: AssetUserinfo[];
    count?: number;
  };

  type AssetVote = {
    votes?: string[];
  };

  type AssetVoteList = {
    assetVotes?: AssetVote[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type Block = {
    version: number;
    timestamp: number;
    total_amount: string;
    total_fee: string;
    reward: string;
    number_of_transactions: number;
    payload_length: number;
    payload_hash: string;
    generator_public_key: string;
    block_signature?: string;
    previous_block?: string;
    id?: string;
    height?: string;
    transactions?: Transaction[];
  };

  type BlockList = {
    blocks?: Block[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type BlockPropose = {
    height: string;
    id: string;
    timestamp: number;
    generator_public_key: string;
    address: string;
    hash: string;
    signature: string;
  };

  type BlockProposeList = {
    blockProposes?: BlockPropose[];
    count?: number;
  };

  type BlockResponse = {
    success?: boolean;
    block?: Block;
    error?: { message?: string };
  };

  type BlockVotes = {
    height: string;
    id: string;
    signatures: BlockVoteSignature[];
  };

  type BlockVoteSignature = {
    key: string;
    sig: string;
  };

  type BlockVoteSignatureList = {
    blockVoteSignatures?: BlockVoteSignature[];
    count?: number;
  };

  type BlockVotesList = {
    blockVotes?: BlockVotes[];
    count?: number;
  };

  type Certificate = {
    title?: string;
    hash?: string;
    size?: number;
    tags?: string;
    author?: string;
    timestamp?: number;
    source_address?: string;
    transaction_id?: string;
  };

  type CertificateResponse = {
    success?: boolean;
    data?: { list?: Certificate[]; address?: string };
    error?: string;
  };

  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type CurveDataResponse = {
    success?: boolean;
    data?: { date?: string; count?: number }[];
  };

  type DaoConfirmation = {
    received_address: string;
    sender_address: string;
    contribution_trs_id: string;
    state: number;
    url?: string;
  };

  type DaoConfirmationList = {
    daoConfirmations?: DaoConfirmation[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type DaoContribution = {
    title: string;
    received_address: string;
    sender_address: string;
    url: string;
    price?: string;
  };

  type DaoContributionList = {
    daoContributions?: DaoContribution[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type DaoExchange = {
    org_id: string;
    exchange_trs_id: string;
    sender_address: string;
    received_address: string;
    price: string;
    state: number;
  };

  type DaoExchangeList = {
    daoExchanges?: DaoExchange[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type DaoOrg = {
    address?: string;
    org_id: string;
    name?: string;
    tags?: string;
    url?: string;
    state: number;
  };

  type DaoOrgList = {
    daoOrgs?: DaoOrg[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type Delegate = {
    username?: string;
    address?: string;
    publicKey?: string;
    vote?: string;
    producedblocks?: number;
    missedblocks?: number;
    rate?: number;
    approval?: number;
    productivity?: number;
    forged?: string;
  };

  type DelegateList = {
    delegates?: Delegate[];
    totalCount?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type Evidence = {
    ipid: string;
    title: string;
    description?: string;
    hash: string;
    tags: string;
    author: string;
    url: string;
    size?: string;
    type: string;
    timestamp?: number;
    transactionId?: string;
    blockId?: string;
    confirmations?: number;
  };

  type EvidenceList = {
    assetEvidences?: Evidence[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type getAccountDetailParams = {
    address: string;
  };

  type getAccountListParams = {
    /** 分页偏移量 */
    offset?: number;
    /** 每页数量 */
    limit?: number;
    /** 排序字段 */
    orderBy?: string;
  };

  type getBlockByIdOrHeightParams = {
    /** 区块ID */
    id?: string;
    /** 区块高度 */
    height?: string;
  };

  type getBlocksListParams = {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  };

  type getCertificateParams = {
    hash: string;
  };

  type getDelegatesListParams = {
    /** 分页偏移量 */
    offset?: number;
    /** 每页数量 */
    limit?: number;
    /** 排序字段 */
    orderBy?: string;
  };

  type getEvidenceListParams = {
    /** 分页偏移量 */
    offset?: number;
    /** 每页数量 */
    limit?: number;
    /** 排序字段 */
    orderBy?: string;
  };

  type getFakeCaptchaParams = {
    /** 手机号 */
    phone?: string;
  };

  type getLatestTransParams = {
    /** 偏移量 */
    offset?: number;
    /** 限制数量 */
    limit?: number;
    /** 排序字段 */
    orderBy?: string;
  };

  type getPeersListParams = {
    /** 节点IP地址 */
    ip?: string;
  };

  type getTransactionDetailParams = {
    id: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type NetworkResponse = {
    /** Indicates if the request was successful */
    success: boolean;
    /** Network hash */
    nethash: string;
    /** Name of the token */
    tokenName: string;
    /** Prefix used for the token */
    tokenPrefix: string;
    /** Start date of the network */
    beginDate: string;
  };

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type Peer = {
    ip?: string;
    port?: number;
    state?: number;
    os?: string;
    version?: string;
  };

  type PeersListResponse = {
    success?: boolean;
    peers?: Peer[];
    /** 节点总数 */
    totalCount?: number;
    error?: { message?: string };
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type StatusResponse = {
    success?: boolean;
    /** 当前区块高度 */
    height?: number;
    /** 奖励 */
    reward?: number;
    /** 供给 */
    supply?: number;
    /** 系统版本 */
    version?: string;
    /** 里程碑版本 */
    milestone?: string;
    /** 当前共识参与人数 */
    consensus?: number;
    /** 系统当前时间 */
    datetime?: string;
    lastBlock?: Block;
  };

  type Transaction = {
    type: number;
    timestamp: number;
    nethash?: string;
    senderPublicKey: string;
    signature: string;
    recipientId?: string;
    senderId?: string;
    amount?: string;
    fee?: string;
    requester_public_key?: string;
    sign_signature?: string;
    signatures?: string[];
    id?: string;
    block_height?: string;
    block_id?: string;
    asset: Asset;
    args?: string;
    message?: string;
  };

  type TransactionDetailResponse = {
    success?: boolean;
    transaction?: Transaction;
    error?: { message?: string };
  };

  type TransactionList = {
    transactions?: Transaction[];
    count?: number;
    success?: boolean;
    error?: { message?: string };
  };

  type TransactionListResponse = {
    success?: boolean;
    transactions?: Transaction[];
    /** 交易总数 */
    count?: number;
    error?: { message?: string };
  };
}
