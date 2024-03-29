
import toSource from 'tosource'
import JSON5 from "json5"

const fileRegex = /\.json5$/

// Vite 插件与 Rollup 插件结构类似，为一个name和各种插件 Hook 的对象
function createJson5Plugin() {
    return {
        name: 'createJson5Plugin',
        // transform钩子，也可以返回 ast，但在这个时候已经拿到了具体路径文件的 code，所以一般用于转换已经加载后的模块
        transform(code, id) {
            console.log('createJson5Plugin', id)
            // 只有文件后缀名是.json5的时候才处理
            if (!fileRegex.test(id)) {
                return null
            }
            const object = JSON5.parse(code)
            const out = `const object = ${toSource(object)}
                         export default object`

            console.log('after process', out)
            return {
                code: out,
                map: null // 如果可行将提供 source map
            }
        }
    }
}

export default createJson5Plugin