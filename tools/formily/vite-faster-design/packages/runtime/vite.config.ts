import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import autoprefixer from 'autoprefixer'
import postcssNested from 'postcss-nested'
import Components from 'unplugin-vue-components/vite'
import NutUIResolver from '@nutui/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['last 2 versions', '> 0.2%', 'not dead'],
    }),
    Components({
      resolvers: [NutUIResolver()],
    }),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['last 2 versions', '> 0.2%', 'not dead']
        }),
        postcssNested()
      ]
    }
  },
})
