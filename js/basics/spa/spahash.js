class HashRouter {  
    constructor () {  
        this.routes = {}; // 存放路由path及callback  
        this.currentUrl = '';  
          
        // 监听路由change调用相对应的路由回调，第三个参数默认值为false，将使用冒泡传播，当值设置为true时，事件使用捕获传播。
        window.addEventListener('load', this.refresh, false);  
        window.addEventListener('hashchange', this.refresh, false);  
    }  
      
    route(path, callback){  
        this.routes[path] = callback;  
    }  
      
    push(path) {  
        if (this.routes[path]) {
            this.routes[path]()  
        } else {
            console.log('404')
        }
    }  
}  
  
// 使用 router  
window.miniRouter = new HashRouter();  
miniRouter.route('/', () => console.log('page1'))  
miniRouter.route('/page2', () => console.log('page2'))  
  
miniRouter.push('/') // page1  
miniRouter.push('/page2') // page2  
miniRouter.push('/page3')