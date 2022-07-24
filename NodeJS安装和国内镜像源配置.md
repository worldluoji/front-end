# NodeJS安装和国内镜像源配置

## 1. 安装
nodejs官网下载安装包安装即可
node -v查看是否安装成功，如果出现版本号则说明安装成功

## 2. 国内镜像配置
为了速度快，国内可以使用淘宝的npm镜像，称为cnpm：
```
http://npmmirror.coms
```
cnpm如果报错：cnpm : 无法加载文件 C:\Users\12345\AppData\Roaming\npm\cnpm.ps1，因为在此系统上禁止 运行脚本。
则用管理员身份打开windows powershell, 输入命令 set-ExecutionPolicy RemoteSigned (Y 确认) 更改执行策略。


## 3. nodejs使用npm来管理包，类似于python的pip工具
npm常用命令：
```
npm install xxx
npm uninsll xxx
npm list
npm install -g xxx   
npm info xxx 查看安装包有哪些版本
npm view @vue/cli versions 查看@vue/cli所有的版本
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

接下来以创建一个vue项目为例。

## 4. npm install -g @vue/cli 
- vue 查看是否安装好
- vue -v 查看版本信息是否正确
- npm uninstall -g vue-cli 卸载
<br>
CLI (@vue/cli)是一个全局安装的npm包，提供了终端里的vue命令。
它可以通过 vue create 快速搭建一个新项目，或者直接通过 vue serve 构建新想法的原型。
你也可以通过 vue ui 通过一套图形化界面管理你的所有项目。

## 5. 使用vue-cli创建项目
```
vue create vue-dmeo
�  Successfully created project vue-demo.
�  Get started with the following commands:
 $ cd vue-demo
 $ npm run serve
```
创建好的项目，main.js是入口文件，里面又调用了App.vue, App.vue实际就是一个
单文件组件。