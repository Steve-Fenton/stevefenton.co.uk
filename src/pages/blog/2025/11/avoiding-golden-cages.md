---
title: 'Avoiding golden cages in Platform Engineering'
navMenu: false
pubDate: 2025-11-18
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

When I share the [Platform Engineering Pulse report](https://octopus.com/publications/platform-engineering-pulse), the crucial decision on adoption strategy comes up. Should the platform be optional or mandatory?

When an organization invests in an initiative, they are hoping to achieve one or more outcomes. They may be hoping for efficiency, cost control, security, compliance, or some other goal. When you think of it in these terms, why on Earth would you put all that time, effort, and money into solving a problem only for developers to say they're not going to use it.

This risk of platform rejection means many organizations are mandating platform adoption. This triggers a chain reaction that is likely to lead to failure.

When the platform team doesn't need to win adoption, they are more likely to create an over-constrained golden path, which we call a golden cage. The platform lacks the escape hatches or extensibility points that help it fit into different shapes.

A platform team might counter this risk by increasing their user-centricity. They'll need a certain amount of discipline to keep their curiosity and empathy levels high because there will always be the temptation to fire back with "you just _have_ to do it this way, because the platform isn't optional".

But I'd like to suggest an alternative option.

Make your platform optional, but your policies mandatory.

Say your goal is to make sure all deployment pipeline include SBOM, security scanning, and attestation. You make this your policy. You make this policy mandatory.

If the platform provides a neat way to achieve these, it will be an easy sell. Developers will _want_ to use it. They'll adopt the platform willingly (instead of reluctantly) and they'll be more forgiving of the parts of the platform that aren't yet perfect.

Or they may decide to solve SBOMs, security scanning, and attestation in their own way. In which case, your organization still achieves its goal.

This is crucial. You goal isn't 100% platform adoption, you goal is secure deployment pipelines.

If you have a capable team who can deliver what you need without the platform, why tie their shoelaces together? Let them run. The platform might not offer sufficient benefits to these developers as it stands right now, so why hamper them with it.

When the platform team decides it wants to increase adoption rates, they'll have to work out what they can offer that will make the platform appealing to these developers. Or they decide the investment isn't worth it. That's the beauty of this approach. It lets you decide how much you want to invest in the next 5% of adoption, and the next 5% after that.

If you want to force 100% adoption, you're removing opportunities to make good investment decisions.

Product companies have worked this out. They learned that adding niche features to try and gain hold-outs who "won't use the software unless..." resulted in making the software less appealing to their existing customers. Adding more features just made their software more complicated and clunky. We've now learned it's better to accept someone isn't your target audience, and focus on getting more customers who are.

If we're building platform as a product, we need to think and act more like a good product company.
