---
layout: src/layouts/Default.astro
title: 'Mobile browser bars being hidden can affect CSS position sticky bottom'
navMenu: false
pubDate: 2022-12-07
keywords: css,position,sticky,mobile,issue
description: A strange CSS positioning issue found on mobile browsers when the address bar is removed.
bannerImage:
    src: /img/2022/12/mobile-phones.png
    alt: Mobile phone browsers with and without toolbars.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
    - CSS
---

There is a strange CSS positioning issue I found on mobile browsers when the address bar is removed. The removal of tool bars on mobile is a long-running fiasco, soon to be _solved_ by the addition of a new set of viewport units. However, let's look at the set up.

1. There is an element near the footer
2. It's a direct child of the `<body>` element
3. It is set up to stick to the bottom of the viewport

Here's the CSS:

```css
.article-nav {
    position: sticky;
    bottom: 0;
}
```

Using responsive test tools in my browser, everything worked fine. It even worked as expected on Lambdatest's real-time testing. The element sticky to the bottom until you "scroll past it" in the document, at which point in then joins the normal document.

However, on my real phone it had an issue when the browser toolbars are removed (this tends to happen once you start scrolling down pages as it gives the content more space). In Edge, when the two toolbars were removed, the position of the element was "2 toolbars above the bottom". In Chrome it was "1 toolbar above the bottom" as Chrome only has one toolbar.

Basically, the change in height was not spotted by the positioning of the element sticking to the bottom.

:::figure{.inset}
:img{src="/img/2022/12/example-issue.png" alt="CSS sticky position breaks on toolbar removal" loading="lazy"}
::figcaption[Position issue when toolbar hides]
:::

## Investigation

There are lots of reasons why `position: sticky` can fail to work. If any of these were the case, the element wouldn't pin itself to the bottom at all - it would just sit where I put it. If you use sticky positioning, you have almost certainly come across these issues. So, I ruled this out.

The sticky positioning was also working just fine, except when those toolbars were removed. Luckily, I've had other problems related to the change in viewport size on mobile - so I spotted this sooner than I might have done.

With this in mind, I threw some JavaScript at the problem to try and work out the issue.

Version one of this JavaScript madness was an attempt to:

1. Detect if the element was no longer "at the bottom of the viewport"
2. Change the position to force it into the correct place

This was a terrible idea, which I first thought were related to the sums causing an issue (the element would pin correctly some of the time, and then be too far down at others). However, terrible ideas often lead us in the right direction.

I then changed my strategy to listen for the resize event that occurs when the toolbars are removed. Initially, this was to limit how often I was running the calculations... but this was a step in the right direction.

As part of my investigation, I started logging some of the numbers. Because I was testing on a real device, I pushed the output into the element I was trying to fix. This turned out to be an important idea.

As soon as I started logging the numbers into the element, it caused the browser to re-evaluate the element in the DOM and as part of this... everything worked.

To sum up the investigation, I wrote a lot of script just to discover that if I poked the element in a meaningful way the browser recalculated the position by itself.

## Prototype solution

I originall fixed this by running with a prototype solution of...

```javascript
const item = document.querySelector('.article-nav');
window.addEventListener('resize', () => item.innerHTML = item.innerHTML);
```

Notes:

1. It's not de-bounced because this would delay the fix (i.e. the user would now see the issue)
2. `innerHTML` provided a solid fix, I tried changing something less dramatic and found it didn't reliably solve the issue
3. Oh yes, I know how gnarly this fix is - I'm open to suggestions!

## Final solution

With all credit and thanks to [Maxim](https://mastodon.social/@mascon), who messaged me on Mastodon with a better fix.

If you add any fixed-position element to the page, the bug with the sticky position element just goes away. The fixed-position element somehow triggers some form of tracking that probably ought to be triggered by sticky-positioned elements, too - so just by adding an empty element with `position: fixed` the problem is solved.

```html
<div style="position: fixed;"></div>
```

I love this solution as it doesn't require any JavaScript and it pokes the browser to handle the task of properly positioning elements when it adds and removes toolbars.

Thanks Maxim!

## Summary

There does seem to be a bug in browsers with this one. Changing the `innerHTML` (to the same value) wouldn't fix the issue if it was behaving "to spec". However, I have my workaround in place and am open to more efficient versions of the same.