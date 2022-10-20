<style>
.btn-list {
  display: flex;
}

.new-button {
  font-size: 24px;
  margin-left: 12px;
  cursor: pointer;
  color: #1890ff
}
</style>

<script setup>
import { sfc } from 'element-factory'
import Render from './components/Render.vue'
// Panel为属性面板
import Panel from './components/Panel.vue'
// import schema from './schemas/card.mjs'
import list from './schemas/list.mjs'
import data from './data.mjs'
import { onMounted, ref } from 'vue'
import { parse, idMap } from './utils.mjs'

// 当前选中的组件
const currentComponent = ref(null)
const schema = [JSON.parse(JSON.stringify(list))]

// 存放楼层数据，用于页面展示，先通过parse将json转化为xml,实际就转到了element-factory
let xml = ref(schema.map(ss => parse(ss, ['List'])))

// schema-change 事件定义在 elements/wrapper.vue中, 点击warpper时会触发这个事件，而这里的idMap是在解析json schema时每个组件的id，这样就将面板切换到了当前组件的面板
onMounted(() => {
  document.body.addEventListener('schema-change', (e) => {
    currentComponent.value = idMap.get(e.id)
  }, false)
})

function onchange(keys, value) {
  const arr = keys.split('.')
  const lastKey = arr.pop()
  let res = currentComponent.value
  for (let key of arr) {
    res = res[key]
  }
  res[lastKey] = value
  // 如果是切换组件就把 props 填空
  if (keys === 'name') {
    res.props = {}
  }
  xml.value = schema.map(ss => parse(ss, ['List']))
}

function find(schema, type, cb) {
  (schema.children || []).forEach(v => {
    if (v.type === type) cb(v)
    find(v, type, cb)
  })
}

let _id = 0

// 任意楼层加入，layout表示一层有多少个卡片
function onAdd() {
  const num = window.prompt('输入插入的位置。')
  if (num) {
    const newList = JSON.parse(JSON.stringify(list))
    newList.props = {
      layout: 2
    }
    find(newList, 'Tpl', (v) => {
      v.name = `Card${++_id}`
    })
    schema.splice(num, 0, newList)
    xml.value = schema.map(ss => parse(ss, ['List']))
  }
}

// 楼层顶部加入
function onAddTop() {
  const layout = window.prompt('layout是多少？')
  if (layout) {
    const newList = JSON.parse(JSON.stringify(list))
    newList.props = {
      layout
    }
    find(newList, 'Tpl', (v) => {
      v.name = `Card${++_id}`
    })
    schema.unshift(newList)
    xml.value = schema.map(ss => parse(ss, ['List']))
  }
}

// 楼层底部加入
function onAddBottom() {
  const layout = window.prompt('layout是多少？')
  if (layout) {
    const newList = JSON.parse(JSON.stringify(list))
    newList.props = {
      layout
    }
    find(newList, 'Tpl', (v) => {
      v.name = `Card${++_id}`
    })
    schema.push(newList)
    xml.value = schema.map(ss => parse(ss, ['List']))
  }
}

// 出码
function createCode(xml) {
  if ('download' in document.createElement('a')) {
    let eleLink = document.createElement('a');
    eleLink.download = 'component.vue';
    let blob = new Blob([sfc(xml)])
    eleLink.href = URL.createObjectURL(blob)

    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
  }
}

function onclose () {
  currentComponent.value = null
}
</script>

<template>
  <!-- <button @click="createCode(parse(schema, [], true))">出码</button> -->
  <!-- <Render :schema="xml" :data="data.data.result[0]"></Render> -->
  <!-- <Render :schema="xml" :data="data.data"></Render> -->
  <div class="btn-list">
    <a class="new-button" @click="onAddTop">
      在List前插入
    </a>
    <a class="new-button" @click="onAdd">
      插入到List的指定位置
    </a>
    <a class="new-button" @click="onAddBottom">
      在List后插入
    </a>
  </div>
  <div v-for="(x, i) in xml" :key="i">
    <Render :schema="x" :name="i" :data="data.data" />
  </div>
  <Panel :data="currentComponent" @change="onchange" :close="onclose"></Panel>
</template>