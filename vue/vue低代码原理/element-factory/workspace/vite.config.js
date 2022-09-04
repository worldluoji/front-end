import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import { resolve, dirname } from 'path'
import vue from '@vitejs/plugin-vue'
import compile from '../src/index.mjs'

function plugin() {
    return {
        name: 'transform-tpl',
        transform(src, id) {
            if (/\.tpl$/.test(id)) {
                const code = compile(src, {})
                return { code }
            }
        }
    }
}


// https://vitejs.cn/config
export default defineConfig({
  plugins: [vue(), plugin()],
  build: {
    // 自定义底层的 Rollup 打包配置。这与从 Rollup 配置文件导出的选项相同，并将与 Vite 的内部 Rollup 选项合并
    rollupOptions: {
        // to tell Rollup that vue is external and the vue module ID equates to the global Vue variable:
        external: [
            'vue',
        ],
        output: {
            globals: {
                'vue': 'Vue'
            },
        },
    },
    // 构建为库。entry 是必须的因为库不能使用 HTML 作为入口。name 则是暴露的全局变量，在 formats 包含 'umd' 或 'iife' 时是必须的。
    // 默认 formats 是 ['es', 'umd'] 。fileName 是输出的包文件名，默认 fileName 是 package.json 的 name 选项，同时，它还可以被定义为参数为 format 的函数。
    lib: {
        entry: './app.tpl',
        name: 'MyLib',
        // the proper extensions will be added
        fileName: (format) => `index.${format}.js`,
        formats: ['es', 'amd', 'umd'],
    }
  },
  resolve: {
      alias: {
        // 使用文件系统路径的别名，请始终使用绝对路径。相对路径的别名值会原封不动地被使用，因此无法被正常解析。
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
  },
  test: {
    environment: 'jsdom'
  }
})
