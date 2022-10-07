---
layout: src/layouts/Default.astro
title: 'Z-index and the stacking context'
navMenu: false
pubDate: 2012-08-08T15:29:50+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
    - HTML
---

If you are using CSS z-index to stack elements on a web page, you will probably have come across what looks like very strange behaviour. You have an element with a z-index of 2, but it is on top of an element that has a much higher z-index, for example 100.

Normally, you would expect a z-index of 2 to appear underneath a z-index of 100, so what gives?

You have discovered Stacking Context!

Stacking Context is actually really useful once you know it exists, but can be a bit confusing if you don’t know about it. The simple explanation is this: If you have nested elements that both use position and z-index, the child elements are within the Stacking Context of the parent element. Like this:

```html
<div style="position: absolute; z-index: 100;">
    A
    <div style="position: absolute; z-index: 2;">
        B
    </div>
</div>
<div style="position: absolute; z-index: 90;">
    C
</div>
```

A has a z-index of 100, so it is on top of C, which has a z-index of 90 *and is in the same Stacking Context*.

B is on top of A and C, because it has a z-index of 2, but is in the Stacking Context of A, so think of it as A + 2, or 100 + 2.

:::div{.inset}
:img{src="/img/2015/07/stackingcontext.jpg" alt="Stacking Context" loading="lazy"}
:::