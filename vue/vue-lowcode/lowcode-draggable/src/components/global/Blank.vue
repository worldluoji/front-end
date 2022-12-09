<template class="container">
    <div v-if="props && props.element">
        <component :is="props.element" @click.stop="showPanel(props.element)" :props="props.props" :eid="props.id" :design="canvas.isDesign"/>
    </div>
    <div v-else> 
        点击选择卡片
    </div>
</template>

<script>
import Image from '../Image.vue'
import Offer from '../Offer.vue'
import NavBar from '../NavBar.vue'
import List from '../List.vue'
import currentPanelStore from '../../store/currentPanel.js'
import canvasStore from '../../store/canvas.js';
export default {
    components: {
        Image,
        Offer,
        NavBar,
        List
    },
    props: {
        props: { 
            type: Object,
            required: true
        },
    },
    data() {
        return {
            currentPanel: currentPanelStore(),
            canvas: canvasStore()
        }
    },
    methods: {
        showPanel(element) {
            const elementObj = {
                id: this.props.id,
                name: element,
            }
            // console.log('blank', elementObj)
            this.currentPanel.set(elementObj)
        }
    }
}

</script>

<style scoped>
    .container {
        padding: 10px 16px;
    }
</style>