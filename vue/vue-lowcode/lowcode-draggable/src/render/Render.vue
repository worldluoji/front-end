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
import Carousel from '../components/Carousel.vue'
import Image from '../components/Image.vue'
import Offer from '../components/Offer.vue'
import List from '../components/List.vue'
export default {
    props: {
        content: Array
    },
    components: {
        Image,
        Carousel,
        Offer,
        List
    }
}
</script>

<style scoped>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .group {
        display: flex;
        flex-direction: column;
        width: 375px;
        min-height: 500px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
</style>