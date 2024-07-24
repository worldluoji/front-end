# React Native 与原生的通信方式
native 向 JavaScript 传递数据的方式分成以下三种：
- Callback：由 JavaScript 主导触发，Native 进行回传，一次触发只能传递一次；
- Promise：由 JavaScript 主导触发，Native 进行回传，一次触发只能传递一次。Promise 是 ES6 的新特性，类似 RXJava 的链式调用。Promise 有三种状态，分别是 pending (进行时)、resolve (已完成)、reject (已失败)；
- 发送事件：由 Native 主导触发，可传递多次，类似 Android 的广播和 iOS 的通知中心。

Callback 在[Android](./android/2.%20data%20tansfer.md)、[IOS](./ios/2.%20data%20transfer.md)的例子中已经出现过了，我们通过 callback.invoke(xx) 就可以将数据回传给 JavaScript，使用起来比较简单，就不再赘述了。


## Promise示例
首先，JavaScript 端调用客户端定义的 SystemPropsModule 的 getSystemModel 来获取手机的设备类型，获取结果的方式使用 Promise 方式 （then… catch…）：
```javascript
NativeModules.SystemPropsModule.getSystemModel().then(result=> {
  console.log(result);
}).catch(error=> {
  console.log(error);
});
```
然后，Native 端定义 SystemPropsModule，实现 getSystemModel 方法，内部使用 promise 获取手机的 model 数据。使用 promise.reolve(xx) 为成功，promise.reject(xx) 为失败：
```java
SystemPropsModule：
...
@ReactMethod
public void getSystemModel(Promise promise) {
    // 回传成功，使用 resolve
    promise.resolve(Build.MODEL);
}
...
```

## 发送事件示例
首先，JavaScript 端使用 EventEmitterManager 来注册 Native 的事件监听。通过 NativeModules 获取 EventEmitterManager，随后使用它构建出 NativeEventEmitter，最后通过 NativeEventEmitter 注册监听：
```javascript
componentWillMount(){
   // 拿到原生模块
   var eventEmitterManager = NativeModules.EventEmitterManager;
   const nativeEventEmitter = new NativeEventEmitter(eventEmitterManager);
   const eventEmitterManagerEvent = EventEmitterManager.EventEmitterManagerEvent;
   // 监听 Native 发送的通知
   this.listener = nativeEventEmitter.addListener(eventEmitterManagerEvent, (data) => 
       console.log("Receive native event: " + data);
   );
}

componentWillUnmount(){
   // 移除监听
   this.listener.remove();
}
```
在 Native 端的使用则很简单。我们获取 RCTDeviceEventEmitter 这个 JSModule，使用 emit 方法就可以向 JavaScript 发送事件了：
```java
reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
  .emit("msg", "say hello");
```