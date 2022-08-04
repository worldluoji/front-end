import { Subject } from "rxjs";

// 创建subject
const subject = new Subject();

// 订阅一个observer
subject.subscribe(v => console.log("stream 1", v));

// 再订阅一个observer
subject.subscribe(v => console.log("stream 2", v));

// 延时1s再订阅一个observer
setTimeout(() => {
  subject.subscribe(v => console.log("stream 3", v));
}, 1000);

// 产生数据1
subject.next(1);

// 产生数据2
subject.next(2);

// 延时3s产生数据3
setTimeout(() => {
  subject.next(3);
}, 3000);

// 数据1和数据2产生的时候，observer3还没有订阅，所以stream3 只会打印1次