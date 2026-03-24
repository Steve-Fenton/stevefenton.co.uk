---
title: Best of KubeCon Europe 2026
navMenu: false
pubDate: 2026-03-25
keywords: kubecon,kubernetes,argo cd,ci/cd,deployments
description: "Let me share some of the best moments from KubeCon Europe 2026 at RAI in Amsterdam."
bannerImage:
    src: /img/topic/argo/argo-the-right-way.png
    alt: Argo CD the right way book cover. A colourful argonaut, which is like a red octopus with a blue shell.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Conference
    - Kubernetes
---

The waves of technology are crashing over me at KubeCon Europe and I can't hold the excitement in, so I'm going to share the best parts of Kubecon as well as the ArgoCon and Platform Engineering co-located events.

## Platform Coffee

If you get up super early in Amsterdam during KubeCon and head to Brasserie Nenette, you'll find several tables filled with deep conversation. From 7am to 8:30am, Platform Coffee fills the room with Lean Coffee discussions.

David Stenglein is the architect of Platform Coffee and when it's not running in person at KubeCon you can find it online through the [CNCF Platform Engineering Slack channel](https://cloud-native.slack.com/archives/C020RHD43BP).

## Co-located events

On day zero of KubeCon, the co-located events take place. This is a vibrant and focused set of events for Argo CD, Platform Engineering, and other CNCF sub-groups.

