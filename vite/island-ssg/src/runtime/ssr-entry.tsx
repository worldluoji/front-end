// SSG 本质上是构建阶段的 SSR，而当下 SSR 一般会采用同构架构，也就是同样的组件代码既需要运行在客户端，又需要运行在服务端
// 服务端入口文件

import { App } from "./app";
import { renderToString } from "react-dom/server";

// For ssr component render
export function render() {
  return renderToString(<App />);
}