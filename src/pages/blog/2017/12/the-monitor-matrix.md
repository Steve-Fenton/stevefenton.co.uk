---
layout: src/layouts/Default.astro
navMenu: false
title: 'The Monitor Matrix'
pubDate: 2017-12-04T05:00:06+00:00
author:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - monitoring
    - operations
---

[![Web Operations Dashboards, Monitoring, and Alerting](/img/2017/08/web-operations-monitoring.jpg)](/publications/web-ops-dashboards-monitoring-and-alerting/)This is the last in a series of posts to share some techniques that I wrote about in [Web Operations Dashboards, Monitoring, and Alerting](/publications/web-ops-dashboards-monitoring-and-alerting/). In this final bite-size chunk, I’m going to talk about the Monitor Matrix.

Selecting monitors has a gradual evolution. You start off monitoring the things that everyone starts monitoring. You keep an eye on very general things like CPU, Memory, and Disk Space. Over time, though, you create a small but powerful view that works for your application.

To help you choose things to monitor, you can use two handy categories to organise your ideas. Characterisations classify the *kind of monitoring* and Kinds classify the *target* of the monitoring.

Here are the characterisations:

- Availability: a binary description of whether something seems switched on or off
- Utilisation: what percentage of the resource is used, or the size of the item
- Performance: how quickly does something respond, is there latency

And here are the various kinds:

- Network: bandwidth, packets
- Server: CPU, memory, I/O
- Operating System: processes, swapping, database
- Middleware: web server, message broker
- Software: your application
- Experience: business metrics, user transactions

### Monitor Matrix

You can overlay these two concepts into a monitor matrix. Each of the slots on the matrix has super-powers to find various kinds of problem. If they can find the same root cause, each will do so at different speeds – and you will be able to find circumstances where each one can be the leading indicator when something has broken. Picking the earliest indicator

![Monitor Matrix](/img/2017/11/monitor-matrix.png)