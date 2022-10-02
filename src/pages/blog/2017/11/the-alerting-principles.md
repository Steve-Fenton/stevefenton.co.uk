---
layout: src/layouts/Default.astro
navMenu: false
title: 'The Alerting Principles'
pubDate: 2017-11-20T05:00:40+00:00
author:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - monitoring
    - operations
---

[![Web Operations Dashboards, Monitoring, and Alerting](https://www.stevefenton.co.uk/wp-content/uploads/2017/08/web-operations-monitoring-199x300.jpg)](https://www.stevefenton.co.uk/publications/web-ops-dashboards-monitoring-and-alerting/)This is the next in a series of posts to share some techniques that I wrote about in [Web Operations Dashboards, Monitoring, and Alerting](https://www.stevefenton.co.uk/publications/web-ops-dashboards-monitoring-and-alerting/). In this instalment, I’m going to talk about the Alerting Principles.

When it comes to monitoring alerting is an area you will want to get right. There is a natural tension between two undesirable extremes. You don’t want to be interrupted in the middle of the night when there is no problem. But you don’t want to be sat at your desk blissfully unaware that your application has ceased to exist.

The idea behind the alerting principles are that you have one rule that is a *must* and one rule that is a *should not*. This is a very deliberate weighting, designed to find that optimal point between the two unhappy zones.

1. The alarm MUST sound if there is a genuine problem
2. The alarm SHOULD NOT sound unless there is a problem

One of the things you can do to reduce disruptions to your sleep is to be selective about your alerting methods. Use invasive alerting (like text, phone, audible alarm, and flashing lights) for critical alarms and passive alerting (like email, Slack, or wall boards) for less critical stuff.