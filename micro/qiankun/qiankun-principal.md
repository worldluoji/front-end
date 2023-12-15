# qiankun principals
## 1. import-html-entry
HTML Entry 并不是给个 HTML 的 url 就可以直接接入整个子应用这么简单了。
子应用的 HTML 文件就是一堆乱七八糟的标签文本。`<link>, <style>, <script>` 得处理吧？要写正则表达式吧？头要秃了吧？

所以 qiankun 的作者自己也写了一个专门处理 HTML Entry 这种需求的 NPM 包：import-html-entry。用法如下：
```
import importHTML from 'import-html-entry';

importHTML('./subApp/index.html')
  .then(res => {
    console.log(res.template); // 拿到 HTML 模板

    res.execScripts().then(exports => { // 执行 JS 脚本
      const mobx = exports; // 获取 JS 的输出内容
      // 下面就是拿到 JS 入口的内容，并用来做一些事
      const { observable } = mobx;
      observable({
        name: 'kuitos'
      })    
    })
});
```
qiankun 已经将 import-html-entry 与子应用加载函数完美地结合起来，大家只需要知道这个库是用来获取 HTML 模板内容，Style 样式和 JS 脚本内容就可以了。

加载子应用就有思路了，伪代码如下：
```
// 解析 HTML，获取 html，js，css 文本
const {htmlText, jsText, cssText} = importHTMLEntry('https://xxxx.com')

// 创建容器
const $= document.querySelector(container)
$container.innerHTML = htmlText

// 创建 style 和 js 标签
const $style = createElement('style', cssText)
const $script = createElement('script', jsText)

$container.appendChild([$style, $script])
```
我们不禁有个疑问：当前这个应用完美地插入了 style 和 script 标签，那下一个应用 mount 时就会被前面的 style 和 script 污染了呀。
为了解决这两个问题，不得不做好应用之间的样式和 JS 的隔离。

<br>

## 2. 样式隔离
qiankun 实现 single-spa 推荐的两种样式隔离方案：ShadowDOM 和 Scoped CSS

先来说说 ShadowDOM，qiankun 的源码实现也很简单，只是添加一个 Shadow DOM 节点，伪代码如下：
```
if (strictStyleIsolation) {
  if (!supportShadowDOM) {
    // 报错
    // ...
  } else {
    // 清除原有的内容
    const { innerHTML } = appElement;
    appElement.innerHTML = '';

    let shadow: ShadowRoot;

    if (appElement.attachShadow) {
      // 添加 shadow DOM 节点
      shadow = appElement.attachShadow({ mode: 'open' });
    } else {
      // deprecated 的操作
      // ...
    }
    // 在 shadow DOM 节点添加内容
    shadow.innerHTML = innerHTML;
  }
}
```
通过 Shadow DOM 的天然的隔离特性来实现子应用间的样式隔离。

另一个方案就是 Scoped CSS 了，说白了就是通过修改 CSS 选择器来实现子应用间的样式隔离。 比如，你有这样的 CSS 代码：
```
.container {
  background: red;
}

div {
  color: red;
}
```
qiankun 会扫描给定的 CSS 文本，通过正则匹配在选择器前加上子应用的名字，如果遇到元素选择器，就加一个爸爸类名给它，比如：
```
.subApp.container {
  background: red;
}

.subApp div {
  color: red;
}
```

<br>

## 3. JS 隔离
第一步要隔离的是对全局对象 window 上的变量进行隔离。不能 A 子应用 window.setTimeout = undefined 之后， B 子应用用 setTimeout 的时候就凉了。

所以 JS 隔离深一层本质就是记录当前 window 对象以前的值，在 A 子应用进来时一顿乱搞之后，要将所有值都恢复过来（恢复现场）。
这就是 SnapshotSandbox 的做法，伪代码如下：
```
class SnapshotSandbox {
  ...

  active() {
    // 记录当前快照
    this.windowSnapshot = {} as Window;
    getKeys(window).forEach(key => {
      this.windowSnapshot[key] = window[key];
    })

    // 恢复之前的变更
    getKeys(this.modifyPropsMap).forEach((key) => {
      window[key] = this.modifyPropsMap[key];
    });

    this.sandboxRunning = true;
  }

  inactive() {
    this.modifyPropsMap = {};

    // 记录变更，恢复环境
    getKeys(window).forEach((key) => {
      if (window[key] !== this.windowSnapshot[key]) {
        this.modifyPropsMap[key] = window[key];
        window[key] = this.windowSnapshot[key];
      }
    });

    this.sandboxRunning = false;
  }
}
```

