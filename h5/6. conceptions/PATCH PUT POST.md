# PATCH PUT POST
1. A PATCH serves as a set of instructions for modifying a resource, whereas PUT represents a complete replacement of the resource. A PUT request is always idempotent.

2. The HTTP PUT request method <strong>creates a new resource or replaces</strong> a representation of the target resource with the request payload.

3. The HTTP POST method <strong>sends data(or create data)</strong> to the server. 
The type of the body of the request is indicated by the Content-Type header.

The difference between PUT and POST is that PUT is idempotent: calling it once or several times successively has the same effect (that is no side effect), 
where successive identical POST may have additional effects, like passing an order several times.

4. HTTP 工作组提出了一种新的方法——QUERY，该方法既能承载大量请求数据，又能保证请求的幂等性和安全性。
```
QUERY /search HTTP/1.1
Host: conardli.top
Content-Type: application/json
{
    "q": "ConardLi",
    "limit": 17,
    "sort": "desc"
}
```
与 POST 方法不同，QUERY 方法明确表示查询操作是安全的，不会改变服务器上的资源状态。这意味着，无论请求多少次，服务器资源的状态都不会因为 QUERY 请求而发生变化。

## references
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
- https://juejin.cn/post/7423298788871962678