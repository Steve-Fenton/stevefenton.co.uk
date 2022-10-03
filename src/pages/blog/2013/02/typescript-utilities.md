---
layout: src/layouts/Default.astro
navMenu: false
title: 'TypeScript utilities'
pubDate: 2013-02-22T21:51:52+00:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=647'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - TypeScript
---

One thing I have found when using TypeScript is that it is a great deal easier to re-use scripts across many projects. Even though I wrote the famous “idiomatic JavaScript” previously, one thing that just wasn’t clear was dependencies.

You could include that “ajax.js” file, but then you’d get runtime errors about missing stuff, and you’d run the dependency gauntlet trying to work out what you needed to add to get it all working.

TypeScript attacks this problem from two directions. Firstly, the dependencies are explicit. You have a reference or import that says “this file relies on this other file”. This makes dependencies really easy to manage. Secondly, TypeScript checks the dependencies at compile time, so you don’t have to keep running up the page and checking the error console.

This has made such a difference to me, that I have decided to share these utilities for free – so you can grab them, use them, submit improvements and otherwise benefit from the joys of TypeScript.

Check out my [TypeScript Utilities (including Ajax, Logging, Notifications and Encoding) on GitHub](https://github.com/Steve-Fenton/TypeScriptUtilities).

Happy coding!