---
title: 'Bouncy monitoring'
navMenu: false
pubDate: 2015-08-01T07:30:17+01:00
authors:
    - steve-fenton
categories:
    - Windows
tags:
    - Monitoring
---

Bouncy monitoring can sometimes be down to real events occurring in your system, but when it looks as regular as the image below – it probably isn’t!

:::div{.inset}
:img{src="/img/2015/07/erratic-monitoring.png" alt="Erratic Monitoring"}
:::

The yellow line in that image is suggesting that the free memory on a machine is chugging along like an alarmed rabbit’s heartbeat. What this actually means is that the data for that line is actually being collected from two servers because the server was being migrated and for a short time existed in the old data centre and the new data centre. Because the machine was cloned, it had all the same identifying information.

You can choose the easy fix that is best for your situation: alias the machine name as metrics are collected so they show as two different machines or switch of monitoring on the server being decommissioned.