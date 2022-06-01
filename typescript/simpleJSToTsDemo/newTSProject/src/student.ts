
declare function require(path: string): any;

const greeter = require('./greeter.js')


class Student {
    fullName: string
    constructor(firstName, middleInitial, lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName
    }
}

const student = new Student("Jane", "M.", "User")


console.log(greeter(student))