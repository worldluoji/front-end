/*
history 模式核心借用 HTML5 history api，api 提供了丰富的 router 相关属性先了解一个几个相关的api

history.pushState 浏览器历史纪录添加记录
history.replaceState修改浏览器历史纪录中当前纪录
history.popState 当 history 发生变化时触
*/

// 定义 Router  
class HistoryRouter {  
    constructor () {  
        this.routes = {};  
        this.listerPopState()  
    }  
      
    init(path) {  
        history.replaceState({path: path}, null, path);  
        this.routes[path] && this.routes[path]();  
    }  
      
    route(path, callback){  
        this.routes[path] = callback;  
    }  
      
    push(path) {  
        history.pushState({path: path}, null, path);  
        this.routes[path] && this.routes[path]();  
    }  
      
    listerPopState () {  
        window.addEventListener('popstate' , e => {  
            const path = e.state && e.state.path;  
            this.routers[path] && this.routers[path]()  
        })  
    }  
}  
  
// 使用 Router  
  
window.miniRouter = new HistoryRouter();  
miniRouter.route('/', ()=> console.log('page1'))  
miniRouter.route('/page2', ()=> console.log('page2'))  
  
// 跳转  
miniRouter.push('/page2')  // page2  


// 参考： https://zhuanlan.zhihu.com/p/130995492