# Vue 动态改变css样式的方法总结

1. class，三元表达式
根据三元表达式来动态的在两种样式间切换
```
:class="[item.isPlaying ? 'playing' : '', 'drum-item’]"
```

2. :style=“xxxxx”
比如: 
```
:style="{color: 'red', font-size: '17px'}"
```
这里xxx也可以是个函数，或者计算属性

函数：
```
:style="handleStyle(second)”
......
handleStyle(deg) {
    return { transform: "rotate(" + deg + "deg)" };
},
```
计算属性：
```
:style=“imgStyle”
......
computed: {
    imgStyle() {
        return {
            padding: this.spacing + "px",
        }
    }
}
```
这两种方式很像，区别在于，使用方法的时候，视图刷新，函数就会重新计算一遍值。
计算属性，会把以前的值缓存起来，没有变化，就不会计算，直接返回以前的值。


3. 使用css变量，通过观察属性来动态的改变样式
譬如，我现在有这样一个css变量
```
<input id="base" type="color" name="base" v-model="base" />
<span class="spantext">VUE.JS</span>
```

```
data: ()=> {
    return {
        base: '#ffff'
    }
}
```

```
.spantext {
    color: var(--color);
}
```

现在通过观察属性，监听base值的变化
```
watch: {
    base: function(newValue, oldValue) {
        this.updateColor();
    }
}

updateColor() {
    this.$el.style.setProperty("--color", this.base)
}
```

4. Vue3新特性：在 CSS 中使用 v-bind()
```
js:
let inWidth = ref('30px')
let transition = 'cubic-bezier(0, 1.5, .6, 1)'

css:
.div {
    ...
    width: v-bind(inWidth)
}

.span-title {
    ...
    transition: all .9s v-bind(transition)
}
```

参考：https://blog.csdn.net/weixin_52235488/article/details/126290046