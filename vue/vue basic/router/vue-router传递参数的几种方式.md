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
使用name进行路由有以下优点：
- 没有硬编码的 URL
- params 的自动编码/解码。
- 防止你在 url 中出现打字错误。
- 绕过路径排序（如显示一个）
```
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User
  }
]
```
To link to a named route, you can pass an object to the router-link component's to prop:
```
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  User
</router-link>
```
```
router.push({ name: 'user', params: { username: 'erina' } })
```
In both cases, the router will navigate to the path /user/erina.

值得注意的是，在新版本的vue-router中，使用path则无法再使用params的传参方式，原因如下: 
https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22

it's an anti-pattern in routing for many reasons, one of them being reloading the page lose the params

大致是说，通过params传参，是“反模式”的，比如说刷新页面后就会丢失param.

也给出了四种解决建议：

1. Putting the data in a store like pinia: this is relevant if the data is used across multiple pages
即使用pinia来传递参数

2. Move the data to an actual param by defining it on the route's path or pass it as query params: 
this is relevant if you have small pieces of data that can fit in the URL and should be preserved when reloading the page.
通过路径参数或者query来传递参数

3. Pass the data as state to save it to the History API state:
History模式可以使用History state API传递参数
```
<router-link :to="{ name: 'somewhere', state: { myData } }">...</router-link>
<button
  @click="$router.push({ name: 'somewhere', state: { myData } })"
>...</button>
```
Note state is subject to History state limitations.

4. Pass it as a new property to to.meta during navigation guards:
传递
```
router.beforeEach(async to => {
  if (to.meta.shouldFetch) {
    // name `data` whatever you want
    to.meta.data = await fetchSomething()
  }
})
```
https://router.vuejs.org/guide/advanced/meta.html

<br>

## 声明式的导航
router-link标签跳转传参 ：
```
<router-link :to="{name:'home', params:{id:1}}">跳转</router-link>
```