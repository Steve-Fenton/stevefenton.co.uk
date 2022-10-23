---
layout: src/layouts/Default.astro
title: Google uses image sprites
navMenu: false
pubDate: 2009-05-01
modData: 2022-10-23
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
    - HTML
---

When browsing Google today, I noticed a little smudge in the graphics. Curiosity led me to have a peek under the hood.

:::figure{.inset}
:img{src="/img/2015/07/google_a.jpg" alt="Google Smudge" loading="lazy"}
:figcaption[A smudge on Google]
:::

If you look closely at the logo, there are three strange lines beneath it. A swift investigation revealed the result, which is the use of sprites on web pages.

An image sprite is a single image that contains regions for each image used on the website. The idea behind a sprite is to load one image and position it carefully to show the different images captured within. With fewer requests, pages load faster because small images spend more time queuing than downloading.

The single image is then manipulated with CSS to ensure that the right part of the image is shown in each location – except browsing Google in IE8 reveals the tops of three other zones in the sprite – the plus, minus and x icons:

:::figure{.inset}
:img{src="/img/2015/07/google_b.png" alt="Google Sprite" loading="lazy"}
:figcaption[Google sprite]
:::