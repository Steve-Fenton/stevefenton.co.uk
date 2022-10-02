---
id: 7468
layout: src/layouts/Default.astro
title: 'Can you average averages in your analytics?'
pubDate: 2020-02-14T07:57:53+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=7468'
permalink: /2020/02/can-you-average-averages-in-your-analytics/
categories:
    - Analytics
---

There is a common question that crops up in analytics, which is *can you average your averages*. The short answer is no, but a longer explanation is probably needed.

Whether you have grouped your data by month, or region, or some other facet – each average you see is based on a different number of data points. You might have an average of *10* based on 10,000 individual data items and an average of *2* based on a single data point. If you attempt to create an “average of averages”, the single data point will disproportionately affect the outcome. The average of 10,000 data items basically gets valued at the same rate as the average of the single data point. The “average of averages” would be *6*, but the correct average of all values would be *10*.

This may still be unclear, so let’s kick of an example and explore some data.

### Simple averages

We’re going to use two sets of numbers, let’s imagine these are test scores for two coffee shops, where customers can score the coffee out of 100.

**Metro Coffee** has a great central location and collects scores from 21 customers over the course of the first day.

`12, 3, 23, 32, 34, 76, 6, 23, 2, 23, 75, 23, 24, 34, 46, 34, 74, 8, 7, 96, 64`

If we add up all these scores and divide the result by the number of customers, we get an average score-per-customer of 34 for Metro Coffee. There’s room for improvement.

**Alley Beans** is off the beaten track, so only collects scores from 4 customers on the first day.

`76, 6, 23, 2`

Adding these numbers up and dividing the total by 4 gives Alley Beans an average score of 27. Even worse than Metro Coffee.

### Average of averages

If you wanted to see an average customer score across all coffee shops, you might be tempted to sum the two averages and divide them by 2. For example….

`(34 + 27) ÷ 2 = 30`

So, the average score is 30 right? Nope. It seems intuitive to do this, but it gives you the wrong answer. The 4 customers at Alley Beans have a disproportionate influence on the result. The small Alley group has the same “whomp” as the group of 34 customers at Metro Coffee. If this were an election, each individual Alley customer would have more than *five times* the voting power of a Metro customer! When it comes to an election this might be acceptable; but we’re talking about coffee here – so this is serious.

How do we resolve this imbalance?

### Original numbers

If you have all of the original scores, you can get an accurate average by totalling up all the scores and dividing the total by the number of scores submitted. This is basically the same process we used to calculated the original numbers.

`12, 3, 23, 32, 34, 76, 6, 23, 2, 23, 75, 23, 24, 34, 46, 34, 74, 8, 7, 96, 64, 76, 6, 23, 2`

Adding them all up, and dividing the total by 25 gives us an average of 33. That’s a significant difference to our original attempt, which yielded 30.

But what if you don’t have the original numbers?

### Weighted averages

If you don’t have all of the original values, you need to ensure you averages are accompanied by an *n*. An *n* is just the count of the values that made up the average in the first place. This allows us to pass around lots of small pairings of average *and* the count of values, but still calculate accurate averages of the averages!

Here’s an example:

|  | Metro | Alley |
|---|---|---|
| Average | 32 | 27 |
| *n* | 21 (*n1*) | 4 (*n2*) |
| Proportion | 0.84 (*n1* ÷ sum of *n*) | 0.16 (*n2* ÷ sum of *n*) |
| Result (Average X Proportion) | 29 | 4 |

If we sum up the results (29 + 4) we get our weighted average, which is 33. That’s the same as if we had all the original values. The benefit of this system is that we don’t need to pass all of the original data, just the count and average.

Here is diagram that shows all my workings for the above the numbers, feel free to try this out for yourself in Excel, a calculator, or even an abacus.

![Average of Averages](https://www.stevefenton.co.uk/wp-content/uploads/2020/02/average-of-averages-610x1024.jpg)

### Summary

Attempting to average existing averages without knowing the number of values contained in each value leads to statistical errors. Either use the original values or keep hold of the number of values included in the average in order to keep your numbers accurate.