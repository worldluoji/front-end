<template>
    <el-button :type="type" :disabled="disable" @click="click">{{ name }}</el-button>
    <Teleport :to="teleportTo" :disabled="teleportDisable">
        <div v-if="!teleportDisable">
            <el-select v-model="type" placeholder="请选择按钮类型">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('click')
const type = ref('primary')
const disable = ref(false)
const options = [{ value: 'primary', label: 'primary' },
  { value: 'success', label: 'success' },
  { value: 'info', label: 'info' },
  { value: 'warning', label: 'warning' },
  { value: 'danger', label: 'danger' }]

const teleportDisable = ref(true)
const teleportTo = ref()
const changePosition = () => {
  if (teleportDisable.value) {
    teleportTo.value = '.re-right-side'
    teleportDisable.value = false
  }
}

const click = () => {
  if (teleportDisable.value) {
    changePosition()
  } else {
    // 预留
  }
}

</script>
