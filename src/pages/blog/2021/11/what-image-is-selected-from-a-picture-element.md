---
layout: src/layouts/Default.astro
navMenu: false
title: 'The wrong image seems to be selected from a picture element'
pubDate: 2021-11-25T09:28:18+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - html
---

This post started as a scratch pad as I was looking at helping a colleague implement WEBP images with a JPG fallback for older browsers. They had an issue in modern browsers because the fallback image was being loaded in all cases. Here’s a code example and demo:

```
<pre class="prettyprint lang-html">
<picture>
     <source height="500" width="500" src="webp.webp" type="image/webp">
     <source height="500" width="500" src="png.png" type="image/png">
     <img height="500" width="500" src="jpg.jpg" alt="lorem ipsum">
</picture>
```

Here’s the output (in case of future browser changes… we see the JPG image below).

<picture><source height="500" src="https://www.stevefenton.co.uk/wp-content/uploads/2021/11/webp.webp" type="image/webp" width="500"><source height="500" src="https://www.stevefenton.co.uk/wp-content/uploads/2021/11/png.png" type="image/png" width="500">![lorem ipsum](https://www.stevefenton.co.uk/wp-content/uploads/2021/11/jpg.jpg)</source></source></picture>This turns out to be a pretty simple issue with the `src` attribute being the wrong one for this case (it’s valid for audio and video use cases). On the `source` element, we should be using `srcset` instead. Like this…

```
<pre class="prettyprint lang-html">
<picture>
     <source height="500" width="500" srcset="webp.webp" type="image/webp">
     <source height="500" width="500" srcset="png.png" type="image/png">
     <img height="500" width="500" src="jpg.jpg" alt="lorem ipsum">
</picture>
```

Here’s the output (in case of future browser changes… we see the WEBP image below).

<picture><source height="500" srcset="https://www.stevefenton.co.uk/wp-content/uploads/2021/11/webp.webp" type="image/webp" width="500"><source height="500" srcset="https://www.stevefenton.co.uk/wp-content/uploads/2021/11/png.png" type="image/png" width="500">![lorem ipsum](https://www.stevefenton.co.uk/wp-content/uploads/2021/11/jpg.jpg)</source></source></picture>Now we see a WEBP where it is supported, or a PNG for slightly older browsers, or a JPG for very old browsers.