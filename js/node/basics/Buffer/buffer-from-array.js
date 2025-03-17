
const buffer = Buffer.from([1, 2, 3, 4]);
const buffer2 = Buffer.from(buffer.buffer, buffer.offset, buffer.length);
console.log(buffer == buffer2); //false，两个Buffer是不同对象
buffer[0] = 5; //修改原始的buffer
console.log(buffer2.toJSON()); //buffer2跟着变化，说明两者指向同一内存