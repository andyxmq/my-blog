# my-blog
react  mobx

## 前端技术选型

> 项目需求是怎么样的

    传统的多页网站不会选择React作为前端框架，单页应用选择jQuery来做也会很困难，所以不同的项目适合不的技术栈

> 如何区分项目类型

    分两大类：单页应用、多页应用（传统网站）
    
    1.多页应用的特征:
    
        所有内容都由服务端用模板生成（java .net php）
        每次页面跳转都需要经过服务端
        js更多是做做动画
    
        常用类库：jQuery、mootools、YUI、
    
        架构工具：无特定前端框架，跟后端配合
            grunt、glup(后来)
        模块化工具： 无特定的框架
            seajs(CMD) requirejs(AMD) commonJs(主流)
        静态文件处理：
            使用grunt、glup等工具手动编译到html中、自由度低操作复杂。或者甚至不处理，交给后端让后端处理


    2.单页应用特征：
    
        所有的内容都是在前端生成
        JS承担更多的业务逻辑，后端只提供数据API
        页面路由跳转不需要经过后端
    
        常用类库：React Vue Angular Backbone.js
    
        架构工具：npm bower jspm
    
        模块化工具：webpack rollup browserify
    
        静态文件：
            可以直接在js代码中进行引用，并且交由模块化工具转化成线上可用的静态资源，并且可以定制转化过程适应不同的
            需求场景

> 其他考虑因素

    浏览器兼容性（必须在指定浏览器访问）
    
    toB(浏览器兼容要求比较低、交互要求比较低、功能复杂度高，选择一些框架)还是toC(性能要求高，功能复杂度低)
    
    移动端还是PC端

## WebApp架构简介

> 工程架构

    1.解放生成力(聚焦业务代码，解决重复的工作(文件复杂、刷新浏览器、重启服务))
    
        源代码预处理
        自动打包、自动更新页面显示
        自动处理图片依赖、保证开发环境和正式环境的统一
    
    2.围绕解决方案搭建环境
    
        不同的前端框架需要不同的运行架构
        预期可能出现的问题并规避
    
    3.保证项目质量（排错、提高效率）
    
        code lint
        不同环境排除差异（如break lines）
        EditorConfig 统一编辑器
        git commit 预处理(husky)
    4.定制（对使用工具的方法了如指掌最终结果自己写出一个框架）
    
    目标：项目稳定跑起来、提高开发效率

> 项目架构

    目标：网页如何去运行、代码如何去分成、更好的实现功能、为将来扩展留空间
    
    技术选型：选择合适的框架  (React Mobx)
    
    数据解决方案：flux
    
    整体的代码风格:

> web开发常用的网络优化

    优化方法：
        合并资源文件，减少HTTP请求
        压缩资源文件减少请求大小
        合理利用缓存机制、尽可能使用缓存减少请求


> 工程架构的核心：webpack配置（模块打包器）通过loader打包所有资源（js、css、图片、字体）

    1.创建npm项目: npm init
    
    2.安装webpack react
    
    3.新建build文件夹：webpack配置文件 脚本文件等  client: 前端应用文件
    
        在build中创建webpack.config.js：
```js
    const path = require('path') // 解决不同环境之间路径引用问题

    module.exports = {
        entry: {
            app: path.join(__dirname, '../client/app.js')
        },
        output: {
            filename: '[name].[hash].js',
            path: path.join(__dirname, '../dist'),
            publicPath: '/public' // 静态资源引用路径 区分静态资源
        }
    }
```
    在script新增 "build": "webpack --config build/webpack.config.js"


    4.webpack loader的基础应用
    
        安装jsx loader: npm i babel-loader babel-core -D
```js
    //  修改webpack配置
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    }
```
**notes:** babel默认直接编译es6代码 不能支持jsx语法,解决办法：根目录新增配文
    件.babelrc
```js
{
    "presets": [ // 代表babel支持的语法
      ["es2015", {"loose": true}],
      "react"
    ]
}
```
    安装html-webpack-plugin用于生产html文件 npm i html-webpack-plugin -D

