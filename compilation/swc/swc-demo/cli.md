# cli
## Transpile one file and emit to `output.js`
```
npx swc ./my-dir/test.ts -o output.js
```
 
## Transpile and write to /output dir
```
npx swc ./my-dir -d output
```

## --config-file
Path to a .swcrc file to use:
```
npx swc input.js --config-file .swcrc
```

## --config (-C)
Override a config from .swcrc file.
```
npx swc src -C module.type=amd -C module.moduleId=hello
```

<br>

## reference
https://swc.rs/docs/usage/cli