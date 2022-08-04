/**
 * 实现一个批量请求函数 multiRequest(urls, maxNum)，要求如下：
 * • 要求最大并发数 maxNum
 * • 每当有一个请求返回，就留下一个空位，可以增加新的请求
 * • 所有请求完成后，结果按照 urls 里面的顺序依次打出
 */

// 假设这是你的http请求函数, 模拟http请求
function httpGet(url) {
    return new Promise(resolve => setTimeout(() => resolve(`Result: ${url}`), 2000))
}

import { from as RxFrom, mergeMap} from 'rxjs'
const array = [
    'https://httpbin.org/ip', 
    'https://httpbin.org/user-agent',
    'https://httpbin.org/delay/3',
]
  
// mergeMap是专门用来处理并发处理的rxjs操作符
// mergeMap第二个参数2的意思是，from(array)每次并发量是2，只有promise执行结束才接着取array里面的数据
// mergeMap第一个参数httpGet的意思是每次并发，从from(array)中取的数据如何包装，这里是作为httpGet的参数
RxFrom(array)
    .pipe(mergeMap(httpGet, 2))
    .subscribe(v => console.log(v))
