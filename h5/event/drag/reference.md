# reference
- https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragstart_event
- https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe


## notes
1. 由于同源策略限制，你只能对同源的iframe进行拖拽操作。如果不是同源，那么你无法直接访问和操作iframe的内容。
对于跨域iframe，需要iframe内部提供相应的接口才能进行交互。

2. dragstart、dragend是作用域被拖拽的组件上， drop, dragover、dragenter、dragleave是作用在目标区域。