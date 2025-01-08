import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssNested from 'postcss-nested'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  css: {
    postcss: {
      plugins: [postcssNested()]
    }
  }
})
