# css grid
栅格系统（CSS Grids）是一种运用固定的格子设计版面布局，在报刊杂志上尤为常见。
如今响应式设计大行其道，对于前端开发，栅格系统可以：

- 提高生产力，通过在网格的划分，元素更容易堆放而且在跨浏览器上面具有一致性，使我们可以专心的注意布局而不是兼容上。
- 具有灵活性，无论是什么样的布局，都可以拆分到粒度为一个网格的大小。
- 支持响应式设计，栅格系统本身能很好的和响应式设计结合在一起，或者说，我们的栅格系统是基于响应式设计的。

1. grid-template-columns
```
.container {
    display: grid;
    grid-template-columns: 50px 50px;
}
```
This will give your grid two columns that are each 50px wide. 

grid-template-rows使用方式与grid-template-columns类似，只是针对行。

一些属性：

fr: sets the column or row to a fraction of the available space,

auto: sets the column or row to the width or height of its content automatically,

%: adjusts the column or row to the percent width of its container.

Here's the code that generates the output in the preview:

grid-template-columns: auto 50px 10% 2fr 1fr;

其它：

1) repeat：
   
Here's an example that would create the 100 row grid, each row at 50px tall:
```
grid-template-rows: repeat(100, 50px);
```
You can also repeat multiple values with the repeat function and insert the function amongst other values when defining a grid structure. Here's what that looks like:
```
grid-template-columns: repeat(2, 1fr 50px) 20px;
```
This translates to:
```
grid-template-columns: 1fr 50px 1fr 50px 20px;
```

```
grid-template-columns:repeat(auto-fill, minmax(60px, 1fr));
```
When the container changes size, this setup keeps inserting 60px columns and stretching them until it can insert another one. 
Note: If your container can't fit all your items on one row, it will move them down to a new one.

```
grid-template-columns:repeat(auto-fit, minmax(60px, 1fr));
```
auto-fit works almost identically to auto-fill. The only difference is that when the container's size exceeds 
the size of all the items combined, auto-fill keeps inserting empty rows or columns and pushes your items to the side, 
while auto-fit collapses those empty rows or columns and stretches your items to fit the size of the container.

2) minmax
```
grid-template-columns: 100px minmax(50px, 200px);
```
In the code above, grid-template-columns is set to create two columns; 
the first is 100px wide, and the second has the minimum width of 50px and the maximum width of 200px.


2. grid-column-gap
Sometimes you want a gap in between the columns. To add a gap between the columns, use the grid-column-gap
同样还有grid-row-gap
```
grid-gap: 10px 20px;
```
等价于：
```
grid-row-gap: 10px;
grid-column-gap: 20px;
```

3. grid-column
The grid-column property is the first one for use on the grid items themselves，前面的属性都是用在container.

use the grid-column property in conjunction with the line numbers you want the item to start and stop at:
```
   1___2___3___4
    |  |   |   |
   2___ ___ ___
    |  |   |   |  
   3___ ___ ___
grid-column: 1 / 3;
```
This will make the item start at the first vertical line of the grid on the left and span to the 3rd line of the grid, 
consuming two columns.
grid-row同样的用法

4. justify-self property on a grid item. 

By default, this property has a value of stretch, which will make the content fill the whole width of the cell
exmple:
```
justify-self: center; 
```
这时候只占据cell的中间位置

其它值：
- start: aligns the content at the left of the cell,
- center: aligns the content in the center of the cell,
- end: aligns the content at the right of the cell.
- align-self 同 justify-self使用，只是height方向

5. justify-items：center 会让所有item都居中，写在container里

对应的垂直方向还有align-items

justify-self和align-self会覆盖justify-items和align-items.

6. grid-template-areas and grid-area
group cells of your grid together into an area and give the area a custom name
```
grid-template-areas:
  "header header header"
  "advert content content"
  "footer footer footer";
```
The code above merges the top three cells together into an area named header,
the bottom three cells into a footer area, and it makes two areas in the middle row; 
advert and content。
Every word in the code represents a cell and every pair of quotation marks represent a row. 
In addition to custom labels, you can use a period (.) to designate an empty cell in the grid.

这里通过grid-area把item1指定为上面的header区域
```
.item1 {
    grid-area: header;
}
```
This lets the grid know that you want the item1 class to go in the area named header. 
In this case, the item will use the entire top row because that whole row is named as the header area.

