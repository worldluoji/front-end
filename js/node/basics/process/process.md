# process and os
在 Node.js 中，process 对象提供有关当前 Node.js 进程的信息和控制。
而 os 模块提供了与操作系统相关的实用方法和属性。一个是当前进程相关内容，
一个是一些系统操作级的 API。这俩货一个比较依赖 V8，一个比较依赖 libuv.

<br>

## process
process 是Node中的线程容器，每一个Node应用会有一个process，开发者可以通过process对象控制和获取当前Node的进程。
```
Note
每一个npm run start起的项目都是一个Node应用，都会拥有一个process对象。
```

<br>

## process event
process的Event其实是Node中的EventEmitter的一个实例化对象, Node中的EventEmitter，Node的event基本都遵循EventEmitter格式。

### 1. exit
有两种情况会触发exit事件，如下：
- 当显示调用process.exit()时
- 当Node的evnet loop没有任务安排了

在exit事件中不能阻止evnet loop退出，一旦所有的exit回调全部执行完，对应的Node process也会终止。

exit的回调方法必须是同步方法。Node的进程在exit事件执行后立即退出，从而导致了任何人在evnet loop中排队的额外工作被放弃。

[demo](./process_event.js)

### 2. beforeExit
当Node执行完（清空）event loop并且没有其他事件安排时被触发。
通常当Node进程在没有事件安排时会退出，但是如果注册了一个beforExit事件监听者可以进行异步回调，能使得Node的进程继续。(优雅退出可以在这里做工作)

### 3. disconnect 事件
如果Node的process是通过IPC渠道(Child Process or Cluster)产生的,在IPC渠道被关闭时会触发disconnect事件

### unhandledRejection and uncaughtException
这是 Node.js 中很重要的两个错误处理事件。虽然我经常不大建议大家使用，但毕竟万事无绝对嘛。
```
业界有一种“let it crash”思想，很多编程语言中，都会将其奉行为设计哲学，其源于 Erlang/Elixir。 Let it crash 是指工程师不必过分担心未知的错误，而去进行面面俱到的防御性编码。

在未知状态下，通过这个事件捕获 uncaughtException，从而让进程继续执行，很有可能让进程跑在一个不可预估的状态中。还不如直接让它挂掉，让守护进程重启一个。

不过这仅代表个人观点。就跟诡秘一样，虽然刀了一点，但是受污染的超凡者只能是被毁灭，否则它处于一个失控状态，可能带来更严重的后果。——“原来,原来我已经变成了怪物……”“我们既是守护者，也是一群时刻对抗着疯狂与失控的可怜虫。”
```
example:
```
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

process.on('uncaughtException', (err, type) => {
  console.log('Uncaught Exception thrown');
  console.log(err.stack, type);
});

Promise.reject(new Error('Explosion!'));
```

<br>

##  process.argv
process的argv属性是一个在当前进程中，在命令行中输入的命令的数组，当开发cli或者运用cli时，执行的命令行代码，
将会把输入的命令通过process.argv属性传给node，供Node调用执行。
```
//在npm项目中，执行`npm run start`命令
//process.argv会受到形如如下的格式
0: /usr/nodejs/node
1: /usr/nodejs/node_modules/npm/core/index.js
2: run
3: start
```
<br>

## process.env
该属性返回一个包含用户环境变量的对象。

Node.js 的环境变量能力来自 libuv。libuv 有一系列 API 叫 uv_os_getenv()、uv_os_setenv()、uv_os_unsetenv()。
明明系统直接有获取环境变量的 API，为什么 libuv 要自己包一层呢？因为它要跨平台。

在 UNIX 类的系统（包括 macOS）中，获取环境变量的 API 是 getenv()；在 Windows 下，该 API 则是 GetEnvironmentVariableW()。

<br>

## reference
https://nodejs.org/api/process.html#process