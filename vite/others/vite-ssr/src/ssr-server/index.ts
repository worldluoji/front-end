// 后端服务
import express, { RequestHandler, Express } from 'express';
import { ViteDevServer } from 'vite';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import serve from 'serve-static';

const isProd = process.env.NODE_ENV === 'production';
const cwd = process.cwd();

function resolveTemplatePath() {
    return isProd ?
      path.join(cwd, 'dist/client/index.html') :
      path.join(cwd, 'index.html');
}

async function loadSsrEntryModule(vite: ViteDevServer | null) {
    // 生产模式下直接引入打包后的产物
    if (isProd) {
      const entryPath = path.join(cwd, 'dist/server/entry-server.js');
      return import(entryPath);
    } else {
      // 开发环境下通过 no-bundle 方式加载
      const entryPath = path.join(cwd, 'src/entry-server.tsx');
      return vite!.ssrLoadModule(entryPath);
    }
}

async function fetchData() {
    return { user: 'luoji' }
}

async function toHtml(vite: ViteDevServer | null, appHtml: string, data: any, url: string) {
    const templatePath = resolveTemplatePath();
    let template = fs.readFileSync(templatePath, 'utf-8');
    // 开发模式下需要注入 HMR、环境变量相关的代码，因此需要调用 vite.transformIndexHtml
    if (!isProd && vite) {
      template = await vite.transformIndexHtml(url, template);
    }
    return template
      .replace('<!-- SSR_APP -->', appHtml)
      // 注入数据标签，用于客户端 hydrate
      .replace(
        '<!-- SSR_DATA -->',
        `<script>window.__SSR_DATA__=${JSON.stringify(data)}</script>`
      );
}

// 过滤出页面请求
function matchPageUrl(url: string) {
    return url === '/'
}

async function createSsrMiddleware(app: Express): Promise<RequestHandler> {
  let vite: ViteDevServer | null = null;
  if (!isProd) { 
    vite = await (await import('vite')).createServer({
      root: process.cwd(),
      server: {
        middlewareMode: 'ssr',
      }
    })
    // 注册 Vite Middlewares
    // 主要用来处理客户端资源
    app.use(vite.middlewares);
  }
  return async (req, res, next) => {
    try {
        const url = req.originalUrl;
        if (!matchPageUrl(url)) {
            // 走静态资源的处理
            // next函数主要是用来确保所有注册的中间件被一个接一个的执行
            return await next();
        }
        // SSR 的逻辑
        // 1. 加载服务端入口模块
        const { ServerEntry } = await loadSsrEntryModule(vite);
        // 2. 数据预取
        const data = await fetchData();
        // 3. 「核心」渲染组件
        const appHtml = renderToString(React.createElement(ServerEntry, { data }));
        // 4. 拼接 HTML，返回响应
        const html = await toHtml(vite, appHtml, data, req.originalUrl);
        res.status(200).setHeader('Content-Type', 'text/html').end(html);
    } catch(e: any) {
        vite?.ssrFixStacktrace(e);
        console.error(e);
        res.status(500).end(e.message);
    }
  };
}

async function createServer() {
  const app = express();
  // 加入 Vite SSR 中间件
  app.use(await createSsrMiddleware(app));

  // 注册中间件，生产环境端处理客户端资源
  if (isProd) {
    // dist/client里面就是静态资源
    app.use(serve(path.join(cwd, 'dist/client')))
  }

  app.listen(3000, () => {
    console.log('Node服务器已启动~');
    console.log('http://localhost:3000');
  });
}

createServer();