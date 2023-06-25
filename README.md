# opinion-fanacing-operation.web

中国农业银行托管数据分析平台项目采购合同

## 命名规范

项目命名: `@ysstech-dm-xx` 参考 `@ysstech-dm-data/data-web(示例)`

组件命名: `dataMiddle_widget_xxx`

全局变量命名: `dmPnXxxxx(Pn:ProjectName)`

## 目录结构

```
|-- opinion-fanacing-operation.web,
      |-- .editorconfig,
      |-- .eslintignore,
      |-- .eslintrc,
      |-- .gitignore,
      |-- .npmignore,
      |-- .prettierignore,
      |-- .prettierrc,
      |-- .stylelintignore,
      |-- .stylelintrc,
      |-- LICENSE,
      //配置项目代理/publicPath/babelPlugins等配置项
      |-- lugia.config.js,
      //依赖管理文件
      |-- package.json,
      |-- README.md,
      |-- tsconfig.json,
      |-- yarn.lock,
      |-- .vscode,
      |   |-- settings.json,
      |-- config,
      |   |-- mega.desktop.config.json,
      |   |-- pages.config.json,
      |   |-- ui.config.json,
      //启动项目时需要生成的缓存文件
      |-- dll,
      |   |-- DevDLL.dependencies.json,
      |   |-- DevDLL.js,
      |   |-- DevDLL.manifest.json,
      |-- public,
      |   |-- favicon.ico,
      |   |-- index.html,
      |   |-- manifest.json,
      |-- scripts,
      |   |-- http-server.js,
      |-- src,
          |-- App.css,
          |-- App.js,
          |-- index.js,
          |-- root.js,
          |-- type.d.ts,
          //项目内部通用组件
          |-- components,
          |   |-- common-box,
          |   |   |-- index.tsx,
          |   |   |-- style.ts,
          |   |   |-- type.ts,
          |   |-- common-card,
          |   |   |-- index.tsx,
          |   |   |-- style.ts,
          |   |   |-- type.ts,
          |   |-- header,
          |       |-- index.tsx,
          |       |-- style.ts,
          //主要存放路由配置文件和inversify容器
          |-- config,
          |   |-- di.config.ts,
          |   |-- router,
          |       |-- cusRouting.config.js,
          |-- constant,
            //全局通用样式 styled-component
          |   |-- style.ts,
            //全局通用类型定义
          |   |-- type.ts,
          |-- pages,
            //页面级组件 test-demo
          |   |-- test-demo,
                //组件内容
          |       |-- index.tsx,
                //页面下的功能组件
          |       |-- components,
          |       |   |-- model-comp,
          |       |   |   |-- index.tsx,
                        //组件内部可以导出的常量
          |       |   |   |-- constant.ts,
                        //组件内部类型
          |       |   |   |-- type.ts,
          |       |   |   |-- style.ts,
          |       |   |-- model-test-btn,
                        //...目录结构/功能同上
          |       |       |-- index.tsx,
                 //页面级组件的常量定义文件夹
          |       |-- constant,
          |       |   |-- style.ts,
          |       |   |-- type.ts,
                //页面级模型层
          |       |-- models,
          |           |-- test-model,
          |               |-- index.ts,
          |               |-- type.ts,
          |-- utils,
            //用于生成绑定model的组件
              |-- getHocComp.tsx,
              |-- index.ts,
              |-- type.ts,
              |-- cusRouter,
                  |-- go.js,
                  |-- history.js,
                  |-- index.js,

```

## 依赖引用

如 ant-design `yarn add antd@4.17.3` 安装完毕后在`/src/index.js`文件里引入 antd css 文件`import 'antd/dist/antd.css';`即可完成依赖引用。

如 ysstech-dm 组件库 `yarn add @ysstech-data/data-web@beta` 初次安装后需要在`/lugia.config.js`文件中添加如下配置。

```js
extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@ysstech-data/data-web',
        libraryDirectory: 'dist',
      },
      '@ysstech-data/data-web',
    ],

  ],
```

### 版本约束

`antd`:`4.17.3`

`react`:`16.9.0`

## 新建页面

页面统一存储于`/src/pages`文件夹下，目录结构与外层保持一致,参考`src/pages/test-demo`;

```
            //页面级组件 test-demo
          |   |-- test-demo,
                //组件内容
          |       |-- index.tsx,
                //页面下的功能组件
          |       |-- components,
          |       |   |-- model-comp,
          |       |   |   |-- index.tsx,
                        //组件内部可以导出的常量
          |       |   |   |-- constant.ts,
                        //组件内部类型
          |       |   |   |-- type.ts,
          |       |   |   |-- style.ts,
          |       |   |-- model-test-btn,
                        //...目录结构/功能同上
          |       |       |-- index.tsx,
                 //页面级组件的常量定义文件夹
          |       |-- constant,
          |       |   |-- style.ts,
          |       |   |-- type.ts,
                //页面级模型层
          |       |-- models,
          |           |-- test-model,
          |               |-- index.ts,
          |               |-- type.ts,
```

Tips: 如出现嵌套子组件的情况，按照该目录结构继续新建`components`文件夹即可。
