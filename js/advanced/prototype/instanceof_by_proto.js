function checkIfInstanceOf (obj, classFunction) {
    if (obj === undefined || obj === null || classFunction === null || classFunction === undefined) {
        return false;
    }

    let p = Object.getPrototypeOf(obj)
    while(p) {
        if (p === classFunction.prototype) {
            return true;
        } else {
            p = Object.getPrototypeOf(p)
        }
    }
    return false;
};

console.log(checkIfInstanceOf(new Date(), Date));

class Animal {

}

class Cat extends Animal {

}

console.log(checkIfInstanceOf(new Cat(), Animal));