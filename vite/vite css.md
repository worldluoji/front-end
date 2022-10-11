# vite css
针对原生 CSS 的痛点，社区中诞生了不少解决方案，常见的有 5 类。
- CSS 预处理器：主流的包括Sass/Scss、Less和Stylus。这些方案各自定义了一套语法，让 CSS 也能使用嵌套规则，甚至能像编程语言一样定义变量、写条件判断和循环语句，大大增强了样式语言的灵活性，解决原生 CSS 的开发体验问题。
- CSS Modules：能将 CSS 类名处理成哈希值，这样就可以避免同名的情况下样式污染的问题。
- CSS 后处理器PostCSS，用来解析和处理 CSS 代码，可以实现的功能非常丰富，比如将 px 转换为 rem、根据目标浏览器情况自动加上类似于--moz--、-o-的属性前缀等等。
- CSS in JS 方案，主流的包括emotion、styled-components等等，顾名思义，这类方案可以实现直接在 JS 中写样式代码，基本包含CSS 预处理器和 CSS Modules 的各项优点，非常灵活，解决了开发体验和全局样式污染的问题。
- CSS 原子化框架，如Tailwind CSS、Windi CSS，通过类名来指定样式，大大简化了样式写法，提高了样式开发的效率，主要解决了原生 CSS 开发体验的问题。

<br>

## 1. CSS 预处理器
Vite 本身对 CSS 各种预处理器语言(Sass/Scss、Less和Stylus)做了内置支持。
也就是说，即使你不经过任何的配置也可以直接使用各种 CSS 预处理器。
```
npm i sass -D
```
即可使用scss.

### 引入全局样式
```
// vite.config.ts
import { normalizePath } from 'vite';
// 如果类型报错，需要安装 @types/node: npm i @types/node -D
import path from 'path';

// 全局 scss 文件的路径
// 用 normalizePath 解决 windows 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'));

export default defineConfig({
  // css 相关的配置
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    }
  }
})
```

<br>

## 2. CSS Modules modules
CSS Modules 在 Vite 也是一个开箱即用的能力，Vite 会对后缀带有.module的样式文件自动应用 CSS Modules
```
// index.tsx
import styles from './index.module.scss';
export function Header() {
  return <p className={styles.header}>This is Header</p>
};
```
样式文件写成.module.scss后缀，就可以直接导入后使用。
在浏览器中，可以看见 p 标签的类名已经被处理成了哈希值的形式。

### 可以在配置文件中的css.modules选项来配置 CSS Modules 的功能
```
// vite.config.ts
export default {
  css: {
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: "[name]__[local]___[hash:base64:5]"
    },
    preprocessorOptions: {
      // 省略预处理器配置
    }

  }
}
```

<br>

### 3. PostCSS
一般你可以通过 postcss.config.js 来配置 postcss ，不过在 Vite 配置文件中已经提供了 PostCSS 的配置入口，
我们可以直接在 Vite 配置文件中进行操作。