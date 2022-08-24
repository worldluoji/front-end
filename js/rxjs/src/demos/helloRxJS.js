import { Observable } from 'rxjs'

/**
 * 可以通过如下的方式构建一个最基础的流:
 * 500ms时输出一个数组[1,2,3]，1s时输出一个对象{a: 1000}， 
 * 3s时，输出'end'， 然后在第4s终止该流。
 * 
 * stream$尾部的$是表示当前这个变量是个ovservable
*/
const stream$ = new Observable(subscriber => {
    setTimeout(() => {
        subscriber.next([1,2,3])
    }, 500)
    setTimeout(() => {
        subscriber.next({a: 1000})
    }, 1000)
    setTimeout(() => {
        subscriber.next('end')
    }, 3000)
    setTimeout(() => {
        subscriber.complete()
    }, 4000)
})

// 启动流
const subscription = stream$.subscribe({
    complete: () => console.log('done'),
    next: v => console.log(v),
    error: () => console.log('error')
})

/**
 * 在上述的代码中，通过new Observalbe(fn)定义了一个流，又通过stream$.subscribe(obj)启动了这个流，
 * 当500ms后，执行了`subsciber.next([1,2,3])，此时，通过传入的obj.next方法输出了该值。
 * 
 * 这里有几个点： 
 * 1. subscribe不是订阅，而是启动这个流，可以看到，subscribe后，才会执行next方法 
 * 2. 构建Observable的时候，会有一个subscriber.next，这里就是控制这个流中数据的输出
 */

let subscription2
setTimeout(() => {
    subscription2 = stream$.subscribe({
        complete: () => console.log('subscription2 done'),
        next: v => console.log('[subscription2]', v),
        error: () => console.log('subscription2 error')
    })
}, 1000)

setTimeout(() => {
    // 停止流
    subscription2.unsubscribe();
}, 4000)

/**
 * 上述代码说明：
 * 1. 同1个流可以启动多次
 * 2. 两个流的输出其实是相互独立的，而实际上也是这样设计的，流与流相互独立，互不干扰
 * 3. unsubscribe()可以停止一个流
 */
