---
layout: src/layouts/Default.astro
navMenu: false
title: 'The disheartening early phase of cycle times'
pubDate: 2019-05-14T21:00:41+01:00
author:
    - steve-fenton
image: /wp-content/uploads/2019/05/early-cycle-time.jpg
categories:
    - Process
tags:
    - 'cycle time'
---

Whenever I implement cycle-time as a metric, I have to explain that there is a slightly disheartening early phase to the collection of this information.

Over the first couple of days, your cycle time will look awesome, but then it gets progressively worse. This can sometimes shock a team, because staring at a graph sometimes makes you forget maths.

By the end of day one, the longest cycle time you can collect is one day. By the end of day two, the longest cycle time you could collect has doubled, to two. The maximum possible cycle time you can record increases in this fashion every day. In the early days, it is highly likely that the next task to complete will be the one that took the longest ever. That means your cycle-time will keep increasing while you are in the phase marked with an “A” in the chart below.

![Early Phase of Cycle Time Data Collection](/img/2019/05/early-cycle-time.jpg)

Don’t worry about the numbers when you are in Phase “A”. As you can see from the chart, becomes increasingly less likely that the next task to complete will be the longest ever and your line will level out. When this happens, you’ll know you’re in Phase “B”. The exact amount of time to transition is equal to your average cycle time… because until you reach it the line will just keep going up.

Until you get to Phase “B”, you shouldn’t use cycle-time for anything. You ought not to do anything to try and influence it either. We’re just collecting data to use later.

This all sounds very obvious when you aren’t sat there in Phase “A” wondering what’s going wrong.

Here’s an example from a real project that shows this in action.

![Real Project Cycle Time](/img/2019/05/real-cycle-time-chart.jpg)