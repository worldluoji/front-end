# throttle-debounce
throttle-debounce 包，它提供了 throttle 和 debounce 两个函数：throttle 的含义是节流，
debounce 的含义是防抖动，通过它们可以限制函数的执行频率，避免短时间内函数多次执行造成性能问题，当前包版本为 2.0.1，周下载量为 6.3 万。

## 用法
首选需要介绍一下 throttle 和 debounce ，它们都可以用于 函数节流 从而提升性能，但它们还是存在一些不同：

debounce：去抖动。策略是当事件被触发时，设定一个周期延迟执行动作，若期间又被触发，则重新设定周期，直到周期结束，执行动作。

throttle：节流的策略是，固定周期内，只执行一次动作，若有新事件触发，不执行。周期结束后，又有事件触发，开始新的周期。

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