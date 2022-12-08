<template>
    <div class="schema-wrapper">
      <el-popover placement="right" :width="400" trigger="click">
        <template #reference>
          <el-button class="schema-btn">查看Schema</el-button>
        </template>
        <div>
            {{ p.data }}
        </div>
      </el-popover>
    </div>
</template>

<script setup>
const p = defineProps({
    data: String
})
</script>

<style scoped>
    .schema-btn {
        margin-right: 16px
    }

    .schema-wrapper {
        display: flex; 
        align-items: center
    }
</style>

