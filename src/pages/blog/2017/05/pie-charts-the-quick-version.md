---
layout: src/layouts/Default.astro
title: 'Pie charts: The quick version'
navMenu: false
pubDate: 2017-05-09T08:24:48+01:00
authors:
    - steve-fenton
categories:
    - 'Pie Charts'
tags:
    - Data
    - Visualisation
---

This pie chart example is based on an [article posted yesterday on the Google Testing Blog](https://testing.googleblog.com/2017/05/oss-fuzz-five-months-later-and.html), a very interesting article but with one mistake.

## No

:::div{.inset}
:img{src="/img/2017/05/google-testing-pie.png" alt="Google Testing Pie"}
:::

## Yes

:::div{.inset}
:img{src="/img/2017/05/google-testing-bars.png" alt="Google Testing Bars" loading="lazy"}
:::

## Notes

1. I have had to estimate the true values of the three items with no value label
2. The most likely question the chart will be answering is “what are the most common bugs?”
3. You can improve a pie chart by following the advice in [Typical Pie Chart Errors]\(/blog/2012/06/the-pie-chart-that-is-wrong-several-times/#typical-pie-chart-errors)
4. … [but pie charts are inherently bad]\(/blog/2009/04/pie-charts-are-bad/)…
5. … [for lots of reasons](/category/pie-charts/)