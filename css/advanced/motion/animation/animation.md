# animation
To animate an element, you need to know about the <strong>animation properties and the @keyframes rule</strong>. 

The animation properties control how the animation should behave and the @keyframes rule controls 

what happens during that animation. There are eight animation properties in total.

1) animation-name : sets the name of the animation, which is later used by @keyframes to tell CSS which rules go with which animations.

2) animation-duration : sets the length of time for the animation.

3) animation-fill-mode : specifies the style applied to an element when the animation has finished.

4) opacity: you'll change the opacity of an animated element so it gradually fades 
as it reaches the right side of the screen.

5) animation-iteration-count: which allows you to control how many times you would like to loop through the animation.

6) animation-timing-function: controls how quickly an animated element changes over the duration of the animation.

There are a number of predefined keywords available for popular options. 
For example, the default value is ease, which starts slow, speeds up in the middle, and then slows down again in the end. 

Other options include ease-out, which is quick in the beginning then slows down, ease-in, which is slow in the beginning, then speeds up at the end, or linear, which applies a constant animation speed throughout.

@keyframes is how to specify exactly what happens within the animation over the duration. 

This is done by giving CSS properties for specific "frames" during the animation, with percentages ranging from 0% to 100%.

If you compare this to a movie, the CSS properties for 0% is how the element displays in the opening scene. 

The CSS properties for 100% is how the element appears at the end, right before the credits roll. 

Then CSS applies the magic to transition the element over the given duration to act out the scene.

<br>

## examples
example 1：矩形颜色随进度变化，位置上下移动

./animation_demo1.html, 这里要注意：
css的left和top属性指的是距最近的一个position属性为relative或者absolute的父级元素的左边或上边的距离，所以当要设置css的top和left的属性时，一定要确保定义position为absolute或者relative.

example 2: use CSS @keyframes to change the color of a button in its hover state.

./animation_demo2.html

example 3: opacity 球从左到右逐渐消失, 重复3次

./animation_demo3.html


<br>

## cubic-bezier
In CSS animations, Bezier curves are used with the cubic-bezier function. 
The shape of the curve represents how the animation plays out. 
The curve lives on a 1 by 1 coordinate system. 

The X-axis of this coordinate system is the duration of the animation (think of it as a time scale), and the Y-axis is the change in the animation.

The cubic-bezier function consists of four main points that sit on this 1 by 1 grid: p0, p1, p2, and p3. 

p0 and p3 are set for you - they are the beginning and end points which are always located respectively at the origin (0, 0) and (1, 1). You set the x and y values for the other two points, and where you place them in the grid dictates the shape of the curve for the animation to follow. 

This is done in CSS by declaring the x and y values of the p1 and p2 "anchor" points in the form: (x1, y1, x2, y2). 

Pulling it all together, here's an example of a Bezier curve in CSS code:

animation-timing-function: cubic-bezier(0.25, 0.25, 0.75, 0.75);

In the example above, the x and y values are equivalent for each point (x1 = 0.25 = y1 and x2 = 0.75 = y2), which if you remember from geometry class, results in a line that extends from the origin to point (1, 1). 

This animation is a linear change of an element during the length of an animation, 
and is the same as using the linear keyword. In other words, it changes at a constant speed.
