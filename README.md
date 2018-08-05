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

        webpack dev server

        Hot module replacement(无刷新)






