# format
## 格式化时分秒
在展示音视频时长之类的场景时，需要把时长秒数格式为 HH:mm:ss 的格式。
```
const formatSeconds = (s) =>
  [parseInt(s / 60 / 60), parseInt((s / 60) % 60), parseInt(s % 60)]
    .join(':')
    .replace(/\b(\d)\b/g, '0$1')
```
如果你想显示“刚刚”、“5分钟前”之类的内容，可以尝试 timeago.js 库。