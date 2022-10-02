---
layout: src/layouts/Default.astro
navMenu: false
title: 'Investigate JavaScript execution times using Edge Dev Tools'
pubDate: 2020-05-11T16:48:19+01:00
author:
    - steve-fenton
categories:
    - Browsers
tags:
    - edge
    - javascript
    - performance
---

This is a quick exploration of how to use Edge Dev Tools to investigate JavaScript execution time issues. We’ll quickly run a performance profile and identify what part of the JavaScript is the “most responsible” for any performance issues. The idea is to show just the quickest way to find the source of an issue, rather than to go into detail about all the amazing graphs, tools, and options available.

To start, open up the Edge Dev Tools and choose the “Performance” tab, which you’ll find next to the “Network” tab.

Use the circle-icon to start a recording and load up the troubled page.

[![Edge Dev Tools Performance Tab](/img/2020/05/edge-dev-tools-performance-tab.jpg)](/2020/05/investigate-javascript-execution-times-using-edge-dev-tools/edge-dev-tools-performance-tab/)

You need to let the recording run long enough for everything to execute and you may need to ensure the behaviour you want to measure has been triggered if it isn’t part of the page load lifecycle (i.e. if the “calculation” feature is slow, you’ll need to interact with the page to make a calculation happen).

When you’re ready, hit the stop button to complete the recording. Now the fun happens.

### The quickest way to find performance issues

When a session has been recorded, you’ll be presented with some cool charts and visualisations. Ignore or of that for a minute and hit the “Bottom-Up” tab on the lower panel. It’s right above the summary [donut-chart](/2009/04/pie-charts-are-bad/).

[![Click on the Bottom-Up Tab on the lower panel](/img/2020/05/edge-performance-profile.jpg)](/2020/05/investigate-javascript-execution-times-using-edge-dev-tools/edge-performance-profile/)

As soon as you have the Bottom-Up view open, order it by “Total Time Descending” (just click on the headers to order the table) so you can see the top-level functions that are spending the most money. You can then expand the items to see what’s happening inside.

You will have two loose categories of speed killers.

- The activities that call so many things, they take a great deal of time despite nothing inside being too slow
- The activities that call something that is obviously a hot-spot of slow

[![Expand the activity tree to see the details](/img/2020/05/edge-performance-bottom-up-view.jpg)](/2020/05/investigate-javascript-execution-times-using-edge-dev-tools/edge-performance-bottom-up-view/)

Both the “Total Time” and “Self Time” ordering are useful. Total Time will reveal the entry points to slow areas of code, whereas Self Time will show low level expensive code. It is best to look through both orderings to work out where your optimisation will have the greatest impact.

### Tough choices

When you add features to a page with JavaScript you are spending *some time* in exchange for *some feature*. Until you look at this performance profile, you might not realise what the exchange rate is for a particular feature. You might be able to squeeze some speed out of the feature, or you might want to consider retiring the feature. If nobody wants to spend time fixing the performance of a feature, it’s likely it isn’t worth having in the first place. Keep in mind the option of removing expensive features that have low value as for some reason many people don’t think of it.

Also, you’re going to need to be prepared to ditch some third-party code. If you can’t get a pull request into the project to speed it up, you might need to bin it and use something else.