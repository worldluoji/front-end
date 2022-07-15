# pinia
Pinia是一个全新的Vue状态管理库，是Vuex的代替者:

- Vue2 和 Vue3 都能支持
- 抛弃传统的 Mutation ，只有 state, getter 和 action ，简化状态管理库
- 不需要嵌套模块，符合 Vue3 的 Composition api，让代码扁平化
- TypeScript支持
- 代码简洁，很好的代码自动分割

## 安装和使用pinia
npm i pinia

yarn add pinia

-> main.ts

-> store/index.ts

## 说明
### 多条数据修改
通过基础数据修改方式去修改多条数据也是可行的，但是在 pinia 官网中，已经明确表示$patch 的方式是经过优化的，会加快修改速度，对性能有很大好处，所以在进行多条数据修改的时候，更推荐使用 $patch。

## 参考文档
- https://juejin.cn/post/7078281612013764616
- https://pinia.web3doc.top/introduction.html