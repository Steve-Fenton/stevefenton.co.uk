---
layout: src/layouts/Default.astro
title: 'HTML and CSS full screen layout without fuss'
navMenu: false
pubDate: 2015-08-10T07:30:02+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
    - HTML
---

This is a quick guide to the modern method of getting a 100% high chunk of content without a lot of fuss. This technique also works for creating a 100% chunk of content, with more content being appended after the fold.

We’ll use this dummy HTML for the purposes of the example – it works just as well with headers, articles, sections, and nav elements (or whatever you like).

```html
<div id="fixed-header">
    &nbsp;    
</div>

<div id="fluid-banner">
    &nbsp;
</div>

<div id="fixed-thumbs">
    &nbsp;
</div>

<div id="further-content">
    <p>Lorum ipsum whatever</p>
    <p>Lorum ipsum whatever</p>
    <p>Lorum ipsum whatever</p>
    <p>Lorum ipsum whatever</p>
    <p>Lorum ipsum whatever</p>
    <p>Lorum ipsum whatever</p>
</div>
```

There are lots of solutions to this problem using traditional HTML and CSS rules, but they are all a big gnarly. There are tables, fixed position elements, relative position elements, additional elements… a lot of crazy stuff. In some cases, they only satisfy the 100% height requirement, but not the 100% height for this big, with more content to follow afterwards.

So here is the modern way to do it, with some really simple CSS.

```css
body {
    margin: 0;
}

#fixed-header {
    background-color: Aqua;
    height: 100px;
}

#fluid-banner {
    background-color: blue;
    height: 600px;
    height: -webkit-calc(100vh - 200px);
    height: calc(100vh - 200px);
}

#fixed-thumbs {
    background-color: red;
    height: 100px;
}
```

The really interesting part of this example is the “calc” property, which allows us to deduct our 100px header and 100px footer (so a total of 200px) from our 100% height. The fixed 600px height that precedes it will apply in browsers that don’t recognise the calc expression.

The un-prefixed “calc” works in Firefox 16+, Chrome 26+, Safari 7+, and Internet Explorer 9+. The prefixed version works back to Safari 6+ (a buggy version of calc) and Chrome 19+ (you can also use the -moz-calc version if you need to support Firefox-Ancient-Edition).

[See it working on JSFiddle](http://jsfiddle.net/Sohnee/Loe9gfa7/1/).