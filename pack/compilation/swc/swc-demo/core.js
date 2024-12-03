
const swc = require("@swc/core");

swc
  .transform("const f = (a) => {console.log(a)}", {
    // Some options cannot be specified in .swcrc
    filename: "input.js",
    sourceMaps: true,
    // Input files are treated as module by default.
    isModule: false,

    // All options below can be configured via .swcrc
    jsc: {
      parser: {
        syntax: "ecmascript",
      },
      transform: {},
    },
  })
  .then((output) => {
    console.log(output.code); // transformed code
    output.map; // source map (in string)
  });



swc
  .parse("const f = (a) => {console.log(a)}", {
    syntax: "ecmascript", // "ecmascript" | "typescript"
    comments: false,
    script: true,

    // Defaults to es3
    target: "es3",

    // Input source code are treated as module by default
    isModule: false,
  })
  .then((module) => {
    console.log(module.type); // file type
    console.log(module.body); // AST
  })


swc.transformFile('./my-dir/input.js', {
  // Input source code are treated as module by default
  isModule: false,
}).then(output => {
  console.log(output);
})

 
swc
  .minify('const f = (a) => {console.log(a)}', {}/* opts?: JsMinifyOptions*/)
  .then(output => {
    console.log('minify', output.code) // transformed code
    output.map // sourcemap (in string)
  })