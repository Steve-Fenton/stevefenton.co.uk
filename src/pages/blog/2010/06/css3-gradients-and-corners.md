---
layout: src/layouts/Default.astro
title: 'CSS3 Gradients and Corners'
navMenu: false
pubDate: 2010-06-22T21:16:10+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
---

CSS3 is going to bring some awesome new stuff that will combine excellently with HTML5 to give us an absolutely smashing Internet experience. Thing is, it isn’t here quite yet. Despite this, I just can’t wait for all the new features that HTML5 and CSS3 are going to bring. That’s why I [converted this website to HTML 5 last year and tested it in loads of browsers](/blog/2009/07/html-5-browser-test/).

So you don’t have to wait to use HTML 5 as with a minor bit of jiggery-pokery you can getting working in some pretty old-school browsers. So what about CSS3? If you’re reasonably careful, there are quite a few CSS3 styles you can add that don’t do too much damage if the browser doesn’t support them. Here are my two favourites.

## Rounded Corners

This used to be a real bore with either graphical backgrounds with fixed divisions, or an amazing stacked division battlefield with lots of corner-images being floated left and right (not centre!) With CSS3, you can get easy rounded corners with no hassle at all – and if the browser doesn’t support them you just get plain old square corners.

```css
.rounded {
    -moz-border-radius: 1em;
    -webkit-border-radius: 1em;
    border-radius: 1em;
}
```

This example just puts a simple rounded edge on all four corners. If you really want, you can target specific corners too, like this:

```css
.funkyrounded {
    -moz-border-radius-bottomleft: 15px;
    -moz-border-radius-topright: 15px;
    -webkit-border-bottom-left-radius: 15px;
    -webkit-border-top-right-radius: 15px;
    border-bottom-left-radius: 15px;
    border-top-right-radius: 15px;
}
```

In these examples, there are specific rules supported by Firefox and Webkit-based browsers, along with the standard CSS 3 declaration.

## Gradient Backgrounds

This is another great example of using CSS3 to give a page depth, with no real problems for browsers that don’t support it. Here is an example of a silver-effect gradient background:

```css
.silvereffect {
    background-color: Silver;
    background-image: -moz-linear-gradient(100% 100% 90deg, Gray, Silver);
    background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(Gray), to(Silver));
}
```

In this example, we use a background-color as a fall-back if the gradients don’t work. There are separate rules for Firefox and Webkit just like the rounded corners.

These are the two easiest ways to spice up your website without ruining things for certain browsers.