# 原子化CSS
## 什么是原子化CSS（Atomic CSS)
与原子化相对应的就是组件化，比如在以前我们使用的bootstrap，它提供了现成的样式解决方案，
或者自己编写的一个样式class也是组件化，原子化就是将一个css类只对应一个规则。
常用的原子化CSS框架有 Tailwind CSS、Unocs. 常见的组件化的开发方式是：
```
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```
以Tailwind为例，原子化方式：
```
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```
In the example above, we’ve used:
- Tailwind’s flexbox and padding utilities (flex, shrink-0, and p-6) to control the overall card layout
- The max-width and margin utilities (max-w-sm and mx-auto) to constrain the card width and center it horizontally
- The background color, border radius, and box-shadow utilities (bg-white, rounded-xl, and shadow-lg) to style the card’s appearance
- The width and height utilities (w-12 and h-12) to size the logo image
- The space-between utilities (space-x-4) to handle the spacing between the logo and the text
- The font size, text color, and font-weight utilities (text-xl, text-black, font-medium, etc.) to style the card text


这时候有人就问了，这不是相当于style属性吗
```
<button style="padding: 1rem, 2rem; font-family: 'semi'; font-weight: bold; ...">
  Click me
</button>
```
那原子化CSS的优势在哪儿呢？

some really important benefits:
- You aren’t wasting energy inventing class names. No more adding silly class names like sidebar-inner-wrapper just to be able to style something, and no more agonizing over the perfect abstract name for something that’s really just a flex container.
- Your CSS stops growing. Using a traditional approach, your CSS files get bigger every time you add a new feature. With utilities, everything is reusable so you rarely need to write new CSS.
- Making changes feels safer. CSS is global and you never know what you’re breaking when you make a change. Classes in your HTML are local, so you can change them without worrying about something else breaking.

using utility classes has a few important advantages over inline styles:

1. Designing with constraints. Using inline styles, every value is a magic number. 
With utilities, you’re choosing styles from a <strong>predefined design system</strong>, 
which makes it much easier to build visually consistent UIs.

2. Responsive design. You can’t use media queries in inline styles, 
but you can use Tailwind’s responsive utilities to build fully responsive interfaces easily.

3. Hover, focus, and other states. Inline styles can’t target states like hover or focus, 
but Tailwind’s state variants make it easy to style those states with utility classes.

4. IDE支持，VS Code 的 Tailwind CSS 智能提示扩展涵盖了所有的类。在编辑器内既可得到智能的自动完成建议、提示及类定义等功能，而且无需配置。

-> https://tailwindcss.com/docs/utility-first#why-not-just-use-inline-styles

<br>

# Tailwind CSS
Tailwind CSS is an <strong>utility-first</strong> CSS framework packed with classes like flex, pt-4, text-center and rotate-90 
that can be composed to build any design, directly in your markup

Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, 
generating the corresponding styles and then writing them to a static CSS file.
It's fast, flexible, and reliable — with zero-runtime.

## 1. configuration:
By default, Tailwind will look for an optional tailwind.config.js file at the root of your project where you can define any customizations.

Every section of the config file is optional, so you only have to specify what you’d like to change. 
Any missing sections will fall back to Tailwind’s default configuration.

-> https://tailwindcss.com/docs/installation

<br>

## 2. plugins
Plugins let you register new styles for Tailwind to inject into the user’s stylesheet using JavaScript instead of CSS.
-> https://tailwindcss.com/docs/plugins

<br>

## 3. preprocessors
It’s important to note that you don’t need to use a preprocessor with Tailwind — 
you typically write very little CSS on a Tailwind project anyways so using a preprocessor just isn’t as beneficial as it would be in a project where you write a lot of custom CSS.

TailWind CSS支持scss、less等，但是实际没有必要使用
-> https://tailwindcss.com/docs/using-with-preprocessors

<br>

## 4. Browser Support
In general, Tailwind CSS v3.0 is designed for and tested on the latest stable versions of Chrome, Firefox, Edge, and Safari. 
It does not support any version of IE, including IE 11.

-> https://tailwindcss.com/docs/browser-support

<br>

## 5. Optimizing for Production
For the smallest possible production build, we recommend minifying your CSS with a tool like cssnano, 
and compressing your CSS with Brotli

-> https://tailwindcss.com/docs/optimizing-for-production

<br>

## 参考
- https://juejin.cn/post/7028841960752283656
- https://tailwindcss.com/