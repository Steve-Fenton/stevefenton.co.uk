---
id: 928
layout: src/layouts/Default.astro
title: 'HTML5 video in real life'
pubDate: 2011-06-16T18:06:37+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=928'
permalink: /2011/06/html-5-video-in-real-life/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - html
---

Update! Here are the results of a full test using a mark-up only HTML5 video demo from Bruce Lawson.

| Browser | Version | Plays | Format | Total Loads |
|---|---|---|---|---|
| Safari | 5.0.5 (7533.21.1) | Yes | turkish.mp4\* | 1 full |
| Firefox | 4.0.1 | Yes | turkish.ogg | 1 full 3 partial |
| Opera | 11.11.2109 | Yes | turkish.webm | 1 full |
| IE | 9.0.8112.16421 | Yes | turkish.mp4 | 1 full 1 partial |
| Chrome | 12.0.742.100 | Yes | turkish.mp4\* | 1 full 1 partail |

Tested using the Bruce Lawson: HTML5 Video Embed Fall-back.

\* I kid you not… the developer tools showed the MP4 was downloaded for Safari and Chrome browsers… although the developer tools utterly suck compared to Opera Dragonfly and Firefox Firebug and even look bad compared to the IE Developer Tools (which look a bit old school and sometimes don’t behave very well).

Previous updates and original article follows.

**Update**! After having been given a decent demo page by Bruce Lawson to test these findings, it looks like the major problems found below are largely down to the JavaScript libraries people are using with their HTML 5 videos. So please bear this in mind when reading this article.

However, I have discovered that Firefox does perform multiple loads of the video file – it is reliably running 3 partial downloads of around 30 kilobytes when the page loads (presumably it needs to do one of these to provide a preview image, the jury is out on the other two). It then starts the full download when you press play.

Here is the original article…

HTML 5 video is coming along nicely. Asides from having to have a couple of different formats to ensure all browsers can play your movie, the fact that the video is part of your DOM and can be styled and accessed like any other element is nothing but pure brilliance.

It is so good, I thought I would take it on a test drive to see what the practical implications are for HTML5 video.

The most interesting finding I have made relates to the “seek bar” on the video. This rather handily lets you pick a point in the video time-line to start your viewing from and you can click further forward to skip in time.

What I found interesting was that using the skip bar before you start playing the movie still requires the entire movie to be downloaded. This makes sense – the video isn’t being streamed, it is being downloaded. This isn’t really a total surprise when you think about it.

I guess it is more surprising to discover that the video actually downloaded each time I used the seek bar. So each time I clicked on the seek bar, another 3-meg download of the same file started up. On some clicks, it started several times, downloading around 50 kilobytes of the first few and then downloading the whole 3-megabyte file afterwards.

Sliding the bar rather than clicking produced the same results (I was half-expecting the results to be worse, but thankfully they were only “as bad”).

I’m sure this is just an implementation detail. I can live without pseudo-streaming in HTML5 movies, but the browser really ought to download the video file once only!

Note on implementations, with the smoothest at the top and the sketchiest at the bottom. I tried to use the same page to perform all of these tests… I started on the [HTML5 Video](http://html5video.org/) home page, which has a video slapped right at the top and I used a The Daily Motion HTML5 Video page as fall-back in browsers that wouldn’t play on that page.

### Opera

Opera v11.11 behaved itself perfectly. One download no matter what you do with the seek bar.

### Chrome

Chrome 12.0.742.100 displays this rather nasty bug of downloading every time you use the seek bar.

### Firefox

Firefox 4.0.1 displayed this rather nasty bug of downloading every time you use the seek bar.

### Internet Explorer

Internet Explorer 9.0.8112.16421 was a bit hard to test as I couldn’t actually get anything to play, despite the content being served as an MP4 with the correct content type. When I got a working video on a different site, it played, but skipping left me with a black screen.

### Safari

Safari 5.0.5 (7533.21.1) loaded a Flash movie, which was supplied as a fall-back for non-HTML5 browsers.