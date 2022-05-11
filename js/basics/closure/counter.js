function createCounter() {
    let val = 0;
    return {
        increment() { val++ },
        getVal() { return val }
    }
}

let counter = createCounter();
counter.increment();
console.log(counter.getVal()); // 1
counter.increment();
console.log(counter.getVal()); // 2


// Pseudo code to explain the concept
// server.on(function handler(req, res) {
//     loadData(req.id).then(function(data) {
//         // the `res` has been closed over and is available
//         res.send(data);
//     })
// });