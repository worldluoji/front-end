const obj = {
    age: 18
}

function foo() {
    console.log(this.age);
}

Function.prototype.bindPolyfill = function(obj) {
    return (...args) => this.apply(obj, args);
}

const newFoo2 = foo.bindPolyfill(obj);
newFoo2();

if (typeof window === 'object'){
    window.name = 'luke';
} else {
    global.name = 'luke';
}
let o = {
    name: 'lucy',
    say: function(year, place){
        console.log(this.name + ' is ' + year + ' born from ' + place);
    }
};

let say = o.say;
setTimeout(function() {
    say.apply(o, ['1996', 'China']);
}, 0); //lucy is 1996 born from China, this改变指向了obj

say('1996', 'China'); // luke is 1996 born from China,this指向window，说明apply只是临时改变一次this指向