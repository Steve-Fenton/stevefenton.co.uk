---
layout: src/layouts/Default.astro
navMenu: false
title: 'Extreme Programming practices'
pubDate: 2022-06-01T22:15:33+01:00
author:
    - steve-fenton
meta_description:
    - ''
meta_keywords:
    - ''
categories:
    - Programming
tags:
    - devops
    - xp
---

I created this Extreme Programming practices diagram to try and represented Kent Beck’s hand-sketched diagram as honestly as possible with a bit more structure. Hopefully this is a useful version that can help you visualise all the interactions between practices that were observed by Kent, which he wrote about in Extreme Programming Explained (definitely worth a read).

[![Extreme Programming (XP) Practices](/img/2022/06/xp-extreme-programming-practices-1.png)](https://www.stevefenton.co.uk/2022/06/extreme-programming-practices/xp-extreme-programming-practices-2/)

That might be all you need from this page, but as I’m also working in the DevOps and continuous delivery space right now I thought I’d add a little comparison between this XP map of practices and the DevOps *structural equation model* (SEM).

### DevOps backed proof of XP practices

The State of DevOps report is the best study available of the specific techniques and capabilities that amplify success all the way through your technology teams right through to the success of the organisation. The SEM is part of this research and it includes some of the practices and relationships that were in the Extreme Programming practices two decades ago.

We can re-draw the diagram to show:

- Where the XP practices and relationships are confirmed by the DevOps SEM
- Where the XP practices and relationships have some inferred confirmation in the DevOps SEM
- Where the XP practices and relationship don’t feature in the DecvOps SEM

Here’s a reminder of the DevOps structural equation model.

[![DevOps Structural Equation Model (SEM)](/img/2022/06/devops-structural-equation-model-1.png)](https://www.stevefenton.co.uk/2022/06/extreme-programming-practices/devops-structural-equation-model-2/)

#### No XP/DevOps equivalent

The following don’t have an equivalent or it would be too much of a stretch to describe them as equivalent.

- On-site customer
- Metaphor
- Planning game
- Pair-programming
- Coding standards

As an example, the 40 hour work week is a cultural practice, but I couldn’t really say it’s equivalent to the DevOps cultural capabilities.

#### Equivalent-ish XP/DevOps practices

There is a capability in DevOps called “loosely coupled architecture”. I have classified the XP practices of refactoring and simple design as part of this broader DevOps item.

#### Close partners between XP and DevOps

The following are treated as being the same in XP and DevOps, or close enough that the differences are minimal.

- Continuous integration in XP is covered by both continuous integration and trunk-based development in DevOps
- Testing in XP is part of continuous testing in DevOps
- Short releases in XP is part of continuous delivery in DevOps
- Collective ownership in XP is part of continuous delivery in DevOps (it’s actually one of the continuous delivery principles)

### Confirmed practices and relationships

With the above classifications in mind, we can confirm many of the practices and relationships found in XP.

[![XP vs DevOps SEM](/img/2022/06/xp-devops-1.png)](https://www.stevefenton.co.uk/2022/06/extreme-programming-practices/xp-devops-2/)

Represented by solid coloured lines in the diagram, the following relationships are directionally confirmed.

- Continuous integration to collective ownership
- Continuous integration to short releases
- Testing to collective ownership
- Simple design to short releases
- Refactoring to collective ownership

We also have a number of relationships that can be inferred to be sound, noted in the diagram as dotted coloured lines. This also includes the bi-direction links of the above mentioned relationships.

- Testing to continuous integration
- Testing and refactoring
- Simple design and testing

### Other relationships

The other relationships of XP, which are greyed-out dotted lines in the diagram, are not proven as part of the State of DevOps research.

This doesn’t mean you should throw them out. Many of them *feel* like valid connections based on two decades of programming. You will have experiences that will make you feel they are true. I just wanted to highlight where the DevOps research confirms what Kent already knew!

Rather importantly, all of these *confirmed* relationships are established all the way through to organisational performance.

### Summary

Extreme Programming was the method de jour when The Agile Manifesto was written. It ought to have remained the primary agile method as one of the few that had concrete technical and cultural practices.

Continuous delivery picks up the heart of XP, taking into account some of the amazing developments we have had in our toolsets over the course of twenty years. The opportunities for automation now mean we can deliver better, delivery more frequently, fail less, and recover faster than ever.

I joined Octopus Deploy so I could be part of this amazing DevOps toolset – having used it at several companies to drastically improve software delivery. I get to work with the people building the best [DevOps automation platform for releases, deployments, and automation](https://octopus.com/). I also get to spend a great deal of time thinking about DevOps, continuous delivery, continuous deployment, and lots of related subjects.