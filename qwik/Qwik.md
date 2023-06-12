# Qwik
Qwik is a new kind of web framework that can deliver instant loading web applications at any size or complexity. 
Your sites and apps can <strong>boot with about 1kb of JS</strong> (regardless of application complexity), 
and achieve consistent performance at scale.

Qwik is a new kind of framework that is <strong>resumable</strong> (no eager JS execution and no hydration), 
built for the edge and familiar to React developers.

<br>

## Resumable vs Hydration
A key concept of Qwik applications is that they are resumable from a server-side-rendered state, which is different from hydration.

<img src="./Resumble%20VS%20Hydration.webp" />

## hydration
When an SSR/SSG application boots up on a client, it requires that the framework on the client restores three pieces of information:
- Listeners - locate event listeners and install them on the DOM nodes to make the application interactive.
- Component tree - build up an internal data structure representing the application component tree.
- Application state - restore the application state.

All current generations of frameworks require hydration to make the application interactive.

Hydration is expensive for two reasons:
- The frameworks have to download all of the component code associated with the current page.
- The frameworks have to execute the templates associated with the components on the page to rebuild the listener location and the internal component tree.


## Resumable
Qwik is different because it does not require hydration to resume an application on the client. 
Not requiring hydration is what makes the Qwik application startup instantaneous.

Resumability is about pausing execution in the server and resuming execution in the client without having to replay and download all of the application logic.

A good mental model is that Qwik applications at any point in their lifecycle can be serialized 
and moved to a different VM instance (server to browser). 
There, the application simply resumes where the serialization stopped. 

### Listeners
Existing frameworks solve the event listener by downloading the components and executing their templates 
to collect event listeners that are then attached to the DOM.

The current approach has these issues:
- Requires the template code to be eagerly downloaded.
- Requires template code to be eagerly executed.
- Requires the event handler code to be downloaded eagerly (to be attached).

Qwik solves the above issue by serializing the event listeners into DOM like so:
```
<button on:click="./chunk.js#handler_symbol">click me</button>
```
Qwik still needs to collect the listener information, but this step is done as part of the SSR/SSG. 
The results of SSR/SSG are then serialized into HTML so that the browser does not need to do anything to resume the execution. 
Notice that the on:click attribute contains all of the information to resume the application without doing anything eagerly.

核心：服务器端已经把事件都搞定了，返回浏览器的就是直接可用的页面，不用进行hydrate.

- Qwikloader sets up a single global listener instead of many individual listeners per DOM element. This step can be done with no application code present.
- The HTML contains a URL to the chunk and symbol name. The attribute tells Qwikloader which code chunk to download and which symbol to retrieve from the chunk.
- To make all of the above possible, Qwik's event processing implementation understands asynchronicity which allows insertion of asynchronous lazy loading.

<br>

### Component Trees
Frameworks work with component trees. 
To that end, frameworks need a complete understanding of the component trees to know which components need to be rerendered and when.

Qwik collects component boundary information as part of the SSR/SSG and then serializes that information into HTML.
- Rebuild the component hierarchy information without the component code actually being present. The component code can remain lazy.
- Qwik can do this lazily only for the components which need to be re-rendered rather than all upfront.
- Qwik collects relationship information between stores and components. This creates a subscription model that informs Qwik which components need to be re-rendered as a result of state change. The subscription information also gets serialized into HTML.


<br>

### Application State
Qwik has state management more tightly integrated into the lifecycle of the components. 
In practice, this means that component can be delay-loaded independently from the state of the component.

Qwik allows any component to be resumed without the parent component code being present.

<br>

### Serialization
JSON can't serialize some object types. For example, DOM references, or Dates. 
Qwik's serialization format ensures that such objects can correctly be serialized and restored. 
Here is a list of types that can be serialized with Qwik:
- DOM references
- Promises (See resources)
- Function closures (if wrapped in QRL)
- Dates
- URL objects
- Map and Set instances.

The resumability capability of the framework must extend to resumability of the application as well. 
This means that the framework must provide mechanisms for the developer to express components and entities of the application 
in a way which can be serialized and then resumed (without re-bootstrapping)

<br>

### benefits of resumability
The most obvious benefit of using resumability is for server-side-rendering. However, there are secondary benefits:
- Serializing existing PWA apps so that users don't lose context when they return to the application
- Improved rendering performance because only changed components need to be re-rendered
- Fine-grained lazy-loading
- Decreased memory pressure, especially on mobile devices
- Progressive interactivity of existing static websites

<br>

## reference
- https://qwik.builder.io/docs/concepts/resumable/
- https://qwik.builder.io/docs/getting-started/
