---
id: 2262
layout: src/layouts/Default.astro
title: 'Stop mixing TypeScript modules and namespaces'
pubDate: 2017-08-22T12:05:15+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=2262'
permalink: /2017/08/stop-mixing-typescript-modules-and-namespaces/
categories:
    - Programming
tags:
    - typescript
---

A long time ago I wrote that you should [Stop Mixing TypeScript Internal and External Modules](https://www.stevefenton.co.uk/2015/05/stop-mixing-typescript-internal-and-external-modules/). Well it is time to update my information on this point… because they are now called namespaces, and modules.

So my update is simply this:

> Stop mixing TypeScript modules and namespaces

Let’s back this up with a bit more information.

### Namespaces

Namespaces are used to:

1. Reduce the amount of code in the global scope
2. Provide a context for names, to reduce naming collisions
3. Improve discoverability with a hierarchy

Namespace on their own are okay. They replace “lots of things” in the global scope with “one thing per namespace” and if you organise your namespaces well, you’ll actually have “one thing only” in the global scope.

### Modules + namespaces?

But what about namespaces with modules?

1. Modules add zero code to the global scope. They execute in their own context. Adding namespaces improves this 0%.
2. Modules already provide a context for names to reduce naming collisions. Adding namesapces improves this 0%.
3. Modules already allow you to improve discoverability by providing a hierarchy. Adding namespaces impairs this!

Mixing modules and namespaces makes it harder for consumers of your code to find things. It has no benefit over using modules without namespaces. Don’t mix modules and namespaces. Thinking of modules simply as files is understandable as other languages work this way; but TypeScript is long past the “trying to be like C#/Java” phase and is now a language in its own right, with its own patterns. Don’t try to make TypeScript work like your programs written in other languages.

### Summary

So after more than two years, my advice remains the same. Stop trying to mix modules and namesapces… and prefer modules to namespaces when you are writing a program.