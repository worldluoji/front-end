<template>
    <div class="container">
        <div class="group">
            <div v-for="element,index in content">
                <component 
                    :is="element.name"
                    :key="index"
                    :props="element.props"
                    :data-index="index"
                ></component>
            </div>
        </div>
    </div>
</template>

<script>
import Cards from '../components'
export default {
    props: {
        content: Array
    },
    components: {
        ...Cards
    }
}
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .group {
        width: 100%;
    }
</style>