import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      // 远程模块声明
      remotes: {
        remote_app: "http://localhost:3001/assets/remoteEntry.js",
      },
      // 共享依赖声明，本地模块设置了shared: ['vue']参数之后，当它执行远程模块代码的时候，一旦遇到了引入vue的情况，会优先使用本地的 vue，而不是远端模块中的vue。
      shared: ["vue"],
    }),
  ],
  build: {
    target: "esnext",
  },
})
