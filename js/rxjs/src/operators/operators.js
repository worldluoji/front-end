import { of, map, first, interval, pipe, filter, catchError, reduce, take} from 'rxjs';

// 创建操作
of(1, 2, 3)
  .pipe(map((x) => x * x))
  .subscribe((v) => console.log(`value: ${v}`))

of(1, 2, 3)
  .pipe(first())
  .subscribe((v) => console.log(`value: ${v}`))

// map 在逻辑上看必须动态构建，因为它必须给出映射函数。作为对比，first 可能是一个常数，但仍然是动态构建的。

// const observable = interval(1000 /* number of milliseconds */)
// observable.subscribe((v) => console.log(`value: ${v}`))


// 使用 pipe() 函数创建新的操作符, pipe() 函数类似于 Observable 上的 .pipe() 方法，但并不相同
function discardOddDoubleEven() {
    return pipe(
      filter((v) => !(v % 2)),
      map((v) => v + v)
    );
}

// pipeline操作
of(1,2,3,4,5,6)
    .pipe(discardOddDoubleEven())
    .subscribe((v) => console.log(`value: ${v}`))


// catchError
of(1, 2, 3, 4, 5)
  .pipe(
    map(n => {
      if (n === 4) {
        throw 'four!';
      }
      return n;
    }),
    catchError(err => of('I', 'II', 'III', 'IV', 'V'))
  )
  .subscribe(x => console.log(x));
  // 1, 2, 3, I, II, III, IV, V


of(1, 2, 3, 4, 5)
  .pipe(
    map(n => {
      if (n === 4) {
        throw 'four!';
      }
      return n;
    }),
    catchError((err, caught) => caught),
    take(10)
  )
  .subscribe(x => console.log(x));
  // 1, 2, 3, 1, 2, 3, ...

// reduce
const res = {
  errors: [],
  data: {}
}
const obs = of({id:1, name:'apple'}, {id:2, name:'orange'})
// 第一次，没有前一个值时，acc的值就是res, item则是obs中的一个对象
obs.pipe(reduce((acc, item, i) => { 
  acc.data[item.id] = item
  return acc
}, res))
.subscribe(x => console.log(x))