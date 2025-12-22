# bun
Bun is an all-in-one JavaScript runtime & toolkit designed for speed, complete with a bundler, test runner, 
and Node.js-compatible package manager.

At its core is the Bun runtime, a fast JavaScript runtime designed as a drop-in replacement for Node.js. 
It's written in Zig and powered by JavaScriptCore under the hood, dramatically reducing startup times and memory usage.

Why Bun?
- Bun processes start 4x faster than Node.js currently 
- Bun can directly execute .jsx, .ts, and .tsx files by Bun; Bun's transpiler converts these to vanilla JavaScript before execution.
- Web-standard APIs. Bun implements standard Web APIs like fetch, WebSocket, and ReadableStream. Bun is powered by the JavaScriptCore engine, which is developed by Apple for Safari, so some APIs like Headers and URL directly use Safari's implementation.
- Node.js compatibility. In addition to supporting Node-style module resolution, Bun aims for full compatibility with built-in Node.js globals (process, Buffer) and modules (path, fs, http, etc.) This is an ongoing effort that is not complete

---

## insatllation
for Linux and macOS
```
curl -fsSL https://bun.sh/install | bash 

# to install a specific version
curl -fsSL https://bun.sh/install | bash -s "bun-v1.0.0"
```
Bun provides a limited, experimental native build for Windows. At the moment, only the Bun runtime is supported.
```
bun <file>
bun run <file>
```

---

## bun apis
un implements a set of native APIs on the Bun global object and through a number of built-in modules. 
These APIs are heavily optimized and represent the canonical "Bun-native" way to implement some common functionality.

Bun strives to implement standard Web APIs wherever possible. 
Bun introduces new APIs primarily for server-side tasks where no standard exists, 
such as file I/O and starting an HTTP server. In these cases, Bun's approach still builds atop standard APIs like Blob, URL, and Request.

https://bun.sh/docs/runtime/bun-apis

Bun aims for complete Node.js API compatibility. 
Most npm packages intended for Node.js environments will work with Bun out of the box; 
the best way to know for certain is to try it.

https://bun.sh/docs/runtime/nodejs-apis

---

## Web APIs
Some Web APIs aren't relevant in the context of a server-first runtime like Bun, such as the DOM API or History API. 
Many others, though, are broadly useful outside of the browser context; 
when possible, Bun implements these Web-standard APIs instead of introducing new APIs.

https://bun.sh/docs/runtime/web-apis

---

## configurations
Bun's behavior can be configured using its configuration file, bunfig.toml.

In general, Bun relies on pre-existing configuration files like package.json and tsconfig.json to configure its behavior. 
bunfig.toml is only necessary for configuring Bun-specific things. 
This file is optional, and Bun will work out of the box without it.

https://bun.sh/docs/runtime/bunfig

解决国内镜像源慢的问题：The default registry is https://registry.npmjs.org/. 

This can be globally configured in .bunfig.toml（Linux、MacOS在$HOME，windows在C:\Users\User（全局）；或者可以在项目根目录（项目级））:
```
[install]
# set default registry 为阿里云镜像源
registry = "https://registry.npmmirror.com/"
# set a token
registry = { url = "https://registry.npmmirror.com/", token = "123456" }
# set a username/password
registry = "https://username:password@registry.npmmirror.com"
```

---

## demos
- [bun with fastify](./fastify/server.ts) 

---

## reference
- https://bun.sh/