---
id: 1866
title: 'Custom states break population of work item closed date'
pubDate: '2016-07-29T09:06:14+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1866'
permalink: /2016/07/custom-states-break-population-of-work-item-closed-date/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"4d0c075c4cc6";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/4d0c075c4cc6";}'
categories:
    - Process
    - 'Visual Studio'
tags:
    - reports
    - 'work items'
---

UPDATE: Derrick Fu, the VSTS Program Manager has sent a quick update and it looks like this one is on the radar for the VSTS team:

> “This is a known issue when transitioning from a custom state to Closed. We have plans to address this with our next iteration of states customization. You can [keep tabs on progress here](https://blogs.msdn.microsoft.com/visualstudioalm/2016/06/18/vsts-process-customization-futures-june-2016/).”

When the <abbr title="Visual Studio Team Services, formerly Visual Studio Online">VSTS</abbr> team announced custom work item states, I was delighted.

Before this change, work was “New”, “Approved”, “Committed”, and “Done”. The problem with this set up is that it is based on a process where “Done” means “we’ve finished working on it… I suppose someone might release it”. This doesn’t match the process we are using, where “Done” means “Customers now have this feature”. When custom states arrived, this solved a major problem for us – visualising the state of the work in process. We could now have states that represented where the work really was, such as a “Deploying” state.

But there’s a problem. Somewhere deep inside of VSTS is an “OOB Transition Rule” that detects when a card moves from “Approved” or “Comitted” to “Done” and sets the “Closed Date”. This is one of the most important dates associated with a work item. Everything from cycle times to date of release are represented by this date. Despite all of our custom states being functionally equivalent to “Committed” (i.e. they are all described as “In Progress” states), the transition rule does not fire for custom states.

We are currently using a workaround to get similar data by adding “WHERE ChangedDate…” alongside our “WHERE ClosedDate…” clauses – but beware… if a card is “Changed” after it is “Done” it will pop back into your reports:

![Query Workaround](https://www.stevefenton.co.uk/wp-content/uploads/2016/07/query-workaround.png)

[Please support the resolution of this transition rule issue by voting for it on User Voice](https://visualstudio.uservoice.com/forums/330519-team-services/suggestions/15453015-custom-states-break-oob-transition-rules).