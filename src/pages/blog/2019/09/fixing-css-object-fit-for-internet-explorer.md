---
layout: src/layouts/Default.astro
title: 'Fixing CSS object-fit for Internet Explorer'
navMenu: false
pubDate: 2019-09-20T07:00:45+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
    - HTML
    - JavaScript
---

A common problem with images, especially if they are user-generated, is that they don’t have the correct aspect ratio for their intended purpose. Also, as we re-flow pages for many different devices, we often want the image to work with different aspect ratios. This is where the CSS `object-fit` property comes in very useful. There are a number of possible values for `object-fit`, but the most-used of them all is `object-fit: cover;`. This asks the browser to fill the rectangle with the image by cropping it, rather than stretching it.

The only problem using `object-fit` is Internet Explorer. It doesn’t matter what you say about modern browsers, security, or common sense; people are still using Internet Explorer (and though it’s a small number, by some amazing coincidence it always turns out to be your client, even though your analytics tell you that your client’s customers aren’t using it!) With this in mind, we need to fix `object-fit` for Internet Explorer.

## Problem statement

We have the following image, shown in it’s original size and aspect ratio. We’ll use this to check for stretchyness when we come to change the aspect ratio of the image shortly.

:::div{.inset}
:img{src="/img/2017/08/web-operations-monitoring.jpg" alt="Web Operations Dashboards, Monitoring, and Alerting" loading="lazy"}
:::

Let’s no constrain the image to a square:

```html
<img src="web-operations-monitoring.jpg" style="object-fit: cover" width="400" height="400" id="cover-image" />
```

We now have a 400px by 400px version of the image, cropped automatically by the web browser. But in Internet Explorer, it looks a little funny…

:::div{.inset}
:img{src="/img/2019/09/object-fit-internet-explorer.jpg" alt="Broken object-fit: cover in Internet Explorer" loading="lazy"}
:::

What’s happened here is that the whole image is being shown, squeezed brutally into our 400px square.

## JavaScript shim

There are two parts to the JavaScript shim. The first part uses the existing image as a background for the original image… I know, it’s like imageception. This is complimented by the second part, which is to replace the original image source with a transparent image. In our case, an empty SVG. The empty SVG is see-through, revealing the original image that is now in the background… and Internet Explorer *does* support `object-fit`-style values on background images.

Here’s the shim as a function.

```javascript
function objectFit(image) {
    if ('objectFit' in document.documentElement.style === false && image.currentStyle['object-fit']) {
        image.style.background = 'url("' + image.src + '") no-repeat 50%/' + image.currentStyle['object-fit'];
        image.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + image.width + "' height='" + image.height + "'%3E%3C/svg%3E";
    }
}
```

You can call this whenever you have an image element, so you could write a wrapper that gets all images with an `object-fit` style (or based on a class, or whatever)… and pass them through the function. In our case, let’s just apply it to our single image:

```javascript
var elem = document.getElementById('cover-image')
objectFit(elem);
```

If the browser supports “objectFit”, nothing happens; the image will already look just as you expect. For Internet Explorer, them shim will step in and fix the stretchyness.

:::div{.inset}
:img{src="/img/2019/09/object-fit-internet-explorer-with-shim.jpg" alt="Internet Explorer with working object-fit: cover" loading="lazy"}
:::

## Why not use background images everywhere

If an image is supposed to be part of the document flow, let it be part of the document flow. The butchery that took place before `object-fit` became available caused images to be removed from the document flow. It made a lot of websites harder to use with assistive technology. Using the right mark-up to describe your document is paramount; but there’s no reason for things to look awful. Use fall-backs and lightweight shims where necessary – but let’s not ruin things for the good browsers!