// 缓存名称
const cacheName = 'helloCache'

// 监听service worker install事件，缓存指定的两个文件
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll([
                '../ServiceWorker的拦截作用.webp',
                './js/script.js'
            ]))
        // 将以上图片和js加入到缓存中
    )
})

// 监听fetch事件
self.addEventListener('fetch', event => {
    event.respondWith(
        // match检查请求的URL是否命中缓存，命中则直接返回缓存内容，否则仍然走fetch进行请求
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log(`using cache ${cacheName}`, response)
                    return response
                }
                return fetch(event.request)
            })
    )
})