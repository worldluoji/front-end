# activity-page-editor

活动页编辑器

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### 思路
只要能开发一个编辑器，生成schema(card.mjs，list.mjs)
就能基于楼层，还原出ui界面。

#### 编辑器如何搞？
1. 整个编辑器就是一个list, 可以添加楼层、插入楼层、删除楼层
2. 添加楼层时，设置该层有几个卡片。比如，如果是导航栏，该层只有一个卡片即可, 可以为卡片配置常用的padding, margin等属性。
3. 卡片如果有children，预留好插槽，插槽里可配置允许的 child 组件。（其它思路： 考虑相对布局？）
4. 保存时，在json中，记录卡片在哪个楼层，以及包含了哪些children


注：移动端这个思路可以搞定，如果涉及PC端，还需要考虑常用的布局母版，比如圣杯这类带侧边栏的情况