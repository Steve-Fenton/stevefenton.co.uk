---
id: 2782
title: 'The Three Fs of event log monitoring'
pubDate: '2017-11-06T05:00:07+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=2782'
permalink: /2017/11/the-three-fs-of-event-log-monitoring/
image: /wp-content/uploads/2017/11/Three-Fs.png
categories:
    - Automation
    - Programming
tags:
    - monitoring
    - operations
---

[![Web Operations Dashboards, Monitoring, and Alerting](https://www.stevefenton.co.uk/wp-content/uploads/2017/08/web-operations-monitoring-199x300.jpg)](https://www.stevefenton.co.uk/publications/web-ops-dashboards-monitoring-and-alerting/)

This is one of a series of posts to share some techniques that I wrote about in [Web Operations Dashboards, Monitoring, and Alerting](https://www.stevefenton.co.uk/publications/web-ops-dashboards-monitoring-and-alerting/). In this article, I’m going to talk about the Three Fs of event log monitoring.

When you first start collecting event logs, it is likely that you will be inundated with a large volume of irrelevant logs. Don’t worry though, because the Three Fs are your path to event log joy.

### The Three Fs

Just pick the most frequently occurring event in your combined log and decide which of these three actions to take:

- Finesse
- Fix
- Filter

Let’s take a quick look at each of these actions.

### Finesse

If the event log entry isn’t very useful, because it doesn’t contain enough information, you need to finesse it. Arrange for better quality information to be included in the log entry by improving your logging.

I worked in an organisation where we had a simple rule. If you couldn’t tell a colleague exactly what a problem was just by looking at a single event log entry, that event log entry wasn’t paying for its own storage space. Within six months, people could fix an issue in their head without even looking at a line of code, because the event log was so beautifully crafted.

Finessing takes you from “500 Internal Server Error”, to “The attempt to connect to the primary database from web server 5 timed out after 30 seconds while trying to load Promotions for user id 187 on line 52 of the Promotions Controller: 52 promotionQueries.GetPromotionsForUser(userId);”. Basically, there is a time and a place for abstractions, but your error messages is not one.

### Fix

Once you have a nice, clear, concrete error message – your next course of action is to fix the error. This is a nice simple one, but one that is often done prematurely. Don’t jump to the fixing stage before you have completed the finesse stage. That two-hour forensic investigation that led you to discover the underlying problem will have to be repeated if you haven’t improved the error message.

Fixing the error should mean the number of instances reduces (the error has more cases that you first thought), or that the error is gone for good. Hooray. Break the emergency glass and retrieve the key to the celebration fridge.

A “fix” isn’t just a “code fix”, it might be automation of the resolution of the issue using a runbook, for example.

### Filter

Let’s face it, there are some errors that are just never going away. For some reason, the BITS service will occasionally fail to start, but there will be no operational effects – unless you are in the business of intelligently transferring files asynchronously using idle network bandwidth. I’ll pause and wait for the laughter to subside…

So in the case of some event log entries, you may simply need to ignore them. The life-changing magical way to do this is to thank the event log for the service it has provided, then add a rule that will ensure you never see it again.

### Next steps

If you can’t apply the Three Fs to your error, perhaps it is just being put in the wrong place. For example, if you have an error being logged to ops tools that only an end-user can fix, how can you get the message to the end-user so it can be resolved? Find an automated way to route the information to the right person. For example, if a user linked a web page to an external website, and the external website no longer exists – it is better to give the web editors a view over this issue than it is to log it to your ops tools.

### Perfect conclusion

The perfect outcome of the Three Fs would be that you eventually end up with no event logs, ever. This may not actually be achievable, but you want to end up as close to ideal as you can. Just keep running the Three Fs on your most noisome event log entries until you get things under control.

[![The Three Fs of Event Log Monitoring](https://www.stevefenton.co.uk/wp-content/uploads/2017/11/Three-Fs-1024x381.png)](https://www.stevefenton.co.uk/2017/11/the-three-fs-of-event-log-monitoring/three-fs/)