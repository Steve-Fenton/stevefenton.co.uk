---
layout: src/layouts/Default.astro
navMenu: false
title: 'When to use TypeScript reference comments'
pubDate: 2013-10-04T10:48:40+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=503'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - typescript
---

It wasn’t that long ago that [I proclaimed the demise of TypeScript reference comments](/2013/08/Say-Goodbye-To-TypeScript-Reference-Comments/), but actually there may be some good reasons to keep hold of your “references.ts” file for a little bit longer.

There is one job that your references file does that isn’t replaced by Visual Studio’s clever “I know what you have in your project” method of providing auto-completion for all your TypeScript files – it provides a hint to the compiler about the ordering of your program, which will be used when you supply the “–out” flag to the compiler.

For example, if you have “FileOne.ts” that contains a class that extends a class in “FileTwo.ts”, having your references in the correct order will prevent any runtime errors that would occur if the contents of “FileOne.ts” were loaded before the contents of “FileTwo.ts” – i.e. it stops the “Cannot read property prototype of undefined” error.

So using a combined references file along with the TypeScript –out flag is a pretty neat combination if you have dependencies between your files that would require them to be compiled in a particular order.