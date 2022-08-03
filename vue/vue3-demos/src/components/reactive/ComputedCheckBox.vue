<template>
<div>
    <input type="text" v-model="title" @keydown.enter="addTodo">  
    <ul>
       <li v-for="todo in todos" :key="todo.title"> 
        <input type="checkbox" v-model="todo.done">      
        <span :class="{done:todo.done}"> {{todo.title}}</span>
       </li>
    </ul>  
    全选<input type="checkbox" v-model="allDone">  
    <span> {{active}}  / {{all}} </span>
</div>
</template>

<script setup lang="ts">
    import { ref, reactive, computed } from 'vue'
    let title = ref('')
    let todos = reactive([
        {
            title: 'TypeScript',
            done: true,
        },
        {
            title: 'Golang',
            done: false,
        }
    ])
    const addTodo = () => {
        todos.push({
            title: title.value,
            done: false
        })
        title.value = ''
    }

    let active = computed(() => todos.filter(todo => !todo.done).length)
    let all = computed(() => todos.length)
    let allDone = computed({
        get: () => active.value === 0,
        set: (val: boolean) => {
            todos.forEach(todo => {
                todo.done = val
            })
        }
    })

</script>

<style scoped>
  .done{
    color:gray;    
    text-decoration: line-through;
  }
</style>