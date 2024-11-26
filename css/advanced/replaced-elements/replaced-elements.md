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
<object> 可以加载pdf、视频
```

<br>

## Controlling object position within the content box
Certain CSS properties can be used to specify how the object contained within the replaced element should be positioned within the element's box area. These are defined by the CSS Images specification:

### object-fit
Specifies how the replaced element's content object should be fitted to the containing element's box.

### object-position
Specifies the alignment of the replaced element's content object within the element's box.

<br>

## reference
- https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element