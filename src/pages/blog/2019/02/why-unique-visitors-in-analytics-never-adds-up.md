---
layout: src/layouts/Default.astro
title: 'Why unique visitors in analytics never adds up'
navMenu: false
pubDate: 2019-02-26T17:33:19+00:00
authors:
    - steve-fenton
bannerImage:
    src: /img/2019/02/unique-visit-tracking.png
    alt: A flow chart showing two users, one who visists on consecutive months
categories:
    - Analytics
tags:
    - Statistics
    - Data
---

Whether you use Google Analytics, Adobe Analytics, or some other package to learn about your web traffic, you are likely to come across some odd looking numbers when you start cutting up your Unique Visitors. For example, when you look at your monthly reports and compare them to your annual report you’ll find that you have less unique visitors per year than you expected based on your month-on-month reporting. This article will explain why this is perfectly fine.

:::div{.inset}
:img{src="/img/2019/02/unique-visit-tracking.png" alt="Two Visitors, both visit in January and one visits again in Febrary"}
:::

## The set up

The leading image on this article shows two visitors, who we’ll call Purple Jane and Blue Dave.

Purple Jane visits the website in January and never comes back.

Blue Dave loves the website and visists in January and Febrary.

We record these anonymised unique visits in our statistical analytics package.

## The punchline

When we run our month-on-month report to see how many unique visitors we get, we’ll see the following:

Monthly Unique Visitors:

| Month | Unique Visitors |
|-------|-----------------|
| JAN   | 2               |
| FEB   | 1               |

It can be terribly tempting at this stage to total up the unique visitors and declare that we had **3 unique visitors**. But how many unique visitors did we get? *Two*. We had Purple Jane and Blue Dave. That’s two people.

## The tagline

A unique visitor is unique within the time period you are reporting on. When you add together two time periods, some of the users become less unique than they were before. This is because they exist in both time periods.

Putting it visually, when you look at each month separately you see the below diagram, where Blue Dave appears twice:

:::div{.inset}
:img{src="/img/2019/02/separate-time-unique-visit-tracking.png" alt="Separate Months" loading="lazy"}
:::

But when you look at the combined time period, Blue Dave can only appear once:

:::div{.inset}
:img{src="/img/2019/02/aggregate-time-unique-visit-tracking.png" alt="Aggregate Time Period" loading="lazy"}
:::

This is the reason this statistic can feel like it has such an ephemeral quality; it’s because the wider you go, the less times you count Blue Dave. In theory, a really fanatical user like Blue Dave, who visits every week, could appear 52 times in your weekly reporting and just once in your annual reporting. If all your users were like this, your weekly report would have the same numbers in as your annual report. Amazing.