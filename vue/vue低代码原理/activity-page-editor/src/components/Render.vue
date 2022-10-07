<style type="less">
.render-container {
    height: 100%;
    min-width: 1080px;
    padding: 10px;
    background-color: #fff;
}
.render-container:after {
    content: "";
    display: block;
    clear: both;
}
</style>

<script>
import factory from 'element-factory'
import Blank from './blank.vue'
import { parse } from '../utils.mjs'

// 这里，通过构造<script type="module"> js </script>，把各个依赖引入
function buildDeps(deps) {
    return deps.map(dep => {
        const { name, value } = dep
        let js = factory(value, { browser: true })
            .replace(/\"vue\"/g, '"/node_modules/.vite/deps/vue.js"')
        js += `;\n window.__${name}__ = __default__`
        const script = document.createElement('script')
        script.type = 'module'
        script.innerHTML = js
        document.body.appendChild(script) 
        return script
    })
}

export default {
    props: {
        schema: Object,
        data: Object,
        name: String
    },
    data() {
        return { current: 'Blank' }
    },
    components: {
        Blank
    },
    watch: {
        schema: {
            handler(xmls) {
                const [defaultXml, ...deps] = xmls
                const { value } = defaultXml

                if (this.script) {
                    document.body.removeChild(this.script)
                    this.deps.forEach(script => {
                        document.body.removeChild(script)
                    })
                    this.script = null
                    this.deps.length = 0
                    this.current = 'Blank'
                }

                this.deps = buildDeps(deps)

                // setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行;
                // 也就是说，尽可能早的执行。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。
                setTimeout(() => {
                    // Vite dev 模式下Vue的地址是这个, 要进行替换
                    let js = factory(value, { browser: true })
                        .replace(/\"vue\"/g, '"/node_modules/.vite/deps/vue.js"')
                    // TODO：找了2个小时，没找到更优化的办法办法～
                    // 通过 module script 加载, 只能通过挂在window上才能执⾏
                    js += `;\n window.__render${this.name}__(__default__)`
                    const script = this.script = document.createElement('script')
                    script.type = 'module'
                    script.innerHTML = js
                    window[`__render${this.name}__`] = (Component) => {
                        this.$.components.Current = Component
                        this.current = 'Current'
                    }
                    document.body.appendChild(script) 
                }, 0)                
            },
            immediate: true
        }
    }
}
</script>

<template>
    <div class="render-container">
        <component :is="current" v-bind="data" />
    </div>
</template>