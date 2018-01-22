# fdc_bigdata B端应用大数据

> A Vue.js project

## Build Setup
# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 切入项目目录
$ cd my-project
# 根据package.json下载依赖包到node_modules目录
$ yarn


# 本地运行项目
$ yarn dev


# 打包为测试项目
$ yarn build

# 打包为线上项目
$ npm run build --prod

##文档结构
```
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- dev-client.js                // 热重载相关
|   |-- dev-server.js                // 构建本地服务器
|   |-- utils.js                     // 构建工具相关
|   |-- vue-loader.conf.js           // css加载器配置
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|-- src                              // 源码目录
|   |-- components                   // vue组件
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|   |-- ... ...                      //其他文件，请看src目录结构
|-- static                           // 静态文件，比如一些图片，json数据等
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- .postcssrc.js                    //css样式处理配置
|-- README.md                        // 项目说明
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息

##src目录结构
B端应用src的目录结构如下：
```
|-- api
|  |--api.js             		// api.js封装的接口请求函数对象通过	 module.export导出供其他页面使用
|-- assets             			// 小图标
|-- components         			// 组件
|  |-- admin		  			    //用户登录后页面集合
|    |--admin.component.js  	//用户登录后页面集合
|    |--admin.component.vue 	//用户登录后页面集合vue组件
|    |--admin.routes.js     	//用户登录后页面集合路由配置
|    |--accountmanage      				    //账号管理页面
|      |--accountmanage.component.js
|      |--accountmanage.component.vue
|      |--accountmanage.component.less
|      |--accountmanage.routes.js
|    |--customerallot   				      //客户分配
|      |--customerallot.component.js
|      |--customerallot.component.vue
|      |--customerallot.routes.js
|    |--customercount   				      //使用统计
|      |--customercount.component.js
|      |--customercount.component.vue
|      |--customercount.routes.js
|    |--customerfollowing   				      //客户跟踪
|      |--customerfollowing.component.js
|      |--customerfollowing.component.vue
|      |--customerfollowing.routes.js
|    |--customerimg   				      //客户画像
|      |--customerimg.component.js
|      |--customerimg.component.vue
|      |--customerimg.routes.js
|    |--paramset   				      //参数设置
|      |--paramset.component.js
|      |--paramset.component.vue
|      |--paramset.routes.js
|    |--projecthot   				      //项目热度
|      |--projecthot.component.js
|      |--projecthot.component.vue
|      |--projecthot.routes.js
|  |--core  					//公用的模板
|    |--app-header             //左侧栏用户信息部分
|      |--password             //密码设置
|        |--password.vue
|      |--userinfo             //账号信息设置
|        |--userinfo.vue
|      |--app-header.component.vue  //左侧栏用户信息部分组件
|    |--customerdetail				        //用户详情弹窗
|       |--customerdetail.js
|       |--customerdetail.less
|       |--customerdetail.vue
|    |--list-aside               //左侧菜单栏
|       |--list-aside.component.vue
|    |--style
|       |--common.less           //公共样式
|  |--userlogin               //用户登录
|    |--userlogin.component.js
|    |--userlogin.component.less
|    |--userlogin.component.vue
|    |--userlogin.routes.js
|  |--Hello.vue 				 //报错页面
|-- router
|  |--index.js         	 // 路由配置文件
|-- store
  ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── getters.js
    ├── mutations.js      # 根级别的 mutation
    ├── action-types.js        action
    ├── mutation-types.js      mutation
    └── modules
        ├── user.js       # 用户信息模块
|--tools              	 //封装好的cookie,ajax等工具
|  |--util.js              //格式化日期,数据格式处理等公共方法
|  |--yfHttps.js            //ajax请求工具
|--App.vue           		 //绑定在index.html上的组件
|--main.js           		 //index.html默认引入的js文件，其中
                           包含element-ui组件的部分引入
```




For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
