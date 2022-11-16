# HMR
HMR 的全称叫做Hot Module Replacement，即模块热替换或者模块热更新。
在计算机领域当中也有一个类似的概念叫热插拔，我们经常使用的 USB 设备就是一个典型的代表，
当我们插入 U 盘的时候，系统驱动会加载在新增的 U 盘内容，不会重启系统，也不会修改系统其它模块的内容。
HMR 的作用其实一样，就是在页面模块更新的时候，直接把页面中发生变化的模块替换为新的模块，同时不会影响其它模块的正常运作。

Vite 作为一个完整的构建工具，本身实现了一套 HMR 系统，值得注意的是，这套 HMR 系统基于原生的 ESM 模块规范来实现，
在文件发生改变时 Vite 会侦测到相应 ES 模块的变化，从而触发相应的 API，实现局部的更新。

## vite HMR API 类型定义：
```
interface ImportMeta {
  readonly hot?: {
    readonly data: any
    accept(): void
    accept(cb: (mod: any) => void): void
    accept(dep: string, cb: (mod: any) => void): void
    accept(deps: string[], cb: (mods: any[]) => void): void
    prune(cb: () => void): void
    dispose(cb: (data: any) => void): void
    decline(): void
    invalidate(): void
    on(event: string, cb: (...args: any[]) => void): void
  }
}
```
import.meta对象为现代浏览器原生的一个内置对象，Vite 所做的事情就是在这个对象上的 hot 属性中定义了一套完整的属性和方法。
因此，在 Vite 当中，你就可以通过import.meta.hot来访问关于 HMR 的这些属性和方法，比如import.meta.hot.accept()


## 模块更新时逻辑: hot.accept
关键方法accept，它决定了 Vite 进行热更新的边界，那么如何来理解这个accept的含义呢？

它就是用来接受模块更新的。 一旦 Vite 接受了这个更新，当前模块就会被认为是 HMR 的边界。
那么，Vite 接受谁的更新呢？这里会有三种情况：
- 接受自身模块的更新，当模块接受自身的更新时，则当前模块会被认为 HMR 的边界。也就是说，除了当前模块，其他的模块均未受到任何影响。
- 接受某个子模块(依赖模块)的更新
- 接受多个子模块的更新


## 模块销毁时逻辑: hot.dispose
这个方法代表在模块更新、旧模块需要销毁时需要做的一些事情。

## 共享数据: hot.data 属性
这个属性用来在不同的模块实例间共享一些数据。


## 其它方法
1. import.meta.hot.decline()

这个方法调用之后，相当于表示此模块不可热更新，当模块更新时会强制进行页面刷新。

2. import.meta.hot.invalidate()

这个方法就更简单了，只是用来强制刷新页面。

