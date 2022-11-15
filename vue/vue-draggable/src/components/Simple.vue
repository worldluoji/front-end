<template>
      <div class="container">
        <draggable
          :list="list"
          :disabled="!enabled"
          item-key="name"
          class="list-group"
          ghost-class="ghost"
          @start="dragging = true"
          @end="dragging = false"
        >
          <template #item="{ element }">
            <div class="list-group-item" :class="{ 'not-draggable': !enabled }">
              Hello {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>
  </template>
  
  <script>
  import draggable from 'vuedraggable';
  export default {
    name: "simple",
    display: "Simple",
    order: 0,
    components: {
      draggable
    },
    data() {
      return {
        enabled: true,
        list: [
          { name: "John", id: 0 },
          { name: "Joao", id: 1 },
          { name: "Jean", id: 2 },
          { name: "JoJo", id: 3 }
        ],
        dragging: false
      };
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

  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: center;
  }

  /* 实际是list-group来控制内部每一项的布局 */
  .list-group{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: center;
  }

  .list-group-item {
    padding: 10px 16px;
    background-color: darkgrey;
  }
  </style>