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

<br>

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

<br>

## reference
- https://bun.sh/
- https://bun.sh/docs/runtime/nodejs-apis
- https://bun.sh/docs/runtime/nodejs-apis