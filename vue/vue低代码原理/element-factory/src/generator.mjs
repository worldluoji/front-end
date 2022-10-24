import element from './nodes/element.mjs'
import text from './nodes/text.mjs'
import Code from './code.mjs'
import comment from './nodes/comment.mjs'

const typeMap = {
    1: element,
    2: text,
    3: comment,
}

// 遍历AST抽象树，第一次进入时，parent就是ast, ast的数据结构里Children, 表示子节点
function walk(parent, fn) {
    if (parent.children && parent.children.length > 0) {
        parent.children.forEach(child => {
            fn(child)
        })
    }
}

// 这里其实就是把模板里的 CirclePic 转化为 circle-pic，找到对应的circle-pic.vue组件
function toHyphenCase(str) {
    const char = str.charAt(0)
    const newStr = char.toLowerCase() + str.slice(1)
    return newStr.replace(/([A-Z])/g, (value, replaceValue) => {
        return '-' + replaceValue.toLowerCase()
    })
}

export default class Generator {
    constructor(ast, options) {
        this.ast = ast
        this.options = options
        this.depencencies = []
        this.props = []
        this.visit(this.ast)
    }

    addDpe(name) {
        if (this.depencencies.indexOf(name) < 0) {
            this.depencencies.push(name)
        }
    }

    expression(exp) {
        const { content } = exp
        if (this.props.indexOf(content) < 0) {
            this.props.push(exp.content)
            console.log(this.props)
        }
        // TODO: this should parse the expression
    }

    visit(parent) {
        const generator = this
        walk(parent, (child) => {
            // 通过type获取到Handler
            const typeHandler = typeMap[child.type]
            if (typeHandler) {
                let enter, leave
                if (typeof typeHandler === 'object') {
                    enter = typeHandler.enter
                    leave = typeHandler.leave
                } else {
                    enter = typeHandler
                }
                enter && enter(generator, child)
                this.visit(child)
                leave && leave(generator, child)
            } else {
                throw new Error(`Node type = ${child.type} is not defined`)
            }
        })
    }

    buildScript() {
        const code = new Code
        const resolve = this.options.resolve || ((elementName) => {
            // 以Tpl_开头，则说明也是一个模板文件，把Tpl_去掉，拿模板名
            if (elementName.indexOf('Tpl_') > -1) {
                return `./${elementName.slice(4)}.tpl`
            } else {
                return `./elements/${toHyphenCase(elementName)}.vue`
            }
        })

        // 把依赖全部import
        this.depencencies.forEach(dep => {
            if (this.options.browser) {
                if (dep.indexOf('Tpl_') > -1) {
                    code.addLine(`const ${dep} = window.__${dep}__`)
                } else {
                    code.addLine(`import ${dep} from '${resolve(dep)}'`)
                }
            } else {
                code.addLine(`import ${dep} from '${resolve(dep)}'`)
            }
        })

        return code.toString()
    }
}