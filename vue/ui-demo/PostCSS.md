# PostCSS
With the word “PostCSS” we might alternately refer to two things:
- There is PostCSS, the tool itself — what you get when you run npm install postcss — and
- The PostCSS plugin ecosystem powered by that tool.

The tool itself is a Node.js module that parses CSS into an abstract syntax tree (AST); 
passes that AST through any number of “plugin” functions; and then converts that AST back into a string, 
which you can output to a file. Each function the AST passes through may or may not transform it; 
sourcemaps will be generated to keep track of any changes.

The AST provides a straightforward API that developers can use to write plugins. 
For example, you can cycle through each rule set in a file with css.eachRule(), 
or each declaration in a rule with rule.eachDecl(). 
You can get the selector of a rule with rule.selector, or the name of an at-rule with atRule.name. 
From these few examples you can see that the PostCSS API makes it pretty easy to 
work with CSS source code (much easier and more accurately than if you were to rely on regular expressions, like a chump).

<br>

## Postcss is a preprocessor replacement？
Of course, it isn't. PostCSS is a JavaScript tool that will read your CSS with special additional syntax, process it, and return regular CSS code. 
What does that mean for you? It means that you can still use your favorite preprocessor like you used to do, 
and you can also use PostCSS in the areas where preprocessors can't be helpful, such as linting, auto prefixing, or CSS4 features. 
It means that you can write your logic in the form of a PostCSS plugin that will act as you want it. 

Just remember that this isn't a preprocessor replacement, although it could replace it if you wanted it. 
For a great example, take a look at the PreCSS plugin pack. 
This is a toolset with many PostCSS plugins which can replace your Sass preprocessor.

If you got used to Stylus or Sass, you'd still be able to use it. 
After preprocessing, you can also use PostCSS processing with plugins.

<br>

## PostCSS Plugins
PostCSS can power an unlimited variety of plugins that read and manipulate your CSS. 
These plugins have no unifying agenda, except to solve problems.

Firstly, let's talk about the Autoprefixer plugin. It is an excellent tool that everyone uses, They don't know that they are using PostCSS, and that's ok, but this is a perfect example of how powerful PostCSS is and how such tools are needed right now.

The second example – Stylelint. Stylelint is an awesome PostCSS plugin that provides CSS linting tools and has many configuration options. You can configure many rules such as not using id or special class names configured by RegExp etc. Take a look at the Stylelint docs: http://stylelint.io/.

Third example – Lost Grid System. This is a very powerful grid system. It is written as a plugin for PostCSS. You can read more about it in the docs: https://github.com/corysimmons/lost. It is an example to show you how simple it is to extend your standard CSS syntax.

The last example is CSSNext. This is a cool toolset. With this PostCSS plugin, you can use future CSS4 syntax in your current apps. You can find all the cool features on the official website: https://cssnext.github.io/features/.

There are plenty of plugins for PostCSS that you can find here: http://postcss.parts/, 
but the biggest strength of PostCSS is that you can also write your custom plugins. 
This is a significant part because it is very modular. 
You can use only those parts which you need.
Take a look at the official plugin development documentation.

<br>

## 参考资料
- https://github.com/postcss/postcss/blob/main/docs/README-cn.md
- https://davidtheclark.com/its-time-for-everyone-to-learn-about-postcss/
- https://www.julian.io/articles/postcss.html