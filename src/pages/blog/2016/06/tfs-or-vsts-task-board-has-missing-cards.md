---
layout: src/layouts/Default.astro
navMenu: false
title: 'TFS or VSTS task board has missing cards'
pubDate: 2016-06-05T06:47:54+01:00
authors:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"9e35d0bc3b33";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/9e35d0bc3b33";}'
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

![Parent and Child Cards Before Linking](/img/2016/06/parent-child-cards-before.png)

Now if we add the link as per the below screenshot we get a slight confusing behaviour. Initially both cards will still be there (because the board hasn’t refreshed – this happens even with auto-refresh on); but when we come back to the board later, the child will have gone.

![Parent Child Link](/img/2016/06/parent-child-link.png)

One word of warning – you might expect the parent to re-appear on the board if it was in a different state to the child, or if the child was “done” but the parent wasn’t. It doesn’t. Only child items are shown on the board. If you want both cards to appear, they probably aren’t a parent/child relationship – so you might be better of using the “Related” link instead.