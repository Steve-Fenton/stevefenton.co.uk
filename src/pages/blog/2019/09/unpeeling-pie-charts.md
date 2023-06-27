---
title: 'Unpeeling pie charts'
navMenu: false
pubDate: 2019-09-23T16:53:42+01:00
authors:
    - steve-fenton
categories:
    - 'Pie Charts'
tags:
    - Data
    - Visualisation
---

For those of you still keen on using [pie charts](/category/pie-charts/), let’s embrace those big blobs of colour and do something cool with them. We’re going to unpeel a bunch of them. So, what’s the use of unpeeling pie charts – and how do we do it?

## Before unpeeling

Before you unpeel a pie chart, you will have something a bit like this diagram. It’s a standard pie chart with no unpeeling applied. It usually contains a single data point for each value. This article assumes you find this to be a useful piece of information.

:::div{.inset}
:img{src="/img/2019/09/pie-chart-not-yet-unpeeled.jpg" alt="Pie Chart Before Unpeeling" loading="lazy"}
:::

Most data points don’t live in isolation. They exist in some form of series. The most common of these is time. For example, we might have this pie chart for each of the past twelve months. It is notriously hard to compare these pie charts – and this is exactly where unpeeling pie charts comes in so useful.

## Obey the maths

It is mathmatically true that if the pie chart is split 70/30, you can treat it like a perfect cross-section slice of an onion. Each of the onion’s rings, whether from the core, the outer layer, or anywhere in between, will also be split 70/30. That means you can take any one of the rings and it will contain the same data as the whole onion, er, pie chart.

The first step in unpeeling pie charts is to take one of these onion rings of data.

:::div{.inset}
:img{src="/img/2019/09/pie-chart-unpeeling-one-layer.jpg" alt="Unpeeling Pie Charts - The Onion Ring" loading="lazy"}
:::

It is also math-fact-ical that we can use a rolling pin to flatten out this onion ring and it will still be split 70/30. So, that is the next step in the unpeeling process. We need to cut it, then carefully roll it out. The one thing to be careful with is that the cut needs to follow a convention so the process can be repeated.

:::div{.inset}
:img{src="/img/2019/09/pie-chart-unpeeled-and-flattened-layer.jpg" alt="Unpeeling Pie Charts - Flatten the Onion Ring" loading="lazy"}
:::

## Repeat for each pie chart

Once we’ve mastered the unpeeling process, we can apply the same process to each of the pie-chart / onions in our series. We take the crushed, pungent, fleshy result from each one and lay them out in order.

:::div{.inset}
:img{src="/img/2019/09/multiple-pie-charts-unpeeled.jpg" alt="Fully Unpeeled Pie Charts" loading="lazy"}
:::

We can do this with twelve data points, or a hundred, or thousands, or even more. The result is a set of unpeeled pie charts that produces super-fast visual understanding of the data points and their relationship.

You can use this to improve your use of data and to help out humans that consume it, as it’s well-proven that humans aren’t great at consuming pie charts unless they have been unpeeled.