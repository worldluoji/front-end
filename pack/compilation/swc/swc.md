# SWC
SWC is an extensible Rust-based platform for the next generation of fast developer tools. 

SWC can be used for both compilation and bundling. 
For compilation, it takes JavaScript / TypeScript files using modern JavaScript features and outputs valid code that is supported by all major browsers.

SWC is 20x faster than Babel on a single thread and 70x faster on four cores.

<br>

## Installation
```
npm i -D @swc/cli @swc/core
```
Then, you can transpile your first file and emit to stdout:
```
npx swc ./file.js
```

<br>

## Configurations
https://swc.rs/docs/configuration/swcrc

<br>

## reference
https://swc.rs/docs/getting-started