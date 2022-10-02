---
layout: src/layouts/Default.astro
navMenu: false
title: 'Consider avoiding TypeScript type definitions'
pubDate: 2016-08-14T19:33:15+01:00
author:
    - steve-fenton
categories:
    - Opinion
    - Programming
tags:
    - typescript
---

Firstly, when you need a type definition for a JavaScript library that you want full type information for, there is [Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped). But before you grab a type definition, let’s stop and think for a minute.

TypeScript does indeed bring you lots of benefits in terms of type checking, and editor features such as auto-completion – and you need a type definition if you want to extend this to include external JavaScript libraries like jQuery, bearing in mind [I use “jQuery” here to refer to the library – and also to the effect](https://www.stevefenton.co.uk/2013/06/the-novice-view-of-jquery/)! But you don’t have to do this.

The general consensus with TypeScript is to get the type definition with a package manager like NPM and have your calling code all checked. But when there is a general consensus, it is usually worth questioning it (although I am reasonably cautious… I did once mention that you could write JavaScript without jQuery and you can get a lot of hate mail about this kind of thing… let’s not even mention [\#NoEstimates](https://www.stevefenton.co.uk/tag/noestimates/)).

So we know the upside of type definitions is that you get compile time checks and editor awesomeness for the code that uses external libraries… but what are the downsides?

Well, one constant rub with type definitions is finding one written in the latest version of TypeScript that matches the version of the external library you are using… and that stays up to date with that library. If you are “pretty much the latest version of everything” you are usually in the most supported zone – but if you are using a slightly older version you may begin to struggle. You also have to co-ordinate updating the library *and* the definition in order for the auto-completion and compile-time checks to actually be correct… and this is the part I dislike.

When you call your TypeScript code from your other TypeScript code, you are dealing with the truth. Even when a type is inferred (which should be as often as possible), it will be inferred correctly. The thing with type definitions is that there is no guarantee they will match the real code. Sure, the Definitely Typed team have a strong suite of tests, but so do you right?

So maybe the bad parts of type definitions will outweigh their benefits *in some cases*.

There are other ways of handling these external libraries. Firstly, you can simply ignore them…

```
<pre class="prettyprint lang-typescript">declare var $: any;
```

You can take this a step further, and isolate them from your application (in the case of some frameworks, this will be next-to-impossible, but in many cases you can simply put the external library behind your own TypeScript class and use that class to expose the parts you need. You get full “proper” TypeScript goodness when calling this class, and within the class you can decide how much type information will make economic sense (for example, none).

So maybe you don’t need to find type definitions for every external library you use… maybe you can do without it. You should at least consider it before downloading your next type definition.