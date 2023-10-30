# create a new ts app with webpack
可以通过官方提供的脚手架来自动创建基于webpack的工程，也可以直接通过webpack手动构建。
前者的好处是快，后者则更有利于自主掌控。

## 1. 创建ts配置文件
```
tsc --init 
```
会生成tsconfig.json，已经包含一些基础的默认配置。

## 2. 创建src目录
创建src目录，并在src目录下创建一个index.ts文件作为入口文件

## 3. 引入webpack构建工具
```
npm i webpack webpack-cli webpack-dev-server -D
```

## 4. 新建build目录用于存放webpack配置文件
创建目录后，引入配置文件webpack.*.config.js,
配置文件分了dev和pro环境，基础配置都一样在webpack.base.config.js中，
webpack.config.js中通merge插件进行合并。
由于引入了ts,还需要安装ts-loader(安装ts-loader时需要再次安装一下typscript):
```
npm i ts-loader typescript -D

```

还需要安装html-webpack-plugin，它的作用是：生成 html 文件，并将打包生成的js，和css文件，插入到该html中。
```
npm i html-webpack-plugin -D
```

## 5. 创建html
由于在webpack中指定了html模板的路径是：
```
plugins: [
    new HtmlWebpackPlugin({
        template: './src/tpl/index.html'
    })
]
```
我们就可以创建tpl目录和index.html, 输入html:5快捷创建。
修改标题，并在body中加入：
```
<div class="app"></div>
```

## 6. dev
webpack.dev.config.js中配置
```
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 8080
    }
}
```
cheap-module-eval-source-map的意义在于：
- 通常，js代码出错，控制台会提示第几行第几列代码出错。但是webpack打包压缩后的代码，都被压缩到了一行，变量也变成了a,b,c,d。代码出错，控制台就没法正确的提示错误位置。
- sourceMap就可以解决这个问题。sourceMap就是一个信息文件，里面储存着打包前的位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置

<br>
cheap-module-eval-source-map 是官方推荐的：

- eval-source-map： 和 eval 类似，为每个模块生成原始的sourceMap，map文件会以dataURL的形式添加到js中（类似于图片的base64形式）。原始的sourceMap可以正确提示错误行数。

- eval-cheap-source-map： 跟eval-source-map相同，唯一不同的就是增加了cheap，cheap是指忽略了列信息（绝大部分时候列信息对于错误提示没啥用，只需要提示行数就行）。

- cheap-module-eval-source-map： 与eval-cheap-source-map相同，但是包含了不同loader模块之间的sourceMap。例如借助babel编译ES6，如果生成不包含loader的sourcemap，此时debug到的将是编译后的代码，而非原始代码。本项目中，配置了它，就可以在.ts文件里debug.
  
## 7. prod
生产环境配置了CleanWebpackPlugin，它的作用是：使用此插件，可以在每次打包之前，清理dist文件夹（打包后的目录文件）。
```
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    plugins: [
        new CleanWebpackPlugin()
    ]
}

```
因此我们需要安装clean-webpack-plugin
```
npm i clean-webpack-plugin -D
```

## 8. webpack.config.js
最终的配置文件，我们使用环境变量区分配置，
并使用了webpack-merge，它的作用是将配置合。

```
module.exports = (env, argv) => {
    let config = argv.mode === 'development' ? devConfig : proConfig;
    return merge(baseConfig, config);
};
```
我们安装它：
```
npm i webpack-merge -D
```

## 9. package.json
- npm init 根据完成指引，会自动创建package.json文件
- 修改main入口为./src/index.ts
- 创建运行和构建命令
```
"scripts": {
    "start": "webpack-dev-server --mode=development --config ./build/webpack.config.js",
    "build": "webpack --mode=production --config ./build/webpack.config.js"
  },
```
npm run start即可本地启动，npm run build即可打生产包。

发现npm run start发生错误：
```
Invalid configuration object. Webpack has been initialized using a configuration object that does not match the API schema.
 - configuration.devtool should match pattern "^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$".
   BREAKING CHANGE since webpack 5: The devtool option is more strict.
   Please strictly follow the order of the keywords in the pattern
```
原因是webpack5, devtool更加严格了，必须按照上面的顺序，改为：
```
eval-cheap-module-source-map,
```
就可以正常运行了。

## 10. 引入ESLint
为什么要使用ESlint?
- TypeScript官方已经决定放弃TSLint，转向ESlint
- ESlint可以保持代码风格的统一，比如是否使用分号

这需要安装依赖包：
```
npm install -g eslint // 之前没安装需要安装
npm i eslint -D
npm i @typescript-eslint/eslint-plugin -D
npm i @typescript-eslint/parser -D
```

在vscode里安装eslint插件，可以通过eslint --init生成eslintrc.json，
接下来需配置eslint配置文件eslintrc.json：
```
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "parserOptions": {
      "project": "./tsconfig.json"
  },
  "extends": [
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-inferrable-types": "off"
  }
}
```
这里指定了上面的插件，以及tsconfig.json的位置，通过extends里，加入了eslint官方推荐的插件 @typescript-eslint/recommended 用于默认规则检查， rule里可以单独配置规则。

"@typescript-eslint/no-inferrable-types": "off" 表示：要使用类型推断，如果不使用则报错，这里就是把它关了。

最后在package.json的脚本里，配置：
```
"lint": "eslint src --ext .js,.ts"
```
这样通过 npm run lint 即可进行eslint检查。