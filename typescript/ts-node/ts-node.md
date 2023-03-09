# ts-node
ts-node is a TypeScript execution engine and REPL for Node.js.

It JIT transforms TypeScript into JavaScript, enabling you to directly execute TypeScript on Node.js without precompiling. 
This is accomplished by hooking node's module loading APIs, enabling it to be used seamlessly alongside other Node.js tools and libraries.

## installation

```
npm install -g ts-node
```
Depending on configuration, you may also need these
```
npm install -D tslib @types/node
```

## usage
commanndline:
```
# Execute a script as `node` + `tsc`.
ts-node script.ts

# Starts a TypeScript REPL.
ts-node

# Execute code with TypeScript.
ts-node -e 'console.log("Hello, world!")'

# Execute, and print, code with TypeScript.
ts-node -p -e '"Hello, world!"'

# Pipe scripts to execute with TypeScript.
echo 'console.log("Hello, world!")' | ts-node

# Equivalent to ts-node --transpileOnly
ts-node-transpile-only script.ts

# Equivalent to ts-node --cwdMode
ts-node-cwd script.ts

# Equivalent to ts-node --esm
ts-node-esm script.ts
```

## reference
https://typestrong.org/ts-node/docs/