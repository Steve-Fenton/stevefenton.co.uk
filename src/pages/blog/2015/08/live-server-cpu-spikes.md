---
layout: src/layouts/Default.astro
navMenu: false
title: 'Live server CPU spikes'
pubDate: 2015-08-21T07:30:19+01:00
authors:
    - steve-fenton
categories:
    - Windows
tags:
    - monitoring
---

We are monitoring a number of live servers, which we have grouped by role. This let’s use spot outlying servers pretty easily. The below graph shows the free CPU on one group of servers, with one obvious outlier.

![DataDog Free CPU Windows Update](/img/2015/08/datadog-cpu-windows-update.png)

In our case, a quick glance at the box told us this wasn’t anything particularly suspicious – it was Windows Update. A quick adjustment to the settings brought it in line with our update policy and things returned to normal (as you can see on the right-hand side of the graph).

I find this method of displaying servers very effective – group them into similar roles, so you can reasonably expect them to behave in a similar manner (sometimes your roles will be “database” or “services”, other times you may find “low use” and “high use” better ways to group your stuff). When something moves away from the group, you can take a quick look before it turns into an incident.