# Replaced elements
In CSS, a replaced element is an element whose representation is outside the scope of CSS; 
they're external objects whose representation is independent of the CSS formatting model.

Put in simpler terms, they're elements whose contents are not affected by the current document's styles. 
The position of the replaced element can be affected using CSS, but not the contents of the replaced element itself.

Typical replaced elements are:
```
<iframe>
<video>
<embed>
<img>
```
Some elements are treated as replaced elements only in specific cases:
```
<option>
<audio>
<canvas>
<object>
```

---

## embed
加载视频
```html
<embed type="video/webm" src="/media/cc0-videos/flower.mp4" width="250" height="200" />
```

---

## object
加载pdf:
```html
<object type="application/pdf" data="/media/examples/In-CC0.pdf" width="250" height="200"></object>
```
加载视频：
```html
<object
  type="video/webm"
  data="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
  width="600"
  height="140">
  <img src="path/image.jpg" alt="useful image description" />
</object>
```

---

## vedio
```html
<video controls width="250">
  <source src="/media/cc0-videos/flower.webm" type="video/webm" />

  <source src="/media/cc0-videos/flower.mp4" type="video/mp4" />

  Download the
  <a href="/media/cc0-videos/flower.webm">WEBM</a>
  or
  <a href="/media/cc0-videos/flower.mp4">MP4</a>
  video.
</video>
```
When using `<source>` elements, the browser attempts to load each source sequentially. If a source fails (e.g., due to an invalid URL or unsupported format), the next source is attempted, and so on. An error event fires on the `<video>` element after all sources have failed; error events are not fired on each individual `<source>` element.

---

## 对比
- 视频推荐使用 `<video>` 标签：如果你只是需要嵌入标准视频格式（如 MP4、WebM、OGG），并且希望使用内置的播放控件，`<video>` 标签是最简单和最标准的选择。
- 使用 `<embed>` 标签：如果你需要嵌入特定插件（如Flash、QuickTime）的内容，可以使用 `<embed>` 标签。
- 使用 `<object>` 标签：如果你需要更复杂的嵌入逻辑，或者需要嵌入多种类型的资源（如PDF、Flash、音频），可以使用 `<object>` 标签。

---

## Controlling object position within the content box
Certain CSS properties can be used to specify how the object contained within the replaced element should be positioned within the element's box area. These are defined by the CSS Images specification:

### object-fit
Specifies how the replaced element's content object should be fitted to the containing element's box.

- contain
被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“黑边”。

- cover
被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。

- fill
被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。

- none
被替换的内容将保持其原有的尺寸。

- scale-down
内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些

### object-position
Specifies the alignment of the replaced element's content object within the element's box.

### notice
Note: The object-fit property has no effect on `<iframe>`, `<embed>`, and `<fencedframe>` elements.

---

## reference
- https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element
- https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit