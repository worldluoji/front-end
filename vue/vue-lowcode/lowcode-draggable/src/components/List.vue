<template>
  <draggable
    :list="props.list"
    :disabled="!enabled"
    item-key="id"
    :class="enabled ? 'list-group':'list-groupr'"
    ghost-class="ghost"
    @start="dragging = true"
    @end="dragging = false"
  >
    <template #item="{ element, index }">
      <div :class="[{'list-group-item': enabled}]" data-container="true" :data-index="index">
        <component :is="element.name"/>
      </div>
    </template>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';
import Blank from './Blank.vue';
import Offer from './Offer.vue';
import Carousel from './Carousel.vue';
import Image from './Image.vue';
export default {
  name: "List",
  components: {
    draggable,
    Blank,
    Offer,
    Carousel,
    Image
  },
  props: {
    props: {
        type: Object,
        required: true
    },
    design: false
  },
  data() {
    return {
      enabled: false,
      dragging: false
    };
  },
  created() {
    this.enabled = this.design
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
.list-group,.list-groupr {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  padding: 10px 0px;
}

.list-group:hover {
  border: 1px solid blue;
}

.list-group-item {
  background-color: darkgrey;
  text-align: center;
}

.list-group-item:hover {
  border: 1px solid blue;
}

</style>