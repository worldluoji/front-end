# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

Eject 的字面意思是弹出，比如飞行员从战斗机中紧急弹出就是这个词。执行了这个命令，就代表你从 CRA 下车了：这个项目不再依赖 CRA，CRA 封装的各种工程化功能，都被打散加入到这个项目的代码中，你可以根据需要做深度定制。

根据打散出来的文件，可以看到 CRA 包含的基本功能：
- 基于 Webpack 的开发服务器和生产环境构建；
- 用 Babel 做代码转译（Transpile）；
- 基于 Jest 和 @testing-library/react 的自动化测试框架；
- ESLint 代码静态检查；
- 以 PostCSS 为首的 CSS 后处理器。

https://time.geekbang.org/column/article/574579

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## about sass
在使用sass的时候，create-react-app 官网上推荐是使用 node-sass,但是前端使用node-sass会引起很多问题，node-sass的安装很容易失败,下载好node-sass之后运行的时候还需要本地编译，需要花费大量的时间和占用大量的CPU内存使用起来很不方便，所以我们要放弃node-sass改用dart-sass。但是直接安装 dart-sass 并不起作用，所以应该这样安装:
```
npm install node-sass@npm:dart-sass
```

## 由nodejs升级引起的构建错误：0308010C:digital envelope routines::unsupported
https://juejin.cn/post/7202639428132044858