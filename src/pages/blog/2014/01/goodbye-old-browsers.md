---
title: 'Goodbye old browsers'
navMenu: false
pubDate: 2014-01-03T23:26:43+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
    - HTML
    - JavaScript
---

I am officially ditching the [HTML5 shim for old browsers](/blog/2009/07/html-5-browser-test/) and here is why.

I have dropped all stats from my website, so I won’t be able to tell when my “Internet Explorer 6” user base reaches zero. However, last time I checked it was just **0.**05500982318% of you. This is less than 100 people this week. Please upgrade to a newer version!

The impact of this is that for most people, there is one less JavaScript file to download and store in your cache.

```html
<script src="/cms/engine/scripts/html5.js"></script>
```

This file has always annoyed me because it needs to load before the DOM because if it hasn’t run, some browsers don’t recognise HTML5 elements. This means that this script is responsible for slowing down the rendering of my pages.

For older browsers, the worst case scenario is that the block elements in HTML5 are ignored for styling or treated as inline elements. It will look rubbish – but if you are searching my blog to find answers to a question, you’ll still find all the answers. Ultimately, you will still be able to access all of the content – it just won’t be as pretty.

## Working Browsers

:::div{.inset}
:img{src="/img/2015/07/browser-test-rekonq.png" alt="Browser Test Rekonq" loading="lazy"}
:::

Here are just some of the browsers everything looks fine in (I have put the minimum version tested – I tested quite a lot of versions). This is not an exhaustive list.

- Chrome 31
- Firefox 3.6
- Iceape 2.7
- Iceweasel 3.5
- Internet Explorer 9
- Konqueror 4.9
- Luakit 1.8
- Maxthon 3.4
- Midori 0.4
- Opera 9.64
- Rekonq 2.3
- Safari 5
- SeaMonkey 2.9

## Working Text Browsers

:::div{.inset}
:img{src="/img/2015/07/browser-test-lynx.png" alt="Browser Test Lynx" loading="lazy"}
:::

These browsers are fine too (but are text-browsers):

- Links 2.7
- Lynx 2.8

## Shonky Browsers

:::div{.inset}
:img{src="/img/2015/07/browser-test-konqueror.png" alt="Browser Test Konqueror" loading="lazy"}
:::

And these look shonky, but work:

- Epiphany 2.22 (single-column layout)
- Galeon 2.0 (single-column layout)
- Internet Explorer 6 (**highly shonky looking**)
- Internet Explorer 8 (single-column layout)