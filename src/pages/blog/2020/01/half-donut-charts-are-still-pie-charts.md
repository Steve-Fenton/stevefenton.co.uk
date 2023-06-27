---
title: Half-donut charts are still pie charts
navMenu: false
pubDate: 2020-01-01T20:56:17+00:00
authors:
    - steve-fenton
categories:
    - 'Pie Charts'
tags:
    - 'Half-Donut Chart'
---

It was recently hinted to me that half-donut charts are a better alternative to pie charts. As I really dislike pie charts, I sat down for a while and thought really hard about this. Having approached this chart from a few different perspectives (it seems very attractive when achiving 50% is important) I have realised that these are still just pie charts. The shape of the chart offers no benefit other than implying where the half-way mark is.

If the half-way mark is important, why not make it explicit, rather than imply it.

Let’s look at one of the first examples The Web gives us for a search on Half-Donut charts.

:::div{.inset}
:img{src="/img/2020/01/half-donut-chart.jpg" alt="Half-Donut Chart" loading="lazy"}
:::

Meh. This is a probably a bad example even of its kind. It doesn’t look like the 50% mark is terribly important, it’s just a comparison of four technologies (three are programming languages, the other is a mysterious stable-mate as it isn’t a programming language; it’s an operating system). Putting these thoughts aside, let’s re-make the chart without adding an additional visual dimension.

I had to roll out the trusty [TypeScript pixel counter](/blog/2018/01/typescript-pixel-counter/) to reverse-engineer the relative size of the segments. The output is shown below…

:::div{.inset}
:img{src="/img/2020/01/pixel-counter-half-donut.jpg" alt="Pixel Counter Output" loading="lazy"}
:::

It gave me a working set of numbers with the values of the four areas being: Javascript 39%, Python 26%, Android 22%, PHP 13%.

Here is a simple stacked bar, which is fundamentally the same except there is no need to curve it. There is an explicit half-way marker (and we can add other markers if needed). I have chosen to order the items by size, but I could have preserved the original order if it was important.

:::div{.inset}
:img{src="/img/2020/01/stacked-bar-chart.png" alt="Stacked Bar Chart" loading="lazy"}
:::

The fact is, there is no need to add another dimension if it doesn’t add anything to the data. We don’t need to make things 3D if that doesn’t aid undertanding. There’s no need to use circles, or curves, or circular sections, as we do with donuts, pies, half-donuts, and the like. They never increase the understanding of the data; they actually detract.

So, I don’t see any reason (other than *marketing*) to use a half-donut chart. It is arguably better than a pie chart, but still actually worse than a simple column chart, or stacked bar… depending on the data.