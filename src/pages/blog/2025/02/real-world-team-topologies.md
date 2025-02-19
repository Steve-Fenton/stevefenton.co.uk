---
title: Using Team Topologies to map and move your team design
navMenu: false
pubDate: 2025-02-18
keywords: team topologies,team design,devops
description: Find out how I used Team Topologies to understand and improve a team that had no formal structure.
bannerImage:
    src: /img/topic/teams/team-topologies-interaction-modes.png
    alt: A diagram of the three core interaction modes in Team Topologies. Facilitating, x-as-a-service, and collaboration.
authors:
    - steve-fenton
categories:
    - Process
tags:
    - DevOps
    - Teams
---

A great bunch of folks over at the <abbr title="Cloud Native Computing Foundation">CNCF</abbr> are sharing their stories of Team Topologies in the real world. This is my addition to the set and you can find more in the links below, and on [the CNCF #content-club Slack channel](https://cloud-native.slack.com/archives/content-club).

You can find out more about Team Topologies on the official website. I'm going to assume you know about the interaction modes (**facilitating**, **collaborating**, and **x-as-a-service**), and the fundamental topologies (**stream-aligned**, **enabling**, **complicated subsystem**, and the recursive **platform** type). This isn't the only way to map where you are and think about where you're going, but it has been useful to me.

This article runs through the process I used to map a team I joined and to adjust its design in subtle ways to make it more effective.

## Product and data

I joined an organization that had a product and data team. The product part and the data part were unrelated. The product team managed the software products and provided first-line support. The data team managed analytics and tags for something in the region of 1,000 customer websites. In addition to the guessable work, the team also provided the organization's <abbr title="Data Protection Officer">DPO</abbr> role, managed audits and compliance, and ran domain, DNS, and certificate monitoring for customer domains.

The same people were working on strategic planning, daily execution, and urgent requests for support and data. It was chaotic as they were involved in many things, yet had no idea how far their authority extended. They did all the work for managing roadmaps, special projects, and planning but didn't seem to have the final say in any of these tasks.

There was a great deal of friction as people believed they owned something, only to be over-ruled by the true (yet undocumented) owner.

Let's just say, it was a mess. The team didn't know what they did. The rest of the organization didn't know what they did. They were buried in piles of work.

## Mapping the current state

I was making sense of this situation when Team Topologies was first making the rounds. The book had been released the previous year and it dropped into my awareness at the perfect moment. I pivoted from the documents and spreadsheets of "what the heck is going on" to a simple flowchart-based map of the world, which I could annotate with Team Topologies labels.

To make sense of the current situation, I found the interaction modes were sufficient to better understand the tasks, so I just created arrows for each mode.

:::figure{.inset}
:img{src="/img/topic/teams/product-and-data-interaction-key.png" alt="Interaction modes with labelled arrows" loading="lazy"}
::figcaption[COL (collaborating), AAS (x-as-a-service), and FAC (facilitating) arrows]
:::

Using just these arrows, I starting mapping out a central column of all the things we did. I added each team we interacted with as part of our work and added the appropriate interaction mode. It turned out we did far more than anyone realized. Making the work visible at this scale helped the team understand what they controlled and what they didn't. Crucially, it helped everyone outside of the team to see the extent of our contribution.

:::figure
:img{src="/img/topic/teams/product-and-data.png" alt="The full chart" loading="lazy"}
::figcaption[Work mapped using Team Topologies interaction modes - external partners removed]
:::

## Living the diagram

Over the next few weeks, we practised applying the interaction modes. When you go into a task knowing you're there to facilitate removes the uncertainty around how you perform the work. The company dynamic meant our "product owner" didn't own the product. They were, in fact, a facilitator for the discussion between the real owners at the c-suite level.

Equally, understanding we provided the analytics platform as a service changed how we responded to requests. We didn't exist to write custom reports for 50 customers, we were there to give them an analytics platform and training to create their own reports.

Each arrow we added fundamentally changed how we worked and how people responded to our work.

That's not to say the diagram captured the ideal end state, but it very quickly clarified where we were, what we did, and how we worked with other teams. We built from there.

## Applying Team Topologies

I wanted to share this little example, because it shows that using just one component of Team Topologies can bring meaningful change. We didn't even *mine the seam* of team types. Just using interaction modes helped us understand the work, increase clarity by 100x, and generate c-suite epiphanies of the value we brought to the organization.

## Other articles in the series

- [Team Topologies website](https://teamtopologies.com/)
- [Team Topologies in the real world](https://newsletter.bryanross.me/p/team-topologies-in-the-real-world) by Bryan Ross
- [On Team Topologies and Deep Work](https://menzen.ski/posts/2025/02/15/on-team-topologies-and-deep-work/) by Matt Menzenski
 
