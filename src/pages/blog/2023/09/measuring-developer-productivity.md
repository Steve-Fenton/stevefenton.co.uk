---
title: 'Measuring developer productivity'
navMenu: false
pubDate: 2023-09-05
modDate: 2025-01-15
keywords: developer,productivity,measurement,metrics
description: Can you measure software developer productivity and is it the right thing to measure?
bannerImage:
    src: /img/2015/07/pomodoro_chart.jpg
    alt: A hand drawn chart of progress against the Pomodoro Technique.
authors:
    - steve-fenton
categories:
    - Process
tags:
    - Metrics
    - Productivity
---

[McKinsey](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/yes-you-can-measure-software-developer-productivity) published an article on measuring developer productivity, and it gets enough things right that we should be concerned about parts that are likely to lead us into trouble.

This article is arranged as follows:

1. The key things I think McKinsey got right
2. The crucial thing they got wrong
3. A discussion on productivity in the context of throughput and responsiveness
4. The thing I found interesting about their approach
5. What you should *actually* do instead

The concrete suggestions all come in those last two sections, so skip down the page if you want to get straight to the answer without all the discussion. You should know, though, that some people enjoyed reading this.

I've been writing about [DevOps](https://www.stevefenton.co.uk/tag/devops/1/) and [metrics](https://octopus.com/devops/metrics/) for some time both here and [elsewhere](https://www.stevefenton.co.uk/about-me/articles-elsewhere/). I'm also a DORA Community Guide, which I mention as I get to speak to some super-smart folks at DORA and in the DevOps community. I've also worked for companies of many different sizes (and cultures) in hands-on development, architecture, management, and director roles. I haven't worked everywhere, but I've seen a lot. I haven't read all published research, but I've read a lot.

