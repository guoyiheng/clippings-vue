# Your Kindle Clippings

## 1. 这里是使用者广场

### 1.1 项目说明

用 kindle 保存的一些标注和记录的一些笔记(以下统一称为剪报)，会保存在 document 文件中的 My Clippings.txt 文件中。但是由于亚马逊对此功能支持的薄弱，剪报一直难以整理，于是便有了这个项目，方便对自己的剪报进行管理，顺便整理一下技术栈。

有兴趣的同学可访问

:link:[https://wwww.guoyiheng.xyz](https://wwww.guoyiheng.xyz)

(可正常走注册登录流程，也可使用测试账号，账号：111111 密码：111111)

(手机端有做适配，可以正常访问，除了导入自己的 My Clippings.txt 不方便，其他体验甚至更佳) 进行体验。

有条件的同学可导入自己的剪报进行测试，不方便的同学也可以在 **网站-帮助** 中下载示例文件进行解析。

目前网站功能并不完善，只供测试使用，若有精力，会发一个正式使用的版本，欢迎提出建议和 :bug:！

### 1.2 使用说明

1、将 kindle 用数据线连接电脑，找到 My Clippings.txt 文件(文件太多？可搜索定位)

2、点击网站的 **历史上传记录**，选择文件上传，成功后选择解析，即可

## 2. 从现在开始这里是开发者广场，非战斗人员尽快撤离

项目一开始只是周末无聊随手打的，后来整理 kindle 笔记的时候，突发念想，要不自己做了一个网站导入笔记? 项目便由此展开。

项目分三路，一边写接口，一边写页面，不想打代码的时候准备一下环境，配置一下服务器，注册域名和下载证书。或者去巴黎跳跳楼，一个人开发就是随心所欲。

项目完成耗时大概在一个月左右，基本的闭环完成大概耗时一周，完善一些功能大概耗时一周。

本项目目前不打算继续维护，具体看心情。有一些业务上的 bug（主要是服务端，最近开了一个新项目，改过 bug 之后也懒得去合并了） 可自行提交 pull request

项目基于 vue+vuetify 进行开发，主要是用来练手整理一些技术，项目中用到的技术基本可以应对日常开发中的基础内容。用来巩固拓展知识和装逼再好不过。欢迎 star。

---

### :rocket: start

- 下载源码

```
git clone
```

- 安装项目有关依赖

```
npm i
```

- 启动项目

```
npm run dev
```

### 2.1 服务端

项目链接: [clippings-koa](https://github.com/mypridelife/clippings-koa)

### 2.2 技术栈

后端: koa + ts + mysql + sequelize

前端: vue + vuetifyjs + Jest

CI/CD: jenkins + pm2

#### 2.2.1 开发参考文档/网站：

icons: https://material.io/resources/icons/?style=baseline

vuetify：https://vuetifyjs.com/zh-Hans/getting-started/quick-start

商用 clippings 项目: https://my.clippings.io/#/

ORM: sequelize：https://github.com/demopark/sequelize-docs-Zh-CN

开发规范：https://www.jianshu.com/p/dfd650150950

#### 2.2.2 :ballot_box_with_check:待完成

client:

- [x] jekens 部署项目
- [x] 登录注册页面
- [x] 剪报搜索(:secret:手机端自适应隐藏，电脑端显示)
- [x] 上传文件功能
- [x] 文件列表页
- [x] 文件增删改查
- [x] 文件结构正则解析
- [x] 剪报列表页
- [x] 剪报的删改查,收藏
- [ ] 剪报的手动增加
- [x] 喜欢列表
- [x] 收藏的增删改查

#### 2.2.3 :white_check_mark: 待完善

- [ ] 增加 electron
- [ ] 主题切换（现在的配色很彪，我也没办法，等 UI 大师指点了）
- [x] i18n 国际化
- [x] :envelope: 邮箱登陆注册
- [ ] 同步到有道云笔记
- [ ] 用户信息完善

### 2.3 :ring: 技术要点

- Jenkins 部署
- axios 封装
- vue 全局 filter
- vue mixins
- vue 插件
- vuex
- 路由: 嵌套路由，异步路由，动态加载路由
- 首屏加载速度优化

#### 2.3.1 首屏加载速度优化

- [ ] 使用 CDN 资源,减小服务器带宽压力
- [x] 路由懒加载
- [ ] 将一些静态 js css 放到其他地方(oss)，减小服务器压力
- [x] 按需加载三方资源，如第三方组件库
- [ ] 使用 nginx 开启 gzip 减小网络传输的流量大小
- [ ] 若首屏为登录页，可以做成多入口，登录页单独分离为一个入口
- [ ] 使用 uglifyjs-webpack-plugin 插件代替 webpack 自带 UglifyJsPlugin 插件

#### 2.3.2 CDN 资源

建议使用 html-webpack-plugin 并放到一个文件中统一管理

示例：

安装

```javascript
npm i --save-dev html-webpack-plugin
```

配置,省略非关键代码

```javascript
const env = process.env.NODE_ENV

let cdn
if (env === 'development') {
  cdn = {
    js: [],
    css: []
  }
} else {
  cdn = {
    js: [],
    css: []
  }
}

chainWebpack: config => {
  config.plugin('html').tap(args => {
    args[0].cdn = cdn
    return args
  })
}
```

注入

```javascript
<% for(var js of htmlWebpackPlugin.options.cdn.js) { %>
    <script src="<%=js%>"></script>
<% } %>
```

#### 2.3.3 关于 oss 配置

相关文件: 项目根目录 oss-deploy.js、deploy.sh 和 vue.config.js

1、先配置 oss-deploy.js，将 oss 配置填写完整

2、vue.config.js 中将 publicPath 根据不同的环境设置为不同的地址
示例:

```javascript
const env = process.env.NODE_ENV
publicPath: env === 'development' ? '/' : 'https://xxx.xxx.xxx/',
```

环境为生产环境时，将 publicPath 配置为你文件上传的 oss 地址

#### 2.3.4 其他优化项

与某项目无关，都是通用配置，故不再展开说明，自行百度。

### 2.4 :pencil: 可以改进的一些地方

#### 2.4.1 侧边栏菜单

可以抽离出来，单独配置在一个 js 文件中，通过 name 选项进入路由。

---

暂时想到这么多，待补充