This year, I did a flash-keynote at ArgoCon based on data from the [State of GitOps report](https://octopus.com/publications/state-of-gitops-report). This was an exclusive "cut" of the data where we pulled out Argo CD to compare it to everything else.

[Watch Argo CD vs the world](https://www.youtube.com/watch?v=6G2Rr2rQ2RI)

## KubeCon day one

On day one I got excited about creating a cool toolchain that includes some shiny new things that I've been learning about from their creators.

### Cloudsmith

[Cloudsmith](https://cloudsmith.com) sits at the end of your build process and deals with artifact management, supply chain security, package scanning and policies. The idea is that instead of generating SBOMs that don't get used, you make sure every package meets policy before you start distributing it.

With the digital operational resilience act and the recent cyber resilience act, this is a hot topic in Europe. Cloudsmith acts as your artifact authority, guarding the door and checking whether your packages meet the dress code (and you set the policy with Rego).

If you haven't seen Rego before, here's a quick door policy to deny trainers and athletic shoes of various kinds. If you're dealing with security and compliance, you're going to be meeting Rego at some point as this is the de-facto language for defining policies.

*No trainers! Rego definition:*

```rego
package dresscode

import rego.v1

# Default deny
default allow := false

# Allow if the outfit passes all dress code checks
allow if {
    not violation
}

# A violation exists if any forbidden item is worn
violation if {
    some item in input.outfit
    is_trainer(item)
}

# Define what counts as a trainer
is_trainer(item) if {
    item.category == "footwear"
    item.type in trainer_types
}

trainer_types := {
    "trainer",
    "sneaker",
    "running shoe",
    "athletic shoe",
    "sports shoe",
    "canvas shoe",
}

# Provide a helpful message when denied
deny contains msg if {
    some item in input.outfit
    is_trainer(item)
    msg := sprintf("'%v' are not permitted — trainers and athletic footwear are not allowed.", [item.name])
}
```

Cloudsmith sits right in the middle of CI/CD, so helps you keep the CI and CD decoupled (because [CI is not CD](https://thenewstack.io/ci-is-not-cd/)). If you have teams using different CI tools, you can funnel everything into Cloudsmith to create a single artifact authority for all your packages.

### Argo CD and Octopus

Argo CD landed in Octopus in October 2025, adding to the Kubernete API and Kubernetes Agent options. Previously, I've preferred the Kubernetes Agent as it's the easiest way to crack on with container deployments.

When I looked more closely at GitOps in the State of GitOps report, the data painted a very clear picture that the Open GitOps principles have a deeply positive impact on many of the things I care about: Software delivery performance, security, compliance, auditability, reduced access, and drift prevention.

![The GitOps model shows 9 capabilities that lead to 3 DevOps outcomes and 5 GitOps outcomes](/img/topic/gitops/gitops-model-full.png)

Combining Argo CD, which is designed for GitOps, with the powerful modeling in Octopus gives you a scalable way to manage deployments. In Platform Hub, Octopus uses Rego to set policies and powerful template management so you can make it easy for teams to meet the policy requirements.

Octopus is the number one maintainer of Argo CD and (through Codefresh) was the first commercial maintainer when Intuit opened a call for maintainers, after they acquired Argo creators, Applatix.

#### Argo CD timeline

- 2016: Codefresh public launch. The first Kubernetes-native CI/CD tool.
- 2017: [The initial Argo CD commit by Applatix](https://github.com/argoproj/argo-workflows/commit/3ed1dfeb073829d3c4f92b95c9a74118caaec1b4)
- 2018: [Intuit acquire Applatix](https://web.archive.org/web/20221129061438/https://www.intuit.com/blog/news-social/welcome-applatix-to-the-intuit-team/)
- 2018: Codefresh joins the Argo CD project as the first commercial contributors.
- 2024: Octopus acquires Codefresh and their superstar Argo CD maestros.
- 2025: Argo CD in Octopus (yay).

#### The Cloudsmith and Octopus toolchain

This is where Cloudsmith pops back up, as you can make sure you check back with Cloudsmith to get the green light on policies and perform artifact attestation before you let the package progress through your deployment pipeline to production.

#### Argo CD the right way

A related highlight was getting a copy of *Argo CD the right way* by Kostis Kapelonis. This book lets you know about 30 wrong turns people often make with Argo CD. For each one, it explains the pain you're going to get if you apply the anti-pattern and it lets you know how to do it the right way instead.

The whole stack of books got snapped up but I wrestled some folks to the ground to make sure I got hold of a signed copy all of my own. Thankyou Kostis for the wonderful personalised message!

### Datadog

So now you app is deployed safely and reliably to production and it's working perfectly Or is it? That's where Datadog joins the toolchain. It has been part of my go-to toolbox for a long time and it's where I refined my thoughts on the [three Fs of event log monitoring](https://stevefenton.co.uk/blog/2017/11/the-three-fs-of-event-log-monitoring/), the [incident causation principles](https://stevefenton.co.uk/blog/2017/11/incident-causation-principles/), [alerting principles](https://stevefenton.co.uk/blog/2017/11/the-alerting-principles/), and [monitor selection principles](https://stevefenton.co.uk/blog/2017/11/monitor-selection-principles/).

From a practical perpective, Datadog makes you the first to known when there's a problem. That means you get to resolve an issue before it becomes service-impacting in many cases. Over time you move from CPU-watching to more sophisticated metrics that reflect your software's purpose and that are reliable early indicators of problems, including when you deploy a working software version that actually harms your business metrics.

When I was running software teams, Octopus and Datadog were often the two tools that solved the most problems as they fill crucial gaps. If you have these gaps, the business usually thinks the development teams are idiots.

### Akamas

This was a tip-off from a friend. [Arkamas](https://akamas.io) ingests data from your monitoring tools (like Datadog) and help you right-size your clusters and containers. I've used cloud cost management tools that point out if you're using a virtual machine of the wrong size, but this goes way deeper in two ways.

It looks deeper into your set-up (JVM/Node/Kubernetes/Node pools) and can suggest changes via pull requests, so you can stick to your GitOps process.

This will help you reduce costs, but it will also help you improve stability as it will tell you if you've under-specified something, too.

### Kratix

This was another tip-off, but from an Argo CD user who had a conversation with me about their set up. When they asked about how other tools fit in with [Kratix](https://www.kratix.io), I realised I didn't have deep enough knowledge of Kratix to help them out... other that "it's a cool Platform Engineering tool made by really nice people".

After basking in my own sense of failure for a minute, I went and found the Kratix booth to get deeper into what it does. The essential explanation that clicked with me (and all credit to the Kratix team for the metaphor) was that Kratix is a vending machine. Platform teams can stock the vending machine with capabilities, and application teams can self-service these capabilities when they need them.

The platform team can provide snacks, like "A Jenkins", or a ready-meal like "a deployment pipeline with CI tool, CD tool, and observability", or maybe even "GitHub, Cloudsmith, Octopus, and Datadog," which sounds good to me.

In my opinion, this is where platform teams should start, rather than Backstage (if you add Backstage later, you can plug Kratix in and populate Backstage with something useful!)

## Toolchins rock

Whenever I've pulled tools into a toolchain in a development team, it has always been to turn a weakness into an opportunity to shine.

When the CTO is getting an angry call from a customer CEO... we need Datadog to snitch on problems before it escalates that far.

When the development team look sloppy because they trash production when they deploy the software... we need Octopus to make deployments stress free.

A really great toolchain has tools that complement and amplify each other. This is why toolchains often beat all-in-ones. Your all-in-one might tick off a feature box (artifact management), but it won't be implemented at the depth of Cloudsmith. It might let you script up deployments, but it's really tricking you into writing your own CD tool using bash scripts.

As you build out a great toolchain, you'll progress from the high-impact areas (the ones tools on this page solve) to smaller improvments that continue to elevate your software delivery and operations stories.

We know that it's not all about tools; organizational culture has a massive part to play in successful software products. What I've found repeatedly is that a great toolchain can trigger cultural transformation by changing how people view software teams.
