## . :is 和 :where
```
:is(选择器) 选择器 {}
:where(选择器) 选择器 {}
```
相当于是一个条件，将满足条件的进行筛选，添加样式；

同样的写法，两个伪类选择器的优先级不一样，:is的优先级高于:where的优先级；

The :is() CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list.
[示例](./pseudo/is-where.html)

:where：The :where() CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list.

[示例](./pseudo/is-where.html)


The difference between :where() and :is() is that :where() always has 0 specificity(优先级), whereas :is() takes on the specificity of the most specific selector in its arguments.
