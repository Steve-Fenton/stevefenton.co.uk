---
layout: src/layouts/Default.astro
title: 'The Incident Causation Principles'
navMenu: false
pubDate: 2017-11-13T05:00:42+00:00
authors:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - Monitoring
    - Operations
---

This is another in a series of posts to share some techniques that I wrote about in [Web Operations Dashboards, Monitoring, and Alerting](/publications/web-ops-dashboards-monitoring-and-alerting/). In this article, I’m going to talk about incident investigations and the causations principles.

When things go wrong, it may be that some internal trigger such as a software release or configuration change has made things explode. It is also possible that some external factor has brought things down. Perhaps an increased load, or an attack, or a plain old infrastructure fault.

If you have a strong audit trail (not a paper-trail, but something automated that will track any code or configurations changes), you should be able to eliminate internal causes quite quickly. When the cause is not immediately obvious, you might benefit from some techniques I stole from philosophy and critical thinking. I call them *causation principles*, because let’s face it; everything sounds cool with a little verbal gravitas behind them.

## Causation Principles

In the context of incident management, there is a simple set of causation principles:

1. Find correlations
2. Arrange everything in the correct order
3. Form a falsifiable hypothesis
4. Test the hypothesis

Correlations are easier to find if you have some well designed monitoring dashboards. You’ll be able to track back from a symptom (slow response times) to some earlier metric that was impacted earlier.

To find the root cause you will need to eliminate metrics by ordering the changes chronologically, and removing noise caused by unrelated changes. The earliest metric left in your set is a likely candidate that will lead you to the root cause.

Once you have found a smoking gun, you can form a hypothesis about what will resolve the problem and test it out. Be prepared to drop your “dead certainty” if the evidence doesn’t support it. Your hypothesis should be easily falsifiable if you make a change and it doesn’t resolve the problem. You may be able to test the hypothesis on just a single server to get this answer.

## Journal everything

Nothing is ever so urgent that it would stop you writing a journal to track your investigation. Keep detailed notes about anything you change during your investigation; you ought to undo changes that were undertaken as part of a hypothesis that you dis-proved.