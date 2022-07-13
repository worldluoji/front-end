<template>
  <div class="itxst">
    <div>
      <draggable
        :list="state.list"
        ghost-class="ghost"
        chosen-class="chosenClass"
        animation="300"
        @start="onStart"
        @end="onEnd"
      >
        <!--这里的element就是上面state.list中的一个元素-->
        <template #item="{ element }">
          <div class="item">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
    <div>{{ state.list }}</div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import draggable from "vuedraggable";
/**
 *   draggable 对CSS样式没有什么要求万物皆可拖拽
 *   :list="state.list"         //需要绑定的数组
 *   ghost-class="ghost"        //被替换元素的样式
 *   chosen-class="chosenClass" //选中元素的样式
 *   animation="300"            //动画效果
 *   @start="onStart"           //拖拽开始的事件
 *   @end="onEnd"               //拖拽结束的事件
 */
const state = reactive({
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  list: [
    { name: "www.itxst.com", id: 0 },
    { name: "www.baidu.com", id: 1 },
    { name: "www.google.com", id: 2 },
  ],
});

//拖拽开始的事件
const onStart = () => {
  console.log("开始拖拽");
};

//拖拽结束的事件
const onEnd = () => {
  console.log("结束拖拽");
};
</script>
<style scoped>
.itxst {
  width: 600px;
  display: flex;
}
.itxst > div:nth-of-type(1) {
  flex: 1;
}
.itxst > div:nth-of-type(2) {
  width: 270px;
  padding-left: 20px;
}
.item {
  border: solid 1px #eee;
  padding: 6px 10px;
  text-align: left;
}

.item:hover {
  cursor: move;
}

/* 选择紧跟 item 元素的首个 item 元素。 */
.item + .item {
  margin-top: 10px;
}
.ghost {
  border: solid 1px rgb(19, 41, 239);
}
.chosenClass {
  background-color: #f1f1f1;
}
</style>
