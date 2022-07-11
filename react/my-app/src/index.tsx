import React from 'react';
// import ReactDOM from 'react-dom';
import Root from './routers'

// 引入ant design样式，否则不显示
import 'antd/dist/antd.css'
// 把Root节点挂载到 document的app节点
// ReactDOM.render(
//   <Root />,
//   document.querySelectorAll('.app')[0]
// )

import { createRoot } from 'react-dom/client';
const container = document.querySelectorAll('.app')[0]
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Root />);

// index.js:1437 
        
// Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
// console.<computed> @ index.js:1437
// index.js:1437 
        
// Warning: [antd: Menu] `children` will be removed in next major version. Please use `items` instead.