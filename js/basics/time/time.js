
let time = new Date()
console.log(1, time, typeof time)
console.log(time.toLocaleDateString())
console.log(time.toLocaleTimeString())
console.log(time.toLocaleString())

time = Date.now()
console.log(2, time, typeof time)

time = new Date(time)
console.log(3, time, typeof time)

// 传统方法
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

console.log(getNowFormatDate())

/*
兼容性问题
这里记录一下一个兼容问题，有时候后端返回时间可能会返回这样的格式2021-08-09 18:00:00，然后如果我们需要获取到想对应的时间格式的时候，就会用到下面的方法

new Date('2021-08-09 18:00:00')

但是我在用的时候就发现了一个兼容性的问题，在Windows平台上，上面的方法会正常运行，但是在Mac系统的safari浏览器上，会出现问题

// safari
new Date('2021-08-09 18:00:00') // -> Invalid Date

苹果手机上会不会出现相关问题我没有尝试，不过猜测可能会有一样的表现，那是因为Safari浏览器并不支持这样的时间格式，我们需要将上面的时间格式转换为202/08/09 18:00:00

let time = '2021-08-09 18:00:00'
time = time.replace(/-/g, '/')
console.log(new Date(time)) // -> Mon Aug 09 0202 18:00:00 GMT+0800 (CST) = $3
*/