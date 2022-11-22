import { readFile } from "fs/promises";
import { Plugin } from "vite";
import { DEFAULT_HTML_PATH } from "../constants";

// 该插件让工程识别index.html
export function pluginIndexHtml(): Plugin {
  return {
    name: "island:index-html",
    // 'serve' 表示仅用于开发环境
    apply: "serve",
    // 用来获取 Vite Dev Server 实例，添加中间件
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await readFile(DEFAULT_HTML_PATH, "utf-8");

          try {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    },
  };
}