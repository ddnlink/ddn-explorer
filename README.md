

English | [简体中文](./README_zh-CN.md)

# DDN Explorer

DDN Explorer is an front-end application for presenting the information and activity on the DDN blockchain.
It is built upon Ant Design and react framework [UmiJS ](https://umijs.org/)  and deploy to ddnlink.github.io,

## Getting Started

```bash
# clone appliction code
$ git clone git@github.com:ddnlink/ddn-explorer.git
$ cd ddn-explorer

# install deps
$ yarn

# runing app
$ yarn start

# test app
$ yarn test

# Build and deploy
$ yarn build
```
> Open http://localhost:8000 to view it in the browser.
```

## Deploy

**Note: Only admin**

Build the project
```
$ yarn build
```

Copy `dist` to `docs`, remain the `CNAME`、`404.html`、`index.html` for No 1 of F&Q

```
$ mv dist docs
```

## Framework

```bash
├── dist/                          // built static files
├── docs/                          // forks from dist and deploy to github.com
├── mock/                          // mock
├── config/
    ├── config.js                  // umi config file
└── src/                           // 
    |── assets/                    // static resources
    ├── layouts/index.js           // default layout
    |── locales/                   // multi language
    |── models/                     
    |── service/                  
    ├── pages/                     // main pages
        ├── .umi/                  
        ├── .umi-production/       
        ├── document.ejs           
        ├── 404.js                 
        ├── page1.js               
        ├── page1.test.js          
        └── page2.js               
    |── styles/                    // global css
    |── utils/                     
    ├── global.css                 
    ├── global.js                  
    ├── app.js                     
├── .umirc.js                      
├── .env                          
└── package.json
```

## Modules

### umi内置
- antd                组件库
- react-i18nify       多语言
- react-loadable      按需加载
- react-router-dom    路由
- webpack-bundle-analyzer  查看模块大小

### 增加
- antv                views 视图库
- bizcharts           react视图库
- jquery              js工具
- lodash              js方法扩展
- copy-to-clipboard   复制到剪贴板
- html2canvas         网页生成图片并下载
- moment              时间处理
- qrcode              二维码
- qs                  字符串与对象解析

## F&Q

1. The Single-Page App Hack for GitHub Pages

http://www.backalleycoder.com/2016/05/13/sghpa-the-single-page-app-hack-for-github-pages/


## Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)]. <a href="https://github.com/ddnlink/ddn-explorer/graphs/contributors"><img src="https://opencollective.com/ddnlink/ddn-explorer/contributors.svg?width=890&button=false" /></a>

## License

[MIT](https://github.com/ddnlink/ddn-explorer/blob/master/LICENSE)