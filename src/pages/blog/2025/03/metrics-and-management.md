---
title: Metrics at altitude
navMenu: false
pubDate: 2025-03-22
keywords: metrics
description: Why metrics become dysfunctional if you fire them upwards without considering your audience.
bannerImage:
    src: /img/topic/space/nasa-atmosphere-layers.jpg
    alt: The layers of the atmosphere, by NASA.
authors:
    - steve-fenton
categories:
    - Process
tags:
    - Metrics
---

This month in the <abbr title="Cloud Native Computing Foundation">CNCF</abbr> content club, we're talking metrics. This is my addition to the set and you can find more in the links below, and on [the CNCF #content-club Slack channel](https://cloud-native.slack.com/archives/content-club).

Metrics are amazing, because they help us understand things. If I could flick one switch in organizations it would be to make them understand this. Metrics for their own sake are not just pointless, they can be downright damaging to all the things you want your organization to achieve. I have many stories on this from my own experience and from many conversations with others in the community.

This article is, I hope, one way to move closer to understanding how to use metrics well.

## The dysfunctions of metrics at altitude

When I talk about metrics at altitude, I'm not talking about the aviation industry. What I mean by altitude, or elevation, is when metrics move upwards through the organization chart. Earth's atmosphere has many layers. The lowest is the troposphere, which goes from the surface to 12 km. Keep going up and you'll pass through the stratosphere, mesosphere, thermosphere, and exosphere before reaching the edge of outer space.

In the same way, an organization has an atmosphere made up of different types of power and influence. When metrics exit the contributosphere and head into the managosphere or even the chiefosphere, it changes in dramatic ways. Even if these upper layers do nothing malicious with metrics they receive, knowing they see the numbers is enough to skew individual contributor behaviour in odd ways.

This is why there are so many organizations giving themselves the gift of surprise with things like the DORA metrics.

### Contributosphere

When you use the DORA metrics within your team, their main benefit is they help identify where improvements are needed. You use the metrics along with the DORA Core Model to identify improvement opportunities and select a technique or practice that you think might help. The metrics then confirm whether or not your hard work has made a difference.

This is healthy stuff. Over time you learn that adopting new things gives you an initial dip, following by a boost up to a new level of performance. When something works, you also have a chart to share when people are pondering ditching the thing that previously gave you a boost, which prevents the gradual decay back to the old ways.

Life is good and it gets a little better each week. Yay.

### Managosphere

If you pass the DORA metrics up to your managers, you instantly get a change in contributor attitude to the metrics. Before they were just a useful guide to improvement. Now they become important to your career. Something like *change lead time* might not be the most important thing for your team, but now it's become an existential metric it will be treated like it is.

Managers who receive these metrics also have a problem. They can see DORA metrics for multiple teams. It's hard for managers to avoid seeing differences in software delivery performance when they receive numbers from several teams. They might heroically empathise with the team who got stuck with that legacy spaghetti monolith and be understanding of their lower throughput and stability. But still, they deploy 10x less often. Isn't that too low?

Once managers start to compare the DORA metrics, they start worrying that teams might cheat them. I always respond in the same way to this. Who cares? If a team is "cheating" the DORA metrics by committing smaller changes to the codebase to improve change lead time and deployment frequency, great! I bet they also improve the stability of the system if they do this. This is kinda the point of the metrics; they encourage you to work in small batches, which we *know* is a better way to evolve software.

Meanwhile, the team is becoming myopic on DORA metrics and no longer care about, you know, the things that matter. If it's DORA metrics the managers want then by heck they're gonna get them. Forget all that other stuff the team was tracking quietly within the contributosphere. Forget things like web page sizes or response times that customers might care about.

The other problem managers have is that they end up with too many numbers. They are tempted to average them. When they do this, the numbers become a total farce. You can't learn anything from DORA metrics averaged across teams. One team could be improving while another is crashing out. The average would happily sit between them, reporting the same numbers week after week.

### Chiefosphere

Sending DORA metrics to the chiefosphere is even more bonkers. The c-suite are responsible for setting the direction of the whole company. Why would you send such low-level numbers into an already metric-rich environment?! Far better they take care of the balance sheet than get distracted asking one of 10 teams why they only deploy weekly when everyone else is deploying daily.

If a number becomes important when it reaches the managospehere, imagine how people are going to react when it's beamed onto the special boardroom screen that emerges from the fake panelling next to the Champagne chiller!

## What to do instead

You need to switch what you measure as you increase your altitude. *Continuous Discovery Habits* by Teresa Torres helps plot a course for this. Use these metric types to send appropriate signals around your organization:

1. **Organizational goals**: The stuff the c-suite cares about. It's usually either *making money* or *saving bees* depending on the organization's purpose.
2. **Product goals**: These are numbers you're trying to move with your software. They contribute to organizational goals, but they are small enough that a team can independently influence them. For example, an e-commerce team might be aiming to *reduce abandoned baskets without lowering basket value*.
3. **Traction metrics**: These are things that you know work. If I walk a couple of miles every day, I feel like I have more energy and I delay my death a little. I can just track my steps to know I'm on track (or not).

We know DORA metrics result in useful outcomes at the team level. That makes them traction metrics. If you want to report to the managosphere, find a product goal. If you want to signal the chiefosphere, use organizational goals. Simple.

Not only is this healthier for the team, it's more appropriate for your audience.

## Other articles in the series

- [Metrics that matter](https://newsletter.bryanross.me/p/metrics-that-matter) by Bryan Ross
- [Measuring what actually matters](https://www.linkedin.com/pulse/6-art-measuring-what-actually-matters-platform-graziano-casto-rkv3f) by Graziano Casto
- [Discussion about metrics while walking home](https://www.youtube.com/watch?v=6lxvY3d2E8M) (video) by Kalle Sirkesalo
