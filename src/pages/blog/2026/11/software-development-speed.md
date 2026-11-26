---
layout: src/layouts/Article.astro
title: "Why your software development isn't speeding up"
subtitle: "It's time to kick the tyres on your delivery pipeline."
pubDate: 2026-11-25
description: "The reasons AI agents don't translate to meaningful improvements are the same reasons as ever."
keywords: "software development,software delivery,productivity"
navMenu: false
bannerImage:
  src: /img/topic/animals/tortoise.jpg
  alt: Photo by Steve Fenton. A tortoise walking across an earthen floor in an enclosure at an animal sanctuary.
authors:
  - steve-fenton
categories:
  - Programming
tags:
  - Productivity
---

Organizations are starting to notice that individual gains from LLM-based AI tools disappear swiftly. They just don't make it downstream to where they matter. What this should make engineering leaders realize is that their way of thinking about software delivery is wrong.

There's a near-universal belief that developers are the constraining factor in software change throughput. This is wrong. Writing code is not the constraint, and *it never was*. Whenever I've worked on a team to reduce the amount of work they tackle at once, I've seen their team-level productivity climb immediately into zones many organizations can only dream of.

Alone, the team-level boost is meaningless unless the changes they make can smoothly flow all the way to the people who need them.

Flipping team-level productivity into an organization-level improvement means carrying the change through to the end. That change must be validated to whatever standard the organization requires, it needs to be deployed to production, and it must be switched on for users to try, so you can see how well it solves their problems.

The organizations outperforming their peers with AI are the same organizations that were outperforming them before AI. They aren't prompting better or doing anything magical with agent context. They are organizations with excellent paths to production.

## The motor isn't the problem

We need to take inspiration from Dave's story. Dave was very unhappy with his new electric car. He saved money by buying the lower-powered option, but every time he pulled away from a traffic light, he regretted that decision. Buyer's remorse is a powerful emotional force, so Dave arranged a visit to the car dealer, who offered to upgrade him to the higher motor power option.

The upgrade was expensive, but quick. It turned out to be a feature toggle in the car's software, so Dave had been sitting on all the technology the whole time; it had just been limited. Reluctantly, Dave handed over his hard-earned cash, and the salesman instructed Sandra, the mechanic at the dealership, to plug in her rugged laptop and flip the switch.

A wave of disappointment smacked Dave in the face as he sluggishly pulled out of the parking lot. The car didn't feel any different. He circled the block twice and then pulled back in.

"The car doesn't feel any different," Dave complained to the mechanic.

"I'm not surprised," Sandra replied. "You ought to put some tyres on those wheels."

Just as Dave assumed his car's performance was constrained by motor power, most organizations developing software assume that implementation time is the constraining factor for a feature. For most development teams, that's not the case. It wasn't before agentic AI tools like Claude Code, Cursor, or Copilot, and that means it's even less likely to be the case now.

Just like Dave, the majority of organizations are missing the tyres that would give their wheels traction and transfer power from the motor to the road, resulting in the acceleration and velocity Dave so badly desired.

## The evidence is mounting

