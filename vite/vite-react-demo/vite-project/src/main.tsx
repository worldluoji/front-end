import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
/**需要注意的是，在 Vite 项目中，一个import 语句即代表一个 HTTP 请求。
*上述两个语句则分别代表了两个不同的请求，Vite Dev Server 会读取本地文件，返回浏览器可以解析的代码。
*当浏览器解析到新的 import 语句，又会发出新的请求，以此类推，直到所有的资源都加载完成 */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
