---
layout: src/layouts/Default.astro
title: 'Using the light sensor API in Firefox'
navMenu: false
pubDate: 2012-05-05T16:12:45+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - FirefoxOS
    - JavaScript
---

As of Firefox 14 (or 15 if it doesn’t make it in time) you can start using the experimental light-sensor API. This allows you to get the current ambient light in lux, which measures luminous flux per unit area.

The caveats for all this are that the device must have a sensor that can detect light and at the time of writing there is no news of browser support, although it has been tabled for consideration.

The API is really simple, you just need to add an event listener to the “devicelight” event and your function will be called with the current lux.

```javascript
var lightFeatureCallback = function (lux) {
    alert(lux.value);
};

window.addEventListener("devicelight", lightFeatureCallback, true);
```