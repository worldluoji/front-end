<template>
    <div>
      <div class="wrapper">
        <Operation :content="content"  @changeWidth="changeWidth"/>
        <div class="container">
          <LeftSide />
          <div class="drag-content" v-dragcontent="content">
            <div class="top-white"></div>
            <draggable 
              class="list-group" 
              v-dragcontent="content"
              :list="content"
              :disabled="!enabled"
              item-key="id"
              ghost-class="ghost"
              @start="dragging = true"
              @end="dragging = false">
              <template #item="{ element, index }" class="list-group-item">
                <component 
                  :is="element.name"
                  :key="index"
                  :props="element.props"
                  :eid="element.id"
                  :design="true"
                  :data-index="index"
                  @click="showPanel(element)"
                ></component>
              </template>
            </draggable>
            <div class="top-white"></div>
          </div>
          <Panel @cancel="cancelPanel"/>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import draggable from 'vuedraggable'
  import Operation from './Operation.vue' 
  import Cards from '../components'
  import Panel from './Panel.vue'
  import LeftSide from './LeftSide.vue'
  import metaStore from '../store/meta.js'
  import currentPanelStore from '../store/currentPanel.js'

  export default {
    name: 'Designer',
    components: {
      draggable,
      Operation,
      Panel,
      LeftSide,
      ...Cards
    },
    data() {
      return {
        enabled: true,
        dragging: false,
        content: [],
        meta: metaStore(),
        currentPanel: currentPanelStore(),
        canvasWidth: '987px'
      }
    },
    beforeMount() {
      this.content = this.meta.get
    },
    methods: {
      cancelPanel() {
        this.currentPanel.set({})
      },
      showPanel(element) {
        // console.log('showPanel out', element)
        this.currentPanel.set(element)
      },
      changeWidth(val) {
        // console.log('changeWidth', val)
        this.canvasWidth = `${val}px`
      }
    }
  }
  </script>
  
<style>
  .drag-content {
    width: v-bind(canvasWidth);
    min-height: 500px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f0f2f5;
    margin-top: 10px;
  }
  
  .wrapper {
    display: flex;
    flex-direction: column;
    background-color: #f0f2f5;
  }
  
  .container {
    display: grid;
    grid-template-columns: 280px 1fr 300px;
    column-gap: 30px;
  }
  
  .top-white {
    height: 15px;
  }
  
  .list-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }
  
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .not-draggable {
    cursor: no-drop;
  }
</style>
  