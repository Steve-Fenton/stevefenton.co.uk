---
id: 167
layout: src/layouts/Default.astro
title: 'Load, stress, spike, and soak testing'
pubDate: 2015-03-14T15:59:51+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=167'
permalink: /2015/03/load-stress-spike-and-soak-testing/

categories:
    - Automation
tags:
    - testing
---

This article talks about what I like to call the “Four Ss” of performance testing. They don’t actually all begin with “S” – but if reading, writing, and arithmetic can be described as the “Three Rs”, I’m not going to constrain myself either.

Quick aside: it is only really *performance* testing if you are measuring an aspect of performance such as response times, throughput etc – if you run any of these tests without such measures, you aren’t actually performance testing – just testing resilience or failure recovery.

So here are the Four Ss?

- Load
- Stress
- Spike
- Soak

Feel free to pronounce the first one “Sload”.

![Load Stress Spike Soak](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/load-stress-spike-soak.png)

The picture above highlights the difference between the Four Ss.

*Load testing* will ensure that the application under test can handle a given volume of requests. It is normal to gradually work up to the desired volume and then gradually work back down again.

*Stress testing* continues adding volume until the application is brought to its knees.

*Spike testing* sends a sudden large volume to the application to see how it handles the spike and how it recovers.

*Soak testing* is run over a long period to see if there is any gradual degradation (memory use increasing over time, response times increasing over time etc).

You can, of course, combine these kinds of testing. For example, if you run a soak test, what happens if there is a spike? Does the application ever catch up? What ambient volume is needed to allow the application to catch up after a spike?

For example, if you had an email relay that could process 50 messages per second – how does it handle 5 seconds of 100 messages per second? Does it end up with a backlog of messages in a queue waiting to process (i.e. processing times increase until there is a period of &lt;50 messages per second)? Maybe it rejects emails or loses some along the way.

So it is worth understanding that there are found kinds of performance test that can help to expose different problems in an application when it is asked to go beyond the call of duty.