grid-area的其它使用方式：
```
item1 { grid-area: 1/1/2/4; }
```
This is using the line numbers you learned about earlier to define where the area for this item will be. 
The numbers in the example above represent these values:

grid-area: horizontal line to start at / vertical line to start at / horizontal line to end at / vertical line to end at;
So the item in the example will consume the rows between lines 1 and 2, and the columns between lines 1 and 4.

7. example1: grid布局基本使用
```
<style>
  .item1{background:LightSkyBlue;}
  .item2{background:LightSalmon;}
  .item3{background:PaleTurquoise;}
  .item4{background:LightPink;}
  .item5{background:PaleGreen;}

  .container {
    font-size: 40px;
    min-height: 100px;
    width: 100%;
    background: LightGray;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 10px;
  }

  .container2 {
    font-size: 40px;
    min-height: 100px;
    width: 100%;
    background: Silver;
    display: grid;
    /* Only change code below this line */

    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));

    /* Only change code above this line */
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
</style>

<div class="container">
  <div class="item1">1</div>
  <div class="item2">2</div>
  <div class="item3">3</div>
  <div class="item4">4</div>
  <div class="item5">5</div>
</div>
<div class="container2">
  <div class="item1">1</div>
  <div class="item2">2</div>
  <div class="item3">3</div>
  <div class="item4">4</div>
  <div class="item5">5</div>
</div>
```

8. example2:

in the preview, when the viewport width is 300px or more, the number of columns changes from 1 to 2. 
The advertisement area then occupies the left column completely.

When the viewport width is 400px or more, make the header area occupy the top row completely and 
the footer area occupy the bottom row completely.
```
<style>
  .item1 {
    background: LightSkyBlue;
    grid-area: header;
  }

  .item2 {
    background: LightSalmon;
    grid-area: advert;
  }

  .item3 {
    background: PaleTurquoise;
    grid-area: content;
  }

  .item4 {
    background: lightpink;
    grid-area: footer;
  }

  .container {
    font-size: 1.5em;
    min-height: 300px;
    width: 100%;
    background: LightGray;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 50px auto 1fr auto;
    grid-gap: 10px;
    grid-template-areas:
      "header"
      "advert"
      "content"
      "footer";
  }

  @media (min-width: 300px){
    .container{
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr auto;
      grid-template-areas:
        "advert header"
        "advert content"
        "advert footer";
    }
  }

  @media (min-width: 400px){
    .container{
      grid-template-areas:
      /* Only change code below this line */
        "header header"
        "advert content"
        "footer footer";
      /* Only change code above this line */
    }
  }
</style>

<div class="container">
  <div class="item1">header</div>
  <div class="item2">advert</div>
  <div class="item3">content</div>
  <div class="item4">footer</div>
</div>
```

9. example3: grid布局嵌套
```
<style>
  .container {
    font-size: 1.5em;
    min-height: 300px;
    width: 100%;
    background: LightGray;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr auto;
    grid-gap: 10px;
    grid-template-areas:
      "advert header"
      "advert content"
      "advert footer";
  }
  .item1 {
    background: LightSkyBlue;
    grid-area: header;
  }

  .item2 {
    background: LightSalmon;
    grid-area: advert;
  }

  .item3 {
    background: PaleTurquoise;
    grid-area: content;
    /* Only change code below this line */
    display: grid;
    grid-template-columns: auto 1fr;

    /* Only change code above this line */
  }

  .item4 {
    background: lightpink;
    grid-area: footer;
  }

  .itemOne {
    background: PaleGreen;
  }

  .itemTwo {
    background: BlanchedAlmond;
  }

</style>

<div class="container">
  <div class="item1">header</div>
  <div class="item2">advert</div>
  <div class="item3">
    <div class="itemOne">paragraph1</div>
    <div class="itemTwo">paragraph2</div>
  </div>
  <div class="item4">footer</div>
</div>
```

## 其它资料
- <a href="https://zhuanlan.zhihu.com/p/81007116">三种最主流的响应式栅格</a>
- <a href="https://zhuanlan.zhihu.com/p/256353171">最强大的 CSS 布局 —— Grid 布局</a>
- <a href="https://juejin.cn/post/6844904200359378951">手写一个简单的响应式栅格</a>