除了 SnapShotSandbox，qiankun 还提供了一种使用 ES 6 Proxy 实现的沙箱：
```class SingularProxySandbox {
  /** 沙箱期间新增的全局变量 */
  private addedPropsMapInSandbox = new Map<PropertyKey, any>();

  /** 沙箱期间更新的全局变量 */
  private modifiedPropsOriginalValueMapInSandbox = new Map<PropertyKey, any>();

  /** 持续记录更新的(新增和修改的)全局变量的 map，用于在任意时刻做 snapshot */
  private currentUpdatedPropsValueMap = new Map<PropertyKey, any>();

  active() {
    if (!this.sandboxRunning) {
      // 恢复子应用修改过的值
      this.currentUpdatedPropsValueMap.forEach((v, p) => setWindowProp(p, v));
    }

    this.sandboxRunning = true;
  }

  inactive() {
    // 恢复加载子应用前的 window 值
    this.modifiedPropsOriginalValueMapInSandbox.forEach((v, p) => setWindowProp(p, v));
    // 删掉子应用期间新加的 window 值 
    this.addedPropsMapInSandbox.forEach((_, p) => setWindowProp(p, undefined, true));

    this.sandboxRunning = false;
  }

  constructor(name: string) {
    this.name = name;
    this.type = SandBoxType.LegacyProxy;
    const { addedPropsMapInSandbox, modifiedPropsOriginalValueMapInSandbox, currentUpdatedPropsValueMap } = this;

    const rawWindow = window;
    const fakeWindow = Object.create(null) as Window;

    const proxy = new Proxy(fakeWindow, {
      set: (_: Window, key: PropertyKey, value: any): boolean => {
        if (this.sandboxRunning) {
          if (!rawWindow[key]) {
            addedPropsMapInSandbox.set(key, value); // 将沙箱期间新加的值记录下来
          } else if (!modifiedPropsOriginalValueMapInSandbox.has(key)) {
            modifiedPropsOriginalValueMapInSandbox.set(key, rawWindow[key]); // 记录沙箱前的值
          }

          currentUpdatedPropsValueMap.set(key, value); // 记录沙箱后的值

          // 必须重新设置 window 对象保证下次 get 时能拿到已更新的数据
          (rawWindow as any)[key] = value;
        }
      },

      get(_: Window, key: PropertyKey): any {
        return rawWindow[key]
      },
    }
  }
}
```
两者差不太多，那怎么不直接用 Proxy 高级方案呢，因为在一些低版本的浏览器下是没有 Proxy 对象的，
所以 SnapshotSandbox 其实是 SingularProxySandbox 的降级方案。

<br>

上面这种情况仅适用于一个页面只有一个子应用的情况，这种情况也被称为单例（singular mode）。 如果一个页面有多个子应用那一个 SingluarProxySandbox 明显不够的。
为了解决这个问题，qiankun 提供了 ProxySandbox，伪代码如下：
```
class ProxySandbox {
  ...

  active() { // +1 废话
    if (!this.sandboxRunning) activeSandboxCount++;
    this.sandboxRunning = true;
  }

  inactive() { // -1 废话
    if (--activeSandboxCount === 0) {
      variableWhiteList.forEach((p) => {
        if (this.proxy.hasOwnProperty(p)) {
          delete window[p]; // 删除白名单里子应用添加的值
        }
      });
    }

    this.sandboxRunning = false;
  }

  constructor(name: string) {
    ...
    const rawWindow = window; // 原 window 对象
    const { fakeWindow, propertiesWithGetter } = createFakeWindow(rawWindow); // 将真 window 上的 key-value 复制到假 window 对象上

    const proxy = new Proxy(fakeWindow, { // 代理复制出来的 window
      set: (target: FakeWindow, key: PropertyKey, value: any): boolean => {
        if (this.sandboxRunning) {
          target[key] = value // 修改 fakeWindow 上的值

          if (variableWhiteList.indexOf(key) !== -1) {
            rawWindow[key] = value; // 白名单的话，修改真 window 上的值
          }

          updatedValueSet.add(p); // 记录修改的值
        }
      },

      get(target: FakeWindow, key: PropertyKey): any {
        return target[key] || rawWindow[key] // 在 fakeWindow 上找，找不到从直 window 上找
      },
    }
  }
}
```
在 active 和 inactive 里并没有太多在恢复现场操作，因为只要子应用 unmount，把 fakeWindow 一扔掉就完事了。

<br>

## 沙箱
无论沙箱也好 JS 隔离也好，最终要实现的是给子应用一个独立的环境，这也意味着我们有成百上千的东西要做补丁来打造终极的类 `<iframe>`硬隔离。

qiankun 也不是万能的，它只对某些重要的函数和监听器进行打补丁: 其中最重要的补丁就是 insertBefore, appendChild 和 removeChild 的补丁了。

当我们加载子应用的时候，免不了遇到动态添加/移除 CSS 和 JS 脚本的情况。这时 `<head>` 或 `<body>` 都有可能
调用 insertBefore, appendChild, removeChild 这三个函数来插入或者删除 `<style>, <link>` 或者 `<script>` 元素。

