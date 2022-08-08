/**
 * 一条完整链的全部基本配置
 */
const config = {
  // 当前环境设置，建议在 .ddnrc.[env].js 其中 env = local、prod 等
  currentNet: 'testnet',

  // 关于浏览器基本配置
  name: 'DDN 区块链浏览器',
  prefix: 'ddn20190522',
  openPages: ['/home'],
  coinName: localStorage.getItem("tokenName"),

  // 关于区块链基本配置
  token: {
      name: 'DDN',
      prefix: 'D'
  },

  mainnet: {
    nethash: "m66gcvle",
    beginEpochTime: new Date(Date.UTC(2017, 10, 20, 12, 20, 20, 20)),
    peer: {
      port: 8000,
      address: "117.78.28.81"
    }
  },

  // testnet.ddn.link
  testnet: {
    nethash: "0ab796cd",
    beginEpochTime: new Date(Date.UTC(2017, 10, 20, 12, 20, 20, 20)), // 请修改为与节点一致的对应时间
    peer: {
      port: 8001,
      address: "49.4.8.154" // "localhost" // 120.77.211.219 网速慢
    },
  }

}

config.net = config[config.currentNet];

config.apiUrl = `http://${config.net.peer.address}:${config.net.peer.port}`
config.peerAddress = `${config.net.peer.address}:${config.net.peer.port}`

export default config
