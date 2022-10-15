---
layout: src/layouts/Default.astro
title: Defer YouTube Videos
navMenu: false
pubDate: 2022-06-12
modDate: 2022-10-12
keywords: defer,youtube,videos
description: Find out how to defer third-party video, like YouTube, until users want to view it.
bannerImage:
    src: /i/x/2022/06/jimmy-eat-world.png
    alt: Ace rock band Jimmy Eat World sat in front of tour flight cases
authors:
    - steve-fenton
categories:
    - Programming
---

If you use third-party video on your website, you can defer loading the video until the user indicates they wish to view it. This lightens your page and avoids third-party requests unless the user interacts with the video content.

This example is an adaptation of a great idea from [Go Make Things](https://gomakethings.com/how-to-lazy-load-youtube-videos-with-vanilla-javascript/) (a site *filled* with great stuff, by the way). You can use this solution to defer loading YouTube videos (the iframe and all its assets) until the user clicks to play it.

## Traditional YouTube video code

The traditional embed of a YouTube video looks like this…

```html
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/VOWnhMxJMMk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
```

## Deferring YouTube

The HTML to use instead is a plain link. The link points to the standard watch page, so if something goes wrong, it all works (the user ends up on YouTube, where they can see the video).

```html
<a href="https://www.youtube.com/watch?v=VOWnhMxJMMk">Watch Jimmy Eat World - Something Loud</a>
```

A script then turns this into a thumbnail image served by YouTube’s image server, and when the user clicks the placeholder, it loads the video for the user to enjoy without leaving your website. The “click-play” class can be used to style things up… It makes sense to stick the text over the top of the thumbnail or add a play icon, so it’s obvious what to do / what will happen.

Here's an example:

[Watch Jimmy Eat World - Something Loud](https://www.youtube.com/watch?v=VOWnhMxJMMk)

The JavaScript for this is below. It uses the `youtube-nocookie.com` domain for videos to improve privacy for users.

```javascript
var videos = document.querySelectorAll('a[href^="https://www.youtube.com/watch?v="]');

for (var video of videos) {
    var id = new URL(video.href).searchParams.get('v');
    video.setAttribute('data-youtube', id);
    video.classList.add('init');
    video.setAttribute('role', 'button');

    video.innerHTML = `<div class="yt-video">
    <div class="play-icon" style="background-image: url(https://img.youtube.com/vi/${id}/0.jpg)">▶</div>
    <div class="title">${video.textContent}</div>
    </div>`;
}

function clickHandler (event) {
    var link = event.target.closest('[data-youtube]');

    if (!link) {
        return;
    }

    event.preventDefault();
    var id = link.getAttribute('data-youtube');

    var player = document.createElement('div');
    player.innerHTML = `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    link.replaceWith(player);
}

document.addEventListener('click', clickHandler);
```

The main difference to the original is loading a smaller thumbnail image size and using lazy loading on the image.

You can style this with the `yt-video` and `play-icon` class names.