import { createServer as createViteDevServer } from "vite";
import { pluginIndexHtml } from "./plugin-island/indexHtml";

// 使用 vite的 Dev Server
export async function createDevServer(root = process.cwd()) {
  return createViteDevServer({
    root,
    plugins: [pluginIndexHtml()]
  });
}