---
layout: src/layouts/Default.astro
title: 'Website go faster stripes'
navMenu: false
pubDate: 2014-01-06T23:25:05+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
    - HTML
    - JavaScript
---

My early spring-clean has been going on for a while. I have been gradually deleting things to make the site go faster. As usual, if you don’t keep a close watch on things they start to bloat. My site had reached a whopping 400kb for an empty-cache first-load and spanned far too many network requests including some third-party ones.

## Optimising What?

It is important to understand what you are trying to optimise. Although I wanted the first-hit to be reasonable, I was actually really keen on making subsequent pages utterly tiny more than I was worried about the first hit.

So I wanted to get the first-hit close to the 100kb mark and subsequent hits as close to zero as possible!

So here are the steps I used to reduce the crazy on my site.

## Big Files

I loaded my site with an empty cache and ordered each network request by size. The two biggest files were background images (I was using a parallax background with two images).

It took no time at all to delete one of the background images entirely and just a bit longer to re-save the remaining one in a smaller file size and format.

I already have file-zipping enabled, so if a browser can accept a gzip compressed file, my server will pack it up.

This helped a great deal with the first-hit.

## Number of Requests

My next stop was to look at the number of requests. Were there any requests that weren’t needed? Some of the requests could be combined by crushing all the CSS files into one file and all of the JavaScript into another. (I have about 6 stylesheets all built with LESS that get combined and minified).

This left a couple of third party things being loaded – [so I just ditched them](/blog/2014/01/your-visit-is-not-being-tracked/). They weren’t worth the requests or sizes.

I also [dropped the old-browser support for HTML5](/blog/2014/01/goodbye-old-browsers/). This file had to be kept separate because it had to be loaded in the head of the document, so it was a whole request and had to be parsed before the page rendered.

This also helped the first-hit.

## Managed Content

To make subsequent hits better, I had to look at the HTML. This is the bit that is going to be different on each page.

I actually solved this problem a while back – although under-the-hood there are now three different ways a web page might be delivered.

If you hit a page that is based on dynamic data, and nobody else has looked at that page for a while – you’ll get the content churned out by the content management system. This can take between 2 and 6 seconds depending on server load at the time.

This was a big opportunity for a speed boost – so the second mechanism is for dynamic pages that have been recently viewed by other people. In these cases a very small amount of server-side code checks the cache and delivers the existing page if it isn’t too old. This takes between 1.5 and 4 seconds.

For pages that aren’t subject to much change, the [output from the content management system is saved as a static HTML page](/blog/2013/03/speed-up-dynamic-websites-with-static-pages/). This means no server-side code needs to run at all and the page. This can take up to 1.2 seconds if your cache is empty.

Once you’ve visited a page and no longer need all the CSS, JavaScript and images, the static pages take around 200 milliseconds. So while the first page may take about a second, each page you visit afterwards is taking about one fifth of that time.

This really makes a difference if you are using a mobile with a poor signal – perhaps you’ll now get the page before your train enters that tunnel!

## Going Further

There are still opportunities to make things even faster – but it gets to the point where you need to compromise over things. I could compress the background image more (it is typically the largest file that gets loaded at about 30kb) – but it would look a lot worse and it gets cached once you’ve hit the first page.

I could also go further with the static pages and get clever with the mechanism to re-create them, so the more dynamic pages could be added to the list of pages that can be made into static files – this would only benefit a small number of pages so it might not pay back on the time investment.

## Summary of Timings

| Server Cache | Client Cache                | Time (s) |
|--------------|-----------------------------|----------|
| None         | None\*                      | 2.3      |
| Cached       | None\*                      | 1.7      |
| Static       | None\*                      | 1.1      |
| **Static**   | **Yes (but not this page)** | **0.2**  |
| Static       | Yes                         | 0.0      |

\* None means that the time includes all the CSS, JavaScript and images.

The first three timings all represent the first time you ever hit my website (i.e. your browser needs to grab all the things – HTML, CSS, images, JavaScript). The fourth timing represents a typical visit to a blog post with a populated browser cache. In this typical scenario, your browser only fetches the HTML and possibly some images specific to the blog post – typically around 12kb without images.

The final timing seems pointless – but you’ll find that third party scripts increases this if they go and fetch things!