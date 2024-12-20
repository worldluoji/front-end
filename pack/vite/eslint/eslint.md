# Eslint
Eslint 是国外的前端大牛Nicholas C. Zakas在 2013 年发起的一个开源项目。

Nicholas 就是为了打造一款插件化的 JavaScript 代码静态检查工具，通过解析代码的 AST 来分析代码格式，
检查代码的风格和质量问题。现在，Eslint 已经成为一个非常成功的开源项目了，基本上属于前端项目中 Lint 工具的标配。

ESLint主要通过配置文件对各种代码格式的规则(rules)进行配置，以指定具体的代码规范。
目前开源社区也有一些成熟的规范集可供使用，包括Airbnb JavaScript 代码规范、Standard JavaScript 规范、Google JavaScript 规范等等

## 安装
```
npm i eslint -D
```
接着进入交互
```
npx eslint --init
```
ESLint 会帮我们自动生成.eslintrc.js配置文件。
需要注意的是，在上述初始化流程中我们并没有用 npm 安装依赖，需要进行手动安装:
```
npm i eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest -D
```

## 配置详解
可参考 vite-react-demo/vite-project/.eslintrc.cjs

1. parser - 解析器
ESLint 底层默认使用 Espree来进行 AST 解析，这个解析器目前已经基于 Acron 来实现，
虽然说 Acron 目前能够解析绝大多数的 ECMAScript 规范的语法，但还是不支持 TypeScript ，
因此需要引入其他的解析器完成 TS 的解析。

社区提供了@typescript-eslint/parser这个解决方案，专门为了 TypeScript 的解析而诞生，
将 TS 代码转换为 Espree 能够识别的格式(即 Estree 格式)，然后在 Eslint 下通过Espree进行格式检查， 
以此兼容了 TypeScript 语法。

2. parserOptions - 解析器选项
这个配置可以对上述的解析器进行能力定制，默认情况下 ESLint 支持 ES5 语法，你可以配置这个选项，具体内容如下:
- ecmaVersion: 这个配置和 Acron 的 ecmaVersion 是兼容的，可以配置 ES + 数字(如 ES6)或者ES + 年份(如 ES2015)，也可以直接配置为latest，启用最新的 ES 语法。
- sourceType: 默认为script，如果使用 ES Module 则应设置为module
- ecmaFeatures: 为一个对象，表示想使用的额外语言特性，如开启 jsx。

3. rules - 具体代码规则
rules 配置即代表在 ESLint 中手动调整哪些代码规则，比如禁止在 if 语句中使用赋值语句这条规则可以像如下的方式配置:

// .eslintrc.cjs
module.exports = {
  // 其它配置省略
  rules: {
    // key 为规则名，value 配置内容
    "no-cond-assign": ["error", "always"]
  }
}
在 rules 对象中，key 一般为规则名，value 为具体的配置内容，在上述的例子中我们设置为一个数组，数组第一项为规则的 ID，第二项为规则的配置。

这里重点说一说规则的 ID，它的语法对所有规则都适用，你可以设置以下的值:

- off 或 0: 表示关闭规则。
- warn 或 1: 表示开启规则，不过违背规则后只抛出 warning，而不会导致程序退出。
- error 或 2: 表示开启规则，不过违背规则后抛出 error，程序会退出。

具体的规则配置可能会不一样，有的是一个字符串，有的可以配置一个对象，你可以参考 ESLint 官方文档。

当然，你也能直接将 rules 对象的 value 配置成 ID，如: "no-cond-assign": "error"。

4. plugins
上面提到过 ESLint 的 parser 基于Acorn实现，不能直接解析 TypeScript，需要我们指定 parser 选项为@typescript-eslint/parser才能兼容 TS 的解析。
同理，ESLint 本身也没有内置 TypeScript 的代码规则，这个时候 ESLint 的插件系统就派上用场了。
我们需要通过添加 ESLint 插件来增加一些特定的规则，比如添加@typescript-eslint/eslint-plugin 来拓展一些关于 TS 代码的规则，如下代码所示:
```
// .eslintrc.cjs
module.exports = {
  // 添加 TS 规则，可省略`eslint-plugin`
  plugins: ['@typescript-eslint']
}
```
值得注意的是，添加插件后只是拓展了 ESLint 本身的规则集，但 ESLint 默认并没有开启这些规则的校验！
如果要开启或者调整这些规则，你需要在 rules 中进行配置，如:
```
// .eslintrc.cjs
module.exports = {
  // 开启一些 TS 规则
  rules: {
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  }
}
```

5. extends - 继承配置
extends 相当于继承另外一份 ESLint 配置，可以配置为一个字符串，也可以配置成一个字符串数组。主要分如下 3 种情况:

从 ESLint 本身继承；
从类似 eslint-config-xxx 的 npm 包继承；
从 ESLint 插件继承。
```
// .eslintrc.cjs
module.exports = {
   "extends": [
     // 第1种情况 
     "eslint:recommended",
     // 第2种情况，一般配置的时候可以省略 `eslint-config`
     "standard"
     // 第3种情况，可以省略包名中的 `eslint-plugin`
     // 格式一般为: `plugin:${pluginName}/${configName}`
     "plugin:react/recommended"
     "plugin:@typescript-eslint/recommended",
   ]
}
```
有了 extends 的配置，对于之前所说的 ESLint 插件中的繁多配置，我们就不需要手动一一开启了，通过 extends 字段即可自动开启插件中的推荐规则:
```
extends: ["plugin:@typescript-eslint/recommended"]
```

6. env 和 globals
这两个配置分别表示运行环境和全局变量，在指定的运行环境中会预设一些全局变量，比如:
```
// .eslint.cjs
module.export = {
  "env": {
    "browser": "true",
    "node": "true"
  }
}
```
指定上述的 env 配置后便会启用浏览器和 Node.js 环境，这两个环境中的一些全局变量(如 window、global 等)会同时启用。

有些全局变量是业务代码引入的第三方库所声明，这里就需要在globals配置中声明全局变量了。每个全局变量的配置值有 3 种情况:
- "writable"或者 true，表示变量可重写；
- "readonly"或者false，表示变量不可重写；
- "off"，表示禁用该全局变量。

那jquery举例，我们可以在配置文件中声明如下:
```
// .eslintrc.cjs
module.exports = {
  "globals": {
    // 不可重写
    "$": false, 
    "jQuery": false 
  }
}
```
相信有了上述核心配置部分的讲解，你再回头看看初始化生成的 ESLint 配置文件，你也能很好地理解各个配置项的含义了。

## 常用eslint插件
- eslint-plugin-jsx-a11y: the eslint-plugin-jsx-a11y plugin in its ESLint config to help catch accessibility issues early. For example, this plugin warns if you have images without alt text, use the aria-* and role attributes incorrectly, and more.
- eslint-plugin-react-hooks: Next.js includes the eslint-plugin-react-hooks plugin in its ESLint config to help catch bugs in React hooks.

## 参考文档
https://juejin.cn/book/7050063811973218341/section/7058853948060336163