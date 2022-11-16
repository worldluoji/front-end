# PV、UV和 VV
## PV
即页面浏览量或点击量，用户每1次对网站中的每个网页访问均被记录1个PV。用户对同一页面的多次访问，访问量累计，用以衡量网站用户访问的网页数量。

## UV
是指通过互联网访问、浏览这个网页的自然人。访问您网站的一台电脑客户端为一个访客。00:00-24:00内相同的客户端只被计算一次。

## VV
用以统计所有访客1天内访问网站的次数。当访客完成所有浏览并最终关掉该网站的所有页面时便完成了一次访问，同一访客1天内可能有多次访问行为，访问次数累计。

## PV 和 VV 的区别
如：你今天10点钟打开了百度，访问了它的三个页面；11点钟又打开了百度，访问了它的两个页面，则PV数+5，VV数+2.

PV是指页面的浏览次数，VV是指你访问网站的次数。

##  更准确的统计 PV
Page Visibility API 由 document.visibilityState 属性以及 visibilitychange 事件组成。
基于这两个 API，你可以确保只会在页面的 visibilityState 可见时才发送 Page View 统计。

此外，你还可以监听 visibilitychange 事件，在用户重新切回到在后台运行有段时间的应用时发送新的 Page View 统计。
Page Visibility API 很好的解决了加载完成后几乎不需要刷新的 WEB 应用的 Page View 统计问题。

具体如下：

- 页面加载时，如果页面的 visibilityState 是可见的，发送 Page View 统计；
- 如果页面的 visibilityState 是隐藏的，就监听 visibilitychange 事件，并在 visibilityState 变为可见时发送 Page View 统计；
- 如果 visibilityState 由隐藏变为可见，并且自上次用户交互之后已经过了“足够长”的时间，就发送新的 Page View 统计；
- 如果 URL 发生变化（仅限于 pathname 或 search 部分发送变化, hash 部分则应该忽略，因为它是用来标记页面内跳转的) 发送新的 Page View 统计；

参考： https://zhuanlan.zhihu.com/p/26341409