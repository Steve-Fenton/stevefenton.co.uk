---
id: 2955
layout: src/layouts/Default.astro
title: 'Uptime and SLAs'
pubDate: 2017-12-11T08:50:14+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=2955'
permalink: /2017/12/uptime-and-slas/
categories:
    - Automation
tags:
    - monitoring
    - operations
---

[![Web Operations Dashboards, Monitoring, and Alerting](https://www.stevefenton.co.uk/wp-content/uploads/2017/08/web-operations-monitoring-199x300.jpg)](https://www.stevefenton.co.uk/publications/web-ops-dashboards-monitoring-and-alerting/)This is a bonus post that follows up on some information that is useful if you read [Web Operations Dashboards, Monitoring, and Alerting](https://www.stevefenton.co.uk/publications/web-ops-dashboards-monitoring-and-alerting/). This article is all about uptime and SLAs.

Having helped a number of businesses understand what uptime and SLAs are, and how they work in real life, I have encountered a few myths about them both over the years. Here are a few of the things that people believe to be true (that are, in fact, *not* true).

- 100% uptime is possible
- Downtime means a server or application is unavailable
- Downtime is when something unexpected happens
- 99.9% and 99.999% are practically the same
- An SLA is how much uptime there will be
- 
- (want to share another myth… [message me](https://www.stevefenton.co.uk/contact/))

Let’s quickly work through these myths.

### Uptime and SLA myths

To achieve 100% uptime, you would need to own the whole Internet and everything it runs on. At some point, no matter how hard you try, something will happen that will cause downtime. That thing that happens might be outside of your control. In reality, it usually turns out to be something well within your control, like renewing a certificate or domain name, or releasing working software, or not plugging a router into itself.

Downtime doesn’t just mean that a server or application in unavailable; it could mean that a feature is unavailable. You may think that feature availability isn’t important when considering uptime… but consider this…

Your application allows your users to login with Facebook – and for some reason the Facebook authorisation service is currently down. Is you application available if none of your users can log in? Perhaps you have a contract that disclaims your responsibility for downtime caused by third parties… but do your users think your application is available – or just your lawyers. Can you manage the reputational impact, the ringing telephones, or the pure embarrassment?

That isn’t to say that only unexpected events count as downtime. Almost everything needs to be maintained at some point. Operating systems need to be updated. Applications need to be upgraded. Stuff needs to happen. All of the time that these fully-anticipated events are happening can result in downtime, depending on how you manage it.

### SLA as downtime per day, week, month, and year

Now let’s take a look at the difference between some of the common uptime promises. The table below shows the amount of time you can be unavailable based on SLAs of 99% all the way up to the “five nines” 99.999% in terms of hours, minutes and seconds.

| SLA | Daily | Weekly | Monthly | Yearly |
|---|---|---|---|---|
| 99.000% | 00:14:27 | 01:40:48 | 07:18:18 | 87:39:39 |
| 99.900% | 00:01:27 | 00:10:05 | 00:43:50 | 08:45:57 |
| 99.990% | 00:00:09 | 00:01:05 | 00:04:23 | 00:52:36 |
| 99.999% | 00:00:01 | 00:00:06 | 00:00:26 | 00:05:16 |

The difference between 99% and 99.999% is that you drop from 1 hour and forty minutes a week to just 6 seconds.

### Composite uptime

This is even harder when you consider that your application may be made up of multiple services; a database server, an application server, and a load-balancer/firewall. Why does this make it harder? Because downtime on any one of these services can affect the application’s availability – so your composite uptime is the multiple of all three.

For example, if you have 99% uptime on each of these three services, your uptime overall is 97%. To achieve 99% overall, each service would need 99.9% uptime (following the all-nine pattern, the exact figure is closer to 99.7%).

```
<pre class="prettyprint">
99% x 99% x 99% = 97%

99.9% x 99.9% x 99.9% = 99.7%
```

### SLAs vs business impact

And finally, giving out an SLA of 99.999% uptime does not mean that there will be 99.999% uptime. Typically it means that when there is 98.999% uptime the customer gets back 1% of their invoice for that billing period. In other words, you can give a 100% uptime SLA on a 99% available application as long as you can absorb a 1% rebate. Incidentally, this is how some companies can give out a 200% uptime guarantee – they simply give you back twice as much as you paid for the period of downtime.

This is where some businesses can get into a lot of trouble. Let’s view if from the point of view of *your* business.

Your customers say they want 99.999% uptime. They need you to always be there… and you sign a five-year, five-million-dollar contract saying you’ll supply 99.999% uptime. You are a bit worried, so you engage with a provider to run your application with a 99.999% uptime SLA and pay them $365,000 a year to make sure it happens. Cracking. They even manage to install updates and replace old hardware using just one second per day.

A year in, everything is fine… but then there is a major disruption to the Internet caused by a rather nasty DDoS attack. Your provider mitigates the problem, restarts a bunch of routers, and within about 20 minutes everything is fine again.

You breathe a sigh of relief… until your customers point out that you have breached your contract and cancel their business. The impact to your business is that you lose $4,000,000 (ouch) but don’t worry because you can claim back $14 from your provider. Oh dear.

This is the kind of asymmetrical contractual problem a business can land itself in if they don’t understand uptime and SLAs. It would be better for the business to give a higher uptime SLA but with the condition being service credits and a bottle of Champagne whenever there is an outage.

### Summary

Understanding what the uptime percentages translate into is an important part of understanding uptime and SLAs – as is ensuring that the business impact of downtime when it inevitably happens is recoverable. There are lots of tips and tricks to help you track and manage problems in my book [Web Operations Dashboards, Monitoring, and Alerting](https://www.stevefenton.co.uk/publications/web-ops-dashboards-monitoring-and-alerting/) – but there is not yet an economical way of ensuring 100% uptime, so downtime needs to be part of your plan.