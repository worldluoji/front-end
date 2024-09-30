# NodeJS安装和国内镜像源配置

## 1. 安装
nodejs官网下载安装包安装即可
node -v查看是否安装成功，如果出现版本号则说明安装成功

## 2. 国内镜像配置
配置 npm 使用阿里云的镜像源（如淘宝镜像）可以通过以下步骤完成：

(1). 打开终端或命令提示符。

(2). 输入以下命令来设置 npm 的 registry 为阿里云镜像源：

   ```bash
   npm config set registry https://registry.npmmirror.com
   ```

   或者，如果你想永久地设置这个配置（即全局设置），可以使用 `--global` 标志：

   ```bash
   npm config set registry https://registry.npmmirror.com --global
   ```

(3). 检查你的配置是否已正确设置，可以使用以下命令：

   ```bash
   npm config get registry
   ```

   如果一切正常，你应该会看到输出的 URL 为 `https://registry.npmmirror.com`。

(4). 为了确保 npm 缓存也被清理，可以运行：

   ```bash
   npm cache clean --force
   ```

   这样可以确保你在接下来的 npm 操作中使用的是阿里云镜像源中的数据。

请注意，使用镜像源可能会有一些延迟或同步问题，因此某些包可能不会立即更新到最新版本。这是镜像源与官方源之间数据同步所固有的问题。

如果你使用的是 yarn，也可以通过类似的方式来配置：

```bash
yarn config set registry https://registry.npmmirror.com
```

或者全局设置：

```bash
yarn config set registry https://registry.npmmirror.com --global
```

检查配置：

```bash
yarn config get registry
```

这些命令应该在你的开发环境中运行，以确保你的项目和全局 npm/yarn 配置都指向了正确的镜像源。


## 3. nodejs使用npm来管理包，类似于python的pip工具
npm常用命令：
```
npm install xxx
npm uninsll xxx
npm list
npm install -g xxx   
npm info xxx 查看安装包有哪些版本
npm view @vue/cli versions 查看远程镜像仓库@vue/cli所有的版本
npm ls @vue/cli -g 查看本地@vue-cli的版本
```
-g表示全局安装， 不-g仅仅在对应的nodejs工程下安装。
一般工程都要先执行npm install命令，后续就可以安装自己需要的模块。

<br>

也可以使用yarn进行包管理：
```
npm install --g yarn
yarn --version
yarn config set registry https://registry.npm.taobao.org
```
Yarn和npm命令对比:
```
npm	                            yarn
npm install	                    yarn
npm install react --save	    yarn add react
npm uninstall react --save	    yarn remove react
npm install react --save-dev	yarn add react --dev
npm update --save	            yarn upgrade
```

## 如何管理Node版本
建议使用fnm
```
brew install fnm
```