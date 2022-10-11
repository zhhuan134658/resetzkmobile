# demo

蓝湖 移动端使用 REM 120 倍

服务器 public 下的 css 文件夹 是前端上传的 css 文件 作用是切换主题是使用的 css 文件 不能删除
前端 UI 框架 ant-design-vue 按需引入
axios post 请求 this.axiosPost('',{}).then(res=>{})
axios get 请求 this.axiosGet('',{}).then(res=>{})
需要参与切换主题色的文字 用 a 标签 href 属性删掉
css 样式 通用的归到一个 css 文件 可以使用同一 ID
文件中通用的 data 以及 methods 在 mixins 里面
获取列表数据 :getTableList 搜索 :searchClick

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve //本地测试环境
```

### Compiles and minifies for production

```
npm run build //测试服务器环境
npm run build:prod //线上服务器环境
npm run build-report //生成分析图
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
