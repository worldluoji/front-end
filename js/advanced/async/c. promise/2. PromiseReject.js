/**
 * promise解决了“回调地狱”问题
 * promise的状态转换以及通过then获取内容,
 * promise有三种状态：pending(等待态)，fulfiled(成功态)，rejected(失败态)；状态一旦改变，就不会再变
 */
const promise = new Promise((resolve, reject) => {
    setTimeout(function () {
        reject(new Error(4))
    }, 500)
})

promise
    // .then(function (result) {
    //     console.log(result)
    // })
    .catch(function (err) {
        return 1
    })


setTimeout(() => {
    console.log(promise);
}, 800)