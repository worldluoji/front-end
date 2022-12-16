import _ from 'lodash'

var object = { 'a': [{ 'b': { 'c': 3 } }] }

const res = _.get(object, 'a[0].b.c')
console.log(res)