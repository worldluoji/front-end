const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve, reject) => setTimeout(() => {
    console.log(1);
    reject('slow');
}, 300));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'quick'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(`${value} is faster`));

// 虽然一个Promise完成就返回，但是其它的promise会继续执行