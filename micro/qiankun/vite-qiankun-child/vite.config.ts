import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun('app-01', {
      useDevMode: true,
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 8081,
    cors: true
  }
})
