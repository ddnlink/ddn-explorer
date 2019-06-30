[English](./README.md) | 简体中文


## 说明
该项目为区块链浏览器，采用 [umijs](https://umijs.org/) 框架生成

## 运行脚本

#### clone代码
`git clone git@git.ebookchain.net:ddn/ddnExplore.git`

#### 安装
`yarn`

#### 启动
`yarn start`

#### 编译
`yarn build`

## 项目架构

```
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，基于 express
├── config/
    ├── config.js                  // umi 配置，同 .umirc.js，二选一
└── src/                           // 源码目录，可选
    |── assets/                    // 静态资源
    ├── layouts/index.js           // 全局布局
    |── locales/                   // 多语言
    |── models/                    // 数据获取，state修改及逻辑
    |── service/                   // 接口及数据获取api
    ├── pages/                     // 页面目录，里面的文件即路由
        ├── .umi/                  // dev 临时目录，需添加到 .gitignore
        ├── .umi-production/       // build 临时目录，会自动删除
        ├── document.ejs           // HTML 模板
        ├── 404.js                 // 404 页面
        ├── page1.js               // 页面 1，任意命名，导出 react 组件
        ├── page1.test.js          // 用例文件，umi test 会匹配所有 .test.js 和 .e2e.js 结尾的文件
        └── page2.js               // 页面 2，任意命名
    |── styles/                    // 全局css, 采用less
    |── utils/                     // 配置，工具库，常用函数提取
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
    ├── global.js                  // 可以在这里加入 polyfill
    ├── app.js                     // 运行时配置文件
├── .umirc.js                      // umi 配置，同 config/config.js，二选一
├── .env                           // 环境变量
└── package.json
```


## 采用的第三方库

#### umi内置
- antd                组件库
- react-i18nify       多语言
- react-loadable      按需加载
- react-router-dom    路由
- webpack-bundle-analyzer  查看模块大小
#### 增加
- antv                视图库
- bizcharts           react视图库
- jquery              js工具
- lodash              js方法扩展
- copy-to-clipboard   复制到剪贴板
- html2canvas         网页生成图片并下载
- moment              时间处理
- qrcode              二维码
- qs                  字符串与对象解析
