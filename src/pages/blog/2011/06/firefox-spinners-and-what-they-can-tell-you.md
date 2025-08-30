---
title: 'Firefox spinners and what they can tell you'
navMenu: false
pubDate: 2011-06-15T18:08:02+01:00
authors:
    - steve-fenton
categories:
    - Browsers
tags:
    - Firefox
---

**Update**! In Firefox Quantum, the spinners were updated to Cylon-eyes. The TL;DR is that there are still two spinning states:

1. :img{src="/img/2011/06/firefox-quantum-grey-cylon.png" alt="Firefox Quantum Grey Cylon"}
    Grey Cylon (equivalent to the old anti-clockwise grey spinner)… waiting for response
2. :img{src="/img/2011/06/firefox-quantum-blue-cylon.png" alt="Firefox Quantum Blue Cylon"}
    Blue Cylon (quivalent to the old clockwise green spinner)… receiving the response

The original article on spinners is below.

If you are an avid Firefox user, you have probably noticed that when a page is loading, there are two different spinners that you see. The first is an anti-clockwise grey spinner and the other is a clockwise green spinner. But what are these funky circling graphics trying to tell you.

Well, the difference is actually quite interesting. It is actually interesting enough for a bright green post-it note of knowledge.

:::figure{.inset}
:img{src="/img/2015/07/firefoxloading.jpg" alt="Firefox Loading" loading="lazy"}
::figcaption[Firefox loading]
:::

When you click, the anti-clockwise grey spinner starts. This continues while your request is travelling down thousands of miles of cable all the way to the web server. It carries on while the web server processes your request (for example, while it is getting stuff from a database and converting it into a web page).

As soon as the web server starts to send a response, the spinner changes into the clockwise green spinner. This one is telling you that the web page is on its way.

So why is this useful? Well it is actually handy because you can tell the difference between a page that is taking a long time to load (but is on its way – because you have a green clockwise spinner) and a request that isn't even getting a response from the server, because you're stuck on a grey anti-clockwise spinner.
