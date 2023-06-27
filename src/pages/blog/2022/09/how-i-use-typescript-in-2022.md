---
title: How I use TypeScript in 2022
navMenu: false
pubDate: 2022-09-05
modDate: 2022-10-08
keywords: typescript
description: An explanation of how I've been using TypeScript for the past few months.
bannerImage:
    src: /img/topic/typescript/for-csharp-banner.png
    alt: Part of the cover for TypeScript for C# Programmers by Steve Fenton
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
    - TypeScript
---

I've been using TypeScript since October 2012, when it was announced to the world, and I wrote the first book about it. For a decade, I used TypeScript on many different products, some of which were small-scale and others that fit the intended *large-scale application* target that TypeScript was invented to assist.

I can honestly say that I have no regrets about diving into TypeScript. It accelerated the development of applications and stopped things from getting gnarly as things reached a serious scale.

## The rise of TypeScript

The big benefit TypeScript delivered was a giant leap in the tooling for programmers. It took the syntax-highlighting stone axe and turned it into an advanced auto-completing, navigatable, mistake-spotting judicial [laser axe](https://www.starwars.com/databank/executioner-troopers).

Very quickly, TypeScript and Visual Studio Code became a world-beating combination compared to any other way to write JavaScript. As part of this perfect union, the tooling for JavaScript inside Code got TypeScript superpowers.

## The rise of Visual Studio Code

Code was announced in 2015 and is currently ranked the most popular code editor by Stack Overflow users (in the [Stack Overflow 2022 survey](https://survey.stackoverflow.co/2022/#section-most-popular-technologies-integrated-development-environment) of 70,000 developers). Almost **¾** of respondents use Visual Studio Code.

:::div{.note}
In the same survey, TypeScript was the fifth most popular language, with JavaScript taking the top spot. Even more interesting is that TypeScript was 4th most loved, with JavaScript down in 16th place, but still more loved than loathed.
:::

## How I'm using TypeScript today

Because of this special relationship between TypeScript and Visual Studio Code, I'm writing increasing amounts of TypeScript-backed JavaScript. That is, I write code in plain `.js` files along with minimal annotations that let the TypeScript compiler work magic.

This brings the vast majority of TypeScript's benefits without a compilation step.

My approach can be summed up in these steps:

- I’m using Visual Studio Code for all the JavaScript I write
- I’m writing all the JavaScript inside a `.js` file
- I’m adding type annotations to function signatures using JSDoc
- I’m letting the TypeScript compiler loose on my JavaScript files to check it all

### The building blocks

The enablers for this set-up are:

1. Adding `// @ts-check` to the top of your JavaScript file
2. Using [JSDoc](https://jsdoc.app/) to add *function* type information and
3. As little as possible, using type information to boink the compiler in the right direction

Here's an example:

```javascript
/**
 * Gets the current user selections
 * @param {HTMLElement} container 
 * @returns {string}
 */
function getSelection(container) {
    //...
    return result;
}
```

While I'm not the number one fan of the verbosity of JSDoc, it's enabling a rapid inner loop that I value. It's a trade-off from the more graceful annotations of TypeScript in return for a pure "save and view" developer experience.

This setup doesn't just depend on a great text editor like Visual Studio Code. You also need to have an opinionated architecture to enable the best experience.

## Architectural considerations

The frictionless experience of TypeScript-backed JavaScript depends on some good architectural decisions along the way.

Here are some of the constraints I impose upon myself:

1. Avoid writing JavaScript where it isn't necessary
1. Aggressively avoid dependencies, especially runtime ones
1. Let the TypeScript compiler infer as much type information as possible

On top of this, you must work diligently to create a loosely coupled architecture *and keep things that way*. Most code simply doesn't want to be loosely coupled. It wants a hug. It wants lots of hugs - from as much other code as possible. Programming is a lot like gardening, as you'll need to pull the weeds up with their roots.

### Avoid JavaScript

For websites and web applications, you should avoid using JavaScript to do something that can be done with CSS or HTML. Start by creating a native HTML feature, and don't move up into CSS until the universe forces you. Use the same tactic to stick in CSS until you are forced to push up into JavaScript.

Here's an example. Traditionally, you had to track whether an item was in view using a scroll-linked event that gathered size and position information to calculate whether an element was in view. You could then change the style of the visible elements. For example, to animate them as they appear.

Then the intersection observer was added. This provided a more performant method to detect elements entering and leaving the viewport.

If you moved from scroll-linked events to intersection observers, you probably left too much code in JavaScript. The best way to use an intersection observer is to set a CSS variable on elements entering and leaving the view.

Here's an example of a reasonable intersection observer. It sets the `--visible` property to `1` when the element is visible and `0` when it leaves.

```javascript
function handleIntersection(entries, observer) {
    for (let entry of entries) {
        entry.target.style.setProperty(
            --viz', 
            entry.isIntersecting ? 1 : 0);
    }
}

```

But what about the animation code? That's a CSS concern, not a JavaScript concern. CSS can animate elements more gracefully and less disruptively than JavaScript. Instead of running a series of timer events to change elements, you just use CSS.

For example, you can scale the items based on their visibility and smooth this with animation. The variable can be used in calculations. For example, multiplying a value by `0` leaves an element unaffected, but multiplying it by `1` changes its style.

The below example sets the scale to `1` when the item isn't visible, increasing this to `1.2` when the element is visible. Combined with a transition (and optionally a transition delay), you can create high-performing animations without code.

```css
scale: calc(1 + (0.2 * var(--viz)))

```

CSS also allows us to respect user preferences with a media query:

```css
@media (prefers-reduced-motion: no-preference) {
    .animated {
        transition: all 0.2s ease-in;
        scale: calc(0.75 + (var(--viz, 1) * 0.25));
    }
}
```

In the same way, HTML has features that can do many of the things people insist on writing code for. To escape this trap, you need to become curious about the features HTML and CSS offer. You don't need to be able to remember the details of all features, only that they are possible.

### Avoid dependencies where possible

External dependencies are a trade-off. For commercial products, the economics of the decision are explicit. You pay a software company to provide a tool, service, or component, so you don't have to write it yourself. There's a direct cost, some integration effort, and a contract. There is no direct cost for open-source projects but securing and supporting the dependency requires more effort.

In the past, many organisations have simply ignored these dependencies. High-profile incidents over the past few years will end this era of complacency as organisations find they are legally responsible for their software supply chain.

:::div{.note}
An organisation suffering a major data breach because of a vulnerability in an open-source package will find itself firmly in the hot seat for privacy fines. With fines in Europe measured in the millions, most organisations will consider the economics of dependencies forever changed.

The record GDPR penalty at the time of writing is [Amazon's $877 million fine](https://www.wired.co.uk/article/amazon-gdpr-fine).
:::

With this in mind, writing your own code has some additional benefits that never made it into the old economic model.

1. The team writing the code will understand it well
2. Team members will learn from writing the code
3. There is a higher chance of appropriate re-use from this code than from a package

For example, a team writing their own navigation component will discover plenty of HTML and CSS challenges and their solution. The next component they write will have a head start, thanks to these challenges.

A team using a navigation component installed from NPM might not learn how to make HTML keyboard navigable, announceable to screen readers, and enhanced with structured data. The package may (or may not) bring these features to the table, but what use is it to have these features only in the site menu?

There will always be a place for dependencies, but they come with risks and costs that now need to be fully considered. One of the big tragedies of `npm install` is that developers are no longer exposed to the knowledge gained from solving these tangential problems.

I've been lucky enough to have a career where I've written the kinds of stuff many developers pull off the shelf. Things like:

- Web analytics solutions
- Message and event queues
- Databases
- SMTP servers
- WYSIWYG editors
- Test frameworks
- Content management systems
- Web crawlers
- Logging utilities

A developer starting their career today wouldn't get these opportunities to learn. Writing a content management system, which takes around three months as a novice, is worth five years of experience in a typical development role. Writing a test framework makes you use a *proper* test framework more effectively.

### Use type inference

The TypeScript compiler is ace at inferring types, particularly when you split your code into isolated modules. In most cases, the only type information you need to add is for your functions. The parameter and returns types give you the most impact for the least effort.

In a TypeScript file, you tend to annotate a lot more than you will in JavaScript. JSDoc discourages the annotations, which helps you embrace inference in a new way.

## Use TypeScript at scale

If you are writing a large-scale application, TypeScript is still your best bet. If you get surprised by a small-scale app that grows, it's easy to migrate from TypeScript-backed JavaScript to full-TypeScript.

## Summary

As the industry trends away from the fat front-end frameworks towards more considered architectures, such as islands architecture, the JavaScript closest to the user shrinks. This allows us a faster inner-loop process for editing JavaScript files without entirely giving up the benefits of TypeScript's compiler.

When you commit code, your build process can perform transformations, bundling, and minification if appropriate. Your CDN might take care of some of this. When you're writing code, those processes are not required. Going compiler-less gives you a light-speed setting for your inner loop.