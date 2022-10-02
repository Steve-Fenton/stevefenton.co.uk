---
layout: src/layouts/Default.astro
navMenu: false
title: 'Don&#8217;t use TypeScript error suppression comments'
pubDate: 2017-11-01T08:21:49+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - typescript
---

TypeScript 2.6 has just been released, but please don’t use the new TypeScript error suppression comments *in your TypeScript code*.

Error suppression comments use the syntax shown below. They ask the compiler to look away while you steal a biscuit.

```
<pre class="prettyprint lang-javascript">
if (false) {
    // @ts-ignore: Unreachable code error
    console.log("I'm never gonna happen.");
}
```
This feature had been avoided for some time, as mentioned in the [2.6 release note](https://blogs.msdn.microsoft.com/typescript/2017/10/31/announcing-typescript-2-6/):

> “Historically, we’ve avoided error suppression within TypeScript because most cases where users have asked for it could be solved through more accurate declaration files or using a type assertion to any.”

Of course, the other way to avoid needing this feature is to fix the underlying problem the compiler has detected.

Now, if you are migrating some really gnarly JavaScript and are including it in your compilation, you may find some case where your creativity fails you. In these cases, once you have tried improving your types, and using a type assertion – and still you are stuck – then you can admit defeat by inserting an error suppression comment.

Make a rule, though, that the suppression must only live in your JavaScript files. Once you move the code into a TypeScript file, you have to solve the error, because that error suppression comment is just a placeholder for a known bug that you have just decided to ignore for a time.

So, don’t use TypeScript error suppression comments *in your TypeScript code*.