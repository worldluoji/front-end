# eslint
react项目eslint配置方法：
```
npm i eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```
然后创建.eslintrc.cjs,进行相关配置，见.eslintrc.cjs

然后在package.json中加入命令 "lint": "eslint --ext .ts,.tsx,.js,.jsx ./"

.eslintigonre 文件可以排除一些不必要的文件

执行
```
npm run lint
```
即可发现问题。可以通过 eslint 的 --fix 的参数来进行自动修复。

## prettier 
```
npm i prettier eslint-plugin-prettier eslint-config-prettier -D
```
首先在.eslintrc.cjs中的extends、plugin、rules中增加prettier配置:
```
'prettier',
'plugin:prettier/recommended'
```
新建 .prettier 配置文件

再新建 .prettierignore 文件，内容和 .eslintignore 一致即可.

然后我们加入--fix参数，使用
```
npm run lint
```
命令来进行代码规范检查和自动格式化。

当然每次执行 pnpm lint 进行格式化是比较麻烦的，我们可以在 VSCode 中进行相应的设置。
首先将默认的 formatter 设置为 Prettier.

然后搜索 format on save，打开保存时格式化文件的开关。