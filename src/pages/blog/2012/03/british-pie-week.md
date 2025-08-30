---
title: 'British Pie Week'
navMenu: false
pubDate: 2012-03-05T16:37:11+00:00
authors:
    - steve-fenton
categories:
    - 'Pie Charts'
tags:
    - Data
    - Visualisation
---

From 5th to 11th March 2012, it's British Pie Week. While I am a keen supporter of British Pies, especially the Apply Pie my Wife makes, this week serves as a timely reminder on how data is the worst ingredient for a pie. On the same day that British Pie Week launched, I happened upon a link that took me to the following break-down of [Android platform version distribution](https://developer.android.com/about/dashboards/index.html) as at February 1st 2012.

:::div{.inset}
:img{src="/img/2015/07/android_distribution_pie_chart1.png" alt="Android Distribution Pie Chart" loading="lazy"}
:::

Now, I have no doubt that this chart very clearly tells us that Android 2.3.3 is the version with the biggest distribution and that Android 2.2 is next in the list, but seriously how useful is it for everything else? On top of the ridiculous cramming of versions prior to 2.2 and versions after 2.3.3, the colour scheme is crazy. As if this wasn't enough, version numbers actually denote a measurement over time, which a pie chart just can't tell us. For example, while being honest with yourself and without reading ahead, what is the percentage value of that largest segment in the pie chart?

If you still really believe that the pie chart is telling you the whole story, let's take a look at a column chart instead.

This chart below amply highlights the dominance of Android 2.3.3 and the decline of older versions. It also highlights the relative age of this dominant version compared to older and newer versions. 2.3.3 sits exactly half-way along this version list. Of course, the chronological gap between each version is not necessarily equal – but the dates are not supplied in [the original data set](https://developer.android.com/guide/topics/manifest/uses-sdk-element.html#ApiLevels). As a bonus, we don't even need to use colour to differentiate the versions (even though the original didn't do this adequately anyhow).

:::div{.inset}
:img{src="/img/2015/07/android_distribution_bar_chart1.png" alt="Android Distribution Column Chart" loading="lazy"}
:::

Going back to the earlier question, what do you think the percentage value is for 2.3.3 based on the column chart? The correct answer is 58%. How close were you when you answered the question based on the pie chart?

This case is an interesting one, because [I normally point out really terrible pie charts](/blog/2009/04/pie-charts-are-bad/). This isn't anywhere near as terrible as some of the examples I have posted before, but it does demonstrate really well how much harder it is to read a pie chart than a humble column chart.

Disclaimer: If you actually read the numbers in the table on the [platform versions page](https://developer.android.com/about/dashboards/index.html), you will spot that the label 2.3.3 is actually not quite correct, as it covers "2.3.3 to 2.3.7". However, this labelling oddity makes little difference in the discussion on whether pie charts are any good – they still aren't.
