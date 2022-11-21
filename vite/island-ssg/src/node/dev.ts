import { createServer as createViteDevServer } from "vite";
// 使用 vite的 Dev Server
export async function createDevServer(root = process.cwd()) {
  return createViteDevServer({
    root,
  });
}