Independent studies have been telling us for a while that the gains from AI are modest at the team level, and non-existent when you roll them up to product or organizational performance. A recent [report from Harvard](https://fion.ac/jellyfish.pdf), based on data from Jellyfish, analysed 445 million work events across coding activity, work item tracking, and work calendars. You won't be surprised to hear the results were muted.

AI assistants have no statistically significant effect on output. AI agents do better. They do boost developer output, but this is lost downstream; just as we'd expect if we don't use the broken model of "developers are the slowest part of software delivery".

The Harvard study is interesting because it goes beyond "coding activity" and touches on outcomes further downstream. Still, even they don't investigate whether the changes make any difference to software users or the organization's balance sheet - not that this matters if the effects didn't even make it to work-item level measures.

This highlights how engineering leaders are focusing far too much on developer speed and activity and not enough on business outcomes, just as Dave was distracted by motor power while trying to drive on bare metal rims.

## Reject average

These modest gains across the software industry might tempt you to give up altogether. Why waste all this money and effort trying to get the performance you want when the whole industry has failed? But not so fast!

While it's true that most organizations are trundling along, happy to make the slimmest improvements and hoping to compound them into something meaningful, a small cohort is doing something far more impressive.

I looked at data from 2,406 organizations to understand how their deployment volumes have changed over the past year. The vast majority of organizations are scratching by with a 1.1× median increase in deployment volume over the course of a year. But there's also a group accelerating ahead with a 3.5× median. Deployment volumes aren't an outcome metric, but they land further along the software delivery process than commits or pull requests. That means we can infer more meaning from them than we can from developer activity.

| Cluster | Share | Median | Middle 50% |
| :---- | :---- | :---- | :---- |
| Improvers | 95.8% | 1.1× | 1.0× - 1.3× |
| Accelerators | 2.1% | 3.5× | 2.8× - 5.9× |

The 25th percentile is 1.0× for the improvers (which means the label "improvers" becomes somewhat generous) and 2.8× for accelerators, and the 75th percentile shows 1.3× for improvers and 5.9× for accelerators.

:::figure

:img{ src="/img/2026/improvers-vs-accelerators.png" alt="Line chart showing a small steady increase in improvers compared to a dramatic uplift for accelerators." loading="lazy" }

:::

:::div{.note}

The improvement rates are calculated using a baseline for each organization in November 2025, so they show the improvement over the year. Organizations were qualified by a requirement that they have data in every month under analysis, excluding, for example, new accounts that would look like they had rapid improvement attributable to onboarding activity.

The clusters come from K-means clustering of the improvement trajectories, with 4-8 clusters identified over 10 runs using a sample of 2,000 organizations, selected based on the best silhouette score. All 2,406 organizations that qualified are shown in the numbers and the chart.

In addition to the two improvement clusters (improvers and accelerators), 2.1% of organizations fell within two clusters whose deployment rates declined over the comparison period.

:::

## The secret is the tyres

So what do the accelerators have that everyone else is missing? It isn't a better model for their AI agent or a more expensive AI license. Most organizations have access to the same AI tools, and it's just not a differentiator. Like Dave, they all have a similar enough motor, and it's not what's stopping them from pulling away faster.

The difference comes from a decade of research, and it's what happens after the code is written. When AI agents speed up implementation, the work piles up downstream: code reviews, testing, approvals, and deployment.

And that's the secret. The practices that mattered all along are still the ones that matter; we've had enough [State of DevOps reports](https://dora.dev/research/) to be confident about this, and our [own research](https://futureof.dev) keeps finding the same threads. The organizations pulling ahead have already done the work that gives their wheels traction: automated testing, fast feedback, deployment automation, small batches, and small autonomous teams that are trusted to ship their own changes. You won't find monthly change approval boards, manual regression testing, or deployment gatekeepers among the accelerators. When the motor got more powerful, they had somewhere for that power to go.

:::figure

:img{ src="/img/topic/transport/top-gear-red-truck.jpg" alt="Photo by Steve Fenton. A red Toyota pickup truck made famous by BBC Top Gear. It has massive tyres." loading="lazy" }

:::

For everyone else, more code means more spinning wheels. AI agents increase output, the output hits the same old bottlenecks, and the gains disappear downstream, exactly as the research describes.

Tyres aren't terribly interesting. In fact, they're positively boring. But if you want an exciting car, the tyres are the enabler. If you want a safe car, the tyres are the enabler. If you want traction in the rain, cornering on winding roads, and the ability to stop in an emergency, the tyres are the thing making all the other components translate into the desired outcome.

Dave eventually put tyres on his car. The upgrade he'd paid for finally reached the road, and he left a streak of rubber at every traffic light. The power had been there all along. He just needed a way to use it. It turned out that the brakes worked better, too.

You can be satisfied as a modest improver right up until one of your competitors fits tyres and becomes an accelerator.
