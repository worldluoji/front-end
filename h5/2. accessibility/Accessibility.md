# Accessibility
无障碍是一种让尽可能多的用户可以使用你的网站的做法。传统上我们认为这只与残疾人士有关，但提升网站的无障碍也可以让其他用户群体受益。比如使用移动设备的人群，那些使用低速网络连接的人群。

https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Accessibility/What_is_accessibility

## 1. alt
An alt attribute helps in cases where the image fails to load or can't be seen by a user. 
Search engines also use it to understand what an image contains to include it in search results. 
Here's an example:
```html
<img src="importantLogo.jpeg" alt="Company logo">
```
sometimes images are grouped with a caption already describing them, or are used for decoration only. In these cases, alt text may seem redundant or unnecessary.

也就是说，当图片已经有别的标题，或者只是装饰作用，alt可能就是冗余的或者没有必要的。

When an image is already explained with text content or does not add meaning to a page, 
the img still needs an alt attribute, but it can be set to an empty string. Here's an example:
```html
<img src="visualDecoration.jpeg" alt="">
```
这时候如果图片加载不出来则不会显示加载不出来的图标。

<br>

## 2. h tag
One final point, each page should always have one (and only one) h1 element, which is the main subject of your content.

This and the other headings are used in part by search engines to understand the topic of the page.

a page with an h2 element followed by several subsections labeled with h4 tags would confuse a screen reader user.

即h2后面不要接h4, 应该接h3,按顺序来。

<br>

## 3. 语义化标签
a browser renders these elements similar to the humble div. 
However, using them where appropriate gives additional meaning to your markup. 

The tag name alone can indicate the type of information it contains, 
which adds semantic meaning to that content. 

Assistive technologies can access this information to provide better page summary or navigation options to their users.

为什么要语义化？
- 代码结构: 使页面没有css的情况下，也能够呈现出很好的内容结构
- 有利于SEO: 爬虫依赖标签来确定关键字的权重，因此可以和搜索引擎建立良好的沟通，帮助爬虫抓取更多的有效信息
- 提升用户体验:例如title、alt可以用于解释名称或者解释图片信息，以及label标签的灵活运用
- 便于团队开发和维护: 语义化使得代码更具有可读性，让其他开发人员更加理解你的html结构，减少差异化
- 方便其他设备解析: 如屏幕阅读器、盲人阅读器、移动设备等，以有意义的方式来渲染网页

### (1) 结构
```html
<header>
  <h1>Weapons of the Ninja</h1>
</header>
<body>
  <nav></nav>

  <main>
    
  </main>

  <footer></footer>
</body>
```
header shares the embedded landmark feature you saw with main, 
allowing assistive technologies to quickly navigate to that content.

The header is meant for use in the body tag of your HTML document. 
It is different than the head element, which contains the page's title, meta information, etc.

the footer element has a built-in landmark feature that allows assistive devices to quickly navigate to it. 

It's primarily used to contain copyright information or links to related documents that usually sit at the bottom of a page.

### (2) article、section
article is another one of the new HTML5 elements that add semantic meaning to your markup. 

article is a sectioning element and is used to <strong>wrap independent, self-contained content</strong>. 

The tag works well with blog entries, forum posts, or news articles.

article定义页面独立的内容，它可以有自己的header、footer、sections等，专注于单个主题的博客文章，报纸文章或网页文章。
article可以嵌套article，只要里面的article与外面的是部分与整体的关系。

The section element is also new with HTML5, and has a slightly different semantic meaning than article. 

An article is for standalone content, and a section is for <strong>grouping thematically related content</strong>.
They can be used within each other, as needed. 
For example, if a book is the article, then each chapter is a section.

When there's no relationship between groups of content, then use a div.

section元素用于标记文档的各个部分，例如长表单文章的章节或主要部分。

example:
```html
<article class="film_review">
  <h2>Jurassic Park</h2>
  <section class="main_review">
    <h3>Review</h3>
    <p>Dinos were great!</p>
  </section>
  <section class="user_reviews">
    <h3>User reviews</h3>
    <article class="user_review">
      <h4>Too scary!</h4>
      <p>Way too scary for me.</p>
      <footer>
        <p>
          Posted on
          <time datetime="2015-05-16 19:00">May 16</time>
          by Lisa.
        </p>
      </footer>
    </article>
    <article class="user_review">
      <h4>Love the dinos!</h4>
      <p>I agree, dinos are my favorite.</p>
      <footer>
        <p>
          Posted on
          <time datetime="2015-05-17 19:00">May 17</time>
          by Tom.
        </p>
      </footer>
    </article>
  </section>
  <footer>
    <p>
      Posted on
      <time datetime="2015-05-15 19:00">May 15</time>
      by Staff.
    </p>
  </footer>
</article>
```

