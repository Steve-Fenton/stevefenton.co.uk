---
title: The Fundamental DevOps Principles
navMenu: false
pubDate: 2022-08-04
modDate: 2022-10-08
keywords: devops,principles,automation
description: An overview of the fundamental DevOps principles.
bannerImage:
    src: /img/2022/08/devops-structural-equation-model.png
    alt: The classic DevOps Structural Equation Model
authors:
    - steve-fenton
categories:
    - Process
tags:
    - 'Continuous Delivery'
    - DevOps
---

Over the past few months, I have written extensively about DevOps and Continuous Delivery. As they say, this isn’t my first rodeo, as I’ve worked on teams using Continuous Delivery (and before that, Lean, Agile, and adaptive techniques such as Extreme Programming) for a long time.

Some articles and white papers are listed below if you want to read more. You’ll notice that the quality of writing on these items is significantly better than the casual “capture my thoughts” style of writing you find here. That’s because I’m working with some incredibly talented writers and editors at Octopus Deploy who are helping me improve my word-chops. I’m not sure they’d want me to say “word-chops”, for example.

So, bear in mind that this little thought has come not just from two decades of practical experience as a software developer, manager, and director in charge of product, data, and software development; it is also based on a good deal of research.

My research encompassed stacks of work done by others. DORA (obviously), but also the CD Foundation, Puppet, The Association for Computer Machinery, and many others.

## Fundamental principle: “At the current time”

Continuous Delivery is the best way that we know of to deliver software *at the current time*. The State of DevOps Report has the most extensive research into software delivery that we have *at the current time*.

When we get new information, this will change. As a result of the research, the Structural Equation Model gets updated to reflect the best knowledge we have *so far*. As you read this version, it may already be out of date.

For example, it seems like only five minutes ago we were talking about the four DORA metrics, but now it’s five. And that’s before we introduce the broader SPACE framework into the conversation.

It’s worth keeping up to date with changes to get insights that might sharpen your competitive edge further…

:::div{.inset}
:img{src="/img/2022/06/devops-structural-equation-model-1.png" alt="DevOps Structural Equation Model (SEM)" loading="lazy"}
:::

So, the first fundamental principle is that our new era of software delivery is about doing the best thing we know *now*.

## Fundamental principle: Types of work

To keep things simple, I’ll say there are two types of work. What I mean is that work can be plotted along a scale that is either more like one type or more like the other.

These two classifications became clearer over time as we learned more about software delivery. If you are interested, Dave Farley’s *Modern Software Engineering* is a great read with more detail on this point (and many others).

Software engineering can be divided into two types of tasks (remember my point about there being a scale):

1. Complex and unpredictable work
2. Predictable work

:::div{.inset}
:img{src="/img/2015/07/Definitely-Routine-to-Definitely-Eccentric.png" alt="A scale from predictable to complex work" loading="lazy"}
:::

The fundamental principle of DevOps is that **we reduce as much of the predictable work as possible to give us more time and energy to handle the complex and unpredictable stuff**.

We can reduce routine work by automation (such as automated builds and deployment automation). Or, we can reduce it by removing work that isn’t needed. Or by never letting things get big (think small batches and continuous integration of changes into trunk).

The specific ways we reduce that routine work might change. We might identify more things that we can class as routine. Advancements in tools might make some things that are hard to reduce now far easier in the future. The economics of things like automation will shift continually.

## Automation

If this sounds familiar, it’s because it connects back to my [automation philosophy](/blog/2015/02/automation-philosophy/). I used the terms “routine” and “eccentric” to describe the work and said that all the routine stuff should be automated. Anything truly “routine” *can* be automated, but there is an economic U-curve to surf. As technology advances, the economics will shift in favour of automation for even the most difficult routine stuff we handle right now.

The goal isn’t to just automate everything. Some things don’t need to be done at all, so don’t automate them; just stop doing them. In other cases, doing something more often makes it vastly less work.

Continuous integration is an excellent example of this. If you merge every change into your mainline, you never create a giant merge with complex conflicts. This reduces the problem's scale; a human still commits their code manually (what happens next is filled with automation opportunity).

We are also targeting *routine* or *predictable* tasks in particular. There may be some future point where the definition of *routine* extends further into what we thought was *eccentric*, diminishing the amount of complex and unpredictable work we handle. Who knows, there might be some incredible technological advancement that means whole classes of complexity can be solved with a tool.

The point is, at the current time and with available tools, we should reduce and automate all the predictable tasks so humans can get to work on the tough stuff.

## Summary

The summary is short and sharp…

1. Use the best way to stuff that we know at the current time
2. Identify, reduce, and automate routine work

## White papers

These white papers can be downloaded for free from Octopus Deploy.

- [The importance of Continuous Delivery](https://octopus.com/whitepapers/the-importance-of-continuous-delivery): In this white paper, I provide a definition of Continuous Delivery and explain why teams should be adopting it with vigour.
- [How to map your deployment pipeline](https://octopus.com/whitepapers/how-to-map-your-deployment-pipeline): In this white paper, I discuss some practical steps you can take to start creating a deployment pipeline.
- [Measuring Continuous Delivery and DevOps](https://octopus.com/whitepapers/measuring-continuous-delivery-and-devops): In this white paper, I discuss some of the principles and practices of good metric design and share some well-designed ways to measure Continuous Delivery and DevOps.
- [A modern view of multi-tenancy](https://octopus.com/whitepapers/a-modern-view-of-multi-tenancy): Revisits the concept of multi-tenancy and expands it beyond just software architecture.

## Further reading

- [Automation Philosophy](/blog/2015/02/automation-philosophy/)
- [Test Automation Philosophy](/blog/2015/02/test-automation-philosophy/)