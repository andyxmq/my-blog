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

