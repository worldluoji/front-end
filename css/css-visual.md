## css visual
1. text-align
- text-align: justify; causes all lines of text except the last line to meet the left and right edges of the line box.
- text-align: center; centers the text
- text-align: right; right-aligns the text
- text-align: left; (the default) left-aligns the text.

2. u tag
<u>Ph.D. students</u>

3. strong 和 em
<strong>strong会加粗</strong>, 
<em>em更多是强调</em>

This displays text as italicized, as the browser applies the CSS of font-style: italic; to the element

4. s tag
<s>Ph.D. students</s>

5. hr tag 
<hr />
add a horizontal line across the width of its containing element.

6. rgba
You can add a background-color to the element holding the text you want to emphasize. 
rgba stands for:
```
  r = red
  g = green
  b = blue
  a = alpha/level of opacity
```
The RGB values can range from 0 to 255. The alpha value can range from 1, 
which is fully opaque or a solid color, to 0, which is fully transparent or clear. 
rgba() is great to use in this case, as it allows you to adjust the opacity. 
This means you don't have to completely block out the background.

7. box-shadow 
The box-shadow property applies one or more shadows to an element.
The box-shadow property takes values for:
- offset-x (how far to push the shadow horizontally from the element),
- offset-y (how far to push the shadow vertically from the element),
- blur-radius,
- spread-radius
- color
in that order.
The blur-radius and spread-radius values are optional.

Multiple box-shadows can be created by using commas to separate properties of each box-shadow element:
box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

8. opacity 
this property in CSS is used to adjust the opacity, or conversely, the transparency for an item.
- A value of 1 is opaque, which isn't transparent at all.
- A value of 0.5 is half see-through.
- A value of 0 is completely transparent.

9. text-transform
The text-transform property in CSS is used to change the appearance of text. 
It's a convenient way to make sure text on a webpage appears consistently, without having to change the text content of the actual HTML elements.
The following table shows how the different text-transformvalues change the example text "Transform me".

Value	Result
lowercase	"transform me"
uppercase	"TRANSFORM ME"
capitalize	"Transform Me"
initial	Use the default value
inherit	Use the text-transform value from the parent element
none	Default: Use the original text

10. line-height 
this property to change the height of each line in a block of text.

11. z-index
When elements are positioned to overlap (i.e. using position: absolute | relative | fixed | sticky), 
the element coming later in the HTML markup will, by default, appear on the top of the other elements. 
However, the z-index property can specify the order of how elements are stacked on top of one another. 
It must be an integer (i.e. a whole number and not a decimal), 
and higher values for the z-index property of an element move it higher in the stack than those with lower values.

z-index支持除static定位外的其他定位方式，这点比较好理解，因为如果是普通定位话，一般是不会产生重叠的情况，自然也就不存在所谓的层级问题。
如果是利用负外边距产生的重叠，z-index是不起作用的，除非设置了非static的定位。

12. color theory
### tertiary color (第三色)
Computer monitors and device screens create different colors by combining amounts of red, green, and blue light. 
This is known as the RGB additive color model in modern color theory. 
Red (R), green (G), and blue (B) are called primary colors. 
Mixing two primary colors creates the secondary colors cyan (G + B), magenta (R + B) and yellow (R + G). 
You saw these colors in the Complementary Colors challenge. 
These secondary colors happen to be the complement to the primary color not used in their creation, 
and are opposite to that primary color on the color wheel. For example, magenta is made with red and blue, 
and is the complement to green.

Tertiary colors are the result of combining a primary color with one of its secondary color neighbors. 
For example, within the RGB color model, red (primary) and yellow (secondary) make orange (tertiary). 
This adds six more colors to a simple color wheel for a total of twelve.

