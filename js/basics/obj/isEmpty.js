const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

console.log(isEmpty({}));
console.log(isEmpty({'a': 1, 'b': 2}));