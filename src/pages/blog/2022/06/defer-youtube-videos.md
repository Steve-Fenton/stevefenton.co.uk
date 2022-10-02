---
id: 12983
title: 'Defer YouTube Videos'
pubDate: '2022-06-12T11:23:22+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=12983'
permalink: /2022/06/defer-youtube-videos/
categories:
    - Programming
---

This is just a quick note on an adaptation of a great idea from [Go Make Things](https://gomakethings.com/how-to-lazy-load-youtube-videos-with-vanilla-javascript/) (a site FILLED with great stuff, by the way). This defers loading all the YouTube stuff (the iframe and all it’s assets) until the user clicks to play it – basically avoiding loading the assets unless the user wants to watch the video.

The traditional embed of a YouTube video looks like this…

```
<pre class="prettyprint lang-html">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/VOWnhMxJMMk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
```

The HTML to use instead is a plain link. The link points to the standard watch page, so if something goes wrong, it all still works (the user ends up on YouTube, where they can see the video).

```
<pre class="prettyprint lang-html">
<a href="https://www.youtube.com/watch?v=VOWnhMxJMMk">Watch Jimmy Eat World - Something Loud</a>
```

A script then turns this into a video thumbnail served by YouTube’s image server, and when the user clicks it loads in the video for the user to enjoy without leaving the website. The “click-play” class can be used to style things up… I think it makes sense to stick the text over the top of the thumbnail so it’s obvious what to do / what will happen.

See it in action at the bottom of this [Jimmy Eat World article](https://www.phonotonal.com/2022/06/jimmy-eat-world-something-loud/).

```
<pre class="prettyprint lang-javascript">
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