/* 发现一个简单的方法，可以在不依赖第三方库的情况下，在 Javascript 应用程序中生成 UUID
 * 在 Javascript 中可以用的 URL.createObjectURL 方法创建一个惟一的 URL，以表示传递给它的对象。
 * 为了让这个 URL 是唯一的， URL.createObjectURL 方法返回的 URL 会带上一段 36 位长的字符串，和 UUID 的长度一致，通过这个原理，就可以模拟 UUID 了。
 * 参考：https://zhuanlan.zhihu.com/p/148173979
*/
function uuid() {
    var temUrl = URL.createObjectURL(new Blob())
    var uuid = temUrl.toString() // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
    URL.revokeObjectURL(temUrl)
    // slice类似于Java的substring
    return uuid.slice(uuid.lastIndexOf("/") + 1)
}

console.log(uuid())