### (3) nav
The nav element is another HTML5 item with the embedded landmark feature for easy screen reader navigation. 

This tag is meant to wrap around the main navigation links in your page.

定义页面的导航链接部分区域，不是所有的链接都需要包含在`<nav>`中:

It's not necessary for all links to be contained in a `<nav>` element. 
`<nav>` is intended only for a major block of navigation links; 
typically the `<footer>` element often has a list of links that don't need to be in a `<nav>` element.

examples:
```html
<nav class="menu">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
<style>
a {
  color: #ff0000;
}

a:hover,
a:visited,
a:focus {
  color: #a60000;
  text-decoration: none;
}

a:active {
  color: #000000;
  background-color: #a60000;
}
</style>
```

### (4) audio
HTML5's audio element gives semantic meaning when it wraps sound or audio stream content in your markup. 

Audio content also needs a text alternative to be accessible to people who are deaf or hard of hearing.

This can be done with nearby text on the page or a link to a transcript.

The audio tag supports the controls attribute. This shows the browser default play, pause, and other controls, 

and supports keyboard functionality. This is a boolean attribute, meaning it doesn't need a value, 
its presence on the tag turns the setting on.

example 1:
```
<audio id="meowClip" controls>
  <source src="audio/meow.mp3" type="audio/mpeg">
  <source src="audio/meow.ogg" type="audio/ogg">
</audio>
```

Note: Multimedia content usually has both visual and auditory components. 
It needs synchronized captions and a transcript so users with visual and/or auditory impairments can access it. 

Generally, a web developer is not responsible for creating the captions or transcript, but needs to know to include them.

example 2:
```html
<body>
  <header>
    <h1>Real Coding Ninjas</h1>
  </header>
  <main>
    <p>A sound clip of Zersiax's screen reader in action.</p>
    <audio controls>
      <source src="https://s3.amazonaws.com/freecodecamp/screen-reader.mp3" type="audio/mpeg">
    <audio>
  </main>
</body>
```

### (5) figure
HTML5 introduced the figure element and the related figcaption. Used together, 
these items wrap a visual representation (like an image, diagram, or chart) along with its caption.

Wrapping these elements together gives a two-fold accessibility boost by semantically grouping related content 
and providing a text alternative(可选择的、备选的、可替代的) explaining the figure.

example:
```html
<figure>
  <img src="roundhouseDestruction.jpeg" alt="Photo of Camper Cat executing a roundhouse kick">
  <br>
  <figcaption>
    Master Camper Cat demonstrates proper form of a roundhouse kick.
  </figcaption>
</figure>
```

### (6) label for
```html
<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name">
</form>
```
label的for关联input的id

### (7) fieldset
The fieldset tag surrounds the entire grouping of radio buttons to achieve this. 
It often uses a legend tag to provide a description for the grouping, which screen readers read for each choice in the fieldset element.

The fieldset wrapper and legend tag are not necessary when the choices are self-explanatory, like a gender selection.Using a label with the for attribute for each radio button is sufficient.

Here's an example:
```html
<form>
  <fieldset>
    <legend>Choose one of these three items:</legend>
    <input id="one" type="radio" name="items" value="one">
    <label for="one">Choice One</label><br>
    <input id="two" type="radio" name="items" value="two">
    <label for="two">Choice Two</label><br>
    <input id="three" type="radio" name="items" value="three">
    <label for="three">Choice Three</label>
  </fieldset>
</form>
```

### (8) date
```html
<input type="date" id="pickdate" name="date">
```
可用于选择日期

### (9) time
HTML5 also introduced the time element along with a datetime attribute to standardize times. 
The time element is an inline element that can wrap a date or time on a page. 

A datetime attribute holds a valid format of that date. This is the value accessed by assistive devices. 

It helps avoid confusion by stating a standardized version of a time, 
even if it's informally or colloquially written in the text.

example：
```html
<time datetime="2016-09-15">Thursday, September 15<sup>th</sup></time>
```

### (10) strong、em
strong 会加粗, 把文本定义为语气更强的强调的内容，以表示内容的重要性

em 通常呈现为斜体文字, 标记内容着重点（大量用于提升段落文本语义），更多是强调

### (11) abbr
解释缩写词。使用title属性可提供全称，只在第一次出现时使用就ok。
```html
The <abbr title="People's Republic of China">PRC</abbr> was founded in 1949.
```

