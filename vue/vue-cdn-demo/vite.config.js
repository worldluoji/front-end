import vue from "@vitejs/plugin-vue";
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";

// 全局对象
let globals = externalGlobals({
  vue: "Vue",
  vuex: "Vuex",
  vueRouter: "VueRouter",
  "element-plus": "element"
})

const plugins = process.env.NODE_ENV === 'production' ? [] : [commonjs(), globals]

export default {
  plugins: [
    vue(),
    ...plugins
  ],
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  build: {
    target: 'es2015',
    assetsDir: './static',
    rollupOptions: {
      external: ['vue', 'vuex', 'vueRouter' ],
      plugins: [
        commonjs(),
        globals
      ],
    },
  }
};