<template>
    <teleport :disabled="!visible" to="body">
        <div class="el-notification" :style="positionStyle"  v-if="visible">
            <div class="el-notification__title">
                {{ title }}
            </div>
            <div class="el-notification__message">
                {{ message }}
            </div>
            <button 
                    class="el-notification__close-button"
                    @click="onCloseHandler">
                ×
            </button>
        </div>
    </teleport>
</template>

<script lang="ts">
export default {
  name:'ElNotification'
}
</script>

<script setup lang="ts">
import { computed, ref, withDefaults, defineProps} from 'vue'
interface Props {
  title?: string,
  message?: string,
  position?: string,
  verticalOffset?: string,
  appendToBody?: boolean
}
const props = withDefaults(defineProps<Props>(),{
  title: "Notification",
  message: "You received a notification",
  position: 'top-right',
  verticalOffset: '5px',
  appendToBody: true
})

const visible = ref(true)

const horizontalProperty = computed(() => { 
    return props.position.endsWith('right') ? 'right' : 'left'
})

const verticalProperty = computed(() => { 
    return props.position.startsWith('top') ? 'top' : 'bottom'
})

const verticalOffsetVal = ref(props.verticalOffset)

const positionStyle = computed(() => {
    return {
        [verticalProperty.value]: `${verticalOffsetVal.value}px`,
        [horizontalProperty.value]: '10px'
    }
})

const onCloseHandler = () => {
    visible.value = false
}

</script>

<style scoped lang="scss">
.el-notification {
    position: fixed;
    right: 10px;
    top: 50px;
    width: 330px;
    padding: 14px 26px 14px 13px;
    border-radius: 8px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.el-notification__close-button {
    position: absolute;
    top: 5px;
    right: 5px;
}

.el-notification__title {
    font-weight: 600;
    font-size: larger;
}

.el-notification__message {
    font-size: medium;
}
</style>