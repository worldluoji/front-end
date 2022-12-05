<template>
  <draggable
    :list="lists"
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
        <component :is="element.name" :props="element.props" />
      </div>
      <div v-else :class="[{'list-group-item': enabled}]">
        <component :is="element.name" :props="element.props" />
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
    design: Boolean
  },
  data() {
    return {
      enabled: false,
      dragging: false,
      currentPanel: currentPanelStore() 
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
  computed: {
    lists() {
        let {children, row, column} = this.props
        row = row ? row: 0
        column = column ? column: 0
        const n = row * column
        if (children === undefined || n === 0) {
          return []
        }
        
        const l = children.length
        // console.log(n,l)
        if (l >= n) {
          children.length = n
        } else {
          for (let i = l; i < n ; i++) {
            children.push({id: uuid(), name: 'Blank', props: {id: uuid(), element: undefined, props: {}}})
          }
        }

        return children
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