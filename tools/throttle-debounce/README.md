# throttle-debounce
throttle-debounce 包，它提供了 throttle 和 debounce 两个函数：throttle 的含义是节流，
debounce 的含义是防抖动，通过它们可以限制函数的执行频率，避免短时间内函数多次执行造成性能问题，当前包版本为 2.0.1，周下载量为 6.3 万。

## 用法
首选需要介绍一下 throttle 和 debounce ，它们都可以用于 函数节流 从而提升性能，但它们还是存在一些不同：

debounce：将短时间内多次触发的事件合并成一次事件响应函数执行（往往是在第一次事件或者在最后一次事件触发时执行），
即该段时间内仅一次真正执行事件响应函数。

throttle：假如在短时间内同一事件多次触发，那么每隔一段更小的时间间隔就会执行事件响应函数，
即该段时间内可能多次执行事件响应函数。

## 源码
```
function throttle(delay, callback) {
  let timeoutID;
  let lastExec = 0;

  function wrapper() {
    const self = this;
    const elapsed = Number(new Date()) - lastExec;
    const args = arguments;

    function exec() {
      lastExec = Number(new Date());
      callback.apply(self, args);
    }

    clearTimeout(timeoutID);

    if (elapsed > delay) {
      exec();
    } else {
      timeoutID = setTimeout(exec, delay - elapsed);
    }
  }

  return wrapper;
}
```

debounce:
```
function debounce(delay, callback) {
  let timeoutID;

  function wrapper() {
    const self = this;
    const args = arguments;

    function exec() {
      callback.apply(self, args);
    }

    clearTimeout(timeoutID);

    timeoutID = setTimeout(exec, delay);
  }

  return wrapper;
}
```