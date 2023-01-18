# Fetch
Fetch API 提供了一个 JavaScript 接口，用于访问和操纵 HTTP 管道的一些具体部分，例如请求和响应。
它还提供了一个全局 fetch() 方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

这种功能以前是使用 XMLHttpRequest 实现的。Fetch 提供了一个更理想的替代方案，可以很容易地被其他技术使用，
例如  Service Workers。Fetch 还提供了专门的逻辑空间来定义其他与 HTTP 相关的概念，例如 CORS 和 HTTP 的扩展。

## 为什么有了xhr，还要fetch?
XHR 和 fetch API 都是浏览器给上层使用者暴露出来的 API（类似于操作系统暴露系统 API 给浏览器这类应用一样）。这两套暴露的 API 给上层使用者提供了部分操作 http 包的能力。换句话说，这两者都是建立在 http 协议上的，我们可以将其当成具有部分功能的 http 客户端。

XHR解决了局部渲染的问题，但XHR一次请求中，XHRhttp request 、http response 和事件监听都处于同一个 xhr 实例里面。整个代码组织缺少语义化，并且可能陷入回调地狱的窘境。如果没有各种包装库的实现（这也同样是 fetch API 出现后难以推广的原因之一，因为库封装的很好），手写 xhr 绝对是个痛苦的事情。

fetch API 在设计时主要考虑点在哪里？
- 使用最新的 Promise 语法结构，对上层用户编程更加友好
- 整个设计更加底层，这意味着在实际使用过程当中能够进行更多的弹性设计
- 关注点分离，request / response / header 分开，这也意味着能够更加灵活的使用这些 API

## fetch使用
```
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));
```
这里我们通过网络获取一个 JSON 文件并将其打印到控制台。最简单的用法是只提供一个参数用来指明想 fetch() 到的资源路径，然后返回一个包含响应结果的 promise（一个 Response 对象）。

fetch()的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求。

### post JSON数据：
```
// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', 
    integrity: "",
    keepalive: false,
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
});
```
请求参数解释：
- method：HTTP 请求的方法，POST、DELETE、PUT都在这个属性设置。
- headers：一个对象，用来定制 HTTP 请求的标头。
- body：POST 请求的数据体。
  
标头Content-Type设成'application/json;charset=utf-8'。
因为默认发送的是纯文本，Content-Type的默认值是'text/plain;charset=UTF-8'。

mode属性指定请求的模式。可能的取值如下：
- cors：默认值，允许跨域请求。
- same-origin：只允许同源请求。
- no-cors：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求。

cache属性指定如何处理缓存。可能的取值如下：
```
default：默认值，先在缓存里面寻找匹配的请求。
no-store：直接请求远程服务器，并且不更新缓存。
reload：直接请求远程服务器，并且更新缓存。
no-cache：将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存。
force-cache：缓存优先，只有不存在缓存的情况下，才请求远程服务器。
only-if-cached：只检查缓存，如果缓存里面不存在，将返回504错误。
```

credentials：credentials属性指定是否发送 Cookie。可能的取值如下：
- same-origin：默认值，同源请求时发送 Cookie，跨域请求时不发送。
- include：不管同源请求，还是跨域请求，一律发送 Cookie。
- omit：一律不发送。
跨域请求发送 Cookie，需要将credentials属性设为include。

```
fetch('http://another.com', {
  credentials: "include"
});
```

redirect属性指定 HTTP 跳转的处理方法。可能的取值如下：
```
follow：默认值，fetch()跟随 HTTP 跳转。
error：如果发生跳转，fetch()就报错。
manual：fetch()不跟随 HTTP 跳转，但是response.url属性会指向新的 URL，response.redirected属性会变为true，由开发者自己决定后续如何处理跳转。
```

referrer属性用于设定fetch()请求的referer标头。这个属性可以为任意字符串，也可以设为空字符串（即不发送referer标头）。
referer表示请求的来源，比如什么网站经过链接跳转过来的。
referer作用: 防盗链 和 防止恶意请求。
```
fetch('/page', {
  referrer: ''
});
```
referrerPolicy属性用于设定Referer标头的规则.
```
no-referrer-when-downgrade：默认值，总是发送Referer标头，除非从 HTTPS 页面请求 HTTP 资源时不发送。
no-referrer：不发送Referer标头。
origin：Referer标头只包含域名，不包含完整的路径。
origin-when-cross-origin：同源请求Referer标头包含完整的路径，跨域请求只包含域名。
same-origin：跨域请求不发送Referer，同源请求发送。
strict-origin：Referer标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送Referer标头。
strict-origin-when-cross-origin：同源请求时Referer标头包含完整路径，跨域请求时只包含域名，HTTPS 页面请求 HTTP 资源时不发送该标头。
unsafe-url：不管什么情况，总是发送Referer标头。
```

integrity属性指定一个哈希值，用于检查 HTTP 回应传回的数据是否等于这个预先设定的哈希值。
比如，下载文件时，检查文件的 SHA-256 哈希值是否相符，确保没有被篡改。
```
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```


keepalive属性用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。
一个典型的场景就是，用户离开网页时，脚本向服务器提交一些用户行为的统计信息。
这时，如果不用keepalive属性，数据可能无法发送，因为浏览器已经把页面卸载了。
```
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
    keepalive: true
  });
};
```

<br>

### 提交表单数据：
```
const form = document.querySelector('form');

const response = await fetch('/users', {
  method: 'POST',
  body: new FormData(form)
})
```

### 文件上传

如果表单里面有文件选择器，可以用前一个例子的写法，上传的文件包含在整个表单里面，一起提交。

