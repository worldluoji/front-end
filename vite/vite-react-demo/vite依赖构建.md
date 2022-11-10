# vite依赖构建
依赖预构建主要做了两件事情：

一是将其他格式(如 UMD 和 CommonJS)的产物转换为 ESM 格式，使其在浏览器通过 `<script type="module"><script>`的方式正常加载。

二是打包第三方库的代码，将各个第三方库分散的文件合并到一起，减少 HTTP 请求数量，避免页面加载性能劣化。

而这两件事情全部由性能优异的 Esbuild (基于 Golang 开发)完成，而不是传统的 Webpack/Rollup，所以也不会有明显的打包性能问题，反而是 Vite 项目启动飞快(秒级启动)的一个核心原因。

Vite 1.x 使用了 Rollup 来进行依赖预构建，在 2.x 版本将 Rollup 换成了 Esbuild，编译速度提升了近 100 倍！

在项目启动成功后，你可以在根目录下的node_modules中发现.vite目录，这就是预构建产物文件存放的目录。

在浏览器访问页面后，打开 Dev Tools 中的网络调试面板，你可以发现第三方包的引入路径已经被重写:
```
import React from "react";
// 路径被重写，定向到预构建产物文件中
import __vite__cjsImport0_react from "/node_modules/.vite/react.js?v=979739df";
const React = __vite__cjsImport0_react.__esModule
  ? __vite__cjsImport0_react.default
  : __vite__cjsImport0_react;
```

<br>

## 手动开启
上面提到了预构建中本地文件系统的产物缓存机制，而少数场景下我们不希望用本地的缓存文件，
比如需要调试某个包的预构建结果，我推荐使用下面任意一种方法清除缓存:
- 删除node_modules/.vite目录。
- 在 Vite 配置文件中，将server.force设为true。(注意，Vite 3.0 中配置项有所更新，你需要将 optimizeDeps.force 设为true)
- 命令行执行npx vite --force或者npx vite optimize。

vite 项目的启动可以分为两步，第一步是依赖预构建，第二步才是 Dev Server 的启动，
npx vite optimize相比于其它的方案，仅仅完成第一步的功能。

<br>

## 预构建配置
Vite 将预构建相关的配置项都集中在optimizeDeps属性上。

### entries
第一个是参数是optimizeDeps.entries，通过这个参数你可以自定义预构建的入口文件。

实际上，在项目第一次启动时，Vite 会默认抓取项目中所有的 HTML 文件（如当前脚手架项目中的index.html），
将 HTML 文件作为应用入口，然后根据入口文件扫描出项目中用到的第三方依赖，最后对这些依赖逐个进行编译。
如果这不能满足你的需求，就可以通过optimizeDeps.entries进行配置：
```
// vite.config.ts
{
  optimizeDeps: {
    // 为一个字符串数组
    entries: ["./src/main.vue"];
  }
}
```
entries 配置也支持 glob 语法：
```
// 将所有的 .vue 文件作为扫描入口
entries: ["**/*.vue"];
```
Vite 同时还支持各种格式的入口，包括: html、svelte、astro、js、jsx、ts和tsx。
可以看到，只要可能存在import语句的地方，Vite 都可以解析，并通过内置的扫描机制搜集到项目中用到的依赖，通用性很强。

<br>

### 添加一些依赖——include
include 也是一个很常用的配置，它决定了可以强制预构建的依赖项，使用方式很简单:
```
// vite.config.ts
optimizeDeps: {
  // 配置为一个字符串数组，将 `lodash-es` 和 `vue`两个包强制进行预构建
  include: ["lodash-es", "vue"];
}
```
某些情况下 Vite 默认的扫描行为并不完全可靠，这就需要联合配置include来达到完美的预构建效果了。

1. 在某些动态 import 的场景下，由于 Vite 天然按需加载的特性，经常会导致某些依赖只能在运行时被识别出来。
```
// src/locales/zh_CN.js
import objectAssign from "object-assign";
console.log(objectAssign);

// main.tsx
const importModule = (m) => import(`./locales/${m}.ts`);
importModule("zh_CN");
```
在这个例子中，动态 import 的路径只有运行时才能确定，无法在预构建阶段被扫描出来。
Vite 运行时发现了新的依赖，随之重新进行依赖预构建，并刷新页面。这个过程也叫二次预构建。

