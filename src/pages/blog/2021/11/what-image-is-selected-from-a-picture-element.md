---
layout: src/layouts/Default.astro
title: The wrong image seems to be selected from a picture element
navMenu: false
pubDate: 2021-11-25T09:28:18+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - html
---

This post started as a scratch pad as I was looking at helping a colleague implement WEBP images with a JPG fallback for older browsers. They had an issue in modern browsers because the fallback image was being loaded in all cases. Here’s a code example and demo:

```html
<picture>
     <source height="500" width="500" src="webp.webp" type="image/webp">
     <source height="500" width="500" src="png.png" type="image/png">
     <img height="500" width="500" src="jpg.jpg" alt="lorem ipsum">
</picture>
```

Despite support for WEBP, the JPG image is shown.

This turns out to be a pretty simple issue with the `src` attribute being the wrong one for this case (it’s valid for audio and video use cases). On the `source` element, we should be using `srcset` instead. Like this…

```html
<picture>
     <source height="500" width="500" srcset="webp.webp" type="image/webp">
     <source height="500" width="500" srcset="png.png" type="image/png">
     <img height="500" width="500" src="jpg.jpg" alt="lorem ipsum">
</picture>
```

Now we see a WEBP where it is supported, or a PNG for slightly older browsers, or a JPG for very old browsers.