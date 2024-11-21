
let time = new Date()
console.log(1, time, typeof time)
console.log(time.toLocaleDateString())
console.log(time.toLocaleTimeString())
console.log(time.toLocaleString())

time = Date.now()
console.log(2, time, typeof time)

time = new Date(time)
console.log(3, time, typeof time)

Date.prototype.nowDay = function(seperator = '-') {
  let date = this;
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (day >= 0 && day <= 9) {
    day = '0' + day;
  }
  return year + seperator + month + seperator + day;
}

Date.prototype.nextDay = function(seperator = '-') {
  let nextDay = new Date(this);
  nextDay.setDate(this.getDate() + 1);
  let year = nextDay.getFullYear();
  let month = nextDay.getMonth() + 1;
  let date = nextDay.getDate();
  if (month >= 0 && month <= 9) {
    month = "0" + month;
  }
  if (date >= 0 && date <= 9) {
    date = "0" + date;
  }
  return year + seperator + month + seperator + date;
}

let d = new Date();
console.log(d.nowDay());
console.log(d.nextDay());
console.log(d.getDay()); // 星期几