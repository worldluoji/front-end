<template>
  <div class="wrapper">
    <div v-if="!previewing">
    <div class="operation">
      <button @click="preview">预览</button>
      <button @click="seeSchame">Schema</button>
    </div>
    <div class="container">
      <div v-draggable class="material-icon-list">
        <div class="material-icon" data-material="Image">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z" stroke="#777" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 23C20.7614 23 23 20.7614 23 18C23 15.2386 20.7614 13 18 13C15.2386 13 13 15.2386 13 18C13 20.7614 15.2386 23 18 23Z" fill="none" stroke="#777" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 36L31 26L21 35L14 29L6 35" stroke="#777" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <p>图片</p>
        </div>
        <div class="material-icon" data-material="Carousel">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="40" height="30" rx="2" fill="none" stroke="#777" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 42H28" stroke="#777" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 42H36" stroke="#777" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 42H6" stroke="#777" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 42H44" stroke="#777" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 42H14" stroke="#777" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <p>轮播</p>
        </div>
        <div class="material-icon" data-material="Offer">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.78101 9.75193C9.90612 8.75107 10.7569 8 11.7656 8H36.2344C37.2431 8 38.0939 8.75107 38.219 9.75193L41.719 37.7519C41.8682 38.9456 40.9374 40 39.7344 40H8.26556C7.06257 40 6.1318 38.9456 6.28101 37.7519L9.78101 9.75193Z" fill="none" stroke="#777" stroke-width="4" stroke-linejoin="round"/><path d="M15 18C15 18 17 22 24 22C31 22 33 18 33 18" stroke="#777" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <p>商品</p>
        </div>
        <div class="material-icon" data-material="List">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 14H30C30 14 38 18.1481 38 27.7993C38 37.4504 30 42 30 42H13C13 42 6 35.9785 6 28C6 20.0215 13 14 13 14Z" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 27.9998C25 24.9998 19 33.9998 6 27.9998" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M31 14H40C40 14 44 18 44 30" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 6L32 8.66667L31 14H13L9 6Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <p>容器</p>
        </div>
      </div>
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
              :data-index="index"
              @click="showPanel(element)"
            ></component>
          </template>
        </draggable>
        <div class="top-white"></div>
      </div>
      <div class="panel" v-if="current">
        <component 
          :is="current + 'Panel'"
          :key="current"
          :props="panelProps"
          @change="change"
        ></component>
        <button @click="save">保存</button> &nbsp;&nbsp;
        <button @click="cancel">取消</button>
      </div>
    </div>
    </div>
    <div v-else>
      <Render :content="content" />
      <button @click="canelPrevie">取消预览</button>
    </div>
  </div>
</template>

<script>
import Carousel from './components/Carousel.vue'
import Image from './components/Image.vue'
import Offer from './components/Offer.vue'
import List from './components/List.vue'
import draggable from 'vuedraggable'
import ImagePanel from './panel/ImagePanel.vue'
import Render from './render/Render.vue'
export default {
  name: 'App',
  components: {
    Carousel,
    Image,
    Offer,
    List,
    draggable,
    ImagePanel,
    Render
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      content: [],
      current: '',
      panelProps: {},
      previewing: false
    }
  },
  methods: {
    change(p) {
      // console.log('change', p)
      this.panelProps = p
    },
    save() {
      let it = this.content.find(c => c.name === this.current)
      if (!it) {
        return
      }
      Object.assign(it.props, this.panelProps)
      console.log('save', it, this.content)
    },
    cancel() {
      this.current = ''
    },
    showPanel(element) {
      this.current = element.name
    },
    seeSchame() {
      console.log(JSON.stringify(this.content))
    },
    preview() {
      console.log('预览')
      this.previewing = true
    },
    canelPrevie() {
      this.previewing = false
    }
  }
}
</script>

<style>
.material-icon-list {
  /* margin-right: 10vw; */
  display: grid;
  grid-template-columns: 5vw 5vw;
  grid-template-rows: 8vw 8vw;
  gap: 2vw;
  place-items: center;
}

.material-icon-list:after {
  content: "";
  display: block;
  clear: both;
}
.material-icon {
  float: left;
}
.material-icon p {
  font-size: 16px;
  margin: 0px;
  text-align: center;
  color: #777;
}

.drag-content {
  width: 375px;
  min-height: 500px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.wrapper {
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
}

.container {
  display: grid;
  grid-template-columns: 20vw 375px 30vw;
  column-gap: 10vw;
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

.list-group-item {
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.not-draggable {
  cursor: no-drop;
}

.panel {
  background-color: #fff;
  width: 300px;
  height: 100vh;
  position: fixed;
  top: 5vh;
  right: 0;
  color: #000;
  border: 1px solid #eee;
  border-top: 0;
  border-bottom: 0;
  padding: 12px;
}

.operation {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2vh;
  column-gap: 2vw;
}
</style>
