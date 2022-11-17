const func = async () => {
    console.log(123321)
}
  
Promise.resolve().finally();
// finally() 方法返回一个 Promise。在 promise 结束时，无论结果是 fulfilled 或者是 rejected，都会执行指定的回调函数。