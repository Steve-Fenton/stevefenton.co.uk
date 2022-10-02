---
layout: src/layouts/Default.astro
navMenu: false
title: 'Find all images on a page with JavaScript'
pubDate: 2019-09-04T11:01:03+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - https
    - javascript
---

One of the most common issues I see in content-managed websites is the presence of a fully-qualified image address that isn’t secure when the website itself is. When this happens, you’ll need to find all images that aren’t secure and fix them.

For example, if you are visiting `https://www.example.com` and there is an image `http://www.example.com/image.png` the browser won’t show the image, because it’s not secure like the page it has been placed on.

It’s easy to fix, because you can just add the “s” to “http”… `https://www.example.com/image.png`. Other fixes include using relative addresses for on-site content: `/image.png`, or scheme-matching addresses for cross-site resources: `//www.example.com/image.png`.

If you need to find all insecure images on a page, you can do it by pasting the following JavaScript snippets into the browser tools “Console” tab, or adding the equivalent scriptlet to your favourites bar.

### Find all images

Here’s the JavaScript version to find all images:

```
<pre class="prettyprint lang-js">
Array.prototype.map.call(document.images, function (i) { console.log('image', i.src); });
```
And this is the scriptlet version to find all images from your favourites toolbar:

```
<pre class="prettyprint lang-js">
javascript:{Array.prototype.map.call(document.images, function (i) { console.log('image', i.src); });}; void(0);
```
### Find all insecure images

Here’s the JavaScript version to find all insecure images:

```
<pre class="prettyprint lang-js">
Array.prototype.map.call(document.images, function (i) { if (i.src.indexOf('http:') > -1) console.log('image', i.src); });
```
And this is the scriptlet version to find all insecure images from your favourites toolbar:

```
<pre class="prettyprint lang-js">
javascript:{Array.prototype.map.call(document.images, function (i) { if (i.src.indexOf('http:') > -1) console.log('image', i.src); });}; void(0);
```