```js
    plugins: [
        new HtmlWebpackPlugin()
    ]
```

    5. 服务端渲染
    
        1).存在的原因：由于单页应用存在的问题（SEO不友好、首次请求等待时间较长，体验不友好）
        2).使用react-dom/server进行服务端渲染:
    
            a：创建server-entry.js 目的export 服务端要渲染内容
    
            b：创建服务端webpack配置
    
            c：修改package中的script 安装rimraf包

```js
        "scripts": {
            "build:client": "webpack --config build/webpack.config.client.js",
            "build:server": "webpack --config build/webpack.config.server.js",
            "clear": "rimraf dist",
            "build": "npm run clear && npm run build:client && npm run build:server"
        }
```
            d：创建server 服务，安装express: npm i express -S

```js
        const express = require('express')
        var ReactDOMServer = require('react-dom/server')
        const serverEntry = require('../dist/server-entry').default

        const app = express()

        app.get('*', function(req,res){
            const appString = ReactDOMServer.renderToString(serverEntry)
            res.send(appString)
        })

        app.listen(3333, function(){
            console.log('server is listening on 3333')
        })
```
            appString 插入html页面：新建template.html,fs读取静态文件

> 项目开发时的常用配置

    1. 常用配置
    
        webpack dev server：修改webpack配置文件，判断当前是否为开发模式
```js
        const isDev = process.env.NODE_ENV === 'development'

        // webpack.config.client.js
        if(isDev){ // 删掉dist目录
            config.devServer = {
                host:  '0.0.0.0' ,//  可以使用任何方式访问IP localhost 127.0.0.1
                port:  '8888',
                contentBase: path.join(__dirname, '../dist'), //  webpack处理的静态文件
                hot: true, // 启动hot module replacement
                overlay: { // 出现错误在网页显示黑色的错误
                    errors: true
                },
                publicPath: '/public', // 解决静态文件无法访问，与output中publicPath 保持一致
                historyApiFallback: { // 解决错误路径
                    index: '/public/index.html'
                }
            }
        }

        //package.json  其中：cross-env解决win linux mac环境不同
         "dev:client": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.client.js",
```

**note:** webpack-dev-server 先检查本地目录  2.9.7


        Hot module replacement(无刷新),配置如下：
    
        1)：npm install --save-dev react-hot-loader,修改.babelrc
```js
        "plugins": [
            "react-hot-loader/babel"
        ]

        //app.js
        import ReactDOM from 'react-dom'
        import React from 'react'
        import { AppContainer } from 'react-hot-loader'
        import App from './App1.jsx'

        const root = document.getElementById('root')
        const render = Component => {
            ReactDOM.hydrate(
            <AppContainer>
                <Component />
            </AppContainer>,
            root
            )
        }
        render(App)
        if (module.hot) {
            module.hot.accept('./App1.jsx',() => {
                const NextApp = require("./App1.jsx").default
                // in all other cases - re-require App manually
                render(NextApp)
            })
        }

        // webpack配置文件
        config.entry = {
            app: [
                'react-hot-loader/patch',
                path.join(__dirname,'../client/app.js')
            ]
        };
        config.devServer = {
            host:  '0.0.0.0' ,//  可以使用任何方式访问IP localhost 127.0.0.1
            port:  '8888',
            contentBase: path.join(__dirname, '../dist'), //  webpack处理的静态文件
            hot: true, // 启动hot module replacement
            overlay: { // 出现错误在网页显示黑色的错误
                errors: true
            },
            publicPath: '/public', // 解决静态文件无法访问，与output中publicPath 保持一致
            historyApiFallback: { // 解决错误路径
                index: '/public/index.html'
            }
        }
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
```

> 开发时的服务端渲染

    1. 修改server.js 新增const isDev = process.env.NODE_ENV === 'development'
```js
    const devStatic = require("./utils/dev-static")
    devStatic(app);
```

    2. 新建utils dev-static
    
    1)：安装axios，获取模板文件  npm i axios -S
    
    2): 获取template.html
