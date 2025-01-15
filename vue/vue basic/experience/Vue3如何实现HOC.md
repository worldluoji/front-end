# Vue3如何实现HOC
```ts
import { SetupContext, h, ref } from"vue";
import OpenVipTip from"./open-vip-tip.vue";

exportdefaultfunction WithVip(BaseComponent: any) {
return {
    // 接读取子组件对象中的BaseComponent.props
    props: BaseComponent.props,
    setup(props, { attrs, slots, expose }: SetupContext) {
      const showVipContent = getShowVipContent();
      function getShowVipContent() {
        // 一些业务逻辑判断是否是VIP
        return true;
      }

      // 有的场景中我们需要在父组件中直接调用子组件的方法，按照以前的场景，我们只需要在子组件中expose暴露出去方法，然后在父组件中使用ref访问到子组件，这样就可以调用了。但是使用了HOC后，中间层多了一个高阶组件，所以我们不能直接访问到子组件expose的方法。
      const innerRef = ref();
      expose(
        new Proxy(
          {},
          {
            get(_target, key) {
              return innerRef.value?.[key];
            },
            has(_target, key) {
              return innerRef.value?.[key];
            },
          }
        )
      );

      // 如果在setup方法中返回一个函数，那么在Vue内部就会认为这个函数就是实际的render函数，并且在setup方法中我们天然的就可以访问定义的变量。
      return () => {
        return showVipContent
          ? h(
              BaseComponent,
              {
                // 调用h函数时分别将props和attrs透传给子组件。然后在高阶组件中使用ref访问到子组件赋值给innerRef变量。然后expose一个Proxy的对象，在get拦截中让其直接去执行子组件中的对应的方法。
                ...props,
                ...attrs,
                ref: innerRef,
              },
              slots // 透传插槽
            )
          : h(OpenVipTip);
      };
    },
  };
}
```

使用
```vue
<template>
  <EnhancedBlock1 />
</template>

<script setup lang="ts">
import Block1 from "./block1.vue";
import WithVip from "./with-vip.tsx";

const EnhancedBlock1 = WithVip(Block1);
</script>
```
那emit触发事件没有看见处理呢？答案是：我们无需去处理，因为父组件上面的@changeName="(value) => (name1 = value)"经过编译后就会变成属性：:onChangeName="(value) => (name1 = value)"。而这个属性由于我们没有在props中声明，所以他会作为attrs直接透传给子组件。


## reference
https://mp.weixin.qq.com/s/loBVuH4BCRvOKg0bLD1raQ