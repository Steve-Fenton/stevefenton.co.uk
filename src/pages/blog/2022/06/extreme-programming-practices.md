---
layout: src/layouts/Default.astro
title: Extreme Programming practices
navMenu: false
pubDate: 2022-06-01
modDate: 2022-10-12
keywords: extreme,programming,practices,devops
description: Extreme Programming compared to DevOps research.
bannerImage:
    src: /img/topic/process/extreme-programming.png
    alt: A section of the Extreme Programming practice diagram
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - DevOps
    - XP
---

Extreme Programming has been around for decades, so how does it stack up when you compare it to all the DevOps research produced by :abbr[DORA]{title="DevOps Research and Assessment"}? This article takes a fresh look at Extreme Programming practices to find out how they compare to DevOps.

## Extreme Programming practices

The diagram below is a recreation of Kent Beck’s hand-sketched list. It's as faithful as possible but a little more structured. Hopefully, this version will be helpful as you visualise all the interactions between practices observed by Kent. He wrote all about these in Extreme Programming Explained (definitely worth a read).

:::figure{.inset}
:img{src="/img/2022/06/xp-extreme-programming-practices-1.png" alt="Extreme Programming (XP) Practices"}
::figcaption[Extreme Programming practices]
:::

The diagram resembles the more recent DORA structural equation model (SEM). While Kent Beck's set of practices was based on empirical observation, the structural equation model is research-backed. So, has the new model blown the old one out of the model?

## DevOps research-backed proof of XP practices

The State of DevOps report is the best study available of the specific techniques and capabilities that amplify software delivery performance. It tracks the relationships between these capabilities right through to the success of the organisation. The structural equation model is part of this research.

The model includes some practices and relationships found in the Extreme Programming practices two decades ago.

To explore this further, review the DevOps structural equation model and then read on to find a comparison.

:::figure{.inset}
:img{src="/img/2022/06/devops-structural-equation-model-1.png" alt="DevOps Structural Equation Model (SEM)" loading="lazy"}
::figcaption[The DevOps structual equation model]
:::

## The combined model

The combined diagram will need to show:

- Where the XP practices and relationships are confirmed by the DevOps SEM
- Where the XP practices and relationships have some inferred confirmation in the DevOps SEM
- Where the XP practices and relationships don’t feature in the DevOps SEM

### No XP/DevOps equivalent

The following don’t have an equivalent, or it would be too much of a stretch to describe them as equivalent.

- On-site customer
- Metaphor
- Planning game
- Pair-programming
- Coding standards

For example, the 40-hour work week is a cultural practice, but it’s not equivalent to the DevOps cultural capabilities, which are far broader.

### Equivalent-ish XP/DevOps practices

There is a capability in DevOps called “loosely coupled architecture”. This is similar enough in intent to the XP practices of refactoring and simple design that I feel they are equivalent.

### Close partners between XP and DevOps

The following are treated as the same in this XP and DevOps comparison - or close enough that the difference is minimal.

- Continuous integration in XP is covered by both continuous integration and trunk-based development in DevOps
- Testing in XP is part of continuous testing in DevOps
- Short releases in XP come under continuous delivery in DevOps
- Collective ownership in XP is part of continuous delivery in DevOps (it’s actually one of the continuous delivery principles)

## Confirmed practices and relationships

With the above classifications in mind, we can confirm many of the practices and relationships found in XP.

:::figure{.inset}
:img{src="/img/2022/06/xp-devops-1.png" alt="XP vs DevOps Structural Equation Model" loading="lazy"}
::figcaption[XP vs DevOps model]
:::

Represented by solid coloured lines in the diagram, the following relationships are directionally confirmed:

- Continuous integration to collective ownership
- Continuous integration to short releases
- Testing to collective ownership
- Simple design to short releases
- Refactoring to collective ownership

We also have several relationships that can be inferred to be sound, noted in the diagram as dotted coloured lines. This also includes the bi-direction links of the connections mentioned above.

- Testing to continuous integration
- Testing and refactoring
- Simple design and testing

## Other relationships

The other relationships of XP, shown as greyed-out dotted lines in the diagram, are not proven as part of the State of DevOps research.

This doesn’t mean you should throw them out. Many of them *feel* like valid connections based on two decades of programming. You will have experiences that may make you feel they are true, too. I wanted to highlight where the DevOps research confirms what Kent already knew!

Rather importantly, all of these *confirmed* relationships are established all the way through to organisational performance.

## Summary

Extreme Programming was the *method de jour* when The Agile Manifesto was written. It ought to have remained the primary agile method. It was one of the few that had concrete technical and cultural practices, without which high performance is unlikely to be achieved.

Continuous delivery picks up the heart of XP, accounting for fantastic developments in our toolsets over twenty years. The increased opportunities for automation mean we can deliver better, deliver more frequently, fail less, and recover faster than ever.

I joined [Octopus Deploy](https://octopus.com/) to be part of this incredible DevOps toolset – having used Octopus at several companies to drastically improve software delivery. I get to work with the people building the best DevOps automation platform for releases, deployments, and automation. I also get to spend a great deal of time thinking about DevOps, Continuous delivery, continuous deployment, and many related subjects, which I love.