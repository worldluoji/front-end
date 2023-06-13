const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const compilerSfc = require('@vue/compiler-sfc') // .vue
const compilerDom = require('@vue/compiler-dom') // 模板

/*
* rewriteImport('import s from "vue"')
* -> "import s from '/@modules/vue'"
* function(s0, s1)      s0是匹配到的字符串from "vue", s1是第一个括号中匹配到的 vue
* reference: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
*/
function rewriteImport(content) {  
  return content.replace(/ from ['|"]([^'"]+)['|"]/g, 
    function(s0, s1) {
      // . ../ /开头的，都是相对路径    
      if (s1[0]!=='.' && s1[1]!=='/') {      
        return ` from '/@modules/${s1}'`    
      } else {      
        return s0    
      }  
    }
  )
}

// Koa Server 拦截浏览器发出的所有网络请求
app.use(async ctx => {
  const { request: { url, query } } = ctx
  if (url == '/') {
    ctx.type="text/html"
    let content = fs.readFileSync('./index.html','utf-8')
    content = content.replace('<script ',`
      <script>
        window.process = {env:{ NODE_ENV:'dev'}}
      </script>
      <script 
    `)
    ctx.body = content
  } else if (url.endsWith('.js')) {
    // 如果请求地址是 .js 结尾，就去读取对应的文件内容，使用 rewriteImport 函数处理后再返回文件内容
    const p = path.resolve(__dirname, url.slice(1))
    ctx.type = 'application/javascript'    
    const content = fs.readFileSync(p,'utf-8')    
    ctx.body = rewriteImport(content)
  } else if (url.startsWith('/@modules/')) {
    // 如果请求 @modules，就把后面的 Vue 解析出来，去 node_modules 中查询
    const prefix = path.resolve(__dirname, 'node_modules', url.replace('/@modules/',''))
    const module = require(prefix + '/package.json').module
    const p = path.resolve(prefix, module)
    const ret = fs.readFileSync(p, 'utf-8')
    ctx.type = 'application/javascript'
    // 这里还要使用 rewriteImport 的原因是，Vue 文件内部也会使用 import 的语法去加载其它模块
    ctx.body = rewriteImport(ret)
  } else if (url.indexOf('.vue')>-1) {
    // vue单文件组件
    const p = path.resolve(__dirname, url.split('?')[0].slice(1))
    // 通过vue提供的parse方法去解析.vue文件
    const { descriptor } = compilerSfc.parse(fs.readFileSync(p, 'utf-8'))
  
    if (!query.type) {
      // 第一次发现请求vue文件时，走这里，加上type
      ctx.type = 'application/javascript'
      // 借用vue自导的compile框架 解析单文件组件，其实相当于vue-loader做的事情
      ctx.body = `
  ${rewriteImport(descriptor.script.content.replace('export default ','const __script = '))}
  import { render as __render } from "${url}?type=template"
  __script.render = __render
  export default __script
      `
    } else if (query.type === 'template') {
      // 第二次走这里，前面加上了type
      // 模板内容
      const template = descriptor.template
      // 要在server端把compiler做了
      const render = compilerDom.compile(template.content, {mode:"module"}).code
      ctx.type = 'application/javascript'
  
      ctx.body = rewriteImport(render)
    }
  } else if (url.endsWith('.css')) {
    // 处理css实际就是加上了link标签
    const p = path.resolve(__dirname, url.slice(1))
    const file = fs.readFileSync(p,'utf-8')
    const content = `
    const css = "${file.replace(/\n/g,'')}"
    let link = document.createElement('style')
    link.setAttribute('type', 'text/css')
    document.head.appendChild(link)
    link.innerHTML = css
    export default css
    `
    ctx.type = 'application/javascript'
    ctx.body = content
  }
})

app.listen(24678, ()=>{
  console.log('服务器已启动，访问地址: http://localhost:24678')
})









    