```js
    const getTemplate = () => {
        return new Promise( (resolve,reject)=> {
            axios.get("http://localhost:8888/public/index.html")
            .then(response=>resolve(response))
            .catch(reject)
        })
    }
```
      : 获取server bundle，下载memory-fs -D,修改outputFileSystem

```js
    //创建
    const fs = new MemoryFs();
    // 获取server端的bunlder
    const webpack = require("webpack");
    const serverConfig = require("../../build/webpack.config.server");

    const serverCompiler = webpack(serverConfig); //启动webpack compiler，可以监听entry下面的文件
    serverCompiler.outputFileSystem = fs

    const Module = module.constructor; // module 的构造方法

    let serverBundle  //最终要
    serverCompiler.watch({},(err,stats)=>{
        if(err) throw err
        stats = stats.toJson();
        stats.errors.forEach(error=>console.log(error))
        stats.warnings.forEach(warning=>console.warn(warning))

        // 获取bunldpath
        const bundlePath = path.join(
            serverConfig.output.path,
            serverConfig.output.filename
        );

        //安装memory-fs
        const bundle = fs.readFileSync(bundlePath,'utf-8') //读取出来是string 需要传入指定的编码格式

        //解决bundle为string的问题
        const m = new Module()
        m._compile(bundle,'server-entry.js') //注意指定文件名
        serverBundle = m.default
    })
```
    : 处理静态文件 下载http-proxy-middleware -D
```js
    app.use("/public",proxy({target: 'http://localhost:8888'}));
```

> 使用eslint和editorconfig规范代码

    1.作用：
      规范代码有利于团队协作
      纯手工费时费力不能保证其准确性
    
    2.git commit时，使用git hook调用eslint进行代码验证


    3.editorConfig：统一文本编辑器之间的一些规范,EditorConfig每一个编辑器的插件
    
    4.开始使用：
        安装eslint : npm i eslint -D, 新建.babelrc
        整个项目遵循根目录下的.eslintrc
        安装 npm i babel-eslint eslint-config-airbnb eslint-config-standard eslint-loader eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint eslint-plugin-node eslint-plugin-standard eslint-plugin-promise -D
        predependency:

```js
    {
        "parser": "babel-eslint", // 指定的工具解析js代码
        "extends": "airbnb",
        "parserOptions": {
          "ecmaVersion": 6,
          "sourceType": "module"
        },
        "env": { // 执行环境
            "browser": true,
            "node": true,
            "es6": true
        },
        "rules": {

        }
    }

    // webpack 配置
       {
            enforce: "pre",
            test: /\.(js|jsx)$/,
            loader: "eslint-loader",
            exclude: [
                path.resolve(__dirname,"../node_modules")
            ]
        },
```
    5. 编译后在提交代码
      安装husky
```js
    "eslint": "eslint --ext .js --ext .jsx client/",
    "precommit": "npm run eslint"
```

> 工程优化

  1.webpack配置文件优化
    webpack-merge
  2.处理favico
    安装 serve-favicon
    app.use(favicon(path.join(__dirname, '../favicon.ico')))
  3.处理服务重复重启问题
    安装nodemon npm i nodemon -D
    跟目录创建nodemon.json
```js
  {
    "verbose": true, // 详细错误的信息
    "ignore": [
      "git",
      "node_modules/**/node_modules",
      "eslintrc",
      "client",
      "build"
    ]
  }
```

## 项目架构

> 项目的基本目录结构

  1.views：用于存放项目功能模块的页面，需要根据路由配置情况分割子级目录

  2.config：存放一些配置目录、比如第三方类库引用，路由配置等

  3.store: 存放项目store项目的文件，包括数据获取封装等

  4.components: 存放非业务组件，或者在多个业务间都需要用到的功用组件

