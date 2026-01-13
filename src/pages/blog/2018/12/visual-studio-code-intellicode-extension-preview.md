---
title: 'Visual Studio Code IntelliCode extension preview'
navMenu: false
pubDate: 2018-12-06T09:50:27+00:00
authors:
    - steve-fenton
categories:
    - Programming
    - 'Visual Studio'
tags:
    - TypeScript
description: Reviews the IntelliCode extension for VS Code which uses AI to prioritize auto-completion suggestions.
---

IntelliCode brings AI-assisted power-ups to your auto-completion. It has been in preview within Visual Studio for some time (you can [read about Visual Studio IntelliCode here](/blog/2018/05/visual-studio-intellicode/)) – but it has now landed in Visual Studio Code, which is exceptionally handy if you’re a TypeScript programmer like me.

So what is IntelliCode? It’s a simple VSCode extension that you add to your editor to add a smart list of suggestions to the top of your otherwise plain alphabetical auto-completion suggestions. To get started, search for *IntelliCode* from the Visual Studio Code extension panel.

:::div{.inset}
:img{src="/img/2018/12/vscode-intellicode-extension.png" alt="Intellicode extension" loading="lazy"}
:::

This will instantly transform your auto-completion list from `charAt, charCodeAt, concat, indexOf, lastIndexOf, length...` to `* replace, * split, * length, *, toLowerCase, * match, charAt, charCodeAt...`. The top of the list now contains special super-star elements that are the most likely members that you want to access. Here’s the screenshot equivalents of this example:

## Before – Plain TypeScript

:::div{.inset}
:img{src="/img/2018/12/string-typescript.png" alt="Plain TypeScript without Intellicode" loading="lazy"}
:::

## After – TypeScript plus IntelliCode

:::div{.inset}
:img{src="/img/2018/12/string-typescript-plus-intellicode.png" alt="TypeScript with Intellicode" loading="lazy"}
:::

The IntelliCode suggestions are marked with stars, so you can tell what suggestions come specifically from the extension. The adjust as you type and are downgraded to lower positions intelligently as it works out what your intentions are.

The intention behind this toolset is for the AI to learn from your existing code, which will make the suggestions even more useful. In the long run, you might be able to generate your coding standards by analysing your code and extracting the rules and using them to improve consistency in your projects.