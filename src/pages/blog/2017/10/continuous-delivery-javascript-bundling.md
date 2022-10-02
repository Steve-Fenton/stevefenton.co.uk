---
layout: src/layouts/Default.astro
navMenu: false
title: 'Continuous delivery and JavaScript bundling'
pubDate: 2017-10-12T06:00:39+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - javascript
    - typescript
---

As the JavaScript and TypeScript communities move towards module loading in greater numbers, the topic of bundling came up in conversation. Bundling has that deceptive sparkling aura of “best practice” around it that means people can think you should *just use bundling* as a default practice. I am hoping to disrupt this thinking, particularly for teams using continuous delivery / continuous deployment / continuous all the things.

A common practice people use with bundling is using cache-busting URLs, for example `src="bundle.js?c=v1.0.3.389"`, or `src="bundle-v-1-0-3-389"`, or even using some kind of hash based on the file contents. In all of these cases the idea is to load the script from a different address, so any users that have it cached will get the latest version of the bundle rather than using a stale cached version. If you don’t do something along these lines, you’ll be investing in the “please empty your cache and hard reload” helpline.

This technique works reasonably well if you have a bundle that is reasonably small, and gets updated infrequently. But what happens if you release three times a day, and almost every release has a change *somewhere* in a script file that means the bundle gets updated? It means your users are constantly downloading your new bundle. If you have a large bundle file, your frequent users will perceive a speed issue, or a flash of un-styled content, or a slow asynchronous component (or whatever else you are doing with your JavaScript)… and they’ll see this several times a day.

### Enter modules

So here is an excellent benefit to using modules instead of bundling.

When you load modules individually, each one can be cached independently. When your release contains a change to one of your modules, only that one module will need to be re-downloaded – everything else will be lighting fast because it is cached. If your large program is divided into one hundred modules, the cache-busting will result in 1% of the program needing to be downloaded to get the update, which is a 99% improvement compared to bundling.

### Multiple requests

One of the objections to using a module loader is this:

> Multiple HTTP requests are inefficient because requests are queued longer than they take to download

There are a couple of answers to this statement. If you really care about speed you should be using HTTP/2, which allows low-latency content delivery. This eliminates the queue argument for modern web browsers. You also need to bear in mind that while you may be optimizing actual measured speed with a bundle, you are likely to be creating a sub-optimal perceived loading time (i.e. if you load the “fundamental visual modules” early, the user will feel like everything is “done” while you are still downloading tangential modules. You can also conditionally load modules so they are only downloaded if, and when, they are needed. You may be surprised at how few modules you need to load to show your users a working web application, and how much faster the perceived loading time is than downloading a massive bundle.

### Conclusion

We can summarise all of this into four simple quadrants:

![Bundling vs Modules Quadrants](/img/2017/10/bundling-or-modules-quadrants.png)

So if your program is either on the larger side, or gets deployed frequently, you’re likely to find modules are a better long-term strategy. This is especially the case as your program will get bigger over time, and your team are likely to deploy more often too.