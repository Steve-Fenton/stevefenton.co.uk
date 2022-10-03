---
layout: src/layouts/Default.astro
navMenu: false
title: 'What is TS* and how is it safer TypeScript?'
pubDate: 2014-07-07T21:44:41+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - typescript
---

If you are working with TypeScript, you may well stumble across this concept (thanks to its colossal but understandable name clash). So to avoid confusion, here is a quick overview of TS\* (AKA Safer TypeScript).

TS\* is a gradually type-safe language that is intended to be used alongside third-party JavaScript. The main purpose of TS\* is to allow your code to run safely alongside JavaScript code that you don’t trust. It does this in several ways:

- Guarding memory: TS\* prevents untrusted code from tampering with your TS\* objects’ memory.
- Type checking: TS\* has both static checking and also has a concept of runtime type information.

The essential concept is that TS\* uses TypeScript-style annotations, but rather than erasing them completely, it will turn some of them into more substantial code transformations that will marshal data between untrusted code and your code.

So the major difference between TypeScript and TS\* is the runtime type checking and the more boisterous code transformations, which are done in the name of safety.

The big similarity is that TS\* is inspired by TypeScript, so if you do ever cross paths, you’ll already know a thing or two about it.

Additional note: as of 2017, TypeScript itself has experimental support for decorators, and for emitting runtime type information that can be reflected at runtime. I’m pretty sure these features will solidify into some form of runtime type checking, possibly via a third party library with decorators that perform runtime type checks. The Safer TypeScript project is pretty hard to find out these days, which possibly means it low priority, or missing in action.

Update: The project has not made it out of research as far as I can tell. The last publish date is [2014](https://www.microsoft.com/en-us/download/details.aspx?id=52309).