# npm vs yarn
## Yarn是什么？
“Yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具 ，
正如官方文档中写的，Yarn 是为了弥补 npm 的一些缺陷而出现的。”这句话让我想起了使用npm时的坑了：

- npm install的时候巨慢。特别是新的项目拉下来要等半天，删除node_modules，重新install的时候依旧如此。
同一个项目，安装的时候无法保持一致性。
- 由于package.json文件中版本号的特点，下面三个版本号在安装的时候代表不同的含义。
"5.0.3","~5.0.3","^5.0.3";
“5.0.3”表示安装指定的5.0.3版本，“～5.0.3”表示安装5.0.X中最新的版本，“^5.0.3”表示安装5.X.X中最新的版本。
这就麻烦了，常常会出现同一个项目，有的同事是OK的，有的同事会由于安装的版本不一致出现bug。
- 安装的时候，包会在同一时间下载和安装，中途某个时候，一个包抛出了一个错误，但是npm会继续下载和安装包。
因为npm会把所有的日志输出到终端，有关错误包的错误信息就会在一大堆npm打印的警告中丢失掉，并且你甚至永远不会注意到实际发生的错误。

## Yarn的优点？
- 1) 速度快 。速度快主要来自以下两个方面：
- 2) 并行安装：无论 npm 还是 Yarn 在执行包的安装时，都会执行一系列任务。
npm 是按照队列执行每个 package，也就是说必须要等到当前 package 安装完成之后，才能继续后面的安装。
而 Yarn 是同步执行所有任务，提高了性能。
- 3) 离线模式：如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了。
- 4) 安装版本统一：为了防止拉取到不同的版本，Yarn 有一个锁定文件 (lock file) 记录了被确切安装上的模块的版本号。
  - 每次只要新增了一个模块，Yarn 就会创建（或更新）yarn.lock 这个文件。这么做就保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本。
  - npm 其实也有办法实现处处使用相同版本的 packages，但需要开发者执行 npm shrinkwrap 命令。
  这个命令将会生成一个锁定文件，在执行 npm install 的时候，该锁定文件会先被读取，和 Yarn 读取 yarn.lock 文件一个道理。
  - npm 和 Yarn 两者的不同之处在于，Yarn 默认会生成这样的锁定文件，
  而 npm 要通过 shrinkwrap 命令生成 npm-shrinkwrap.json 文件，只有当这个文件存在的时候，packages 版本信息才会被记录和更新。
- 5) 更简洁的输出：npm 的输出信息比较冗长。在执行 npm install <package> 的时候，
命令行里会不断地打印出所有被安装上的依赖。
相比之下，Yarn 简洁太多：默认情况下，结合了 emoji直观且直接地打印出必要的信息，
也提供了一些命令供开发者查询额外的安装信息。
- 6) 多注册来源处理：所有的依赖包，不管他被不同的库间接关联引用多少次，安装这个包时，
只会从一个注册来源去装，要么是 npm 要么是 bower, 防止出现混乱不一致。
- 7) 更好的语义化： yarn改变了一些npm命令的名称，比如 yarn add/remove，感觉上比 npm 原本的 install/uninstall 要更清晰。
<br>
Yarn和npm命令对比:
```
npm	                            yarn
npm install	                    yarn
npm install react --save	      yarn add react
npm uninstall react --save	    yarn remove react
npm install react --save-dev	  yarn add react --dev
npm update --save	              yarn upgrade
npm list undici                 yarn why undici      查看undici的依赖树 
```

npm的未来：npm5.0。有了yarn的压力之后，npm做了一些类似的改进：
- 默认新增了类似yarn.lock的 package-lock.json；
- git 依赖支持优化：这个特性在需要安装大量内部项目（例如在没有自建源的内网开发），或需要使用某些依赖的未发布版本时很有用。在这之前可能需要使用指定 commit_id 的方式来控制版本。
- 文件依赖优化：在之前的版本，如果将本地目录作为依赖来安装，将会把文件目录作为副本拷贝到 node_modules 中。而在 npm5 中，将改为使用创建 symlinks 的方式来实现（使用本地 tarball 包除外），而不再执行文件拷贝。这将会提升安装速度。目前yarn还不支持。

npx是npm5.2之后发布的一个命令, npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装

在最新的npm版本的命令中 --save 命令已经无效，意思是，加不加它都会在package-lock.json生成依赖项

<br>

## 总结
在npm5.0之前，yarn的优势特别明显。但是在npm5.0之后，通过以上一系列对比，我们可以看到:
npm5 在速度和使用上确实有了很大提升，值得尝试，不过还没有超过yarn。

综上我个人的建议是:
如果你已经在个人项目上使用 yarn，并且没有遇到更多问题，目前完全可以继续使用。
但如果有兼容 npm 的场景，或者身处在使用 npm，cnpm，tnpm 的团队，以及还没有切到 yarn 的项目，
那现在就可以试一试 npm5 了。

## 补充：什么是npx?
npx是执行Node软件包的工具，它从 npm5.2版本开始，就与npm捆绑在一起。

npx的作用：
- 1.默认情况下，首先检查路径中是否存在要执行的包（即在项目中）；
- 2.如果存在，它将执行；
- 3.若不存在，意味着尚未安装该软件包，npx将安装其最新版本，然后执行它；

如果运行 npx some-package --no-install，意味着告诉npx ，它应该仅执行。some-package，如果之前未安装，则不安装。


## npm i 报错 npm ERR! code CERT_HAS_EXPIRED npm ERR! errno CERT_HAS_EXPIRED
近期有小伙伴遇到这个报错，原因是npm淘宝的镜像https过期了，取消掉严格https验证就行，方法如下:
```
1.npm ERR! code CERT_HAS_EXPIRED
2.npm ERR! errno CERT_HAS_EXPIRED
```
解决办法:
```
npm cache clean --force
npm config set strict-ssl false
npm install
```