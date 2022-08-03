# lerna

Lerna是一个工具，它优化了使用git和npm管理多包存储库的工作流。

vue,babel,react等都在用。

## lerna工作的两种模式
### Fixed/Locked mode (default)
vue,babel都是用这种，在publish的时候,会在lerna.json文件里面"version": "0.1.5",,依据这个号，进行增加，只选择一次，其他有改动的包自动更新版本号。

### Independent mode
lerna init --independent初始化项目。 lerna.json文件里面"version": "independent",

每次publish时，您都将得到一个提示符，提示每个已更改的包，以指定是补丁、次要更改、主要更改还是自定义更改。


## 使用lerna
```
    $ npm install lerna -g
    $ lerna -v
    $ lerna init # 用的默认的固定模式，vue babel等都是这个
    
    $ cd packages
    $ mkdir card1 card2 card3
    ...
    # 分别进入三个目录初始化成包
    $ cd card1
    $ npm init -y 
    $ cd ../card2
    $ npm init -y
    $ cd ../card3
    $ npm init -y
```
这样，card1、card2、card3就是三个独立的项目。默认是npm, 而且每个子package都有自己的node_modules


## 配置yarn
通过如下设置后，只有顶层有一个node_modules, 且使用yarn

修改顶层 package.json and lerna.json

package.json 文件加入
```
"private": true,
```

lerna.json 文件加入
```
"npmClient": "yarn",
```

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

## git和npm配置
Set up git + npm
```
✗ git remote add origin <your git repository>
```

查看是否登录
```
✗ npm whoami
```

没有则登录 
```
npm login 
# 输入username password 
Logged in as <your npm username> on https://registry.npmjs.org/. # succeed
```
  
## Lerna Script
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

### lerna add
增加本地或者远程package做为当前项目packages里面的依赖:
```
lerna add [@version] [--dev] [--exact]
- --dev devDependencies 替代 dependencies
- --exact 安装准确版本，就是安装的包版本前面不带^, Eg: "^2.20.0" ➜ "2.20.0"
```

```
# Adds the module-1 package to the packages in the 'prefix-' prefixed folders
lerna add module-1 packages/prefix-*

# Install module-1 to module-2
lerna add module-1 --scope=module-2

# Install module-1 to module-2 in devDependencies
lerna add module-1 --scope=module-2 --dev

# Install module-1 in all modules except module-1
lerna add module-1

# Install babel-core in all modules
lerna add babel-core
lerna bootstrap
```
默认是npm i,如果我们指定了yarn和workspace模式，run yarn install,会把所有包的依赖安装到根node_modules.

### lerna list
列出所有的包，如果与你文夹里面的不符，进入那个包运行yarn init -y解决

```
lerna-gp git:(master) ✗ lerna list
lerna notice cli v5.1.2
card1
card2
card3
lerna success found 3 packages
```

### lerna import
导入本地已经存在的包: learna import <your pkg path>

### lerna run
```
lerna run < script > -- [..args] # 运行所有包里面的有这个script的命令
$ lerna run --scope my-component test
```

### lerna exec
运行任意命令在每个包
```
$ lerna exec -- < command > [..args] # runs the command in all packages
$ lerna exec -- rm -rf ./node_modules
$ lerna exec -- protractor conf.js
lerna exec --scope my-component -- ls -la
```

### lerna link
项目包建立软链，类似npm link

### lerna clean
删除所有包的node_modules目录


### lerna changed
列出下次发版lerna publish 要更新的包。

原理：需要先git add,git commit 提交。 
然后内部会运行git diff --name-only v版本号，搜集改动的包，就是下次要发布的。
并不是网上人说的所有包都是同一个版全发布。
```
lerna notice cli v5.1.2
lerna info Assuming all packages changed
card1
card2
card3
lerna success found 3 packages ready to publish
```


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


## 参考资料
- read://https_juejin.cn/?url=https%3A%2F%2Fjuejin.cn%2Fpost%2F6844903856153821198
- https://lerna.js.org/docs/getting-started