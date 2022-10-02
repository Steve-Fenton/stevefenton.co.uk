---
layout: src/layouts/Default.astro
navMenu: false
title: 'TypeScript no-implicit-any compiler flag'
pubDate: 2013-07-26T11:40:54+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=536'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - typescript
---

You didn’t know the “no implicit any” flag existed in TypeScript 0.8, so you won’t have noticed its disappearance from TypeScript 0.9 – but you might love it when it comes back in TypeScript 0.9.1…

The “no implicit any” flag supplies an error whenever the compiler cannot infer a better type for an expression than the dynamic “any” type.

> “This was temporarily removed in 0.9 as part of the refactoring work. We expect to add it back in 0.9.1.” – <cite>Jon Turner via the now discontinued Codeplex site</cite>

So if you want to have really tight type information in your program, this is a great way to spot where you could add type annotations. Look out for its official (re-)addition soon.

Here is a quick example of a bit of code you’ll be warned about:

```
<pre class="prettyprint lang-typescript">
var myClass;
```

And you could fix it either by explicitly setting the type of any…

```
<pre class="prettyprint lang-typescript">
var myClass: any;
```

Or even better, by giving it a type if one is appropriate…

```
<pre class="prettyprint lang-typescript">
var myClass: MyClass;
```