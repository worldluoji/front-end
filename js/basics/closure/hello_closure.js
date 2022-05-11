function outerFunction(arg) {
    let variableInOuterFunction = arg;
    return function() {
        console.log(variableInOuterFunction);
    }
}

const innerFunction = outerFunction("hello closure!");

// Note the outerFunction has returned
innerFunction(); // logs hello closure!

// The variables in the outer function have been closed by (or bound in) the inner function. 
// Hence the term closure. The concept in itself is simple enough and pretty intuitive.


