---
layout: src/layouts/Default.astro
title: 'DataDog Interactive Monitor Report'
navMenu: false
pubDate: 2016-04-12T06:00:23+01:00
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - Datadog
    - Monitoring
---

There are two competing fundamental needs for web operations… reducing false alarms, and ensuring you never miss a real incident!

Here is a useful DataDog feature that you might not be using and that can help out a great deal in finding that magical balance-point between these two competing needs… interactive monitor reports.

You can find your latest report by logging into your account and visiting: <https://app.datadoghq.com/report/ma>.

The report shows you how the triggered monitors stack up week-by-week over the past six months, and allows you look for patterns that might help you reduce the number of alerts you receive.

:img{src="/img/2016/04/datadog-monitor-tends.png" alt="DataDog Monitor Trends" loading="lazy"}

The report is fully interactive and you can click to view single weeks, or specific servers, or specific alerts – and all the graphs on the page update.