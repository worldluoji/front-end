// 客户端入口文件
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'


/*
在ssr-servre/index.ts 拼接 HTML 的逻辑中，除了添加页面的具体内容，同时我们也注入了一个挂载全局数据的script标签，
这是用来干什么的呢？

为了激活页面的交互功能，我们需要执行 CSR 的 JavaScript 代码来进行 hydrate 操作，
而客户端 hydrate 的时候需要和服务端同步预取后的数据，保证页面渲染的结果和服务端渲染一致，
因此，我们刚刚注入的数据 script 标签便派上用场了。

由于全局的 window 上挂载服务端预取的数据，我们可以在客户端渲染入口中拿到这份数据，并进行 hydrate。
*/

// @ts-ignore
const data = window.__SSR_DATA__;

ReactDOM.hydrate(
  <React.StrictMode>
    {/* @ts-ignore */}
    <App data={ data }/>
  </React.StrictMode>,
  document.getElementById('root')
)