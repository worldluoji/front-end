# createDocumentFragment
创建一个新的空白的文档片段

DocumentFragments 是 DOM 节点。它们不是主 DOM 树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到 DOM 树。在 DOM 树中，文档片段被其所有的子元素所代替。

```html
<ul id="ul"></ul>

<script>
var element = document.getElementById("ul"); // assuming ul exists
var fragment = document.createDocumentFragment();
var browsers = ["Firefox", "Chrome", "Opera", "Safari", "Internet Explorer"];

browsers.forEach(function (browser) {
  var li = document.createElement("li");
  li.textContent = browser;
  fragment.appendChild(li);
});

element.appendChild(fragment);

</script>
```
这样做的好处是，当所有li添加到DocumentFragment完成后，再将DocumentFragment添加到DOM树中。
而不是多次去更新DOM树。