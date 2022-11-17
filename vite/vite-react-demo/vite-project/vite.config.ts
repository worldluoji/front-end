import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import autoprefixer from 'autoprefixer'
import svgr from 'vite-plugin-svgr'
// 还需要在tsconfig compilerOptions 中配置 "types": ["vite-plugin-svgr/client"]
import viteImagemin from 'vite-plugin-imagemin'

import virtual from './plugins/virtual-module'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import legacy from '@vitejs/plugin-legacy'

const variablePath = normalizePath(path.resolve('./src/global.scss'))

const isProduction = process.env.NODE_ENV === 'production'
const CDN_URL = 'https://xxx.xxx.xxx'

// console.log(`isProduction: ${isProduction}`)

// https://vitejs.dev/config/
// 配置文件中默认在 plugins 数组中配置了官方的 react 插件，来提供 React 项目编译和热更新的功能。
export default defineConfig({
  // 手动指定项目根目录位置到src下
  // root: path.join(__dirname, 'src'),
  plugins: [react(), 
            svgr(),
            virtual(),
            viteImagemin({
              // 无损压缩配置，无损压缩下图片质量不会变差
              optipng: {
                optimizationLevel: 7
              },
              // 有损压缩配置，有损压缩下图片质量可能会变差
              pngquant: {
                quality: [0.8, 0.9],
              },
              // svg 优化
              svgo: {
                plugins: [
                  {
                    name: 'removeViewBox'
                  },
                  {
                    name: 'removeEmptyAttrs',
                    active: false
                  }
                ]
              }
            }),
            chunkSplitPlugin({
              // 指定拆包策略
              customSplitting: {
                // 1. 支持填包名。`react` 和 `react-dom` 会被打包到一个名为`render-vendor`的 chunk 里面(包括它们的依赖，如 object-assign)
                'react-vendor': ['react', 'react-dom'],
                // 2. 支持填正则表达式。src 中 components 和 utils 下的所有文件被会被打包为`component-util`的 chunk 中
                'components-util': [/src\/components/, /src\/utils/]
              }
            }),
            legacy({
              // 设置目标浏览器，browserslist 配置语法
              targets: ['last 2 versions and since 2018 and > 0.5%','ie >= 11'],
              // 通过官方的legacy插件， Vite 会分别打包出Modern模式和Legacy模式的产物，然后将两种产物插入同一个 HTML 里面，Modern产物被放到 type="module"的 script 标签中，而Legacy产物则被放到带有 nomodule 的 script 标签中
            })
  ],
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
  },
  base: isProduction ? CDN_URL: '/' // 加上这个配置，npm run build，可以发现产物中的静态资源地址已经自动加上了 CDN 地址前缀
})
