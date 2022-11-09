import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import autoprefixer from 'autoprefixer'

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
    },
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    }
  },
  resolve: {
    // 别名配置，这样 Vite 在遇到@assets路径的时候，会自动帮我们定位至根目录下的src/assets目录。
    // 值得注意的是，alias 别名配置不仅在 JavaScript 的 import 语句中生效，在 CSS 代码的 @import 和 url导入语句中也同样生效。
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  }
})
