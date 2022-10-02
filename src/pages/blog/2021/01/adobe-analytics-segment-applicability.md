---
id: 11335
layout: src/layouts/Default.astro
title: 'Adobe Analytics segment applicability'
pubDate: 2021-01-14T14:12:39+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=11335'
permalink: /2021/01/adobe-analytics-segment-applicability/
image: /wp-content/uploads/2021/01/simple-utm-then-checkout-segment.jpg
categories:
    - Analytics
tags:
    - adobe
---

Adobe Analytics makes it super-easy to add segements, with a visual designer that will help you build the logic. As well as traditional and/or logical tests, you can use time based “then” tests to create segments where things happen in a specific order. For example, you might be interested in visitors who arrive from a UTM campaign and within a week checkout.

[![Settings show "Include Visitor WHERE utm_source does not equal Unspecified THEN WITHIN 1 WEEKS Checkouts is greater than or equal to 1"](https://www.stevefenton.co.uk/wp-content/uploads/2021/01/simple-utm-then-checkout-segment.jpg)](https://www.stevefenton.co.uk/2021/01/adobe-analytics-segment-applicability/simple-utm-then-checkout-segment/)

This is all well and good, but the most subtle part of this rule also happens to be the most important. It’s the part that says “Include”. It makes quite a big difference whether you choose “Hit”, “Visit”, or “Visitor” because it changes where you can apply the segment later. For example, if you include “hit” and use the segement to analyse a visitor, you’re going to start seeing some results that won’t immediately make sense (they aren’t “wrong”, but they might mislead you).

As a general rule of thumb, you ought to consider two common uses for segments.

The first is a pure segment (A). This is where you will filter a whole report based on the segment. Usually, you’ll want to segment your visitor for this purpose so you can see data “for all visitors that…”.

The second is as filter (B), where you will use it to filter a single column. In these cases, it is better to include the item (hit, visit, visitor) that matches the “Expire After” value for the conversion variable in Traffic Management. If the filter only makes sense for a specific conversion variable, name it after the metric. For “Checkouts” you can call it “Checkouts After UTM Filter”, for example.

[![Segement (top left) vs filter (dropped under a column)](https://www.stevefenton.co.uk/wp-content/uploads/2021/01/segment-vs-filter-1024x211.jpg)](https://www.stevefenton.co.uk/2021/01/adobe-analytics-segment-applicability/segment-vs-filter/)