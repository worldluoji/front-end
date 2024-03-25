<template>
    <component v-if="node" :is="node.type.resolvedName" :style="node.css" v-bind="componentProps"> 
        <template v-for="nodeId in node.nodes" :key="nodeId">
            <Node :node-id="nodeId" :schema="p.schema"/>
        </template>
    </component>
</template>

<script setup lang="ts">
import { INode, ISchema } from '../types/schema';
import { watch, ref, onBeforeMount } from 'vue';
const p = defineProps<{
  schema: ISchema;
  nodeId: string
}>();


// const node = reactive(p.schema.htmlBody[p.nodeId]); 当p.nodeId发生变化时，仅仅重新获取p.schema.htmlBody[p.nodeId]并不会自动更新node的值。因为在Vue 3的reactive函数中，node只是一个对p.schema.htmlBody[p.nodeId]当前值的响应式代理，而不是对p.nodeId本身的响应式绑定

let defaultNode: INode = {
    type: {
        resolvedName: 'div'
    },
    css: {},
    props: {},
    displayName: 'div'
}

let nodeId = ref(p.nodeId);
let node = ref(defaultNode);

let componentProps = ref({});

onBeforeMount(() => {
  node.value = p.schema.htmlBody[p.nodeId];
  componentProps.value = node.value.props;
  console.log(0, node.value);
})

watch(nodeId, (newId) => {
  node.value = p.schema.htmlBody[newId];
  console.log(1, newId);
});

// let componentProps = reactive(node.value.props); 如果只是简单修改node.props内部属性的值（非替换整个对象），componentProps会随着变化；若替换整个node.props对象，则需重新赋值给componentProps才能保持同步。

// 由于对象属性的变更可能涉及深层次的嵌套，所以在监听对象时，通常需要开启deep选项，以确保深层属性的变更也能被正确监听。
watch(node.value.props, (newProps) => {
    componentProps.value = newProps;
    console.log(2, newProps);
}, { deep: true });

</script>