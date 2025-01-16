# vue3.4中v-bind的三种写法
- `<div v-bind:title="title">` 全写
- `<div :title="title">` 简写v-bind
- `<div :title>` vue3.4中引入的新的写法，省略同名参数。

这三种写法的作用都是一样的，将title变量绑定到div标签的title属性上。

在transform阶段处理vue内置的v-for、v-model等指令时会去执行一堆transform转换函数，其中有个transformElement转换函数中会去执行buildProps函数。

buildProps函数会去遍历当前node节点的所有props数组，此时的props中还是存的是v-bind指令，每个prop中存的是v-bind指令绑定的属性名和属性值。

在for循环遍历node节点的所有props时，每次都会执行transformBind转换函数。如果我们在写v-bind时将值也给省略了，此时v-bind指令绑定的属性值就是undefined。这时就需要将省略的属性值补回来，补回来的属性值的变量名称和属性名是一样的。
