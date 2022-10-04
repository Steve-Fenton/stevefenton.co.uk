---
layout: src/layouts/Default.astro
title: 'TFS or VSTS task board has missing cards'
navMenu: false
pubDate: 2016-06-05T06:47:54+01:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
tags:
    - Azure DevOps
---

TL;DR: This is caused by adding a parent/child relationship between two cards.

We are using the new Kanban boards in Visual Studio Team Services (formerly known as Visual Studio Online, but this would also apply to on-prem TFS too). A month ago, another team member noticed a card had disappeared from the board. It seemed like a strange quirk – because we could still find the card by id or by searching and it was in the backlog. It just wasn’t on the board.

As this was an isolated incident we made a note of it, but it also made us go hawkeye for the issue and we spotted a few more times. A card would be on the board, but then it would “go invisible”.

This started to affect our trust in the tools and we raised a big frown via the feedback form on VSTS.

In reality though, I have just spotted the cause for this effect.

This is caused by adding a parent/child relationship between two cards. When you do this, only the **child** is shown.

Here are two cards before the parent/child relationship is added…

:img{src="/img/2016/06/parent-child-cards-before.png" alt="Parent and Child Cards Before Linking" loading="lazy"}

Now if we add the link as per the below screenshot we get a slight confusing behaviour. Initially both cards will still be there (because the board hasn’t refreshed – this happens even with auto-refresh on); but when we come back to the board later, the child will have gone.

:img{src="/img/2016/06/parent-child-link.png" alt="Parent Child Link" loading="lazy"}

One word of warning – you might expect the parent to re-appear on the board if it was in a different state to the child, or if the child was “done” but the parent wasn’t. It doesn’t. Only child items are shown on the board. If you want both cards to appear, they probably aren’t a parent/child relationship – so you might be better of using the “Related” link instead.