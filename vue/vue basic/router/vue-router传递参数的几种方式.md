# vue-router传递参数的几种方式
- 编程式的导航 router.push
- 声明式的导航 `<router-link>`

<br>

## 编程式的导航 router.push
```
// query传参 参数会在链接后面显示
this.$router.push({
    path: "/home",
    query: { id: 1 },
});
 
// params传参 参数不会显示在链接后面
this.$router.push({
    name: "/home",
    params: { id: 1 },
});
```
值得注意的是，在新版本的vue-router中，params传参方式已经废弃了，原因如下: 
https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22

<br>

## 声明式的导航
router-link标签跳转传参 ：
```
<router-link :to="{name:'home',params:{id:1}}">跳转</router-link>
```