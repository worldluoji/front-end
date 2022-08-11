# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

it's created by command "npm init vite@latest"

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## Jest配置
```
npm install -D jest@26 vue-jest@next @vue/test-utils@next 
npm install -D babel-jest@26 @babel/core @babel/preset-env 
npm install -D ts-jest@26 @babel/preset-typescript @types/jest
```
安装完毕后，我们要在根目录下新建.babel.config.js。下面的配置目的是让 babel 解析到 Node 和 TypeScript 环境下。
```
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
}
```
我们还需要新建 jest.config.js，用来配置 jest 的测试行为。
不同格式的文件需要使用不同命令来配置，对于.vue 文件我们使用 vue-jest，对于.js 或者.jsx 结果的文件，我们就要使用 babel-jest，而对于.ts 结尾的文件我们使用 ts-jest，然后匹配文件名是 xx.spect.js。
这里请注意，Jest 只会执行.spec.js 结尾的文件。