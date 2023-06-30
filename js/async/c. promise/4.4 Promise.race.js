const promise1 = new Promise((resolve, reject) => {
    setTimeout((r => {
        console.log(1);
        resolve('one');
    }), 500);
});
  
const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
    console.log(value);
    // Both resolve, but promise2 is faster
});