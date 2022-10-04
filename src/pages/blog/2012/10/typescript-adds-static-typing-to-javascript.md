---
layout: src/layouts/Default.astro
title: 'TypeScript adds static typing to JavaScript'
navMenu: false
pubDate: 2012-10-01T23:50:30+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

It seems like a new solution to the problem of JavaScript is being invented every couple of months at the moment. We saw CoffeeScript giving us shortened scripts, Dart fail to replace JavaScript entirely and now Microsoft have waded into the same space with TypeScript.

This time, though, things might be different, because TypeScript is JavaScript with a tiny bit of extra tjuze.

Here is an example, you will probably be able to spot the differences immediately:

```typescript
function addTwoNumbers(numberA: number, numberB: number) {
    return numberA + numberB;
}
```

The difference with TypeScript is that you can make JavaScript statically typed.

Obviously, this is a simplified view on things – but the point is that you can state the intent of the types and get your IDE to check that you aren’t doing invalid things with those types and it can give code-completion hints based on those types.

You can also supply type definitions in a separate file – so you can add type definitions to existing code. There are already type definitions for the DOM and for jQuery – so you can use them in a type safe way.

Like CoffeeScript, TypeScript compiles to plain JavaScript – so you are running plain JavaScript on the server and in the browser.

If you are a Visual Studio user, you might want to try it out straight away – but even if you aren’t in Microsoft world, you might as well get used to some of the syntax as it is likely to be part of the ECMAScript 6 standard. It is the use of the ECMAScript 6 style syntax that could really make TypeScript a winner.

While all the other are trying to help you to write “something else”, which gets turned into JavaScript – TypeScript is pretty much just JavaScript, which is going to make it more appealing to the JavaScript coders out there.