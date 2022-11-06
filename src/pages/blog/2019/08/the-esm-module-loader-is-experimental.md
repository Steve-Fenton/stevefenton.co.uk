---
layout: src/layouts/Default.astro
title: 'The ESM module loader is experimental'
navMenu: false
pubDate: 2019-08-23T08:17:04+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Node
    - TypeScript
---

If you fire up a new TypeScript app and whack it into Node, you might come across the following error about *The ESM Module Loader is Experimental*.

```
(dev) root@dev:~$ node --experimental-modules run.ts
(node:11333) ExperimentalWarning: The ESM module loader is experimental.
(node:11333) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
/root/run.ts:1
import { SomeModule } from 'somefile'
       ^

SyntaxError: Unexpected token {
    at Module._compile (internal/modules/cjs/loader.js:872:18)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:947:10)
    at Module.load (internal/modules/cjs/loader.js:790:32)
    at Function.Module._load (internal/modules/cjs/loader.js:703:12)
    at internal/modules/esm/translators.js:87:15
    at Object.meta.done (internal/modules/esm/create_dynamic_module.js:48:9)
    at file:///root/run.ts:9:13
    at ModuleJob.run (internal/modules/esm/module_job.js:111:37)
    at processTicksAndRejections (internal/process/task_queues.js:85:5)
    at async Loader.import (internal/modules/esm/loader.js:134:24)
```

You have two options to resolve your issue, but first… what’s the issue?

## Common JS

There are several different ways to load a module in JavaScript, and Node traditionally uses “commonjs” style module loading.

By default, when you write TypeScript code, you won’t get commonjs modules unless you ask the compiler for them… you can do this in your tsconfig.json file (which will be longer than this example, but this is the item you need to change!)

```javascript
    {
        "compilerOptions": {
            "module": "commonjs"
        }
    }
```

## Experiment All The Things

Alternatively, you can set the *experimental* (read: there may be trouble with it) feature in Node so it will work with the modules you are already generating… to do this you need to make a very similar change, but in your package.json:

```javascript
    "type": "module"
```

Either one of these will fix the issue, but while ES modules are experimental, you might want to generate commonjs modules from your TypeScript code.

If you are reading this in the future, this advice may be reversed – but by that time your chances of getting this error should be slim!