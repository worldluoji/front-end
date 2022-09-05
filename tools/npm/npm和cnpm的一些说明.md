# 关于 npm 和 cnpm 的一些说明
## npm 和 cnpm 的一些区别
- npm i会根据package-lock.json里的内容来处理和安装依赖而不是package.json。
- cnpm i不受package-lock.json影响，只会根据package.json进行下载。
- npm i 会生成package-lock.json，如果删除了，再重新npm i会生成package-lock.json。
- cnpm i是不会生成package-lock.json的。
- cnpm i xxx@xxx不会更新到package-lock.json中去。
- npm i xxx@xxx会跟新到package-lock.json中去。

## 库的版本号详解(^和~区别)
```
"dependencies": {
  "bluebird": "^3.3.4",
  "body-parser": "~1.15.2"
}
```
bluebird的版本号：^3.3.4, body-parse的版本号：~1.15.2

- 波浪符号（~）：他会更新到当前minor version（也就是中间的那位数字）中最新的版本。放到我们的例子中就是：body-parser:~1.15.2，这个库会去匹配更新到1.15.x的最新版本，如果出了一个新的版本为1.16.0，则不会自动升级。波浪符号是曾经npm安装时候的默认符号，现在已经变为了插入符号。

- 插入符号（^）：这个符号就显得非常的灵活了，他将会把当前库的版本更新到当前major version（也就是第一位数字）中最新的版本。放到我们的例子中就是：bluebird:^3.3.4，这个库会去匹配3.x.x中最新的版本，但是他不会自动更新到4.0.0。
