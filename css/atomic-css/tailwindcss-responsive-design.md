# tailwindcss-responsive-design
There are five breakpoints by default, inspired by common device resolutions:
```
Breakpoint prefix   Minimum width	  CSS
sm	                640px	          @media (min-width: 640px) { ... }
md	                768px	          @media (min-width: 768px) { ... }
lg	                1024px	        @media (min-width: 1024px) { ... }
xl	                1280px	        @media (min-width: 1280px) { ... }
2xl	                1536px	        @media (min-width: 1536px) { ... }
```

example:
```
<!-- Width of 16 by default, 32 on medium screens, and 48 on large screens -->
<img class="w-16 md:w-32 lg:w-48" src="...">
```

This works for every utility class in the framework, which means you can change literally anything at a given breakpoint — 
even things like letter spacing or cursor styles

-> [demo](./tailwindcss-cdn-demo/7. repsonsive.html)

By default, Tailwind uses a mobile-first breakpoint system, similar to what you might be used to in other frameworks like Bootstrap.

What this means is that unprefixed utilities (like uppercase) take effect on all screen sizes, 
while prefixed utilities (like md:uppercase) only take effect at the specified breakpoint and above.

<br>

## reference
- https://tailwindcss.com/docs/responsive-design