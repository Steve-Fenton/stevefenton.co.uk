---
title: 'Say goodbye to TypeScript reference comments'
navMenu: false
pubDate: 2013-08-08T11:26:40+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

## UPDATE: November 2014

There have been some reports of TypeScript no longer automatically picking up all of the files in the solution, but the most likely cause of this is that the file does not have the correct build action. If you update the build action to “TypeScriptCompile”, it should be automatically pulled in by Visual Studio.

## Original Article

As of TypeScript 0.9.1 you don’t need to mess about with reference comments in Visual Studio. Here is my test using plain old Visual Studio 2012 with the TypeScript extension:

mod.ts

```typescript
module Mod {
    export class ModClass {
        doSomething() {
            return 1;
        }
    }
}
```

app.ts

```typescript
var mod = new Mod.ModClass();
mod.doSomething();
```

And this works. It works in the Visual Studio editor and it works when I compile it using the BeforeBuild target in the project file.

```xml
<Target Name="BeforeBuild">
    <Exec Command=""$(PROGRAMFILES)\Microsoft SDKs\TypeScript\tsc" --out final.js @(TypeScriptCompile ->'"%(fullpath)"', ' ')" />
</Target>
```

This does mean you have to clear up any old TypeScript files you aren’t using as they do make it into the “final.js” file.

Note: Web Essentials 2012 isn’t ready for this change just yet!