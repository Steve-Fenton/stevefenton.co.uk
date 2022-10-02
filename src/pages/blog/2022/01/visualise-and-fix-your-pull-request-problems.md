---
id: 12262
layout: src/layouts/Default.astro
title: 'Visualise and fix your pull request problems'
pubDate: 2022-01-05T14:43:08+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=12262'
permalink: /2022/01/visualise-and-fix-your-pull-request-problems/
categories:
    - Process
tags:
    - 'pull requests'
---

I have re-written this so many times, it has reached the stage where I just need to bluntly provide the information with less storytelling than I might like.

- You should almost certainly be using trunk-based development
- If work is gonna get queued or handed over, that’s a column
- Pull requests should be completed within a few minutes
- *Everyone’s* pull requests should be completed within a few minutes!

### Trunk-based development

Here’s a short version. If you want to be a high-performing team, you should almost certainly be using trunk-based development. For the definition of trunk-based development, see *Accelerate: The Science of Lean Software and DevOps* by Nicole Forsgren, Jez Humble, and Gene Kim, which says:

> It is characterized by fewer than three active branches in a code repository; branches and forks having very short lifetimes (e.g. less than a day) before being merged into \[trunk\]; and application teams rarely or never having “code lock” periods…”

Assuming you are using trunk-based development, you might still be using pull requests as part of your process. If you are, I’d like you to check a couple of things. These are items that I found were seriously impacting the cycle times for a small team I was helping.

### Queues and hand-overs are a column

The first problem I found was the team had a pull request step in their real life process, but not on their Kanban board. It is fundamental that the Kanban board maps your real process, not your “ideal” process so every step should be on there – even if it makes it “messy”. It’s even more important to reflect a step when there is a hand-off or wait time. Pull requests have both.

By adding a column for work that is waiting for a pull request to be approved, you can see problems. Problems like pull requests stacking up or taking too long.

### Pull request wait times

How long should work sit idle waiting for a pull request to be picked up? The answer is zero minutes, of course. If you are pair-programming, the pull request can be immediately picked up by your co-pilot for review and approval. Anything that is “more important than the pull request” must by definition have been “more important than making the change in the first place”.

Why would we put so much effort into making builds and tests run faster, but allow a pull request to sit idle for an hour?

Pull requests should be picked up immediately.

### And that means everyone’s pull requests

When I discovered pull requests were the leading cause of delays in the process, I pulled data from Azure DevOps to analyse pull request wait times. What I found was a big surprise. Not only was the average wait time *way too long* (a median wait of 55 minutes), but there were also very different service levels being given to different team members. Some team members were consistently waiting 4x longer than others to have their work unblocked. Left unchecked, this would undoubtedly cause some team members to be viewed as slower than others, when in fact they are being made to wait longer.

You can use the [Azure DevOps API to extract the data](https://www.stevefenton.co.uk/2021/11/query-pull-request-history-in-azure-devops-with-powershell-and-the-rest-api/) to perform this analysis.

### Summary

So, in summary….

- You should almost certainly be using trunk-based development
- If work is gonna get queued or handed over, that’s a column
- Pull requests should be completed within a few minutes
- *Everyone’s* pull requests should be completed within a few minutes!