The McKinsey article already has some famous responses ([part 1](https://tidyfirst.substack.com/p/measuring-developer-productivity) and [part 2](https://tidyfirst.substack.com/p/measuring-developer-productivity-440)), but I'm hoping to bring a different perspective.

## What they get right

The premise of the McKinsey article is that "functions such as sales or customer operations" have power point numbers they can present to say whether they are doing a great job. The C-suite has an appetite for a similar *pow-pow-pow* finger-gun set of numbers for software development. Existing development updates are usually narrative-based and *so yawn*.

On top of the lack of headline numbers to say how good (or bad) the software engineers are, the software is now crucial to an organization's success. The C-suite depends on this software, which they are not "knowledgeable enough to assess" (not my words) and they are worried about it.

> ...only trained engineers are knowledgeable enough to assess the performance of their peers.

So, we can agree that:

**Yes #1**: There's no standard headline number accepted by the industry to explain the performance of software engineering.

**Yes #2**: Software is critical to many, perhaps most, organizations.

**Yes #3**: The C-suite is anxious about software delivery.

Suppose you work in a large organization or one where the C-suite is disconnected from software delivery. In that case, you need to think about how you communicate with them. A skill I had to develop as a software leader was finding appropriate ways to connect the great work the team was doing to the things the C-suite might lose sleep over.

## What they get wrong

Fundamentally, a [two-year study at Google](https://web.archive.org/web/20181106145524/https://rework.withgoogle.com/blog/five-keys-to-a-successful-google-team/) found that psychological safety is a top factor in developer productivity. Some activities that will damage psychological safety include:

1. Collecting metrics at the individual level.
2. Inappropriate comparisons between team-level metrics.

I'm assuming you want to measure productivity because you want it to improve. If you damage psychological safety, it's not going to improve. Some of the recommendations in the McKinsey article will harm psychological safety.

I have some thoughts about the emphasis in the original article on management driving optimizations. Teams should be given the autonomy to do this, with leaders taking on more of a coaching role. I don't think command and control software delivery will ever be more productive than modern self-organising methods.

> Other functions can be measured reasonably well, some even with just a single metric, whereas in software development, the link between inputs and outputs is considerably less clear

The quote is a big problem. If you've worked closely with sales teams, contact centre teams, and other business functions, you'll find typical measurement techniques can be awful. Metrics can cause terrible outcomes for these functions, and it needs finesse and strong leadership to guide organizations away from dysfunctional measurement systems.

Our very own NHS has a key measurement for how long it takes to be discharged from A&E, so some hospitals have developed policies that allow admission to a closed ward, thus stopping the clock, improving the metric, and abandoning the patient for hours in a dark hospital wing.

If you haven't been subjected to healthcare shenanigans, you have almost certainly hit contact centre ones when your call gets a little too close to the target resolution time. "We handled 20% higher call volume this month with an average completion time of three minutes." Oh dear, I think I've been disconnected. I'll have to call them back.

Additionally, software delivery has an asymmetry to it. There's an element of invention to it - *anyone can register a patent, but only a few are worth the big bucks*. When you don't think hard about this subject, you inevitably end up counting things that don't matter. As you congratulate a team for delivering a hundred features, your competitor is popping corks for the five features they delivered that are winning market share.

No amount of software delivery makes up for poor / lack of product management. Using developer productivity to report to the C-suite seems like the wrong angle. More on this later.

I originally listed several "no" items, as I did for the "yes" items. Instead, though, let's respect the prime nope!

**The prime nope**: You can't improve productivity while harming psychological safety.

## It's more complex than that

Something I've learned in software delivery is that there's all this work that isn't coding that adds a ton of value. Some of it could be brought into a measurement system - the folks writing documentation to help other developers, the person who makes improvements to the deployment pipeline, and the people taking care of monitoring. There are also some critical things that you can't measure. The glue work, networking, and keeping up-to-date with technical, industry, and legal developments that may affect the product.

I may have coded less than other folks on my team, but I did *walkie lookie* to find out what was stopping users from being productive. Any individual wins I got by abandoning these walks would be a net loss to the organization. Yes, there are organizations where bureaucratic culture results in one hour of coding and seven hours of procedural manoeuvres. That needs to be fixed. Do you need to hit one-hundred-percent coding? No.

Is productivity even the thing we want from software development? In many cases, I think not. Most organizations place a value on responsiveness. If they discover a problem that's upsetting customers, they value a quick resolution more than the efficient completion of whatever feature is in-flight.

Responsiveness requires slack in the system. You need to work in small batches and keep short lead times. These things are encouraged by the [DORA metrics](https://octopus.com/devops/metrics/dora-metrics/), but they don't measure productivity; they measure something more valuable to many organizations.

Responsiveness and throughput have a natural tension. Productivity tends to favour throughput, which isn't always a good thing.

## What's interesting in their approach

When everyone was debating [Agile vs Waterfall](https://www.stevefenton.co.uk/blog/2014/01/waterfall-verses-agile-graph/), the CHAOS report provided evidence that Agile beat waterfall at it's own game. The metrics used in the CHAOs report aren't the ones you'd choose to measure Agile software teams, but Agile teams still beat waterfall teams at their own game.

What's interesting in the McKinsey article is that they propose a measurement system but judge its success based on something else. In particular, they suggest the measurement system can improve the following measures:

- Customer-reported production defects
- Employee experience scores
- Customer satisfaction ratings

I'm just saying... you might do better with these three metrics than with the McKinsey developer productivity metrics (but please see the links at the end for some better suggestions).

## What you should actually do

Firstly, I don't think you should be following the advice in the McKinsey article. It is a great pitch, with enough substance to fool the target audience, who are the very C-suite folks who they describe as *not knowledgeable enough to assess software delivery performance*.

Instead, clear your head and return to the long-running research. Listen to folks like [Dr. Nicole Forsgren](https://nicolefv.com/), and [DORA](https://dora.dev/). Check out the [developer thriving framework](https://www.pluralsight.com/resources/blog/business-and-leadership/developer-thriving-framework-white-paper) by Cat Hicks PhD, Carol Lee PhD, and Morgan Ramsey and published on Pluralsight Flow. Build a muscle for reading research (including the method), dive into statistics to understand some of the trip hazards, and validate the findings in your own context. David Spiegelhalter and Tim Harford have great books on statistics.

I have a free white paper on [measuring Continuous Delivery and DevOps](https://octopus.com/whitepapers/measuring-continuous-delivery-and-devops) that explains different types and levels of measurement and how to avoid unintended consequences of a measurement system. It talks about different measurement techniques and provides other ways to find *inspiration for improvements*, like the statements of Continuous Delivery.

For the continuous improvement process, teams and their coaches should collect metrics for their own use in generating improvement ideas. They should also be able to change what they measure when the current set stops providing the prompts they need to discover the next area to improve.

## Further reading and watching

Dave Farley explains why the DORA keys are a bit different to other metrics and why this difference is crucial.

> The problem is not one of productivity but rather one of team contribution; and that's not measured by dumb mechanistic Taylorist measures of individual performance.
>
> :cite[Dave Farley]

[Watch Dave Farley - Response to the NONSENSE McKinsey article on developer productivity](https://www.youtube.com/watch?v=yuUBZ1pByzM)

This Sleuth TV episode with Nathen Harvey touches on the subject, amongst lots of great content.

[Watch How to make your software team awesome](https://www.youtube.com/watch?v=lfOX0bS8N9M&t=873s)

There's also a famous two-parter from Gergely Orosz and Kent Beck

- [Part one](https://newsletter.pragmaticengineer.com/p/measuring-developer-productivity)
- [Part two](https://newsletter.pragmaticengineer.com/p/measuring-developer-productivity-part-2)

Martin Fowler also wrote about this (some time ago, rather than in response to McKinsey).

- [Cannot measure productivity](https://martinfowler.com/bliki/CannotMeasureProductivity.html)
