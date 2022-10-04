---
layout: src/layouts/Default.astro
title: 'Using the proximity sensor API in Firefox'
navMenu: false
pubDate: 2012-05-17T16:08:36+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - FirefoxOS
    - JavaScript
---

Following up on my post about [Using The Light Sensor API In Firefox](/blog/2012/05/using-the-light-sensor-api-in-firefox/) and with all the same caveats (new feature, just in one browser so far, specification may change), I thought I would also note down the Proximity Sensor API in Firefox.

```javascript
var proximiyFeatureCallback = function (proximity) {
    if (proximity.near) {
        alert('You are close!');
    } else {
        alert('You are far!');
    }
};

window.addEventListener('userproximity', proximiyFeatureCallback, true);
```

You can also get hold of proximity.value, and proximity.min and proximity.max values from the proximity object that is passed to your callback.