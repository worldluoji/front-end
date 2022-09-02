import bind from './bind.mjs'
const startWithCapacity = /^[A-Z]/

export default (generator, node) => {
    if (node.tag.indexOf('Tpl_') > -1) {
        generator.addDpe(node.tag)
    } else if (startWithCapacity.test(node.tag)) {
        node.props.forEach(prop => {
            // 可以参考vue ast的类型定义：https://github.com/vuejs/core/blob/main/packages/compiler-core/src/ast.ts#L25 如果用ts更好些，可以直接这个定义文件
            // 可以看到 7 代表directive
            prop.type === 7 && bind(generator, prop)
        })

        // addDep将tag添加到dependencies数组中，node.tag可参考jiegou/node.txt
        // 这些依赖后续在buildScript中，转化为import进行导入 
        generator.addDpe(node.tag)
    }
}