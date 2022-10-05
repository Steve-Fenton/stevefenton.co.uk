---
layout: src/layouts/Default.astro
title: 'JavaScript Short Tags and XHTML'
navMenu: false
pubDate: 2010-05-20T21:32:10+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
    - JavaScript
---

Here is another JavaScript question I was asked yesterday, which was catching out a developer using XHTML and an external JavaScript file. Users of XHTML will be highly familiar with the use of the “short tag” (this isn’t when you sell a load of tags you don’t yet have, speculating that the value of the tags will go down!) A short tag is an empty element that you close using a slash-finale, such as this:

```html
<img src="myimage.png" alt="This image ends with a short tag" />
```

On the whole, this technique was introduced into XHTML to solve the problem of the elements such as img or br in the body or the meta tags in the head of the document, which have no closing tag in the HTML specification. By using a short tag, you have valid XML.

Be careful though, as attempting to use a short tag script tag will lead to trouble. So you can’t do this:

```html
<script src="myscript.js" />
```

The use of the short tag closing the script tag results in trouble in many browsers, so make sure you add a full closing tag instead, link this:

```html
<script src="myscript.js"></script>
```