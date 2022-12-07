<template>
    <div class="layout-box-container">
        <div class="margin-top-div noborder">
            <span class="next-noborder">
                <input placeholder="0" maxlength="3" height="100%" autocomplete="off" v-model="atomicAttrs.marginTop" @change="change"/>
            </span>
        </div>
         <div class="margin-right-div noborder">
            <span class="next-noborder">
                <input placeholder="0" maxlength="3" height="100%" autocomplete="off" v-model="atomicAttrs.marginRight" @change="change">
            </span>
        </div>
        
        <div class="margin-bottom-div">
            <span class="help-txt">MARGIN</span>
            <span class="next-noborder">
            <input placeholder="0" maxlength="3" height="100%" autocomplete="off" v-model="atomicAttrs.marginBottom" @change="change">
            </span>
        </div>
        
        <div class="margin-left-div">
            <span class="next-input next-medium next-noborder">
            <input placeholder="0" maxlength="3" height="100%" autocomplete="off" v-model="atomicAttrs.marginLeft" @change="change">
            </span>
        </div>
        <!--
        <div class="padding-top-div">
            <span class="next-input next-medium next-noborder">
            <input placeholder="0" maxlength="3" height="100%" autocomplete="off" value="">
            </span>
        </div>
        <div class="padding-right-div">
            <span class="next-input next-medium next-noborder">
            <input placeholder="0" maxlength="3" height="100%" autocomplete="off" value="">
            </span>
        </div>
        <div class="padding-bottom-div">
            <span class="help-txt">PADDING</span>
            <span class="next-input next-medium next-noborder">
            <input placeholder="0" maxlength="3" height="100%" autocomplete="off" value="">
            </span>
        </div>
        <div class="padding-left-div" data-spm-anchor-id="0.0.0.i19.594f4b2cvmG89Z">
            <span class="next-input next-medium next-noborder">
            <input placeholder="0" maxlength="3" height="100%" autocomplete="off" value="">
            </span>
        </div> -->
    </div>
</template>
<script setup>
const p = defineProps({
    props: {
        type: Object,
        required: true
    }
})

let atomicAttrs = {
    marginTop: (p.props && p.props.marginTop) || '0',
    marginRight: (p.props && p.props.marginRight) || '0',
    marginBottom: (p.props && p.props.marginBottom) || '0',
    marginLeft: (p.props && p.props.marginLeft) || '0',
}

const emit = defineEmits(['change']);
const change = () => {
    // console.log('set...', atomicAttrs);
    emit('change', { atomicAttrs });
};
</script>

<style scoped>
.layout-box-container{
    position: relative;
    width: 242px;
    height: 150px
}

input, .noborder, .next-noborder {
    border: none
}

.margin-top-div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid #d6e4ff;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
}

.next-noborder {
    position: absolute;
    left: 0;
    right: 0;
    top: -20px;
    height: 20px!important;
    background: transparent;
    width: 100%;
}

.margin-right-div .next-noborder {
    top: 40px;
}
.margin-bottom-div .next-noborder {
    top: 0;
    bottom: -20px;
}
.margin-left-div .next-noborder {
    top: 40px;
    left: -20px;
}

input {
    text-align: center;
    height: 20px;
    width: 202px;
    padding: 0;
    background: transparent;
    line-height: 20px;
    font-size: 12px;
}

.margin-right-div .next-noborder input {
    width: 20px;
}

.margin-left-div .next-noborder input {
    width: 20px;
}

.margin-right-div {
    position: absolute;
    top: 5px;
    bottom: 5px;
    right: 0;
    width: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 20px solid #d6e4ff;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
}

.margin-bottom-div {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #d6e4ff;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
}

.help-txt {
    float: left;
    margin-left: -10px;
    -webkit-transform: scale(.75);
    -ms-transform: scale(.75);
    transform: scale(.75);
}

.margin-left-div {
    position: absolute;
    top: 5px;
    bottom: 5px;
    left: 0;
    width: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #d6e4ff;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
}
</style>
