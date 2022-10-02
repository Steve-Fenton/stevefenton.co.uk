---
id: 8314
layout: src/layouts/Default.astro
title: 'JQuery and TypeScript &#8211; We Have a big problem with jquery.d.ts'
pubDate: 2020-04-27T07:00:34+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=8314'
permalink: /2020/04/jquery-and-typescript-we-have-a-big-problem-with-jquery-d-ts/
categories:
    - Programming
tags:
    - jquery
    - typescript
---

This is a call to all my TypeScript connections. This is a call to all. We have a big problem with the official Definitely Typed definition for jQuery. The most fundamental definition for the JQuery interface is incorrect, as you can see in the snippet from jquery.d.ts below. We can fix it, but not without pain.

Please [join the discussion on GitHub](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/44268) as we need to take into account multiple perspectives before we decide what to do.

```
<pre class="prettyprint lang-ts">
interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
    //...
}
```

If you are looking for the short version, it is simply this; `JQuery<TElement = HTMLElement>` should be `JQuery<TElement = Element>`.

### Why is the current definition wrong?

There is an old assumption baked into the current definition, which is that jQuery is only for HTML. In actual fact, you can use jQuery with (for example) XML, and SVG; neither of which will give you `HTMLElement`s to work with. We can test this without jQuery using the following quick example.

```
<pre class="prettyprint lang-ts">
const path = document.getElementsByTagName('path');

// Type 'SVGPathElement' is missing the following properties from type 'HTMLElement': 
// accessKey, accessKeyLabel, autocapitalize, dir, and 16 more.
const htmlElement: HTMLElement = path[0];
```

An `SVGPathElement` doth not an `HTMLElement` make. In fact, both of these are sub-classes of `Element`

[![Element Class Hierarchy](https://www.stevefenton.co.uk/wp-content/uploads/2020/04/element-class-hierarchy-400x227.jpg)](https://www.stevefenton.co.uk/2020/04/jquery-and-typescript-we-have-a-big-problem-with-jquery-d-ts/element-class-hierarchy/)

Now, the jQuery documentation states that for `jQuery( selector [, context ] )` the function…

> Accepts a string containing a CSS selector which is then used to match a set of elements.

This means that the following line of code should…

1. Warn you that jQuery only returns an Element, which may not be an HTMLElement, or
2. If it can tell that `path` is an SVGElement, it should warn you that SVGElement is not substitutable for HTMLElement

```
<pre class="prettyprint lang-ts">
const svgPathElement: JQuery<HTMLElement> = $('path');
```

### So, why don’t we just fix it?

There are many, many cases where code works because it complies with the fundamental assumption.

If you have code that both assumes jQuery always handles `HTMLElement`, and also always *does* handle `HTMLElement`, fixing this error will bring you potentially thousands of errors. This is essentially true in all cases where you’re running jQuery in a web page and you’re not touching SVGs, or handling XML. Your code will become littered with warnings that you’ll either need to fix by changing types, or by running a type guard to ensure you really do have an `HTMLElement`.

### So, why don’t we leave it broken?

Because the whole point of a type system is that it should help you with type confusion. If you have written plain DOM code without TypeScript, you’ll constantly be running into the differences between `querySelectorAll`, which returns a static `NodeList`, or `getElementsByClassName`, which returns a live `HTMLCollection`. It seems like every time someone adds a way to query the DOM it comes with a new kind of list, or a new representation of a DOM object.

When you do the same *with* TypeScript, it helps you understand what you’ve ended up with. Oh, it’s a `Node` so you can’t do some things you could do it it was an `Element`. Thank you TypeScript compiler!

At the moment, jquery.d.ts is leading some small proportion of users down a blind alley – supplying type information and auto-completion that is misleading. In fact, it’s going to be allowing exactly the kind of mistakes that a type system is there to catch.

### Schrödinger’s definition

And this is where we come to in the discussion. This debate leaves the jquery.d.ts type definition both broken and not broken; but it’s time to open the box and find out the correct answer.

To fix the misleading type, we would need to be super-clear that for many codebases, pinning the version until the warnings can be fixed might be a good idea. It will also be a potentially big change to make to the type definition, that will impact any tests that make the current (and incorrect) assumption.

If we want to proceed, we need to make sure there is wide support for the change.

Is there wide support for the change?

Once again, please [join the discussion on GitHub](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/44268) as we need to take into account multiple perspectives before we decide what to do.