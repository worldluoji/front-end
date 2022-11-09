比如在 Header 中分别引入 5 个 svg 文件:
```
import Logo1 from '@assets/icons/logo-1.svg';
import Logo2 from '@assets/icons/logo-2.svg';
import Logo3 from '@assets/icons/logo-3.svg';
import Logo4 from '@assets/icons/logo-4.svg';
import Logo5 from '@assets/icons/logo-5.svg';
```
这里顺便说一句，Vite 中提供了import.meta.glob的语法糖来解决这种批量导入的问题，如上述的 import 语句可以写成下面这样:
```
const icons = import.meta.glob('../../assets/icons/logo-*.svg');
```
对象的 value 都是动态 import, (() => import(xxx)), 适合按需加载的场景。

如果只需要同步加载即可，可以使用 import.meta.globEager来完成:
```
const icons = import.meta.globEager('../../assets/icons/logo-*.svg');
```

假设页面有 100 个 svg 图标，将会多出 100 个 HTTP 请求，依此类推。我们能不能把这些 svg 合并到一起，从而大幅减少网络请求呢？

答案是可以的。这种合并图标的方案也叫雪碧图。

HTTP2 的多路复用设计可以解决大量 HTTP 的请求导致的网络加载性能问题，因此雪碧图技术在 HTTP2 并没有明显的优化效果，
这个技术更适合在传统的 HTTP 1.1 场景下使用(比如本地的 Dev Server)。