## (12) blockquote
定义块引用，浏览器会在 blockquote 元素前后添加换行，并增加外边距。cite属性可用来规定引用的来源
```html
<blockquote cite="https://en.wikiquote.org/wiki/Marie_Curie">
    Here is a long quotation here is a long quotation here is a long quotation
    here is a long quotation here is a long quotation here is a long quotation
    here is a long quotation here is a long quotation here is a long quotation.
</blockquote>
```

<br>

## 4. CSS's magic can also improve accessibility on your page when you want to visually hide content meant only for screen readers.

This happens when information is in a visual format (like a chart), but screen reader users need an 
alternative presentation (like a table) to access the data. 
CSS is used to position the screen reader-only elements off the visual area of the browser window.
```css
.sr-only {
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    top: auto;
    overflow: hidden;
}
```
Note: The following CSS approaches will NOT do the same thing:
display: none; or visibility: hidden; hides content for everyone, including screen reader users;
Zero values for pixel sizes, such as width: 0px; height: 0px; removes that element from the flow of your document,
meaning screen readers will ignore it.

<br>

## 5. Improve Readability with High Contrast Text
(1) The Web Content Accessibility Guidelines (WCAG) recommend at least a 4.5 to 1 contrast ratio for normal text. 

The ratio is calculated by comparing the relative luminance(相对亮度) values of two colors. 

This ranges from 1:1 for the same color, or no contrast, to 21:1 for white against black, the most substantial contrast. 

There are many contrast checking tools available online that calculate this ratio for you.

(2) Avoid Colorblindness Issues by Using Sufficient Contrast
First, color alone should not be used as the only way to convey important information because screen reader users won't see it. 

Second, foreground and background colors need sufficient contrast so colorblind users can distinguish them.(背景色和内容颜色要分明，不要把颜色作为唯一传递重要信息的途径)

The WCAG-recommended contrast ratio of 4.5:1 applies for color use as well as gray-scale combinations.

In practice, the 4.5:1 contrast ratio can be reached by shading (adding black to) the darker color 
and tinting (adding white to) the lighter color. 

Darker shades on the color wheel are considered to be shades（色调） of blues, violets（紫罗兰）, magentas（洋红色）, and reds, 

whereas lighter tinted colors are oranges, yellows, greens, and blue-greens.

深色背景+浅色文字  vs 浅色背景+深色文字

(3) Carefully Choosing Colors that Convey Information
The most common form is a reduced sensitivity to detect greens. 因为要考虑红绿色盲用户。

Note: Some online color picking tools include visual simulations of how colors appear for different types of colorblindness. 

These are great resources in addition to online contrast checking calculators.

<br>

## 6. Give Links Meaning by Using Descriptive Link Text
Having a list of "click here" or "read more" links isn't helpful. 
Instead, use brief but descriptive text within the a tags to provide more meaning for these users.

<br>

## 7. accesskey
HTML offers the accesskey attribute to specify a shortcut key to activate or bring focus to an element. 

Adding an accesskey attribute can make navigation more efficient for keyboard-only users.
Here's an example:
```
<button accesskey="b">Important Button</button>
```
也可以用于a标签等

<br>

## 8. tabindex
The HTML tabindex attribute has three distinct functions relating to an element's keyboard focus. 
When it's on a tag, it indicates that the element can be focused on. 

The value (an integer that's positive, negative, or zero) determines the behavior.

Certain elements, such as links and form controls, automatically receive keyboard focus when a user tabs through a page. 

It's in the same order as the elements come in the HTML source markup. 
This same functionality can be given to other elements, such as div, span, and p, by placing a tabindex="0" attribute on them. 

Here's an example:
```html
<style>
p:focus {
  background-color: yellow;
}
</style>
<p tabindex="0">Instructions: Fill in ALL your information then click <b>Submit</b></p>
```
你按键盘的Tab建的时候，就会foucs上去。数值越低，优先级越高。

Note: A negative tabindex value (typically -1) indicates that an element is focusable, but is not reachable by the keyboard. 

This method is generally used to bring focus to content programmatically 
(like when a div used for a pop-up window is activated), and is beyond the scope of these challenges.

<br>

## 9. detail and summary
`<details>` 元素可创建一个组件，仅在被切换成展开状态时，它才会显示内含的信息。
`<summary>` 元素可为该部件提供概要或者标签。

example:
```html
<details>
  <summary>Details</summary>
  Something small enough to escape casual notice.
</details>
```