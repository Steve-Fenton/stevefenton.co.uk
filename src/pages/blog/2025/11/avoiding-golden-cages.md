---
title: 'Avoiding golden cages in Platform Engineering'
navMenu: false
pubDate: 2025-11-14
keywords: platform engineering,adoption
description: How to stay on the golden path and avoid using golden cages, golden manacles, or other metaphorically golden objects of brute force.
bannerImage:
    src: /img/topic/platforms/workers-on-platform.jpg
    alt: Mobile Suspended Platform by Terry Hammonds, shows workers on a platform suspended from a bridge.
authors:
    - steve-fenton
categories:
    - Process
tags:
    - Platform Engineering
---

I zipped up to London last night to share the [Platform Engineering Pulse report](https://octopus.com/publications/platform-engineering-pulse) with the amazing [London DevOps](https://www.linkedin.com/company/londondevops/) group. Afterwards, we spent several hours talking through some of the findings and I thought I'd write up some of the results of those discussion.

:::div{.note}

We're also thinking about this topic this month in the [content club (CNCF Slack)](https://cloud-native.slack.com/archives/C0897G6N1ML), so you may also want to check out:

- [Golden Paths: One Size Does Not Fit All](https://newsletter.bryanross.me/p/golden-paths-one-size-does-not-fit?hide_intro_popup=true) by Bryan Ross
- [When a Golden Path Becomes a Golden Cage
](https://menzen.ski/when-a-golden-path-becomes-a-golden-cage/) by Matt Menzenski

:::

In particular, the question of whether platforms should be optional or mandatory has a lot of talking points. It also intersects with the golden cages problem, as an inflexible platform intensifies the nastiest problems of mandatory platforms.

As we're continuously talking golden paths, we'll head to Oz to look through the hazards and how they come together to cause some serious problems.

## The wizard of ops

Imagine our house has been lifted by a hurricane and deposited in a strange land. The friendly people we meet tell us about a golden path, and off we go to see a wizard. We sing a little tune, because we don't yet know about the hazards awaiting us along the way.

Why in Oz didn't the munchkins mention the wolves, crows, and flying monkeys? They certainly had plenty to say about the darn road.

Let's explore the wonderful and magical world of gold and platforms.

## The golden path

There's a crucial distinction between a paved path and a golden path. I'm sure the munchkins would have had a verse or two on it.

Paved paths are an analogy based on desire paths; those animal trails and shortcuts that, over time, create a signal that people want to travel between two points. If your platform is just the encoding of desire paths, it's not terribly different from whatever came before. You're missing an excellent opportunity to create something better.

In product development, we know that you don't just build what the user asks for. Instead, you explore their needs and design something better than what is currently available to them. The same goes for golden paths.

If you take existing paths and pave them, you're just transferring the complexity from developers to platform engineers. There is some benefit of splitting complexity (the developers handle the product's complexity, and the platform engineer handles, well, whatever toxic waste is ejected into the paved path).

Golden paths shouldn't just divide the complexity; they should manage it. This is vital as we hope the golden path handles aspects that were absent from the well-trodden desire path. Things like cost control and security, which were previously applied haphazardly, if at all.

We're not trying to achieve the shortest path (through the quicksand, tar pit, and snake-infested rocks), but the shortest route that satisfies the constraints (such as safety).

Got a golden path? Great, we've defeated the wolves, now it's time to face the crows.

## Golden cages

On day one, golden paths and golden cages look exactly the same. You only really find out you're in a cage when the platform you use doesn't let you do something. You only discover the lack of flexibility when you push on a surface.

As standardization is high on the list of goals organizations have for Platform Engineering, it's no surprise to find platform teams taking this to a rigid extreme. Developers may want 90% of what the golden cage offers, but if they can't achieve the other 10% they become frustrated. This is a contributing factor to cases where developers circumvent the rulebook and find a way to bypass the platform entirely.

Signals of golden cages include a heck of a lot of negging the platform, highlighting its flaws, pointing out that development goals will be missed, and generally wearing down dev managers until they sign off on letting developers do things their own way. 

The solution isn't to correct the developers. You have to correct the platform. It should provide extensibility points and escape hatches, so developers can achieve their goals within the policy constraints set by the organization.

That's the crows dismissed. Time for some flying monkeys.

## Golden manacles

Your organization is investing in a platform initiative. They have a bunch of goals in mind, often related to standardization, compliance, security, and cost control (and hopefully flow of value and developer experience). Why would they let all this time, effort, and attention be wasted by allowing development teams to choose whether to adopt it?

It's evident that platforms should be mandatory.

Except this is the breeding ground for some very toxic outcomes. Everybody has some level of rebellion streaking through them, and mandating anything is the perfect way to energize it. Why do so many British kids hate Shakespeare? Because teachers forced them to read it.

Now, you may think your developers are low on the rebel-scale, so you'll be okay. You can tell them what to do. The thing is, while those high on the rebel-scale will provide noisy dissent, those lower on the scale will be more silent and subversive. When a mandated platform introduces friction, everyone will rebel, and they'll do so in their own wonderful and unique style.

You _could_ have a great platform and make it mandatory, and maybe never see this problem. If you mix mandatory adoption with a golden cage, you're guaranteed to see strange behaviors as teams thrash around trying to achieve their conflicting goals. Developers are supposed to be delivering valuable software, platform teams are trying to force compliance, and the two are in constant conflict.

If this sounds familiar, it's because DevOps was the solution to this problem. When you have two silos with conflicting goals, you're in flying monkey territory without a monkey-proof umbrella. The solution to this mandated golden cage conundrum is simple. You need to align goals, encourage collaboration, and let people do the good work.

In Platform Engineering, the best way to achieve collaborative bliss is:

Make platforms optional to increase the desire in platform teams to understand the needs of platform users.
Make it a shared goal to meet the organization's policies, so development teams and platform teams both want the same thing.

When developers and platform teams share the goal to meet policy, the platform becomes a far more appealing option. Other goals, like flow of value, should also be shared, so platform teams are motivated to solve the right problems for the development teams.

## The silver slippers: Platform as a product

This is why the prevailing advice from smart people is to treat the platform as a product and the developers as customers and prospects. Put a good feedback loop in place so you can see where the platform is starting to fit too tightly. Then, collaborate with your customers to provide a good way to flex where needed.

Make your platform optional, and your policies mandatory.
