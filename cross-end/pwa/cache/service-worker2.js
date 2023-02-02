// 缓存名称
const cacheName = 'helloCache2'

// 监听fetch事件，对成功返回的资源，动态的进行缓存
self.addEventListener('fetch', event => {

    // 如果是chrome浏览器插件，不缓存
    if (event.request.url.startsWith('chrome-extension')) {
        return
    }

    event.respondWith(
        // match检查请求的URL是否命中缓存，命中则直接返回缓存内容，否则仍然走fetch进行请求
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log(`using cache ${cacheName}`, response)
                    return response
                }

                let requestToCache = event.request.clone()

                // fetch请求成功，则把请求结果加入到缓存中
                return fetch(requestToCache).then(resp => {
                    if (!resp || resp.status !== 200) {
                        return resp
                    }

                    let responseToCache = resp.clone()
                    caches.open(cacheName)
                        .then(cache => {
                            cache.put(requestToCache, responseToCache)
                        })
                    return resp
                })
            })
    )
})