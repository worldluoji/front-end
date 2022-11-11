# Element Factory

### 使用

1. 运行命令
```
cd workspace
vite
```
如果没有安装vite，则需要
```
npm install -g vite
```

2. 打开 workspace/card.tpl 修改文件查看效果

<br>

### 解说

目标是解决一个问题，可被序列化的文件格式转成最终代码。由于可被序列化的格式才好存储和可视化编辑，所以必须做到这一步。

可以看到 workspace/card.tpl 是个纯 xml 虽然符合 vue3 的文件格式，但他可以被序列化存储，且很容易从 xml 变成 json 供可视化界面修改。

<br>

### 大致项目逻辑：
- 使用自己开发的plugin插件，将*.tpl文件，编译成Vue可以识别的组件代码
- 使用@vue/compiler-sfc中的parse方法，将*.tpl转换成ast
- 使用自己开发的Generator，将ast中依赖的组件抽取出来，生成import Card from './elements/card.vue'代码
- 将Generator生成的代码，与*.tpl中的模板再次组合，生成Vue的SFC代码，再用parse方法再解析一次，即为newParsed
- 将newParsed.descriptor交给@vue/compiler-sfc中的compileScript方法，编译成Vue可以执行的代码

项目构建后，/workspace/main.js中的代码
```
import Delegator from './card.tpl'
import data from './data/data.mjs'
const app = createApp(Delegator, data.data.result[0])
```
Delegator会经由步骤一，编译成可执行的代码。

实现的效果

开发人员只要编写card.tpl，就可以自动构建出想要的页面布局
只要有合适的插件，card.tpl也可以替换成JSON格式

<br>

### 优缺点分析

优点

- 可以快速、批量搭建页面，减少开发人力
- 能在此基础上进一步开发可由用户（如运营人员）自己配置和生成页面的功能

缺点

- 由于代码都是自动生成，能实现的功能，会强烈依赖于各个组件已实现的逻辑
- 如果组件之间的交互设计不佳，会造成很多不可预期，且难以修改的问题
- 如果遇到定制化需求，已有组件又不好迁移到其他项目，会需要重复开发UI相同，但功能定制的组件