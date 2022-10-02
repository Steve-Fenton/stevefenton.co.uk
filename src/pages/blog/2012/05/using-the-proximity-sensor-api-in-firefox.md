---
layout: src/layouts/Default.astro
navMenu: false
title: 'Using the proximity sensor API in Firefox'
pubDate: 2012-05-17T16:08:36+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=800'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - firefoxos
    - javascript
---

Following up on my post about [Using The Light Sensor API In Firefox](https://www.stevefenton.co.uk/2012/05/Using-The-Light-Sensor-API-In-Firefox/) and with all the same caveats (new feature, just in one browser so far, specification may change), I thought I would also note down the Proximity Sensor API in Firefox.

```
<pre class="prettyprint lang-javascript">
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