所以，这三个函数在被 `<head>` 或 `<body>` 调用时，就要用上补丁，主要目的是别插入到主应用的 `<head>` 和 `<body>` 上，要插在子应用里。
打补丁伪代码如下：
```
// patch(element)
switch (element.tagName) {
  case LINK_TAG_NAME:  // <link> 标签
  case STYLE_TAG_NAME: { // <style> 标签
    if (scopedCSS) { // 使用 Scoped CSS
      if (element.href;) { // 处理如 <link rel="icon" href="favicon.ico"> 的玩意
        stylesheetElement = convertLinkAsStyle( // 获取 <link> 里的 CSS 文本，并使用 css.process 添加前缀
          element,
          (styleElement) => css.process(mountDOM, styleElement, appName), // 添加前缀回调
          fetch,
        );
        dynamicLinkAttachedInlineStyleMap.set(element, stylesheetElement); // 缓存，下次加载沙箱时直接吐出来
      } else { // 处理如 <style>.container { background: red }</style> 的玩意
        css.process(mountDOM, stylesheetElement, appName);
      }
    }

    return rawDOMAppendOrInsertBefore.call(mountDOM, stylesheetElement, referenceNode); // 插入到挂载容器上
  }

  case SCRIPT_TAG_NAME: {
    const { src, text } = element as HTMLScriptElement;

    if (element.src) { // 处理外链 JS
      execScripts(null, [src], proxy, { // 获取并执行 JS
        fetch,
        strictGlobal,
      });

      return rawDOMAppendOrInsertBefore.call(mountDOM, dynamicScriptCommentElement, referenceNode); // 插入到挂载容器上
    }

    // 处理内联 JS
    execScripts(null, [`<script>${text}</script>`], proxy, { strictGlobal });
    return rawDOMAppendOrInsertBefore.call(mountDOM, dynamicInlineScriptCommentElement, referenceNode);
  }

  default:
    break;
}
```
当在创建沙箱时打完补丁后，在处理样式和 JS 脚本时就可以针对当前子应用来应用样式和 JS 了。上面我们还注意到 CSS 样式文本是被保存的，
所以当子应用 remount 的时候，这些样式也可以作为缓存直接一波补上，不需要再做处理了。

剩下的补丁都是给 historyListeners, setInterval, addEventListeners, removeEventListeners 做的补丁，
无非就是 mount 时记录 listeners 以及一些添加的值，在 unmount 的时候再一次性执行掉或者删除掉


<br>

## 更多的生命周期
为了解决子应用也能独立运行的问题，qiankun 注入了一些变量，来告诉子应用说：喂，你现在是儿子，要用子应用的渲染方式。
而当子应用获取不到这些注入的变量时，它就知道：我现在要独立运行了，用回原来的渲染方式就可以了，比如：
```
if (window. __POWERED_BY_QIANKUN__) {
  console.log('微前端场景')
  renderAsSubApp()
} else {
  console.log('单体场景')
  previousRenderApp()
}
```
怎么注入就是个问题了，不能简单的 window.__POWERED_BY_QIANKUN__ = true 就完事了，因为子应用会在编译时就要这个变量了。
qiankun 在 single-spa 提供的生命周期 load, mount, unmount 前做了变量的注入，伪代码如下：
```
export default function getAddOn(global: Window): FrameworkLifeCycles<any> {
  return {
    async beforeLoad() {
      // eslint-disable-next-line no-param-reassign
      global.__POWERED_BY_QIANKUN__ = true;
    },

    async beforeMount() {
      // eslint-disable-next-line no-param-reassign
      global.__POWERED_BY_QIANKUN__ = true;
    },

    async beforeUnmount() {
      // eslint-disable-next-line no-param-reassign
      delete global.__POWERED_BY_QIANKUN__;
    },
  };
}

// loadApp
const addOnLifeCycles = getAddOn(window)

return {
  load: [addOnLifeCycles.beforeLoad, subApp.load],
  mount: [addOnLifeCycles.beforeMount, subApp.mount],
  unmount: [addOnLifeCycles.beforeUnmount, subApp.unmount]
}
```
新增的生命周期有：
- beforeLoad
- beforeMount
- afterMount
- beforeUnmount
- afterUnmount

<br>

## 总结
总结一下 qiankun 做了什么事情：
- 实现 loadApp 函数，是最关键、重要的一步
- 实现 CSS 样式隔离，主要有 Shadow DOM 和 Scoped CSS 两种方案
- 实现沙箱，JS 隔离，主要对 window 对象、各种 listeners 和方法进行隔离
- 提供很多生命周期，并在一些 beforeXXX 的钩子里注入 qiankun 提供的变量
- 提供预加载，提前下载 HTML、CSS、JS，并有三种策略
- 全部立马预加载
- 全部在第一个加载后预加载
- 一些立马预加载，一些在第一个加载后预加载
- 提供全局状态管理，类似 Redux，Event Bus
- 提供全局错误处理，主要监听 error 和 unhandledrejection 两个事件


## reference
- https://zhuanlan.zhihu.com/p/379744976
- https://github.com/kuitos/import-html-entry