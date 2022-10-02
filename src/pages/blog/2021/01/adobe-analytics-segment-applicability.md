---
layout: src/layouts/Default.astro
title: Adobe Analytics segment applicability
navMenu: false
pubDate: 2021-01-14T14:12:39+00:00
authors:
    - steve-fenton
categories:
    - Analytics
tags:
    - adobe
---

Adobe Analytics makes it super-easy to add segements, with a visual designer that will help you build the logic. As well as traditional and/or logical tests, you can use time based “then” tests to create segments where things happen in a specific order. For example, you might be interested in visitors who arrive from a UTM campaign and within a week checkout.

:img{src="/img/2021/01/simple-utm-then-checkout-segment.jpg" alt="Settings show: Include Visitor WHERE utm_source does not equal Unspecified THEN WITHIN 1 WEEKS Checkouts is greater than or equal to 1" loading="lazy"}

This is all well and good, but the most subtle part of this rule also happens to be the most important. It’s the part that says “Include”. It makes quite a big difference whether you choose “Hit”, “Visit”, or “Visitor” because it changes where you can apply the segment later. For example, if you include “hit” and use the segement to analyse a visitor, you’re going to start seeing some results that won’t immediately make sense (they aren’t “wrong”, but they might mislead you).

As a general rule of thumb, you ought to consider two common uses for segments.

The first is a pure segment (A). This is where you will filter a whole report based on the segment. Usually, you’ll want to segment your visitor for this purpose so you can see data “for all visitors that…”.

The second is as filter (B), where you will use it to filter a single column. In these cases, it is better to include the item (hit, visit, visitor) that matches the “Expire After” value for the conversion variable in Traffic Management. If the filter only makes sense for a specific conversion variable, name it after the metric. For “Checkouts” you can call it “Checkouts After UTM Filter”, for example.

:img{src="/img/2021/01/segment-vs-filter.jpg" alt="Segement (top left) vs filter (dropped under a column)" loading="lazy"}