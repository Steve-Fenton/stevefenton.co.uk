---
layout: src/layouts/Default.astro
navMenu: false
title: 'Speed up dynamic websites with static pages'
pubDate: 2013-03-01T15:48:52+00:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=637'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - optimization
    - performance
---

I have stuck with my trusty content management system for years, but the weight of content combined with the number of visitors has been causing page speeds to suffer a little recently. Average page load times have been landing in the 3 to 4 second mark, which sucks.

So a tactical change was required to speed this up.

### Caching

The old strategy was a three-hour-cache, managed by server-side code. The first request would cause the full page creation, reading from the database, running a few bits of logic to include widgets and menus and running it all through a template engine to create the resulting page. This request would typically take between 4 and 6 seconds seconds. To speed things up for most visitors, the output would be cached for 3 hours. This meant that the server side code would perform a cache check and serve the page without needing the database or template engine, which would take about 3 to 4 seconds.

This caching strategy worked well in many ways – it massively reduced the number of database connections and operations, for example. What it didn’t do very well was get the page to the browser quick enough.

### Static Pages

So I devised a really simple strategy to make things much faster. If reducing the amount of server-side code could save almost half the amount of time it took to serve a page, removing the server-side code entirely would make things as fast as possible. What I’m talking about is serving static HTML pages. Seriously.

Of course, things aren’t quite this simple, but I’ll get to that.

So my basic plan was to receive a request, determine if a static HTML page existed using the server’s routing rules and either serve the existing static HTML file (which should be really quick) or run my server-side code, but save the output as a static HTML file.

![Dynamic vs Static Flow](/img/2015/07/dynamic-vs-static.png)

As you can see from the diagram, the first request takes 3 seconds, but all subsequent requests take under 1 second. Perfect.

### Erm, Content Management

For this to work in the context of a content management system, I need to be able to update the pages. Static pages aren’t a cache – they live forever. I deal with this by deleting the static page when the content gets updated. The next request causes the server-side code to run and create the updated static page.

Also, some pages just can’t be static. For example, if a page contains scheduled content that must appear, disappear or update based on user input. In these cases static pages just won’t cut it – so I created a flag to allow some pages to continue on the old cached strategy instead of the new static page one. These pages are simply never stored as static pages.

### Summary

The long and short of it is that the static pages are many times faster than the cached pages, which are many times faster than creating pages from scratch for each request. The database load is minimal. The CPU required to run server-side code is minimal. Even the cache-store is smaller now it only stores the non-static pages. For a few lines of extra code, that’s a lot of benefits.