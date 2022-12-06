import { defineStore } from 'pinia';

// 递归逐层查找，后续优化
const findById = (content, id) => {
  for (let e of content) {
    if (e.id === id) {
      return e
    } else {
      // 对象容纳了一个组件,比如Blank
      if (e.props.id && e.props.id === id) {
        return e.props
      }

      // 对象有children, 比如List容器
      if (e.props.children && e.props.children.length > 0) {
        let t = findById(e.props.children, id)
        if (t) {
          return t
        }
      }
    }
  }
  return null
}

const metaStore = defineStore("meta", {
  state: () => {
    return {
      content: [],
      depMap: new Map()
    };
  },
  getters: {
    get(state) {
      return state.content
    },
  },
  actions: {
    set(c) {
      this.content = c
    },
    updateProps(currentId, value) {
      let it = findById(this.content, currentId)
      console.log('update', it, currentId, value)
      if (it) {
        Object.assign(it.props, value)
        // console.log('save', it, this.content)
      }
    },
    removeChildren(eid, children) {
      let e = findById(tshis.content, eid)
      if (e) {
        const newChildren = e.props.children.filter(c => !children.has(c.id))
        e.props.children = newChildren
      }
    },
    addChildren(eid, children) {
      let e = findById(this.content, eid)
      if (e) {
        e.props.children.push(...children)
      }
    }
  },
});

export default metaStore