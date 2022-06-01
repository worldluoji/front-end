
const greeter = require('./greeter.js')


class Student {
    constructor(firstName, middleInitial, lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

const student = new Student("Jane", "M.", "User")


console.log(greeter(student))