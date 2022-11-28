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
import Image from '../components/Image.vue'
import Offer from '../components/Offer.vue'
import List from '../components/List.vue'
import NavBar from '../components/NavBar.vue';
export default {
    props: {
        content: Array
    },
    components: {
        Image,
        Offer,
        List,
        NavBar
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