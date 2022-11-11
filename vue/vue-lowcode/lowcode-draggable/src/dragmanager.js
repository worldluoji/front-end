import { throttle } from 'throttle-debounce'

export default class DragManager {
    constructor() {
        this.current = null
        this.ref = null
        this.op = null
        this.opData = null
        this.calPos = throttle(100, (e) => {
            this._calPos(e)
        })
    }
    
    dragstart(e) {
        this.current = e.target.dataset.material
        // 当前拖动的组件(schema)
        this.opData = {
            name: this.current,
            props: {},
            state: 2,
        }
    }

    _calPos(e) {
        const target = e.target
        const { value } = this.ref
        if (e.target.isDragContent) {
            // 拖拽到画布里
            const index = value.indexOf(this.opData)
            if (index < 0) {
                // 没有就加入进去
                this.ref.value.push(this.opData)
            } else if (index !== value.length - 1) {
                // 如果不是最后一个，就把前面的那个删了，再加入
                this.ref.value.splice(index, 1)
                this.ref.value.push(this.opData)
            }
        } else {
            // 画布内拖动
            // offsetHeight 属性是一个只读属性，它返回该元素的像素高度，高度包含内边距（padding）和边框（border），不包含外边距（margin）
            // offsetY是左上角垂直偏移量
            let [ y, h, index ] = [ e.offsetY, target.offsetHeight, target.dataset.index ]
            let direction = y < (h / 2) ? 1 : 0
            const i = value.indexOf(this.opData)
            if (i < 0) {
                this.ref.value.splice(index - direction , 0, this.opData)
            } else if (i !== index - direction + 1) {
                this.ref.value.splice(i, 1)
                this.ref.value.splice(index - direction + 1, 0, this.opData)
            } 
        }
    }

    setContainer(el, binding) {
        // binding中可以拿到指令中的值
        this.ref = binding
        el.isDragContent = true
        el.addEventListener('dragover', (e) => this.dragover(e))
        el.addEventListener('drop', (e) => this.drop(e))
    }

    dragexist(e) {
        const i = e.target.dataset.index
        this.opData = this.ref.value[i] // 对应App.vue里的 content[i]
        this.opData.state = 2 // 激活over样式
    }

    // 拖拉到当前节点上方时，在当前节点上持续触发（相隔几百毫秒），该事件的target属性是当前节点
    dragover(e) {
        e.preventDefault()
        this.calPos(e)
    }

    // 被拖拉的节点或选中的文本，释放到目标节点时，在目标节点上触发。注意，如果当前节点不允许drop，即使在该节点上方松开鼠标键，也不会触发该事件
    drop(e) {
        e.preventDefault()
        // 如果找到了，状态置为1，正常展示
        let i = this.ref.value.indexOf(this.opData)
        // console.log(i, this.opData, this.ref.value)
        if (i > -1) {
            this.ref.value[i].state = 1
        }
    }
}