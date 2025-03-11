
let m = new Map();
m.set(1, '2');
m.set(2, '3');
m.set(3, '4');

for (let item of m.entries()) {
    console.log(item[0], item[1]);
}

for (let val of m.values()) {
    console.log(val);
}

for (let key of m.keys()) {
    console.log(key);
}

if (m.has(1)) {
    console.log(`get ${m.get(1)}`);
}