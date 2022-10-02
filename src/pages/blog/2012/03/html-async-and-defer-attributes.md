---
layout: src/layouts/Default.astro
navMenu: false
title: 'HTML async and defer attributes'
pubDate: 2012-03-08T16:36:17+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=831'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - html
    - javascript
---

So after a long night of testing the async and defer attributes the result is entirely disappointing. So first up, what are they and what are they for?

The “async” attribute is new in HTML5 and tells browsers to load scripts without delaying the parser that displays the page. The scripts start to download straight away, but unlike a normal script include, the rest of the page just carries on. When the script loads, it then executes. If you have multiple scripts on the page, each one will execute as it loads, which means you can’t guarantee what order things will run in. The idea behind this attribute is that if you include a third party script that works in isolation, you can avoid waiting for it.

The “defer” attribute has been around for a bit longer and provides a hint to browsers that they don’t have to wait for the script to render the page. Unlike async, the scripts run in the correct order.

Before you dash off and start adding async and defer attributes all over the place, though, let’s just run over the testing I have performed.

The advice for quite some time has been to include your scripts at the bottom of your web page. This is because the HTTP/1.1 specification recommends that browsers only download 2 concurrent components from a single host. If the browser follows this specification to the letter, your page will appear to load slowly, because the visible elements on the page are queued behind the non-visible JavaScript and CSS files that are being downloaded. By including your JavaScript files at the bottom of the page, you allow the visible elements to be loaded before the JavaScript, which makes the page appear to load much faster.

The only times you ignore this advice is if you need the JavaScript to execute in order for the page to work. For example, the HTML5 shim needs to be included before your CSS in order for older versions of Internet Explorer to recognise the new HTML5 elements. Another example is where you are recording web stats via JavaScript and want to capture stats even if a page is abandoned before it loads – which means you need to put the statistics script near the top of the document.

So if you have followed this advice, you won’t actually see any benefit when you add async or defer attributes. In fact, you might add complication to your web page that you don’t need. I tested examples of pages with the attributes many times and used the average speeds as recorded by development tools and the difference was marginal at best – even when loading in several scripts, including third-party scripts.

Visually, the pages loaded fast in all three scenarios (no attributes, defer and async). The DOM ready times were almost identical as were the onload times. The total page load times showed the biggest difference, with defer loading faster than the control page and async faster than defer – the speed increase seemingly coming from more concurrent downloads. The cost of this speed improvement, though, is complexity.

For example, if you use jQuery, you will need to replace your document ready set-up with a function that you call when the script is loaded. If you have a script that relies on another file, you probably can’t use async.

It seems like you are much better off following the good practices of combining scripts, minifying them and putting them at the end of your page. If anyone has some good real world examples of async and defer in action, please [let me know](/contact/).