---
layout: src/layouts/Default.astro
title: 'Battery status API'
navMenu: false
pubDate: 2012-06-26T15:55:13+01:00
authors:
    - steve-fenton
categories:
    - Browsers
    - Programming
tags:
    - JavaScript
---

The [battery status API](https://www.w3.org/TR/battery-status/) is quite a special one. While on a basic level you can use it to get information on how long a battery has left, it is what you do with the information that makes it cool.

For example, if you have a web app that performs polling in the background, grabbing data updates via AJAX – you can detect when the battery gets low and throttle back on the polling to conserve battery  
life.

The light sensor API and proximity sensor API are easy to use, but neither are as simple as the battery status API, which is simply a property of the navigator object.

The example below checks for navigator.battery (the likely standardised version) as well as the experimental navigator.mozBattery, which is of course an experimental feature in Firefox.

```javascript
var batteryInfo  = null;
if (navigator.battery) {
    batteryInfo = navigator.battery;
} elseif (navigator.mozBattery) {
    batteryInfo = navigator.mozBattery;
}

if (batteryInfo) {
    /* 0 is empty, 1 is full and we get all the numbers in between
       so we can convert this into a percentage really easily */
    var percentCharged =Math.round(battery.level * 100);
    var isCharging =battery.charging;
    var message;
    if (isCharging) {
        message = 'Battery will be charged in ' + battery.chargingTime  + ' minutes';
    } else {
        message = 'Battery will last around ' +  Math.round(battery.dischargingTime / 60)  + ' minutes';
    }
}
```