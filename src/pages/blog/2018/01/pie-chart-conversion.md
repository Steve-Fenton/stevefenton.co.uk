---
title: 'Pie chart conversion'
navMenu: false
pubDate: 2018-01-22T08:50:32+00:00
authors:
    - steve-fenton
categories:
    - 'Pie Charts'
tags:
    - Data
    - Visualisation
---

I know that I have a bit of a routine. It goes a bit like this… stumble across a pie chart, show how the information would be better handled by a simple column chart, repeat. Well this week I stumbled across the pie charts below, which answer the question “would you invest in this initial coin offering”. The survey containing these three questions was asked after a workshop, so the respondents can reasonably be expected to be the same people.

I could see that the answer to all three questions was overwhelmingly “no” – but I was interested that there were minor differences between “how much no” each option was.

Normally, you’d head to the value labels, or an associated table in order to get the numbers for a pie chart (if you have to look up the numbers, the chart isn’t working) – but as you can see, there are no values.

:::div{.inset}
:img{src="/img/2018/01/pie-coti-ico.jpg" alt="COTI ICO Pie Chart" loading="lazy"}
:::

:img{src="/img/2018/01/pie-sense-ico.jpg" alt="Sense ICO Pie Chart" loading="lazy"}

:::div{.inset}
:img{src="/img/2018/01/pie-shipchain-ico.jpg" alt="ShipChain ICO Pie Chart" loading="lazy"}
:::

To find out what I wanted to know – the comparative desire to invest in these different options – I needed to work out the values. For this reason, [I wrote a utility in TypeScript to analyse the image and divide it between the different colour segments](/blog/2018/01/typescript-pixel-counter/).

Here is the result…

## Comparable equivalent

To show the same data as the pie chart, we would include all the answers, both positive and negative, here is the version based on the image analysis of the pie chart.

:::div{.inset}
:img{src="/img/2018/01/ico-column-chart-comparable.png" alt="ICO Comparable Chart" loading="lazy"}
:::

## Most sensible version

To show the information clearly, we can dispense with the negative responses and show only the positive responses. The differences between the three options are now immediately apparent.

:::div{.inset}
:img{src="/img/2018/01/ico-column-chart.png" alt="ICO Column Chart" loading="lazy"}
:::

## Summary

As usual, pie charts are hard to compare with other pie charts. Comparing in a single dimension, such as the height of a column, is far easier. The pie charts answer a single question; “were there more positive, or more negative responses?” The column chart can answer that question, and also the comparative questions, such as which of the three options had the most positive response.