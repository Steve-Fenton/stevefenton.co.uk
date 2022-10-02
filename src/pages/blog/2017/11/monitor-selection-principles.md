---
layout: src/layouts/Default.astro
navMenu: false
title: 'The Monitor Selection Principles'
pubDate: 2017-11-27T05:00:59+00:00
author:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - monitoring
    - operations
---

[![Web Operations Dashboards, Monitoring, and Alerting](https://www.stevefenton.co.uk/wp-content/uploads/2017/08/web-operations-monitoring-199x300.jpg)](https://www.stevefenton.co.uk/publications/web-ops-dashboards-monitoring-and-alerting/)This is one more article in a series of posts to share some techniques that I wrote about in [Web Operations Dashboards, Monitoring, and Alerting](https://www.stevefenton.co.uk/publications/web-ops-dashboards-monitoring-and-alerting/). In this article, I’m going to talk about Monitor Selection Principles.

While it can be tempting to start off by monitoring everything, and alerting every time something slightly odd happens, there is a better pattern for choosing what you monitor and when to sound the alarm. This better way is called the Monitor Selection Principles, because who doesn’t like principles?

### Monitor Selection Principles

Here are the monitor selection principles, which will guide you to choose the right things to monitor, and how to refine your alarms over time:

1. Pick one metric that is a leading indicator of a fault
2. Add a monitor with a reasonably sensitive alarm threshold
3. Each time the alarm goes off decide whether you need to 
    1. Take urgent action to resolve a fault, or
    2. Move the alarm threshold up to make the alarm less likely to sound

Every time an alarm sounds, you must choose either option a, or option b. There is no option c “ignore the alarm and don’t update the alerting”. Take a look at [the Alerting Principles](https://www.stevefenton.co.uk/2017/11/the-alerting-principles/) for more on this subject.

Once you have hit a good balance with your first monitor, you can use failure events and near-misses to guide your next monitor. Just repeat the pattern of picking a metric that seems related to a fault and adjusting the threshold to achieve the desired result.