
// node url is deprecated, using URL instead 
const queryParamObj = new URL('http://example.com/path?param1=3&param2=test').searchParams
console.log(queryParamObj, typeof queryParamObj);
for (let e of queryParamObj.entries()) {
  console.log(e, typeof e);
}