---
layout: src/layouts/Default.astro
title: Can we have both trunk and
navMenu: false
pubDate: 2023-03-11
keywords: git,trunk-based development,branches
description: Is there a model that would support branching while keeping the benefits of trunk-based development?
bannerImage:
    src: /img/topic/process/crank-mechanism.png
    alt: A diagram of a crank mechanism
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Git
---

Like most programmers who have been around the block a few times, I've used lots of different source control tools and techniques. I've used Visual Source Safe, Subversion, Visual Studio Source Control, and of course Git. The method of using these tools differed, from locking files on checkout to merging files on commit, and to submitting pull requests for approval.

## Trunk-based development

The best technique for source control, by a country mile, is pair-programming and committing directly to trunk. Pull requests can cause a great deal of damage within a team, though you can do a better job of this if you are aware of the problems. The number one reason pull requests exist internally is a policy constraint. It's hard to deny that you can fly through an audit if every change is submitted using a pull request.

There are other ways to satisfy governance, risk, and compliance - but the overwhelming majority of teams using Git-based source control will use branches and pull requests. I simply acknowledge this reality.

## The DevOps model for trunk-based development

DORA's research found trunk-based development formed part of the story when it comes to software delivery performance. Their definition of trunk-based extended to include a small number of branches if they were short-lived.

Let's add this to our reality... you can get close to trunk-based and satisfy your audit needs if you stick to fewer than four branches and merge them into the main line quickly. Like, at least daily. This means you need to be super-responsive to pull requests and limit how many the team spins up at any one time.

If you remember the old days of continuous integration, there used to be a physical artefact in the office that would ensure one person was integrating at a time. A hat, or a flag... something that meant you shouldn't integrate if you didn't have possession of the object.

Now we are all remote, a physical object isn't going to cut it, but you need to find a way to have three hats available to the team. No hat. No branch. Simple.

## Tools for modern trunk-based development

Based on the reality of almost-trunk-based development (3 branches, all merged to mainline within at most one day), it would be useful if we could tool up some solution that would bring us:

1. A limit to the branch number
2. A way for all branches to be represented in a "total integration branch" that had all the changes, with builds and tests running

The first point is trivial. The second is more interesting. It says that we want to act as if our changes were being pushed into a single source of truth, even though we uses branches and pull requests for code review and audit purposes. A special branch called "_trunk" would automatically pull changes from all branches (including the main line) and run the continuous integration process. Any issues could be sent to the problem branch based on a quorum (it could integrate in order and highlight merge, build, and test failures to the branch causing an issue).

If we have these two super powers, we could potentially increase the maximum number of branches and their duration - because we have an indication of the problems far earlier.

## Dicussion

This is really just the start of a discussion. I'm keen to find out if anyone thinks this is a good idea or what problems it might cause. Could it be refined further?

I have links to Mastodon and LinkedIn below if you want to get in touch to start a conversation.