> 路由配置

    区分不同模块功能的地址，HTML5 API中的history能够让我们控制url调转之后不刷新页面，而是交给我们
  JS代码进行相应的操作，在history出现之前，我们可以使用hash调转来实现

  1. React中的路由

    React-router是以一个非常好用的路由控制，能让我们想书写JSX组件一样控制路由调转
    
    安装react-router(react-router-dom/react-router-native) -S, 因此react-router-dom

```js
  // router.js
  import React from 'react';

  import {
    Route,
  } from 'react-router-dom';

  import TopicList from '../views/topic-list/index';
  import TopicDetail from '../views/topic-detail/index';

  export default () => [
    <Route path="/" component={TopicList} />,
    <Route path="/detail" component={TopicDetail} />,
  ];

  // App.jsx
  render() {
    return (
      <div>
        aaaaccc
        <Counter />
        <Route />
      </div>
    );
  }

  // app.js
  const render = (Component) => {
  ReactDOM.hydrate(
      <AppContainer>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </AppContainer>,
      root,
    );
  };
```

> store

  数据存放的地方就叫做store,flux: 单项数据流

  mobx: 让flux使用起来的更加简单，相比Redux有mutation、action、dispatch等概念
  Mobx则更符合对一个store增删查改的操作概念

  配置mobox: 新增stage-1 、transform-decorators-legacy
  安装：babel-plugin-transform-decorators-legacy babel-preset-stage-1
```js
  {
      "presets": [
        ["es2015", {"loose": true}],
        "stage-1",
        "react"
      ],
      "plugins": [
        "transform-decorators-legacy","react-hot-loader/babel"
      ]
  }

```
  安装 mobx mobx-react -S ; 安装prop-types -S



> Cnode API代理实现  [API](https://cnodejs.org/api)



1. 安装相关工具：body-parser express-session query-string -S
2. 修改server.js



> 服务端渲染优化

1. 路由调转
2. store数据同步

```
// server-entry.js StaticRouter用于服务端渲染
import { StaticRouter } from 'react-router-dom'; 

// Provider 用于传入stores
// useStaticRendering 解决server side渲染leak memory 让mobx在服务端渲染的时候不会重复数据变换
import { Provider, useStaticRendering } from 'mobx-react';
useStaticRendering(true);

import { createStoreMap } from './store/store';
export { createStoreMap };
// 修改app-state.js

import {
  observable,
  computed,
  action,
} from 'mobx';

export default class Appstate {
  @observable count = 0;

  @observable name = 'Jokcy';

  @computed get msg() {
    return `${this.name} say count is ${this.count}`;
  }

  @action add() {
    this.count += 1;
  }

  @action changeName(name) {
    this.name = name;
  }
}

// const appState = new Appstate();

// export default appState;

/* 修改app.js */
import AppState from './store/app-state';
<Provider appState={new AppState()}> // 通过new AppState() 创建store对象

/* 新增store.js */
import AppStateClass from './app-state';
export const AppState = AppStateClass;
export default {
  AppState,
};
// 创建
export const createStoreMap = () => ({
  appState: new AppState(),
});

// 修改dev-static

let serverBundle, createStoreMap // 最终要
 createStoreMap = m.exports.createStoreMap
```

3. 处理异步调用 安装：react-async-bootstrapper -S

   ```js
   // 修改dev-static.js 
   
   bootstrapper(app).then(() => {
       const content = ReactDomServer.renderToString(app)
       if (routerContext.url) {
           console.log(routerContext, 'routerContext')
           res.writeHead(302, {
               Location: routerContext.url
           })
           res.end()
           return
       }
       res.send(template.replace('<!--app-->', content))
   })
   ```

   

4. 解决html title: npm i react-helmet -S

## React16

> 老版本相比：体积变小、react+react-dom在gzipped之后小了10k左右。其次整个代码都用Fiber重写了，最后更新了一堆非常有用的功能, 新特性：

1. error boundary
2. New render return types
3. Portals
4. Better server-side rendering



# Material-UI

1. 安装 npm install @material-ui/core -S

2. client配置 正常使用

3. 服务端渲染

   a: 安装react-jss jss jss-preset-default -S

