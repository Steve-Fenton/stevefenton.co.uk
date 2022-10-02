---
layout: src/layouts/Default.astro
navMenu: false
title: 'A JavaScript resizeDone event for jQuery'
pubDate: 2016-05-16T09:14:18+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - javascript
    - jquery
---

If you have ever handled a resize event in JavaScript, you will have noticed that when a user manually resizes their browser window by dragging the edges… you get a lot of events. This is because the resize event fires constantly as the user resizes the window.

```
<pre class="prettyprint lang-javascript">$window.on('resize', function () {
    // Your code gets called A LOT!
});
```

In almost all cases, you would rather subscribe to a “resizeDone” event, that only raises when the resize has finished.

The following jQuery example shows a lightweight resize listener that reduces the many resize events down to a single resizeDone event.

```
<pre class="prettyprint lang-javascript">$window = $(window);
var resizeTimer;
$window.on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        $window.trigger('resizeDone');
    }, 250);
});
```

You can now update your code to listen for the resizeDone event…

```
<pre class="prettyprint lang-javascript">$window.on('resizeDone', function () {
    // Your code gets called once
});
```