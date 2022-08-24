
import { interval, fromEvent } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'

// 发出每次点击
const source = fromEvent(document, 'click')
// 如果3秒内发生了另一次点击，则消息不会被发出
const example = source.pipe(
  switchMap(val => interval(3000).pipe(map(x => 'Hello, I made it!')))
);
// (点击)...3s...'Hello I made it!'...(点击)...2s(点击)...
const subscribe = example.subscribe(val => console.log(val))
