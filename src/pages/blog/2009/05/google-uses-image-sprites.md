---
layout: src/layouts/Default.astro
navMenu: false
title: 'Google Uses Image Sprites'
pubDate: 2009-05-01T22:32:14+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1079'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - css
    - html
---

I happened be using the worlds most popular browser (sic) and I noticed a strange appearance on Google…

![Google Smudge](/img/2015/07/google_a.jpg)

If you look really closely, below the logo there are three strange lines.

I very quick investigation revealed the result, which is the use of sprites on web pages.

A sprite is, essentially, all of the images needed on a web page all placed inside a single image file. This makes the page load faster as only one http object needs to be requested, queued and downloaded, rather than lots of smaller images (the latency of most images represents more waiting-time than the actual download itself).

The single image is then manipulated with CSS to ensure that the right part of the image is shown in each location – except browsing Google in IE8 reveals the tops of three other zones in the sprite – the plus, minus and x icons:

![Google Sprite](/img/2015/07/google_b.png)