然而，二次预构建的成本也比较大。我们不仅需要把预构建的流程重新运行一遍，还得重新刷新页面，并且需要重新请求所有的模块。
尤其是在大型项目中，这个过程会严重拖慢应用的加载速度！因此，我们要尽力避免运行时的二次预构建。
具体怎么做呢？你可以通过include参数提前声明需要按需加载的依赖。


2. 某些包被手动 exclude

exclude 是optimizeDeps中的另一个配置项，与include相对，用于将某些依赖从预构建的过程中排除。不过这个配置并不常用，也不推荐大家使用。
如果真遇到了要在预构建中排除某个包的情况，需要注意它所依赖的包是否具有 ESM 格式，如下面这个例子:
```
// vite.config.ts
{
  optimizeDeps: {
    exclude: ["@loadable/component"];
  }
}
```
排除后浏览器控制台会出现报错。

原因是exclude 的包@loadable/component本身具有 ESM 格式的产物，
但它的某个依赖hoist-non-react-statics的产物并没有提供 ESM 格式，导致运行时加载失败。

这个时候include配置就派上用场了，我们可以强制对hoist-non-react-statics这个间接依赖进行预构建：
```
// vite.config.ts
{
  optimizeDeps: {
    include: [
      // 间接依赖的声明语法，通过`>`分开, 如`a > b`表示 a 中依赖的 b
      "@loadable/component > hoist-non-react-statics",
    ];
  }
}
```

<br>

## 自定义 Esbuild 行为
```
Vite 提供了esbuildOptions 参数来让我们自定义 Esbuild 本身的配置，常用的场景是加入一些 Esbuild 插件:

// vite.config.ts
{
  optimizeDeps: {
    esbuildOptions: {
       plugins: [
        // 加入 Esbuild 插件
      ];
    }
  }
}
```
这个配置主要是处理一些特殊情况，如某个第三方包本身的代码出现问题了。

由于我们无法保证第三方包的代码质量，在某些情况下我们会遇到莫名的第三方库报错。
我举一个常见的案例——react-virtualized库。这个库被许多组件库用到，但它的 ESM 格式产物有明显的问题，
在 Vite 进行预构建的时候会直接抛出错误。

原因是这个库的 ES 产物莫名其妙多出了一行无用的代码, 其实我们并不需要这行代码:
```
// WindowScroller.js 并没有导出这个模块
import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";
```

方法1: 可以使用patch-package这个库修改第三方库，来解决这类问题。
一方面，它能记录第三方库代码的改动，另一方面也能将改动同步到团队每个成员。
```
pnpm i @milahu/patch-package -D
注意: 要改动的包在 package.json 中必须声明确定的版本，不能有~或者^的前缀。
```
接着，我们进入第三方库的代码中进行修改，先删掉无用的 import 语句，再在命令行输入:
```
npx patch-package react-virtualized
```
现在根目录会多出patches目录记录第三方包内容的更改，随后我们在package.json的scripts中增加如下内容：
```
{
  "scripts": {
    // 省略其它 script
    "postinstall": "patch-package"
  }
}
```
这样一来，每次安装依赖的时候都会通过 postinstall 脚本自动应用 patches 的修改，解决了团队协作的问题。

第二种方式是通过 Esbuild 插件修改指定模块的内容:
```
// vite.config.ts
const esbuildPatchPlugin = {
  name: "react-virtualized-patch",
  setup(build) {
    build.onLoad(
      {
        filter:
          /react-virtualized\/dist\/es\/WindowScroller\/utils\/onScroll.js$/,
      },
      async (args) => {
        const text = await fs.promises.readFile(args.path, "utf8");

        return {
          contents: text.replace(
            'import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";',
            ""
          ),
        };
      }
    );
  },
};

// 插件加入 Vite 预构建配置
{
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildPatchPlugin];
    }
  }
}
```