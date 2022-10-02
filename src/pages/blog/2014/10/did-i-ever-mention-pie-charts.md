---
id: 268
layout: src/layouts/Default.astro
title: 'Did I ever mention pie charts?'
pubDate: 2014-10-13T20:39:14+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=268'
permalink: /2014/10/did-i-ever-mention-pie-charts/

categories:
    - 'Pie Charts'
tags:
    - data
    - visualisation
---

It has been a while hasn’t it. However, it is sometimes a good thing to remind ourselves of why pie charts are best avoided. This particular example came from a great blog post. The chart describes version adoption for a particular piece of software.

![PHP Version Adoption](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/php-version-adoption-pie1.png)

Despite the pie chart not following any of the best practices for pie charts (some of which are available [here](https://www.stevefenton.co.uk/2011/10/A-Great-Example-Of-A-Terrible-Pie-Chart/)), you can tell that the purple section is the biggest. You can then look up that this is version 5.3.

Picking second place is a little trickier. Looking at the pie reveals that cream and pastel blue are the contenders, but you may need to check the values on the labels to see that cream is the winner by a marginal amount.

All of this is much easier if you just use a column chart (there are, indeed, other options, but simplicity is a good thing when it comes to sharing data visually).

![PHP Version Adoption Column Chart](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/php-version-adoption-column1.png)

The column chart tells us the same thing (and I have preserved the original order because in this case, the versions tell a chronological story that is interesting – if this wasn’t the case I would certainly order these by value).

No colours were needed to differentiate the value areas or to associate them with their label. The chart has an axis with values on, so no lookup table is needed (it is also perfectly acceptable to show the values on each column if you want precision) and you only need to compare values in one dimension, not two.

This also tells a more important story than the pie chart. The pie chart told us that version 5.3 was the most widely adopted. The column chart tells us that adoption follows a particular pattern with people adopting the software slightly behind the latest version, perhaps as a risk aversion strategy. It also suggests that most people are moving along (even if a little behind) although I would want to see more earlier version before I declared that to be a fact.