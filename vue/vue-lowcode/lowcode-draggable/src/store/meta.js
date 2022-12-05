import { defineStore } from 'pinia';

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
      let it = this.content.find(c => c.id === currentId)
      if (!it) {
          let list = this.content.filter(c => c.type === 'Container')
          // console.log(list)
          list.forEach(l => {
              if (l.props.children) {
                  let tmp = l.props.children.find(t => { 
                      if (t.id === currentId) {
                          it = t
                          return t
                      }
                      if (t.name === 'Blank' && t.props.id === currentId) {
                          it = t.props
                          return t.props
                      } 
                  }) 
                  if (tmp) {
                      return
                  }
              }
          })
      }
      if (!it) {
        return
      }
      if (!it.props) {
        it.props = {}
      }
      Object.assign(it.props, value)
      console.log('save', it, this.content)
    }
  },
});

export default metaStore