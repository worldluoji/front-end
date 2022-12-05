import { throttle } from 'throttle-debounce'
import uuid from './utils/uuid'
export default class DragManager {
    constructor() {
        this.current = null
        this.ref = null
        this.op = null
        this.opData = null
        this.calPos = throttle(200, (e) => {
            this._calPos(e)
        })
    }
    
    dragstart(e) {
        this.current = e.target.dataset.material
        // 当前拖动的组件(schema)
        this.opData = {
            id: uuid(),
            name: this.current,
            props: {},
            state: 2,
        }

        //  容器，设置默认值，后续可通过配置面板修改
        if (this.current === 'List') {
            this.opData.props = {
                list: [],
                row: 1,
                column: 1
            }
        }
    }

    _calPos(e) {
        const target = e.target
        const { value } = this.ref
        // console.log('pos', e)
        if (e.target.isDragContent) {
            // console.log('go here')
            // 拖拽到画布里
            const index = value.indexOf(this.opData)
            if (index < 0) {
                // 没有就加入进去
                if (Object.keys(this.opData).length > 0) {
                    this.ref.value.push(this.opData)
                }
            } else if (index !== value.length - 1) {
                // 如果不是最后一个，就把前面的那个删了，再加入
                this.ref.value.splice(index, 1)
                this.ref.value.push(this.opData)
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

    // 拖拉到当前节点上方时，在当前节点上持续触发（相隔几百毫秒），该事件的target属性是当前节点
    dragover(e) {
        e.preventDefault()
        // dragover每隔几百毫秒就会触发计算，代价太大
        this.calPos(e) 
    }

    // 被拖拉的节点或选中的文本，释放到目标节点时，在目标节点上触发。注意，如果当前节点不允许drop，即使在该节点上方松开鼠标键，也不会触发该事件
    drop(e) {
        e.preventDefault()
        const isIn = e.target.dataset.container
        // console.log(this.ref.value, this.opData, e)
        if (!isIn) {
            // 如果找到了，状态置为1，正常展示
            let i = this.ref.value.indexOf(this.opData)
            if (i > -1) {
                this.ref.value[i].state = 1
            }
        }

        // console.log('drop', this.ref.value)
        // 拖拽结束后清空opData
        this.opData = {}
    }
}