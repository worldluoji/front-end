import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import postcssNested from 'postcss-nested'
import Components from 'unplugin-vue-components/vite'
import NutUIResolver from '@nutui/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    (monacoEditorPlugin as any).default({
      languageWorkers:['editorWorkerService', 'json']
    }),
    Components({
      resolvers: [NutUIResolver()],
    }),
  ],
  css: {
    postcss: {
      plugins: [postcssNested()]
    }
  }
})
