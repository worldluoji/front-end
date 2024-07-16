## 打开新页签
看似平平无奇的打开页签，但是需要关注下 rel，如果要打开外链，建议设置为 noopener noreferrer，避免一些恶意网站通过 window.opener.location 重定向你的网站地址。window.open 方法同理。
```
// 高版本浏览器 rel 默认为 noopener，不过建议显示设置，兼容低版本。
<a target="_blank" rel="noopener noreferrer">...</a>

// window.open rel 默认为 opener，需要自己设置
window.open('https://baidu.com', 'baidu', 'noopener,noreferrer')

// 以下有安全漏洞，打开的新页签可以通过 window.opener.location 重定向你的网站
<a target="_blank" rel="opener">...</a>
window.opener.location = 'http://fake.website.here';
```

在HTML中使用`<a>`标签创建外部链接时，如果不添加`rel="noopener noreferrer"`属性，可能会导致一些安全和性能方面的问题，尤其是在现代Web开发实践中。以下是不添加这些属性可能带来的几个问题：

1. **内容注入攻击**（Content Injection Attacks）:
   如果目标页面可以控制其`window.opener`属性，它有可能向打开它的窗口注入内容，这在某些情况下可以被恶意网站利用来进行XSS（跨站脚本）攻击。

2. **数据泄露**（Data Leakage）:
   没有`noopener`时，源页面可以从目标页面访问一些信息，如`document.title`和`window.name`。如果目标页面包含敏感信息，这可能导致数据泄露。

3. **内存泄漏**（Memory Leaks）:
   当一个页面引用了另一个页面的`window.opener`时，这会创建一个引用循环，可能导致浏览器中的内存泄漏。

4. **导航重定向**（Navigation Redirection）:
   目标页面可以通过`window.opener`来操纵打开它的窗口的行为，包括重定向或修改其DOM，这可能会被滥用。

5. **历史记录篡改**（History Manipulation）:
   使用`window.opener`，目标页面可以修改或重写源页面的历史记录条目，从而影响用户的浏览行为。

为了防止这些问题，`rel="noopener noreferrer"`被推荐使用：

- `noopener`确保新窗口不会拥有对前一个窗口window.opener的引用，从而切断了两个窗口之间的联系。结果是，新窗口不能通过window.opener来访问或操纵原窗口，消除了上述大多数风险。
- `noreferrer`阻止了referrer header的发送，防止了目标站点知道是从哪个具体页面链接过来的，保护了用户隐私。

因此，在创建指向不受信任的第三方网站的链接时，最好总是包含`rel="noopener noreferrer"`，以增强安全性并保护用户数据。