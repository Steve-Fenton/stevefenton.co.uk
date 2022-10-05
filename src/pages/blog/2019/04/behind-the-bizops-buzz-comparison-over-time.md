---
layout: src/layouts/Default.astro
title: 'Behind the BizOps buzz: Comparison over time'
navMenu: false
pubDate: 2019-04-04T07:30:54+01:00
authors:
    - steve-fenton
bannerImage:
    src: /img/2019/04/conversion-rate-chart.jpg
    alt: Percentage change over time
categories:
    - Analytics
tags:
    - BizOps
---

This is a quick note about checking trends over time, and why you probably ought to check both a rolling comparison over time *and* a fixed baseline comparison.

Quite often you’ll find a dashboard with a comparison over time shown as a percentage, in either green (good) or red (bad) – or orange if you’re colourblind… these dashboard companies never seem to remember you.

:img{src="/img/2019/04/change-over-time.jpg" alt="Percentage Change Over Time"}

This number typically compares a recent time period with an older time period, for example “The past week” vs “The same week last year”. This is a useful number, but you have to be careful that you don’t miss a couple of scenarios.

The first of these is having a narrow evaluation window between the two comparison periods, such as “the past week” vs “the same week last month”. What can happen here is that a gradual erosion in your numbers goes unnoticed. You have a very small drop compared to last month, so you don’t take action. This continues every month until it reaches zero. Why didn’t anyone notice? Because the small month-on-month change wasn’t as noticable so nobody took action.

You can also be using the wrong window at each end of the comparison period. For example, a day tends to be volatile, but a month might generate too much smoothing. You’ll need to learn the patterns in your own data to find out what period is reasonable. If you’re not sure what to use, try creating a view that uses a few different ranges to see what they tell you.

And finally, you need an anchor. Rather than compare to a rolling window, work out what your anchor number needs to be so you will always see a difference. For example, you might find that over the course of several months you are predictably getting a conversion rate of 3.8%. Jam this number in and track a comparison against your anchor as well as last year. You can now get insights such as “hey, we’re 3% up on the anchor, but we’re down 2% compared to last year”… or “we’re 5% up on last year, but we’re still 3% under the anchor”. Having both numbers allows you to see how you’re really getting on.

Here is a mega-annotaged image that backs up the explanation.

:img{src="/img/2019/04/conversion-rate-chart.jpg" alt="Conversion Rate Chart" loading="lazy"}

If we look at the dark-blue line in this chart, there is some volatility on what might happen in a day. The anchor number of 3.8% allows us to understand the two ranges better. The first range starts with a spike and then falls by ten points, but that’s only 1.8 points compared to the anchor. The second range starts well below the anchor and rises by 2.2 points, but actually only ends up achieving equilibrium. The anchor is a point of reference that we can use to better understand our comparison.

Equally, by using a wider set of data at each end of the range and a wider range, we would have a less noisy comparison. We are usually interested in trends over the longer term.

## Summary

When comparing dates over time, use an anchor to compare everything to a known point in time and don’t be afraid to compare against multiple previous time periods and across more than one period (day, week, month, quarter…).

For example, what happens if you view…

- The past 7 days vs 7 days a month ago
- The past 7 days vs 7 days a year ago (widen the gap between the current and comparison period)
- The past 30 days vs the 30 days a year ago (widen the range used to generate the comparison numbers)