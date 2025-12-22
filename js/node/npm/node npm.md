# node npm
如果是在多年前，的确 npm 就是 Node.js Package Manager，毕竟它是 Node.js 的伴生产物。
这不，Bower 退出历史了么，npm 顺便也扛过了前端包管理的大旗。

JavaScript Package Manager，这是其在 GitHub 组织、仓库的描述。
实际上现在它也不再局限于为 JavaScript 管理了。

在 npm 官网上，它还在继续为 npm 缩写进行挽尊，在左上角会随机一个缩写为 npm 的词组，Needy Poetic Mothers、Nothing Precedes Matter……

---

## Node.js 下的npm
对于 Node.js 来说，你包是通过什么东西安装，从什么途径安装，等等问题是不关心的，它只关心它眼下的内容——通过模块寻径规则能找到模块即可。
所以从原则上讲，Node.js 下的包与 npm 是分离的。

只不过 npm 恰好符合了 Node.js 包的规则，用它安装出来的目录能被 Node.js 所用而已。

对于现在的 Node.js 来说，package.json 里的字段用得都不对，比 npm 用到的少。Node.js 只会用到 package.json 中寻径相关的字段，
比如 main、各种映射字段、用于判断模块类型的 type 字段等，甚至都不会判断 name 是否匹配。
在 CommonJS 模式下，甚至没有 package.json 也不影响——只要你目录符合寻径算法就好了。


Node.js 中，如果在 require 或 import 模块时，其标识不以相对路径的点（.、..）为始，又不是一个内置模块，则认为其是从某个“包”内进行导入。
它会根据标识第一段（若有 @foo/bar 形式则以前两段）作为“包名”去当前模块所在路径的 node_modules 目录下寻找，
接下去就是之前提到的熟悉戏码了，若找不到，就去上级目录，仍以同样内容作为“包名”，在上级目录中的 node_modules 目录寻找。

在 Node.js 眼中，“包名”就是目录名，而非 package.json 中的 name，它以目录作为事实标准。
当然，在一切没有特殊的情况下，name 都是等同于对应目录名（包含 Scope 在内）的。


例子：npm3为例（npm 由 2 变 3，最大的目的是更好地服务前端包。npm 发展至今日，已经到达 npm 9 了，但它的安装目录结构仍是由 npm 3 演进而来的）

![npm包依赖示意图](../assets/npm包依赖示意图.awebp)

设我当前是 C@2 中的 index.js，它的目录则是 ./node_modules/A/node_modules/C/index.js，这个时候，它需要去 require('D')，那么寻径的流程为：
- 在当前目录的 node_modules 下找，即 ./node_modules/A/node_modules/C/node_modules/D，不存在；
- 去上级目录找，即 ./node_modules/A/node_modules/D，不存在；
- 去上级目录找，即 ./node_modules/D，存在。
  
于是就是 ./node_modules/D 了。我们在之前模块机制详解（中）提到过，这个寻径过程是 Node.js 通过 Module._resolveLookupPaths() 先生成后，再逐一遍历判断的。
这里显然判断到 ./node_modules/D 就命中了，退出遍历。

---

在判断命中的逻辑中，当我们到达 ./node_modules/D 的时候，由于没有指定具体哪个文件，则需要通过两种方式来判断命中文件：
- 读取当前目录的 package.json，从 main 字段获取映射，判断文件是否存在；
- 若无 package.json 或 main，则默认以 index 加各种后缀尝试。

---

## npm究竟是什么
其实 npm 有多重语义在，在不同语义中代表不同含义。就官方言论，一个 npm 分别可以是：
- Node.js 下的包管理器：始于 2009 年开源，帮助 JavaScript 开发者们可轻易分享包；
- npm 源站：Node.js、前端应用、移动端应用等的公共包代码合辑服务；
- npm CLI：用于安装、发布上述包的客户端。

同理可得，cnpm 也分为 cnpm 仓库和 cnpm CLI，而 cnpm 源站则是官方 npm 仓库的镜像源；
pnpm 则是 pnpm CLI。

而这些源站 API 都是相互兼容的，所以 cnpm CLI 可以从 npm 源站安装包，反之亦然。

cnpm 和 pnpm 则用的另一套方案——软链接, 这样节省了空间。