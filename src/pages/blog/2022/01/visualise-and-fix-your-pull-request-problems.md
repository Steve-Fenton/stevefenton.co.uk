---
title: Visualise and fix your pull request problems
navMenu: false
pubDate: 2022-01-05
modDate: 2022-10-16
keywords: pull requests
description: Find out how to spot problems with pull requests and what to do to fix them.
authors:
    - steve-fenton
categories:
    - Process
tags:
    - 'Pull Requests'
---

I have rewritten this so many times it has reached the stage where I just need to bluntly provide the information with less storytelling than I might like.

- You should almost certainly be using trunk-based development
- If work is gonna get queued or handed over, that’s a column on your board
- Pull requests should be completed within a few minutes
- *Everyone’s* pull requests should be completed within a few minutes!

## Trunk-based development

Here’s a short version. If you want to be a high-performing team, you should almost certainly be using trunk-based development. For the definition of trunk-based development, see *Accelerate: The Science of Lean Software and DevOps* by Nicole Forsgren, Jez Humble, and Gene Kim, which says:

> It is characterized by fewer than three active branches in a code repository; branches and forks having very short lifetimes (e.g. less than a day) before being merged into \[trunk\]; and application teams rarely or never having “code lock” periods…”

Assuming you are using trunk-based development, you might still use pull requests as part of your process. If you are, I’d like you to check a few things. These items seriously impacted the cycle times for a small team I was helping.

## Queues and hand-overs are a column

The first problem I found was the team had a pull request step in their real-life process but not on their Kanban board. It is critically important that the Kanban board maps your *real* process, not your *ideal* process. Every step should be on there – even if it makes it messy.

It’s crucial to reflect steps that have a hand-off or wait time. Pull requests have both.

By adding a column for work that is waiting for a pull request to be approved, you can see problems. Problems like pull requests stacking up or taking too long.

## Pull request wait times

How long should work sit idle waiting for a pull request to be picked up? The answer is zero minutes, of course. If you are pair-programming, your co-pilot can immediately pick up and complete the pull request. Anything that is “more important than the pull request” must by definition have been “more important than making the change in the first place”.

Why would we put so much effort into making builds and tests run faster yet allow a pull request to sit idle for an hour?

Pull requests should be picked up immediately.

## And that means everyone’s pull requests

When I discovered pull requests were the leading cause of delays in the process, I pulled data from Azure DevOps to analyse pull request wait times. What I found was a big surprise. Not only was the average wait time *way too long* (a median wait of 55 minutes), but there were also very different service levels being given to different team members. Some team members consistently waited 4x longer than others to have their work unblocked. Left unchecked, this would undoubtedly cause some team members to be viewed as slower than others when they are being made to wait longer.

You can use the [Azure DevOps API to extract the data](/blog/2021/11/query-pull-request-history-in-azure-devops-with-powershell-and-the-rest-api/) to perform this analysis.

## Summary

So, in summary….

- You should almost certainly be using trunk-based development
- If work is gonna get queued or handed over, that’s a column
- Pull requests should be completed within a few minutes
- *Everyone’s* pull requests should be completed within a few minutes!