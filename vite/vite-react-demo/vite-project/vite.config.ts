import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const variablePath = normalizePath(path.resolve('./src/global.scss'))

// https://vitejs.dev/config/
// 配置文件中默认在 plugins 数组中配置了官方的 react 插件，来提供 React 项目编译和热更新的功能。
export default defineConfig({
  // 手动指定项目根目录位置到src下
  // root: path.join(__dirname, 'src'),
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablePath}";`
      }
    }
  }
})
