// vite.config.js
import { defineConfig } from 'vite'
import createJson5Plugin from "./vite-plugin-json5"

export default defineConfig({
  plugins: [createJson5Plugin()]
})