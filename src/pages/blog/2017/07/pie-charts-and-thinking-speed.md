---
title: 'Pie charts and thinking speed'
navMenu: false
pubDate: 2017-07-27T14:38:25+01:00
authors:
    - steve-fenton
categories:
    - 'Pie Charts'
tags:
    - Data
    - Visualisation
---

We are using live monitoring of our website pages, and of our website components, to find performance problems in our application. This means we know why our web application is slow as soon as anything breaches a threshold. Very often, we find something that is draining too much CPU from our servers.

Brains are a bit like this. When we look at a chart, we are attempting to answer questions. Our ability to answer these questions is disrupted by the amount of brain-CPU we have to dedicate to reading the information on the chart.

When we look at a chart such as this:

:::div{.inset}
:img{src="/img/2017/07/per-channel-original.png" alt="Per-Channel Original" loading="lazy"}
:::

We need to think a bit like this:

:::div{.inset}
:img{src="/img/2017/07/per-channel-annotated.png" alt="Per-Channel Annotated" loading="lazy"}
:::

This drains our mental power as we are allocating more CPU to the parsing of the chart than we are to the questions we were trying to answer.

You can optimise this whole process using charts that don’t require more than an ambient amount of brain-CPU to parse… or even better, charts that already answer the most common questions that someone is likely to be asking; like the chart below.

:img{src="/img/2017/07/bar-chart.png" alt="Per-Channel Replacement" loading="lazy"}