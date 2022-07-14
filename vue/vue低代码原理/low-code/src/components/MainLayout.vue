<template>
    <div class="main">
        <header>低代码实验Demo</header>
        <div class="left-sidebar">
            <LeftSide />
        </div>
        <main>
            <BaseEditor />
        </main>
        <div class="right-sidebar">
            <RightSide />
        </div>
        <footer>
            低代码实验——2022
        </footer>
    </div>
</template>

<script setup lang="ts">
import LeftSide from './LeftSide.vue'
import RightSide from './RightSide.vue'
import BaseEditor from './BaseEditor.vue'
</script>

<style type="less" scoped>
    .main {
        display: grid;
        height: 100vh;
        grid-template: 8vh 1fr 8vh / 15vw 1fr 15vw;
    }

    header {
        background: lightblue;
        padding: 2rem;
        grid-column: 1 / 4;
        text-align: center;
    }

    .left-sidebar {
        background: lemonchiffon;
        grid-column: 1 / 2;
    }

    main {
        grid-column: 2 / 3;
        border-width: 2vw;
        padding: 2vw;
    }

    .right-sidebar {
        background: lemonchiffon;
        grid-column: 3 / 4;
    }

    footer {
        background: lightblue;
        padding: 2rem;
        text-align: center;
        grid-column: 1 / 4;
    }

    .left-sidebar,
    .right-sidebar {
        padding: 1rem;
    }
</style>
