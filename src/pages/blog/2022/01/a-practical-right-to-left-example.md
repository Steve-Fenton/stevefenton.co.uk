---
layout: src/layouts/Default.astro
title: A practical right-to-left example
navMenu: false
pubDate: 2022-01-28
modDate: 2022-10-16
keywords: kanban,right to left,board management
description: Find out how to think about work using your task board to prompt lean product flow.
bannerImage:
    src: /img/2022/01/task-board.jpg
    alt: Task board
authors:
    - steve-fenton
categories:
    - Process
tags:
    - Kanban
---

The phrase ‘right-to-left’ is pretty well embedded in software development teams. Some great works on Kanban and product flow discuss it in detail. Mike Burrows has a great book that is even *called* ‘Right to Left’. This article doesn’t replace or repeat all that good stuff; it’s just an example of right-to-left based on an anonymised screenshot of a task board I'm reviewing. I’m going to try and describe what arcs across my brain when I open up this map of the work.

:::figure{.inset}
:img{src="/img/2022/01/task-board.jpg" alt="A task board. From the left there are columns named new, development, pull requests, dev test, deployed to test, testing, ready to release"}
:figcaption[A typical task board]
:::

## Board description

The board is an accurate description of a team’s process. One of the most important principles for the design of a Kanban board is that it reflects reality, no matter whether that reality is ideal or not. The board only changes if the reality changes first. It’s like a map rather than a blueprint (we only add that new super-campus onto the map *after* it has been built).

The columns on the board highlight work steps, hand-overs, and waits. Adding columns for waiting states is super-important as this is where cycle times find an all-you-can-eat buffet of delay. Ideally, I like my wait columns to be a different colour to signify that things shouldn’t hang around there.

As is often the case, the wait steps on this board aren’t pure waits. They are “a long wait followed by a small task”. For example, if you aren’t aggressively attacking waits, it is common for a PR to wait longer than it takes to review the PR.

On this board, the only pure wait step is “Deployed to Test” as the moment work starts, it moves out of the column and into “Testing”. Perhaps the board should be re-designed to separate the wait from the work for the “PR” and “Ready to Release” steps (Awaiting PR and PR, Ready to Release and Releasing). That’s something the team should decide; but in particular, I find long wait times for PRs to be particularly troubling as I’ve read Nicole Forsgren’s fantastic work in *Accelerate*!

There are swim lanes on this board that represent software products. These three lanes have independent releases and can be worked on by different teams. In other organisations, these might be separate boards.

## Observations

My initial observation on the board is that *most work is at a wait step*. “Ready to Release” is a wait step. “Deployed to Test” is a wait step. “PR” is a wait step. There are signs of left-to-right thinking present as despite all this waiting work, new work has been moved into development.

The board has a shape I recognise as one that often precedes a problematic release. If we keep adding new work or allow the work to get out of the correct order, we'll end up with a card blocking the release. For example, we have software versions 1, 2, and 3 already in our pipeline, with two more versions about to land from pull requests and yet another soon coming from development. If we find a problem with the version about to be tested, we clog up the system and have the task of getting “all in-flight cards into a releasable state”, which is far more work and coordination than getting a single card released.

Let’s fix it by thinking right-to-left.

## What to do next

Focussing on the first software product (the top swim lane), two cards are ready to release. We need to check that the software version for these two cards *does not include any changes from cards on the left*. The three cards in the development and pull request columns aren’t yet in a software version, so we put them hold. We don’t want to increase the inter-relationships further. That means anyone who was about to work on those is now available to work on the cards on the right.

If the card awaiting testing has a lower version number than the cards we want to deploy, we have to focus on that card. Having newer versions overtaking older ones only happens when we aren’t thinking right-to-left. We should finish what we started before moving onto new work. We can’t deploy new versions without having tested the earlier one, so we shouldn’t have let them skip ahead, where they can end up blocked by the earlier card. By thinking right-to-left in the future, we avoid piling up work and getting into a mess.

If the cards ready for release are versions 1 and 2, and the card ready to test is version 3… we hit that button and deploy the software. We update the board to show the cards are deployed.

:::fiure{.inset}
:img{src="/img/2022/01/task-board-2.jpg" alt="The task board has been updated with the changes" loading="lazy"}
:figcaption[Updated task board]
:::

Now we repeat the process. This time the right-most card is the one waiting to be tested. That’s the next thing to do (and as it moves to the right, you’ll notice that we continue to focus on this card until it is off the board. The right-most card will *always* be the right-most card now we are thinking right-to-left). So, we focus on getting the card tested, and then we focus on getting the card live.

Each time we do this, we not only finish the card closest to completion, but also clear the path for any work that follows.

:::figure{.inset}
:img{src="/img/2022/01/task-board-3.jpg" alt="The updated task board shows the potential for work to flow" loading="lazy"}
:figcaption[Updated task board]
:::

If we keep following this pattern, we naturally land on single-piece flow. It's just a way to prioritise “finishing” over “starting” work. If you are working on a stack-ranked list of options, this benefits your “most important card”, as no other work slows down the cycle time of the critical work. This benefit is repeated as each “most important card” gets pulled from the to-do list.

## Summary

If you focus on the cards on the right-hand side of the board, you’ll find that you naturally avoid hitting WIP limits. You cycle time will be shorter, especially as wait times are reduced.

You'll never suffer the pains of version-wrapping, where a newer card overtakes one that hasn't been tested and ends up blocked.