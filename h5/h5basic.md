# basic

1. This element tells the browser about the structure of your website. h1 elements are often used for main headings, while h2 elements are generally used for subheadings. There are also h3, h4, h5 and h6 elements to indicate different levels of subheadings.
```
<!DOCTYPE html>
<html>
   <head><title>Hello</title></head>
   <body>
      <h1>Hello,H5</h1>
   </body>
</html>
```

2. p elements are the preferred element for paragraph text on websites. p is short for "paragraph".

3. Comments in HTML start with <!-- and end with a -->

4. HTML5 introduces more descriptive HTML tags. These include main, header, footer, nav, video, article, section and others. These tags give a descriptive structure to your HTML, make your HTML easier to read, and help with Search Engine Optimization (SEO) and accessibility. The main HTML5 tag helps search engines and other developers find the main content of your page.

5. internal link
```
<a href="#contacts-header">Contacts</a> 
<h2 id="contacts-header">Contacts</h2>
```
跳转到id="contacts-header"的地方

```
<a href="#footer" target="_blank">Jump to Bottom</a>
```
_blank表示新开一个窗口

a标签内还可以内嵌图片

6. ul、li   -> unordered list

7. ol、li -> ordered list

8. form、action、button、radio、checkbox
```
<form action="https://www.freecatphotoapp.com/submit-cat-photo">
    <label for="indoor"><input id="indoor" type="radio" name="indoor-outdoor" value="indoor" checked> Indoor</label>
    <label for="outdoor"><input id="outdoor" type="radio" name="indoor-outdoor" value="outdoor"> Outdoor</label><br>
    <label for="loving"><input id="loving" type="checkbox" name="personality" value="loving" checked> Loving</label>
    <label for="lazy"><input id="lazy" type="checkbox" name="personality" value="lazy"> Lazy</label>
    <label for="energetic"><input id="energetic" type="checkbox" name="personality" value="energetic"> Energetic</label><br>
    <input type="text" placeholder="cat photo URL" required>
    <button type="submit">Submit</button>
  </form>
```
  

9. label和input可以分开
```
<input id="indoor" type="radio" name="indoor-outdoor">
<label for="indoor">Indoor</label>
```