另一种方法是用脚本添加文件，构造出一个表单，进行上传。
```
const input = document.querySelector('input[type="file"]');

const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/avatars', {
  method: 'POST',
  body: data
});
```
上传二进制文件时，不用修改标头的Content-Type，浏览器会自动设置。

### 直接上传二进制数据

fetch()也可以直接上传二进制数据，将 Blob 或 arrayBuffer 数据放在body属性里面。
```
let blob = await new Promise(resolve =>   
  canvasElem.toBlob(resolve,  'image/png')
);

let response = await fetch('/article/fetch/post/image', {
  method:  'POST',
  body: blob
});
```

### 使用 AbortController取消 fetch请求
fetch()请求发送以后，如果中途想要取消，需要使用AbortController对象。
```
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/long-operation', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') {
    console.log('Aborted!');
  } else {
    throw err;
  }
}
```

<br>

## 注意点
### 1. 注意判断返回码
fetch()发出请求以后，有一个很重要的注意点：只有网络错误，或者无法连接时，fetch()才会报错，其他情况都不会报错，而是认为请求成功。

这就是说，即使服务器返回的状态码是 4xx 或 5xx，fetch()也不会报错（即 Promise 不会变为 rejected状态）。

只有通过Response.status属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功。
```
async function fetchText() {
  let response = await fetch('/readme.txt');
  if (response.status >= 200 && response.status < 300) {
    return await response.text();
  } else {
    throw new Error(response.statusText);
  }
}
```
上面示例中，response.status属性只有等于 2xx （200~299），才能认定请求成功。
这里不用考虑网址跳转（状态码为 3xx），因为fetch()会将跳转的状态码自动转为 200。
或者使用ok属性判断：
```
if (response.ok) {
  // 请求成功
} else {
  // 请求失败
}
```
response.ok属性返回一个布尔值，表示请求是否成功，true对应 HTTP 请求的状态码 200 到 299，false对应其他的状态码。
response.statusText 属性返回一个字符串，表示 HTTP 回应的状态信息（例如请求成功以后，服务器返回"OK"）。

### 2. 尽量不去修改返回的header
Response 对象还有一个Response.headers属性，指向一个 Headers 对象，对应 HTTP 回应的所有标头。
Headers 对象可以使用for...of循环进行遍历。
```
const response = await fetch(url);

for (let [key, value] of response.headers) { 
  console.log(`${key} : ${value}`);  
}

// 或者
for (let [key, value] of response.headers.entries()) { 
  console.log(`${key} : ${value}`);  
}
```
Headers 对象提供了以下方法，用来操作标头。
```
Headers.get()：根据指定的键名，返回键值。
Headers.has()： 返回一个布尔值，表示是否包含某个标头。
Headers.set()：将指定的键名设置为新的键值，如果该键名不存在则会添加。
Headers.append()：添加标头。
Headers.delete()：删除标头。
Headers.keys()：返回一个遍历器，可以依次遍历所有键名。
Headers.values()：返回一个遍历器，可以依次遍历所有键值。
Headers.entries()：返回一个遍历器，可以依次遍历所有键值对（[key, value]）。
Headers.forEach()：依次遍历标头，每个标头都会执行一次参数函数。
```
上面的有些方法可以修改标头，那是因为继承自 Headers 接口。
对于 HTTP 回应来说，修改标头意义不大，况且很多标头是只读的，浏览器不允许修改。

### 3. 注意读取返回内容
Response对象根据服务器返回的不同类型的数据，提供了不同的读取方法。
```
response.text()：得到文本字符串。
response.json()：得到 JSON 对象。
response.blob()：得到二进制 Blob 对象。
response.formData()：得到 FormData 表单对象。主要用在 Service Worker 里面，拦截用户提交的表单，修改某些数据以后，再提交给服务器。
response.arrayBuffer()：得到二进制 ArrayBuffer 对象, 常用来获取流媒体文件。
```
上面5个读取方法都是异步的，返回的都是 Promise 对象。必须等到异步操作结束，才能得到服务器返回的完整数据。

读取图片文件flower.jpg，显示在网页上:
```
const response = await fetch('flower.jpg');
const myBlob = await response.blob();
const objectURL = URL.createObjectURL(myBlob);

const myImage = document.querySelector('img');
myImage.src = objectURL;
```
获取流媒体文件：
```
const audioCtx = new window.AudioContext();
const source = audioCtx.createBufferSource();

const response = await fetch('song.ogg');
const buffer = await response.arrayBuffer();

const decodeData = await audioCtx.decodeAudioData(buffer);
source.buffer = buffer;
source.connect(audioCtx.destination);
source.loop = true;
```
Stream 对象只能读取一次，读取完就没了。这意味着，前一节的五个读取方法，只能使用一个，否则会报错。
```
let text =  await response.text();
let json =  await response.json();  // 报错
```
上面示例先使用了response.text()，就把 Stream 读完了。后面再调用response.json()，就没有内容可读了，所以报错。

Response 对象提供Response.clone()方法，创建Response对象的副本，实现多次读取。
```
const response1 = await fetch('flowers.jpg');
const response2 = response1.clone();

const myBlob1 = await response1.blob();
const myBlob2 = await response2.blob();

image1.src = URL.createObjectURL(myBlob1);
image2.src = URL.createObjectURL(myBlob2);
```

### 4. 如何获取下载进度？
Response.body属性是 Response 对象暴露出的底层接口，返回一个 ReadableStream 对象，供用户操作。
它可以用来分块读取内容，应用之一就是显示下载的进度。

```
const response = await fetch('flower.jpg');
const reader = response.body.getReader();

while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

## 参考
- https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
- https://juejin.cn/post/6847009771170562062
- https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html