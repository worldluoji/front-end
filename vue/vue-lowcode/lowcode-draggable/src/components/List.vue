<template>
  <draggable
    :list="props.children"
    :disabled="!enabled"
    item-key="id"
    :class="enabled ? 'list-group':'list-groupr'"
    ghost-class="ghost"
    @start="dragging = true"
    @end="dragging = false"
  >
    <template #item="{ element, index }">
      <div v-if="enabled" 
            :class="[{'list-group-item': enabled}]" 
            data-container="true" 
            :data-index="index" 
            @click.stop="showPanel(element)">
        <component :is="element.name" :props="element.props" :eid="element.id" />
      </div>
      <div v-else :class="[{'list-group-item': enabled}]">
        <component :is="element.name" :props="element.props" :eid="element.id" />
      </div>
    </template>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';
import Blank from './Blank.vue';
import Offer from './Offer.vue';
import Image from './Image.vue';
import NavBar from './NavBar.vue';
import currentPanelStore from '../store/currentPanel.js'
import metaStore from '../store/meta.js'
import uuid from '../utils/uuid'

export default {
  name: "List",
  components: {
    draggable,
    Blank,
    Offer,
    Image,
    NavBar
  },
  props: {
    props: {
      type: Object,
      required: true
    },
    eid: {
      type: String,
      required: true
    },
    design: Boolean
  },
  data() {
    return {
      enabled: false,
      dragging: false,
      currentPanel: currentPanelStore(),
      meta: metaStore()
    };
  },
  created() {
    this.enabled = this.design
  },
  methods: {
    showPanel(element) {
      this.currentPanel.set(element)
    }
  },
  watch: {
    props: {
      handler(newVal) {
        let {children, row, column} = newVal
        // console.log('props', this.eid, children)
        row = row ? row: 1
        column = column ? column: 1
        const n = row * column
        if (children === undefined || n === 0) {
          return
        }

        const l = children.length
        if (l > n) {
          let removedChildren = new Set()
          for (let i = l - 1; i >= n; i--) {
            removedChildren.add(children[i].id)
          }
          this.meta.removeChildren(this.eid, removedChildren)
        } else if (l < n) {
          let newChildren = []
          for (let i = l; i < n ; i++) {
            newChildren.push({id: uuid(), name: 'Blank', props: {id: uuid(), element: '', props: {}}})
          }
          this.meta.addChildren(this.eid, newChildren)
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.not-draggable {
  cursor: no-drop;
}

/* 实际是list-group来控制内部每一项的布局 */
.list-group {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  padding: 10px 0px;
}

.list-group:hover {
  border: 1px dashed blue;
}

.list-groupr {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}

.list-group-item {
  text-align: center;
}

.list-group-item:hover {
  border: 1px dashed blue;
}

</style>