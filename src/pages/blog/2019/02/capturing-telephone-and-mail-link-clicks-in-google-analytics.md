---
layout: src/layouts/Default.astro
navMenu: false
title: 'Capturing telephone and mail link clicks in Google Analytics'
pubDate: 2019-02-20T12:31:54+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - google
    - javascript
---

There are a great many posts on the subject of capturing events for telephone or email clicks in Google Analytics. Of the examples I found, none handled asynchronous content. That means there is the potential for them to fail to capture clicks if the links are loaded after the initial document ready event in the loading lifecycle.

I’m using jQuery in this example, because that’s what is in use on the website I’m working with. jQuery has an event handling mechanism that already knows how to deal with async content – it’s just people don’t seem to use it. In place of `$('selector').click`, you just use the `$(document).on('click', 'selector'` event binding.

```
<pre class="prettyprint lang-javascript">
$(document).on('click', '[href*="tel:"], [href*="mailto:"]', function(e) {
    e.preventDefault();
    var href = $(this).attr('href');
    var eventCategory = null;
    var eventLabel = null;

    if (href.toLowerCase().indexOf('tel:') >= 0) {
        eventCategory = 'Call';
        eventLabel = href.replace('tel:', '');
    }

    if (href.toLowerCase().indexOf('mailto:') >= 0) {
        eventCategory = 'Email';
        eventLabel = href.replace('mailto:', '');
    }

    gtag('event', 'Click', {
        'event_category': eventCategory,
        'event_label': eventLabel
    });

    setTimeout(function() {
        window.location = href;
    }, 500);
});
```

This should send your mail and call events for you to enjoy!