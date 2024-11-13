import { compareAsc, format } from "date-fns";

let formatedDate = format(new Date(2014, 1, 11), "yyyy-MM-dd");
console.log(formatedDate);

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];

dates.sort(compareAsc);

console.log(dates);


let formatedDateTime = format(new Date(2014, 1, 11, 20, 30, 59), "yyyy-MM-dd HH:mm:ss");
console.log(formatedDateTime);