---
title: 'What the death of FirefoxOS means for sensor APIs'
navMenu: false
pubDate: 2017-09-09T15:29:36+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - FirefoxOS
    - JavaScript
    - Sensor
    - TypeScript
---

Rather sadly, the FirefoxOS project got binned, which removed the momentum of the device sensor APIs that Mozilla was the big sponsor of.

What this means for these APIs is that, while many are actually well through the standardisation process, the browser support is sketchy. Your motion and orientation sensor will show you very low numbers reported from the accelerometer of implementation.

However, at the time of writing (about a quarter past three) the results on my Google Pixel are as follows:

## Firefox on Chrome

<dl><dt>Battery Status</dt><dd>No<sup>\*</sup></dd><dt>Proximity</dt><dd>Yes</dd><dt>Light</dt><dd>Yes</dd><dt>Motion</dt><dd>Yes</dd><dt>Humidity</dt><dd>No<sup>\#</sup></dd><dt>Temperature</dt><dd>No<sup>\#</sup></dd><dt>Noise</dt><dd>No<sup>\#</sup></dd><dt>Vibrate</dt><dd>Yes</dd></dl>

<sup>\*</sup> this standard is on hiatus while some privacy wrinkles are subjected to standardisation-botox.

<sup>\#</sup> these proposals appear to have vanished… let me know if you have a device and browser that supports any of these.