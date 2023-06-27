---
title: 'TypeScript with Visual Studio Code'
navMenu: false
pubDate: 2015-05-02T00:09:39+01:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
tags:
    - TypeScript
    - VSCode
---

Visual Studio Code is a new lightweight cross-platform editor that supports a whole bunch of languages, not least – TypeScript.

Working in VSCode is a bit different to working in other editors and IDEs – so here is a Getting Started guide for TypeScript with Visual Studio Code.

Once you have [downloaded and installed VSCode](http://code.visualstudio.com/), you can open it up to find the welcome screen looks like this…

:::div{.inset}
:img{src="/img/2015/07/visual-studio-code-typescript-001.png" alt="Visual Studio Code with TypeScript" loading="lazy"}
:::

Select “File”, then “Open Folder…” to choose where you are going to write your first TypeScript app in VSCode. You can open any folder, which will be treated as an *implicit project*. I’ll discuss *explicit projects* in a moment.

:::div{.inset}
:img{src="/img/2015/07/visual-studio-code-typescript-002.png" alt="Visual Studio Code - TypeScript" loading="lazy"}
:::

Once you have navigated to the appropriate folder, use the “Select Folder” button to choose it.

:::div{.inset}
:img{src="/img/2015/07/visual-studio-code-typescript-003.png" alt="Visual Studio Code - TypeScript" loading="lazy"}
:::

Your VSCode window will now look like this… and if you hover over your folder name (“Example” in my case), you’ll get icons for adding files, adding folders, refreshing the view, and collapsing the tree.

Click on the “Add File” icon (the first one in the image below).

:::div{.inset}
:img{src="/img/2015/07/visual-studio-code-typescript-004.png" alt="Visual Studio Code - TypeScript" loading="lazy"}
:::

Add the following files:

- tsconfig.json
- app.ts

The tsconfig.json file converts your folder into an *explicit project*. You can edit the tsconfig file to specify compiler options and pass in files to the compiler (so you don’t have to use reference comments, for example).

:::div{.inset}
:img{src="/img/2015/07/visual-studio-code-typescript-005.png" alt="Visual Studio Code - TypeScript" loading="lazy"}
:::

My tsconfig file is shown below…

```json
{
    "compilerOptions": {
        "noImplicitAny": true,
        "target": "ES5",
        "module": "amd"
    }
}
```

In my app.ts file, I decided to use a little ECMAScript 6 goodness (although I am compiling down to ES5, I can still do this). The “let” keyword isn’t available in ECMAScript 5, but TypeScript will transpile it into valid ES5 for me.

```javascript
let x = 1.5;
for (let x = 0; x < 10; x++) {
    console.log(x);
}

console.log("Let is: " + x);
```

To build the project, you can hit CTRL + SHIFT + B. The first time you do this you’ll be prompted to add a build task. If you accept the prompt it will all be done automatically for you. The tasks are defined in a new file called tasks.json.

My TypeScript task is shown below. You need to ensure that your PATH variable is set to:

```
C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.5\
```

(or whatever the latest version is when you read this).

I have also specified the name of my TypeScript file, app.ts (the default is HelloWorld.ts).

```json
{
    "version": "0.1.0",
    "command": "tsc",
    "showOutput": "silent",
    "windows": {
        "command": "tsc.exe"
    },
    // args is the program to compile - this setting works best.
    "args": ["-p", "."],
    "problemMatcher": "$tsc"
}
```

Now when I hit CTRL + SHIFT + B again, it will actually generate the JavaScript file. The output is shown below – notice how the TypeScript compiler has converted my let keywords to plain var keywords – but also renamed the variable names to avoid the scope clash. Clever.

If it fails to generate this file, check the bottom-left of VSCode to see if there are errors or warnings, which it picks up using the problem matcher in the TypeScript task.

```javascript
var x = 1.5;
for (var x_1 = 0; x_1 < 10; x_1++) {
    console.log(x_1);
}

console.log("Let is: " + x);
```

So that is the quick start for TypeScript in VSCode. Enjoy.