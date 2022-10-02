---
layout: src/layouts/Default.astro
navMenu: false
title: 'Uptime checker myth busting'
pubDate: 2021-06-15T16:50:57+01:00
author:
    - steve-fenton
categories:
    - Automation
tags:
    - devops
    - operations
    - uptime
---

Whether you use Pingdom, UpDn, Datadog, or some other platform to test if your website is up and running, you will need to keep in mind some common traps that are waiting to ensnare the unsuspecting.

The idea behind an uptime checker is that it will visit your site frequently and report whether it managed to get there. There are lots of reasons it might not get there, but it basically records the success or failure and then reports the uptime, usually as a percentage. For example, the below chart shows the daily uptime on this website for the past 28 days.

[![28 Days of Uptime Results](https://www.stevefenton.co.uk/wp-content/uploads/2021/06/uptime-results-28-day-chart-1024x282.jpg)](https://www.stevefenton.co.uk/2021/06/uptime-checker-mythbusting/uptime-results-28-day-chart/)

There are two blips on there for June 7th and June 12th. Both were my fault!

### More hole than boat!

The first problem with these uptime results is that there is *more hole than boat*. Basically, even if you check once per minute, you have data for about 1/120th of that minute (assuming you are happy to count the check as 500ms of uptime). Most people check less often than this:

| Frequency | Boat | Hole |
|---|---|---|
| Every Minute | 1 | 118 |
| Every 5 Minutes | 1 | 598 |
| Every 10 Minutes | 1 | 1,198 |
| Every Hour | 1 | 7,198 |

What this means is you need to acknowledge the size of your blind spot. Now, if everything is totally random you would expect that over the course of collecting 1,000 samples you would get a reasonable picture of your uptime. A year of data for all of the above time slices would give you very similar uptime percentages, as long as everything *is* random.

But what if it isn’t? For example, some people running burned-out old systems have tin they found being chucked in a skip and a web application that is even more suspect. There’s a common trick on these legacy set-ups to set application pools to recycle each hour. It’s easier than actually fixing that resource leak in the application, right! Well, if your uptime checks run once an hour, just after the app pool is recycled, you’ll get 100% uptime for an app that is broken from quarter-past until the next hour when it all recycles again.

This is just one example where things aren’t as random as you might hope them to be. There are many more.

### Who polices the police?

The next problem is caused be uptime checks running in a “homegrown” fashion. For example, I helped a small business who were getting reports from their customers that their website never worked. They didn’t understand it because they had an app that checked uptime and it never detected any issue.

The uptime app was running on the owner’s laptop. The owner’s laptop got switched off at five o’clock each evening, so the checks stopped running. The owner’s laptop was also his web server, so the website stopped working at the same time.

If you can’t trust your uptime checker to be running 24/7, it probably isn’t really an uptime checker.

### Man with one watch…

A man with one watch always knows the time. A man with two watches is never certain. Basically, when your uptime checker gives you an alert, you don’t actually know if the website is down, or the uptime checker failed to see that it is up. For example, your uptime checker needs an Internet connection, it needs to get the correct DNS record from a DNS server. It needs to make it past firewalls. There is basically a lot of cable stretched between the website and the uptime checker and any one-inch part of that cable could fail without your website being unavailable to your real visitors.

So, you could add another uptime checker right? Maybe three to be sure? Only you can decide how many uptime checkers is enough uptime checkers!

Conversely, just because your uptime checker can see the website doesn’t mean your users can!

### Summary

Uptime checking is a just another tool to help you understand what’s going on with your website. You should definitely have a view on this data, but on it’s own it is not enough!