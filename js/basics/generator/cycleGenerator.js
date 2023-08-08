/** leetcode 2757
 * @param {Array<number>} arr
 * @param {number} startIndex
 * @yields {number}
 * function*表示这是一个generator，可以通过yield返回数据
 */
 const cycleGenerator = function* (arr, startIndex) {
    let currentIndex = startIndex;
    const n = arr.length;
    // 返回值 param是下个 next调用的入参， 比如下面例子中，这里 param = 1
    let param = yield arr[currentIndex];
    while(true) {
        if (!param) {
            param = yield arr[currentIndex];
            continue;
        }
        currentIndex += param;
        while (currentIndex < 0) {
            currentIndex += n;
        }
        if (currentIndex >= n) {
            currentIndex = currentIndex % n;
        }
        param = yield arr[currentIndex];
    }
};


const gen = cycleGenerator([1,2,3,4,5], 0);
console.log(gen.next().value)  // 1
console.log(gen.next(1).value) // 2
console.log(gen.next(2).value) // 4
console.log(gen.next(6).value) // 5
 