There are various methods of selecting different colors that result in a harmonious combination in design. 
One example that can use tertiary colors is called the split-complementary color scheme. 
This scheme starts with a base color, then pairs it with the two colors that are adjacent to its complement. 
The three colors provide strong visual contrast in a design, but are more subtle than using two complementary colors.
即用一个base color, 找相邻颜色(有两个相邻的)的secondary color, 最终得到tertiary color。 最终，base color + 两个tertiary color 三种颜色组合。

### opposite colors
The Complementary Colors challenge showed that opposite colors on the color wheel can make each other 
appear more vibrant when placed side-by-side. However, the strong visual contrast can be jarring 
if it's overused on a website, and can sometimes make text harder to read if it's placed on a complementary-colored background. 
In practice, one of the colors is usually dominant and the complement is used to bring visual attention to certain content on the page.
常常用来引起视觉注意，让用户关注某块内容。

### hsl
Colors have several characteristics including hue, saturation, and lightness. CSS3 introduced the hsl() property 
as an alternative way to pick a color by directly stating these characteristics.

### 色相、饱和度、亮度：
Hue is what people generally think of as 'color'. If you picture a spectrum of colors starting with red on the left, 
moving through green in the middle, and blue on right, the hue is where a color fits along this line. 
In hsl(), hue uses a color wheel concept instead of the spectrum, where the angle of the color on the circle is given 
as a value between 0 and 360.

Saturation is the amount of gray in a color. A fully saturated color has no gray in it, 
and a minimally saturated color is almost completely gray. This is given as a percentage with 100% being fully saturated.

Lightness is the amount of white or black in a color. A percentage is given ranging from 0% (black) to 100% (white), 
where 50% is the normal color.
```
olor	HSL
red 	hsl(0, 100%, 50%)
yellow	hsl(60, 100%, 50%)
green	hsl(120, 100%, 50%)
cyan	hsl(180, 100%, 50%)
blue	hsl(240, 100%, 50%)
magenta	hsl(300, 100%, 50%)
```
Mixing white with a pure hue creates a tint（色调） of that color, and adding black will make a shade（阴影）. 
Alternatively, a tone is produced by adding gray or by both tinting and shading. 
Recall that the 's' and 'l' of hsl() stand for saturation and lightness, respectively. 
The saturation percent changes the amount of gray and the lightness percent determines how much white or black is 
in the color. This is useful when you have a base hue you like, but need different variations of it.

13.  CSS Linear Gradient
基本使用方法：
```
background: linear-gradient(gradient_direction, color 1, color 2, color 3, ...);
```
90deg makes a horizontal gradient (from left to right) and 45deg makes a diagonal gradient (from bottom left to top right).

Example:
```
background: linear-gradient(90deg, red, yellow, rgb(204, 204, 255));
```
Use a linear-gradient() for the div element's background, 
and set it from a direction of 35 degrees to change the color from #CCFFFF to #FFCCCC.

14. repeating-linear-gradient
similar to linear-gradient() with the major difference that it repeats the specified gradient pattern
example:
div{
    border-radius: 20px;
    width: 70%;
    height: 400px;
    margin:  50 auto;
    background: repeating-linear-gradient(
      45deg,
      yellow 0px,
      yellow 40px,
      black 40px,
      black 80px
    );
}

45度，0-40px黄色，40px到80px黑色，不断循环。

15. background
url('https://cdn-media-1.freecodecamp.org/imgr/MJAkxbh.png') 设置背景图

16. box-shadow + border-radis画一个蓝月亮
```
<style>
  .center {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background-color: transparent;
    border-radius: 50%;
    box-shadow: 25px 10px 0 0 blue;
  }

</style>
<div class="center"></div>
```

17.  pseudo-elements
the ::before and ::after pseudo-elements. 
These pseudo-elements are used to add something before or after a selected element.

For the ::before and ::after pseudo-elements to function properly, they must have a defined content property. 
This property is usually used to add things like a photo or text to the selected element. 
When the ::before and ::after pseudo-elements are used to make shapes, the content property is still required, 
but it's set to an empty string.

利用伪元素，使用css画一个爱心：
./motion/transform/heart.html

