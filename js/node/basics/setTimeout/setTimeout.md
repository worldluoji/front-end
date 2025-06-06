# Node.js 中的 setTimeout()
setTimeout 并非 ECMAScript 规范，而是 Web API。之所以 Node.js、Deno 这些都有，
是因为这个 API 太深入人心了，不实现不舒服斯基。我们可以粗暴地理解为，ECMAScript 不定义穿插于事件循环不同 Tick 间的 API。

Node.js 的 setTimeout() 并不完全按规范来实现。
比如 setTimeout() 的返回值 id 在规范中，是一个整数（integer），而 Node.js 实际上返回的是一个对象。

还有一个就是网上常有的八股问题，如果嵌套层级大于 5，超时时间小于 4，则定义超时时间最小为 4——这个八股问题对 Node.js 同样不生效。

在 Node.js 中，setTimeout() 实际上是生成一个 Timeout 类的实例，在其内部控制定时器并触发回调，并且这个函数返回的也是该实例，并不是整数。
```js
function setTimeout(callback, after, arg1, arg2, arg3) {
  // ...

  const timeout = new Timeout(callback, after, args, false, true);
  insert(timeout, timeout._idleTimeout);

  return timeout;
}
```
第一个是 args 的生成。我们看到 Node.js 声明 setTimeout 的时候，其参数除了前两个外，后面还额外附加了 arg1、arg2 和 arg3。
这个是根据经验定的 3 个调用参数，基本上的情况下，调用 setTimeout() 回调函数的参数不会超过 3 个，于是这里显示声明 3 个，为生成 args 用。
```js
let i, args;
switch (arguments.length) {
  // fast cases
  case 1:
  case 2:
    break;
  case 3:
    args = [arg1];
    break;
  case 4:
    args = [arg1, arg2];
    break;
  default:
    args = [arg1, arg2, arg3];
    for (i = 5; i < arguments.length; i++) {
      // Extend array dynamically, makes .apply run much faster in v6.0.0
      args[i - 2] = arguments[i];
    }
    break;
}
```
如果刚好是 3 个参数以内的，在生成 args 的时候会直接声明一个定长数组，这比后续不断去扩展数组来得快。如果再超长了，那再去动态扩展 args 数组长度。
