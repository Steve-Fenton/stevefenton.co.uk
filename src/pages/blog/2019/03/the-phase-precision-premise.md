---
layout: src/layouts/Default.astro
navMenu: false
title: 'The Phase Precision Premise'
pubDate: 2019-03-04T19:25:16+00:00
author:
    - steve-fenton
image: /wp-content/uploads/2019/03/payback-chart.jpg
categories:
    - Process
tags:
    - '#noestimates'
    - 'product management'
---

When I worked on the technical side of software development, I talked a great deal about [\#NoEstimates](https://www.stevefenton.co.uk/tag/noestimates/). I’m now on the business side of software development (in charge of all products and data for a global <abbr title="Software as a Service">SaaS</abbr> provider). I thought it would be a good time to revisit estimates and put them in context using the Phase Precision Premise.

![Payback Chart](https://www.stevefenton.co.uk/wp-content/uploads/2019/03/payback-chart-349x400.jpg)

### TL;DR

The conclusion to this article is that I still find #NoEstimates works, because my organisation is firmly in the Vast Phase (see below). If that upsets you, there are other places you can go to [scratch your itch](http://www.peterkretzman.com/2014/09/24/the-case-against-noestimates-part-1-introduction-and-common-sense/).

So, let’s get on with it. What is the Phase Precision Premise?

### Phase Precision Premise

The *Phase Precision Premise* is a guide to when different approaches to estimation are appropriate for a given software product. The phase is determined by the distance between the actual cost and actual benefit for each idea, experiment, or bet. The further apart they are, the less precision you need to make a business decision (such as whether you implement an idea, or in what order).

There are three phases. Your organisation decides on the exact definition for each phase (usually in terms of a multiplier of cost).

1. **Vast** – the benefit is vastly beyond any likely cost (example, 3x or more in year one)
2. **Narrow** – the benefit is “within sight” of the cost (example break-even up to to 3x in year one)
3. **Crash** – it is likely the cost will outweigh any potential benefits

### Vast Phase

The Vast phase is most likely to occur early on, when there is a “killer idea”. This is typically close to the initial launch of a product idea, or following a pivot that gains advantage through a particular product strategy (i.e. you see an opportunity to differentiate, target a niche, or if you find a way to save large number of people their time, money, or effort). The phase is tracked using actual numbers, not estimates. As long your payoffs are, on average, *massive*; you are in the Vast phase. When things begin to converge, you can anticipate the transition to the next phase, which is the Narrow phase. You might be using an unsophisticated method to determine the value of an idea in order to implement them in the right order.

### Narrow Phase

The Narrow phase comes next. Once you have an established product you’ll find that your ideas begin to have less impact, or that they impact fewer users. The gap between your cost and the payoff narrows to the point where your bets need to pay off more often (i.e. you spend $100 and the return is less than $400). At this point, you need to be on the watch for the next phase as failing to notice the transition can be fatal. In the Narrow phase, you are likely to introduce some up-front number crunching to ensure you don’t pursue ideas with low potential. You are more likely to estimate, for example using software estimation techniques from [Steve McConnell](https://stevemcconnell.com/books/) or [Mike Cohn](https://www.mountaingoatsoftware.com/books/agile-estimating-and-planning). You should still track the actual numbers as they will let you know when the sponge has been squeezed dry, which leads us to the final phase.

### Crash Phase

The Crash phase is where your ideas are low value or have a low probability of success. It is no longer worth attempting any of them. That doesn’t mean you won’t come up with an inspirational idea that could reignite your product and launch you back into one of the other phases – but until this happens you need to limit your spending and concentrate on other products. You might introduce sustaining innovations or simply shut the product or some of its features, depending on whether there is an existing user base that can keep the product afloat.

A given product may transition many times, in any direction, and at surprisingly different speeds.

### Deciding on phase boundaries

Much like a financial adviser will consider the client’s attitude to risk, your organisation needs to understand how innovative they want to be and how much they are willing to take on risk in order to get potentially big rewards. The phase boundaries will reflect the organisation’s risk profile. The exact boundaries aren’t terribly important as you can learn and adjust. The most important thing is to measure actual cost against actual return and use the average over the past few releases to check your current phase, your trajectory, and the chance of reaching a phase transition.

You may want to record the ratio of “successful bets” vs “unsuccessful bets” separately to ensure you don’t succeed less often than you think. This doesn’t affect your phase, but can inform whether you have a habit of always picking safe-bets, or if you fail more often than your organisation can handle.

### Case study

The main product I manage is in the Vast phase. This is commonly the case because it makes sense for a good portion of a product manager’s attention to be on products in this phase (although some organisations do very well without any products in this phase… more on this later). There are hundreds of competing ideas for this product, but I don’t need much precision to make a decision.

I don’t currently request any estimates for the ideas or experiments for this product, because I know the cost is minuscule compared to the massive benefit. Even if the actual implementation time is reasonably variable (one day, one month) I know that the pessimistic end of that range is still tiny compared to the value I’m getting out of most ideas.

If we approached the lower regions of the Vast phase, the first change I would make is to start estimating the anticipated value. Only when we transition to the Narrow phase would I begin to gather estimates of cost. I would still use actual numbers to track my phase, and the estimated value only for deciding what to do next.

This is very important, so I’ll include this short version of the Phase Precision Premise.

> When the benefit is *massive* and the cost is *minuscule*, you don’t need more precision than the words *massive* and *minuscule*

The key to the Vast phase is tracking real numbers so you can detect when you are leaving the phase. When you exit, you need to change your planning strategy.

### Phase per product

This concept of phases applies per-product. Your organisation is never in a single phase, but each product is. It is pretty common to have a number of products spanning different phases; especially if you are disrupting yourself before someone else does. As you generate a product or replacement product that enters the Vast phase, you redirect effort away from the Narrow phase and Crunch phase products. The portfolio I manage contains products that are in, or transitioning between, all of these phases.

What *is* common at the organisation level is phase preference. There are organisations that prefer to be in the Vast phase and others that are great at managing Narrow phase products. Startups are typically seeking the Vast phase whereas there is a big market in acquiring companies whose valuation has been impacted by poor management of the Narrow phase and squeezing out the value that has lain dormant within.

The most common mistake when it comes to Phase Precision Premise is lack of tracking. Not knowing which phase you are in results in missed opportunities for investment, or over-investing in a product that won’t pay you back. If you don’t see the margin narrowing on a product, you are likely to continue investing at the same (wrong) level. If your product degrades to a lower-margin phase and you don’t realise it, you will spend too much on ideas that aren’t worth the money. If you come up with an innovation that improves the product substantially, you may miss good investment opportunities.

### Real Number tracking

You have to track the real numbers to determine which phase you are in. You can’t use estimates to do this; it has to be the real numbers. You need a thick green line of real value and thick red line of actual cost. The distance between them determines the phase. The phase determines the appropriate amount of planning. If you can’t get these numbers, your first job is to make it possible to get this numbers. Try out different ways to visualise it, you don’t have to do it like the example chart on this post.

### The clash

The clash over #NoEstimates probably comes from differences in how various organisations exploit the Phase Precision Premise.

As I mentioned earlier, some organisations will discard a product as soon as it exits the Vast phase and direct all of their attention elsewhere. When they manage to keep a product in the Vast phase over the long term, they are likely to be the market leader. When an organisation prefers the Vast phase, the only thing to prevent the switch away from a Narrow or Crash product will be the lack of any alternative offerings that are in the Vast phase. Where the organisation is fixated on Vast phase products and fails to keep the product in the zone or find their next one, they are ideal targets for competitors to disrupt, or for our next kind of organisation to acquire.

The organisations that are experts at Narrow phase products understand how to sustain or retire products profitably. They will introduce sustaining innovations where they can lengthen the life of the product, or reduce spending where they know the end is near. They may be less likely to reignite a product, but they are solid custodians while there is still a viable user base to service.

There is room in this world for all these organisations. The universe, though, will intervene when an organisation doesn’t know which phase its products are in. They will, eventually, make a catastrophic investment decision.

For the organisations that discard products as they exit the Vast phase, it is possible to run a successful development effort without ever estimating. For the organisations that are tackling Narrow phase products, the inclination and necessity to estimate will be stronger. When the margin is narrower it becomes more important to win a larger proportion of the bets, and to limit the losses when they materialize.

### Summary

The Phase Precision Premise helps to classify products in a way that makes it possible to contextualise how the product should be managed.