# client width and height

The Element.clientHeight read-only property is zero for elements with no CSS or inline layout boxes; otherwise, it's the inner height of an element in pixels. It includes padding but excludes borders, margins, and horizontal scrollbars (if present).

The clientHeight attribute must run these steps:
- If the element has no associated CSS layout box or if the CSS layout box is inline, return zero.
- If the element is the root element and the element’s node document is not in quirks mode, or if the element is the HTML body element and the element’s node document is in quirks mode, return the viewport height excluding the size of a rendered scroll bar (if any).
- else clientHeight can be calculated as: CSS height + CSS padding - height of horizontal scrollbar (if present).

<img src="./assets/client width and height.png" />

## reference
https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight