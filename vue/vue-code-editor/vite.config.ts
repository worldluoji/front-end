import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import commonjs from 'vite-plugin-commonjs';
import postcssNested from 'postcss-nested';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    commonjs(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  css: {
    postcss: {
      plugins: [postcssNested()]
    }
  }
})
