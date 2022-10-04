---
layout: src/layouts/Default.astro
title: 'Custom states break population of work item closed date'
navMenu: false
pubDate: 2016-07-29T09:06:14+01:00
authors:
    - steve-fenton
categories:
    - Process
    - 'Visual Studio'
tags:
    - Reports
    - 'Work Items'
---

UPDATE: Derrick Fu, the VSTS Program Manager has sent a quick update and it looks like this one is on the radar for the VSTS team:

> “This is a known issue when transitioning from a custom state to Closed. We have plans to address this with our next iteration of states customization. You can [keep tabs on progress here](https://blogs.msdn.microsoft.com/visualstudioalm/2016/06/18/vsts-process-customization-futures-june-2016/).”

When the <abbr title="Visual Studio Team Services, formerly Visual Studio Online">VSTS</abbr> team announced custom work item states, I was delighted.

Before this change, work was “New”, “Approved”, “Committed”, and “Done”. The problem with this set up is that it is based on a process where “Done” means “we’ve finished working on it… I suppose someone might release it”. This doesn’t match the process we are using, where “Done” means “Customers now have this feature”. When custom states arrived, this solved a major problem for us – visualising the state of the work in process. We could now have states that represented where the work really was, such as a “Deploying” state.

But there’s a problem. Somewhere deep inside of VSTS is an “OOB Transition Rule” that detects when a card moves from “Approved” or “Comitted” to “Done” and sets the “Closed Date”. This is one of the most important dates associated with a work item. Everything from cycle times to date of release are represented by this date. Despite all of our custom states being functionally equivalent to “Committed” (i.e. they are all described as “In Progress” states), the transition rule does not fire for custom states.

We are currently using a workaround to get similar data by adding “WHERE ChangedDate…” alongside our “WHERE ClosedDate…” clauses – but beware… if a card is “Changed” after it is “Done” it will pop back into your reports:

:img{src="/img/2016/07/query-workaround.png" alt="Query Workaround" loading="lazy"}

[Please support the resolution of this transition rule issue by voting for it on User Voice](https://visualstudio.uservoice.com/forums/330519-team-services/suggestions/15453015-custom-states-break-oob-transition-rules).