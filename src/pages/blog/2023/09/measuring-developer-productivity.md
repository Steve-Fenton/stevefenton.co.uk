---
title: 'Measuring developer productivity'
navMenu: false
pubDate: 2023-08-31
modDate: 2023-08-31
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

[McKinsey](src/pages/blog/2023/08/astro-3-and-pnpm.md) published an article on measuring developer productivity and it gets enough right that we should be concerned about the wrong bits. 

I've been writing about DevOps, Continuous Delivery, and metrics for some time. I'm also a DORA Community Guide, which I mention as I get to speak to some super-smart folks at DORA and in the DevOps community. I've also worked for companies of many different sizes in development, management, and director roles. I haven't worked everywhere, but I've seen a lot. I haven't read all the research ever published, but I've read a lot.

There are some famous responses already to this article, but I'm hoping to bring a down-to-earth perspective.

## What they get right

The premise of this article is that "functions such as sales or customer operations" have power-point numbers they can present to say whether they are doing a great job. There is an appetite from the C-suite to have a similar pow-pow-pow fingerbanging set of numbers from development, because the updates are usually narrative-based and so-yawn.

On top of the lack of headline numbers to say how good (or bad) the software engineers are, the software is now superbly important to the success of the organization. The C-suite depend on this software, which they are not "knowledgeable enough to assess" (see below), and they are worried about it.

Yes #1: There's no standard headline number accepted by the industry that tells you how software engineering is going.

Yes #2: Software is critical to many, or even most, organizations.

Yes #3: The C-suite are anxious about software delivery.

If you are working in a large organization, or one where the C-suite are disconnected from software delivery, you absolutely need to think about how you are communicating with them.

## What they get wrong

They talk a great deal about measuring at the sysytem, team, and individual level. This is insteresting because individual measurement is a common source of dyfunction that harms an organisation. I've worked in organisations where the sales team was so individually-motivated they would lose deals. If you are competing against other members of your team for an incentivised league table, it becomes hard to do the right thing for the organisation.

In ice hockey, if you only rewarded goals and assists, nobody would be a netminder.

The article also places heavy emphasis on the role of management in _optimization_ and in driving improvements. This is madness and teams need to be given more autonomy to optimize their work. As a manager, you should be interested in these activities and coach teams to help them build their continuous improvement muscles - but sitting in an office redesigning how everyone works is the old command and control way. We know this isn't how you achieve the best outcomes.

The problem with measuring software delivery is that it returns us to the bad-old-days. The biggest problem with zooming into the software engineering activities is that you can achieve very high performance numbers by delivering lots of the wrong things. While you are busy patting yourselves on the back for delivering a thousand features, your competitor took it easy and just delivered the five things that relegate your product to being "the cheap alternative to something great".

No #1: Measuring individuals in software delivery.

No #2: Managers tell the team how to work in an optimal way.

No #3: Technical myopia stops you solving more important problems.

## Why you should be wary


Part of the problem is the assumption that software engineers should be hammering out code all the time, or it's not "real work". A strong software team has some folks who fly at the coding stage, but they depend heavily on other folks who get less keyboard hours. Any system of measurement is going to bias measurable tasks over intangible knowledge work.

For example, as a software engineer I often coded a little less than my colleagues, but I spent a bit more time connecting the work to the needs of users and the business. I might not have reviewed as many pull requests, but I did read the EU regulations to work out how they impacted software we delivered there. I may have contributed fewer lines of code, because I also took charge of the deployment pipeline and a bunch of ops tasks.

Essentially, I'm exactly the kind of team member the techniques in this article are likely to repel because I did the work that was hard to count to help other team members complete work that was easy to count.

With some business functions, the number-to-outcome relationship is symmetrical. If you land a new customer paying $1,000 a month - that's $12,000 a year coming in for the lifetime of the subscription. Yay. The payback for features is asymmetrical. You'll invest some dollars into creating the feature, but you obviously anticipate returns in multiples of the original invesment.

If your features aren't delivering the expected returns, do you fix it by coding the features twice as fast, or by coming up with features that are more relevant to your potential customers?

## The properties of good software delivery

There is great value in software delivery in the ability to respond quickly to change. It's widely recognised that this requires slack in the system, small batches, short lead times. Things that are encouraged by the [DORA metrics](https://octopus.com/devops/metrics/dora-metrics/). Improving these metrics leads you to improve your responsiveness.

I used to phrase this question within organisations as "if you came up with your best idea today, a market beating feature idea that will put you ahead of your competition, how long would it be before you started work on it and how long until you gave it to a customer?"




## What's interesting in their approach

What I found interesting in their approach is that they measured the success of their metric framework by looking at its impact on:

- Customer-reported production defects
- Employee experience scores
- Customer satisfaction ratings

If these are the important outcomes, maybe you start measuring these instead?


They claim that "only trained engineers are knowledgeable enough to assess the performance of their peers".



> Other functions can be measured reasonably well, some even with just a single metric; whereas in software development, the link between inputs and outputs is considerably less clear

## What you should actually do

Firstly, I don't think you should be following the advice in the McKinsey article. It is a great pitch, with enough substance to fool the target audience, who I suspect are the very C-suite folks who they describe as not knowledgeable enough to assess software delivery performance.

Instead, clear your heads and return to the long-running research. Listen to folks like [Dr. Nicole Forsgren](https://nicolefv.com/), and [DORA](https://dora.dev/). Build a muscle for reading research (including the method) and dive into statistics to understand some of the trip-hazards. David Spiegelhalter and Tim Harford have great books on statistics.

I have a free white paper on [measuring Continuous Delivery and DevOps](https://octopus.com/whitepapers/measuring-continuous-delivery-and-devops) that explains different types and levels of measurement, and how to avoid unintended consequences of a measurement system. It talks about different measurement techniques and provides some other ways to find inspiration for improvements, like the statements of Continuous Delivery.

For the continuous improvement process, teams and their coaches should collect metrics for their own use in generating improvement ideas. They should also be able to change what they measure when the current set stops providing the prompts they need to discover the next area to improve.