---
id: 244
title: 'JMeter throughput shaping tip'
pubDate: '2014-11-19T20:04:50+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=244'
permalink: /2014/11/jmeter-throughput-shaping-tip/
interface_sidebarlayout:
    - default
categories:
    - Automation
tags:
    - jmeter
---

Here is a quick tip about JMeter’s throughput shaping capability, when using the jp@gc Throughput Shaping Timer.

If you want to test, for example, 8 messages per second, the Throughput Shaping Timer will adjust the rate to make sure that:

1. You send no more than 8 messages per second on average
2. You send no less than 7 messages per second on average

So if the aim of your testing is to ensure you can handle 8 messages per second as a minimum, you need to enter **9 messages per second** in your throughput shaping timer.