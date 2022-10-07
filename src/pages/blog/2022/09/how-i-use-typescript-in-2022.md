---
layout: src/layouts/Default.astro
title: How I use TypeScript in 2022
navMenu: false
pubDate: 2022-09-05T18:00:31+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
    - TypeScript
---

I feel I need to write a disclaimer at the start of this article, which goes something like this. This is about how I am using TypeScript right now. I’m definitely not telling you how you should use it. Some context about the kind of stuff I’m writing will be useful to see if we’re doing similar stuff and this approach might work for you. Basically, I’ve survived for several years despite abandoning all frameworks for HTML, CSS, and JavaScript using a careful front-end architecture powered by really well thought-out HTML that is strong enough to survive theme-ing without changes.

Yep, seriously! You can completely change the layouts, branding, and all that stuff – but you’re not allowed to change the HTML (because the HTML has been expertly designed to be semantic, accessible, and *correct* to the usage). Each component really is *closed to change* because after a few months it could have been using in a thousand places. New components can be created, but on the whole it is better to use CSS to change how the components look, rather than look to the HTML for answers.

And, of course, these components (which can work without JavaScript) are enhanced by scripting. Again, we need to be experts at CSS as we don’t want to do by-hand what CSS can do by GPU. If it can be done in CSS, we do it in CSS. That goes for transitions and animations as these are an awful job for JavaScript. It’s all about using the right tech for the job and HTML, CSS, and JavaScript all have very specific roles to play.

## So… TypeScript

I’ve been using TypeScript since 2012, so I’ve got a few years under my belt. Some of this work has been on large-scale problems. What I’m working on now, though, is about slicing up “large-scale” to the point where it effectively ceases to be large scale. A small file that progressively enhances a component in a specific way, which minimal dependencies.

This has led me to adopting the following set up for TypeScript, which might look like I’ve abandoned it altogether (I haven’t).

- I’m using Visual Studio Code for all the JavaScript I write
- I’m writing all the JavaScript inside a `.js` file
- I’m adding type annotations to function signatures using JSDoc
- I’m letting the TypeScript compiler loose on my JavaScript files to check it all

The enables for this are adding `// @ts-check` to the top of your JavaScript file, using [JSDoc](https://jsdoc.app/) to add *function* type signatures and (rarely) helping TypeScript pick a better type, particularly around `document.querySelector...` calls.

```javascript
/**
 * Gets the current user selections
 * @param {HTMLElement} container 
 * @returns string
 */
function getQuerySelector(container) {
    //...
    return selector;
}
```

When you have architected many small isolated things, this is a great set-up as you couldn’t be any closer to the code. I’m not annotating everything, just function signatures. The TypeScript compiler is *really good* at inferring types for variables, especially when each file is (pretty much) self-contained.

## You are the only exception

Of course, just as you post an article like this the universe intervenes. I'm also working with [Astro](https://astro.build) at the moment and the TypeScript experience with Astro is super-first-class. Bascially, you can write full TypeScript in your `.astro` files (as well as others, such as `.ts` files) and "don't wory about it, it's all taken care of".

When I work in Astro, I write TypeScript in the style of TypeScript (though the front end JavaScript I write as described above).

## Summary

So, I’m still heavily using TypeScript, as applied through my JavaScript files, so there is no source and output files – just the files I’m working on. “What about…” yes, minification, dealing with compatibility, etc, etc. There’s nothing to stop you having a [compilation or traspilation]\(/blog/2012/11/compiling-vs-transpiling/) step to do this if you want to. Or, you know, set up your CDN to do it. Whatever works for you.