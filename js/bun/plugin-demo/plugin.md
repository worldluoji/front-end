# Plugin
Bun provides a universal plugin API that can be used to extend both the runtime and bundler.

Plugins intercept imports and perform custom loading logic: reading files, transpiling code, etc. 
They can be used to add support for additional file types, like .scss or .yaml. 

In the context of Bun's bundler, plugins can be used to implement framework-level features 
like CSS extraction, macros, and client-server code co-location.

develop a custom plugin:
```
import { plugin, type BunPlugin } from "bun";

const myPlugin: BunPlugin = {
  name: "Custom loader",
  setup(build) {
    // implementation
  },
};
```

Plugins have to be registered before any other code runs! To achieve this, use the preload option in your bunfig.toml. Bun automatically loads the files/modules specified in preload before running a file.
```
preload = ["./myPlugin.ts"]
```
To preload files before bun test:
```
[test]
preload = ["./myPlugin.ts"]
```

<br>

## reference
https://bun.sh/docs/runtime/plugins