# resolvePlugins
Vite 所有的插件就是在resolvePlugins里被收集起来的, 源码地址如下：

https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/index.ts#L22

```
export async function resolvePlugins(
  config: ResolvedConfig,
  prePlugins: Plugin[],
  normalPlugins: Plugin[],
  postPlugins: Plugin[]
): Promise<Plugin[]> {
  const isBuild = config.command === 'build'
  // 收集生产环境构建的插件，后文会介绍
  const buildPlugins = isBuild
    ? (await import('../build')).resolveBuildPlugins(config)
    : { pre: [], post: [] }

  return [
    // 1. 别名插件
    isBuild ? null : preAliasPlugin(),
    aliasPlugin({ entries: config.resolve.alias }),
    // 2. 用户自定义 pre 插件(带有`enforce: "pre"`属性)
    ...prePlugins,
    // 3. Vite 核心构建插件
    // 数量比较多，暂时省略代码
    // 4. 用户插件（不带有 `enforce` 属性）
    ...normalPlugins,
    // 5. Vite 生产环境插件 & 用户插件(带有 `enforce: "post"`属性)
    definePlugin(config),
    cssPostPlugin(config),
    ...buildPlugins.pre,
    ...postPlugins,
    ...buildPlugins.post,
    // 6. 一些开发阶段特有的插件
    ...(isBuild
      ? []
      : [clientInjectionsPlugin(config), importAnalysisPlugin(config)])
  ].filter(Boolean) as Plugin[]
}
```
从上述代码中我们可以总结出 Vite 插件的具体执行顺序。

1. 别名插件包括 vite:pre-alias和@rollup/plugin-alias，用于路径别名替换。

2. 用户自定义 pre 插件，也就是带有enforce: "pre"属性的自定义插件。

3. Vite 核心构建插件，这部分插件为 Vite 的核心编译插件，数量比较多，我们在下部分一一拆解。

4. 用户自定义的普通插件，即不带有 enforce 属性的自定义插件。

5. Vite 生产环境插件和用户插件中带有enforce: "post"属性的插件。

6. 一些开发阶段特有的插件，包括环境变量注入插件clientInjectionsPlugin和 import 语句分析及重写插件importAnalysisPlugin。

<br>

## 插件功能梳理
除用户自定义插件之外，我们需要梳理的 Vite 内置插件有下面这几类:
- 别名插件
- 核心构建插件
- 生产环境特有插件
- 开发环境特有插件

https://juejin.cn/book/7050063811973218341/section/7066617652487127077