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

I feel I need to write a disclaimer at the start of this article, which goes something like this: This is about how I am using TypeScript right now. I’m definitely not telling you how *you* should use it. Some context about the kind of stuff I’m writing will be helpful to see whether we’re doing similar stuff and if this approach might work for you.

I’ve survived for several years despite abandoning all frameworks for HTML, CSS, and JavaScript. I use a careful front-end architecture powered by well-thought-out HTML that is strong enough to survive theming without changes. Yep, seriously! You can completely change the layouts, branding, and all that stuff – but you’re not allowed to change the HTML.

The HTML has been expertly designed to be semantic, accessible, and *correct*. Each component is *closed to change* because it could have been used in a thousand places after a few months. New components can be created, but it is better to use CSS to change how the components look, or combine them in smart ways, rather than rushing into HTML.

And, of course, these components (which can work without JavaScript) are enhanced by scripting. If there's a native way to support a feature in HTML, I'll use it. If it can be styled, animated, and adjusted in CSS that's where I do it. That goes for transitions and animations, as these are an awful job for JavaScript. It’s all about using the right tech for the job, and HTML, CSS, and JavaScript all have particular roles.

## So… TypeScript

I’ve been using TypeScript since 2012, so I have a few years under my belt. Some of this work has been on large-scale problems. What I’m working on now is slicing up “large-scale” to the point where it effectively ceases to be large-scale. A small file that progressively enhances a component in a specific way with minimal dependencies.

This has led me to adopt the following set-up for TypeScript when I'm writing it for websites. It might look like I’ve abandoned it altogether, but I haven’t.

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

This is a great set-up when you have architected many small isolated things as you couldn’t be any closer to the code. I’m not annotating everything, just function signatures. The TypeScript compiler is *really good* at inferring types for variables, especially when each file is almost self-contained.

## You are the only exception

Of course, the universe intervenes just as you post an article like this. I'm also working with [Astro](https://astro.build) at the moment, and the TypeScript experience with Astro is super-first-class. You can write TypeScript in your `.astro` files (as well as others, such as `.ts` files) and "don't worry about it; it's all taken care of".

When I work in Astro, I write TypeScript in the style of TypeScript (though the front-end JavaScript I write as described above).

## Summary

So, I’m still heavily using TypeScript, as applied through my JavaScript files, so there is no source and output files – just the files I’m working on. “What about…” yes, minification, dealing with compatibility, etc, etc. There’s nothing to stop you from having a [compilation or traspilation]\(/blog/2012/11/compiling-vs-transpiling/) step to do this if you want to. Or, you know, set up your CDN to do it. Whatever works for you.