export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './home',
  },
  {
    name: '区块',
    path: '/blocks',
    component: './blocks',
  },
  {
    name: '区块详情',
    hideInMenu: true,
    path: '/blocks/:height',
    component: './blocks/$height',
  },
  {
    name: '交易',
    path: '/transactions',
    component: './transactions',
  },  
  {
    name: '交易详情',
    hideInMenu: true,
    path: '/transactions/:id',
    component: './transactions/[id]',
  },
  {
    name: '存证',
    path: '/evidences',
    component: './evidences',
  },
  {
    name: '节点',
    path: '/peers',
    component: './peers',
  },
  {
    name: '账户',
    path: '/accounts',
    component: './accounts',
  },
  {
    name: '账户详情',
    hideInMenu: true,
    path: '/accounts/:address',
    component: './accounts/[address]',
  },
  {
    name: '受托人',
    path: '/delegates',
    component: './delegates',
  },

  // {
  //   name: '权限演示',
  //   path: '/access',
  //   component: './Access',
  // },
  // {
  //   name: ' CRUD 示例',
  //   path: '/table',
  //   component: './Table',
  // },
]