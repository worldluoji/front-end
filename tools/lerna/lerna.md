# lerna
lerna是一个工具，它优化了使用git和npm管理多包存储库的工作流。vue,babel,react等都在用。

## lerna工作的两种模式
### Fixed/Locked mode (default)
vue,babel都是用这种，在publish的时候,会在lerna.json文件里面"version": "0.1.5",,依据这个号，进行增加，只选择一次，其他有改动的包自动更新版本号。

### Independent mode
lerna init --independent初始化项目。 lerna.json文件里面"version": "independent",

每次publish时，您都将得到一个提示符，提示每个已更改的包，以指定是补丁、次要更改、主要更改还是自定义更改。

<br>

## 使用lerna
```
$ npm install lerna -g
$ lerna -v
$ lerna init # 用的默认的固定模式，vue babel等都是这个

$ cd packages
$ mkdir card1 card2

...
# 分别进入三个目录初始化成包
$ cd card1
$ npm init -y 
$ cd ../card2
$ npm init -y
```
这样，card1、card2就是独立的项目。默认是npm, 而且每个子package都有自己的node_modules

## 配置工作目录
默认lerna管理的包的路径默认配置在lerna.json
```
{
  "packages": ["packages/*"]
}
```

如果lerna.json中如果配置了"useWorkspaces": true, 则开启了workspace模式，
这样lerna.json中的配置将无效，需要在package.json中配置工作路径：
```
"workspaces": [
  "packages/*"
],
```

<br>

## 如何实现共享依赖
lerna bootstrap --hoist 来将依赖安装到根目录以达成子项目共享 node_modules。

此特性lerna v7版本已经废弃：https://lerna.js.org/docs/features/legacy-package-management

From version 7, we will no longer ship the legacy package management commands (such as lerna bootstrap, lerna add and lerna link) by default with lerna, and instead make them available as an add-on via a separate package (name TBD).

This new package can be thought of as being in maintenance mode only - no new features will be considered for legacy package management concerns (such as lerna bootstrap, lerna add and lerna link), and we will only look to merge critical patches and security updates.


## 常用命令
### lerna create < name > [loc]
创建一个包，name是包名，loc 位置可选

根目录的package.json 
```
"workspaces": [
    "packages/*",
    "packages/@luo0613/*"
],
```
  
创建一个包gpnote默认放在 workspaces[0]所指位置
```
lerna create card4 
```

创建一个包mynote指定放在 packages/@luo0613文件夹下，注意必须在workspaces先写入packages/@luo0613，看上面
```
lerna create mynote packages/@luo0613
```

### lerna list
列出所有的包，如果与你文夹里面的不符，进入那个包运行yarn init -y解决
```
lerna-gp git:(master) ✗ lerna list
lerna notice cli v5.1.2
card1
card2
lerna success found 3 packages
```

### lerna import
导入本地已经存在的包: learna import <your pkg path>

### lerna run
lerna run < script > -- [..args] # 运行所有包里面的有这个script的命令
```
lerna run --scope card1 hello

--scope <glob>
Include only packages with names matching the given glob.
```
上述命令就表示执行card1包里script中的hello命令


### lerna exec
运行任意命令在每个包
```
$ lerna exec -- < command > [..args] # runs the command in all packages
$ lerna exec -- rm -rf ./node_modules
$ lerna exec -- protractor conf.js
lerna exec --scope my-component -- ls -la
```

### lerna clean
删除所有包的node_modules目录

### lerna changed
列出下次发版lerna publish 要更新的包。

原理：需要先git add,git commit 提交。 
然后内部会运行git diff --name-only v版本号，搜集改动的包，就是下次要发布的。
并不是网上人说的所有包都是同一个版全发布。


### lerna publish
会打tag，上传git,上传npm。 如果你的包名是带scope的例如："name": "@luo0613/card4", 那需要在packages.json添加
```
 "publishConfig": {
    "access": "public"
  },
```

```
lerna publish 
lerna info current version 0.1.4
#这句意思是查找从v0.1.4到现在改动过的包
lerna info Looking for changed packages since v0.1.4 
```

<br>

## 参考资料
- https://lerna.js.org/docs/getting-started
- https://lerna.js.org/docs/api-reference/commands