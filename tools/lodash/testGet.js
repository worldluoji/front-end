// 参考： https://segmentfault.com/a/1190000015605531
import _ from 'lodash'

// 根据object对象的path路径获取值。如果解析值是undefined，就返回一个默认的值(defaultValue, 第三个参数)
var object = { 'a': [{ 'b': { 'c': 3 } }] }

let res

// 第二个参数，该参数的含义就是路径。 指向object的路径
res = _.get(object, 'a[0].b.c')
console.log(res)
// => 3

res = _.get(object, ['a', '0', 'b', 'c'])
console.log(res)
// => 3

res = _.get(object, 'a.b.c', 'default')
console.log(res)
// => 'default'