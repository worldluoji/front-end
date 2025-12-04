# dns
Node.js 的 dns 模块是一个内置模块，用于处理与域名服务器（DNS）相关的操作。这个模块提供了一系列的函数，
可以用来解析域名，查找域名对应的 IP 地址，以及其他与 DNS 查询相关的操作。

以下是 dns 模块的一些主要函数：
```
dns.lookup(hostname[, options], callback)：这个函数将一个域名（如 'google.com'）解析为第一条找到的 IPv4 或 IPv6 地址。它使用底层操作系统工具进行域名解析，可以使用 options 参数来指定 IP 地址的版本和其他选项。

dns.resolve4(hostname, callback)：这个函数将一个域名解析为一个 IPv4 地址数组。它使用网络进行 DNS 解析，不受本地主机文件或者其他可能影响 dns.lookup 的因素的影响。

dns.resolve6(hostname, callback)：这个函数将一个域名解析为一个 IPv6 地址数组。它的工作方式和 dns.resolve4 类似，只是返回的是 IPv6 地址。

dns.resolveMx(hostname, callback)：这个函数用于解析一个域名的邮件交换（MX）记录。

dns.reverse(ip, callback)：这个函数用于进行反向 DNS 查询，将一个 IP 地址解析为一个域名。
```
这些函数都是异步的，它们的结果会通过回调函数返回。回调函数的第一个参数是一个可能存在的错误对象，
如果没有错误，那么这个参数就是 null。其余的参数是查询的结果。

```js
dns.lookup('google.com', (err, address) => {
  if (err) { 
    throw err;
  }
  console.log(address);
});
```
在上面的几个 API 中，其实分了两类实现。
- getaddrinfo()；
- c-ares。

getaddrinfo() 是一个 POSIX 标准的函数，用于处理网络名称服务。无论你的程序是在 IPv4 还是 IPv6 网络中运行，或者是在其他任何类型的网络中运行，你都可以使用相同的 getaddrinfo() 调用来获取你需要的地址。
然而，getaddrinfo() 的一个缺点是它通常是阻塞的，这意味着如果 DNS 查询需要花费一些时间，那么你的程序可能会被挂起，直到查询完成。

c-ares（C Asynchronous Resolver）是一个 C 语言库，用于异步处理 DNS 查询。c-ares 是对早期的 ARES（Asynchronous Resolver）库的改进，它提供了一种非阻塞的方式来处理 DNS 查询。c-ares 支持多种类型的 DNS 查询，包括 A（IPv4 地址）查询，AAAA（IPv6 地址）查询，以及其他类型的查询。
c-ares 的主要优点是它的异步性。当你使用 c-ares 发送一个 DNS 查询时，你的程序不需要等待查询完成，你可以继续执行其他任务。当查询完成时，c-ares 会调用一个回调函数，将查询结果传递给这个函数。这使得 c-ares 非常适合用于需要处理大量 DNS 查询的程序，或者需要在查询完成之前执行其他任务的程序。