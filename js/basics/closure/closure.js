
function foo() {
    var myName = "luoji3"
    const test2 = 2
    var innerBar = {
        getName: function() {
            return myName
        },
        setName: function(newName) {
            myName = newName
        }
    }
    return innerBar
}
var bar = foo()
bar.setName("luoji1")
bar.getName()
console.log(bar.getName())