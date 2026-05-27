---
title: Auto-close GitHub pull requests
pubDate: 2026-05-27
description: "Stop chasing old pull requests and get them marked as stale then kicked to oblivion when there's no activity"
keywords: "github,prs,pull requests,stale,auto delete"
navMenu: false
bannerImage:
  src: /img/topic/github/github-universe.png
  alt: A very glossy looking GitHub Octocat logo with shiny surfaces and lots of color
authors:
  - steve-fenton
categories:
  - Programming
tags:
  - GitHub
---
You might be like me. You open the dishwasher and there's no order or discipline to how it's been loaded. If you leave it that way, half of your cups will come out gritty. The baking tray is going to stop the spinning water blade. The bowl is going to be filled with water. It's a mess.

If you're the person who re-loads the whole dishwasher, and if you're using GitHub Pull Requests... this post is for you.

Just like the dishwasher, I sometimes open GitHub to find the Pull Requests tab on a repository has been loaded badly. It's a mess.

The good news is, the fix is automated and easy.

## Stale PRs

There's a GitHub-authored Action that tackles this problem, so you don't have to. Sadly, it doesn't work on dishwashers but let's take whatever wins we can get.

You add a new Action to the `.github/workflows` folder called `stale-pull-requests.yml`, then add the following:

1. A schedule to run the Action. Once a week is usually sufficient
2. A reference to `actions/stale` with a dusting of configuration

For scheduling, once a week is enough and you can set it up as a mittwoch maintenance activity. The syntax for schedules takes some getting used to, but `0 1 * * 3` fills the slots `minute hour day-of-month month day-of-week`. If you don't need to supply a value (like day-of-month, because we're doing it every week) you just use a `*`.

To help my friends, I always add a comment to explain the schedule.

```yaml
name: Mark stale PRs
on:
  schedule:
    - cron: '0 1 * * 3'  # Every Wednesday at 1am UTC

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v9
        with:
          stale-pr-message: 'Things seem to have gone quiet on this PR. There has been no activity for 60 days, so it will be closed in 14 days if there is still no movement.'
          close-pr-message: 'Closing due to inactivity.'
          days-before-pr-stale: 60
          days-before-pr-close: 14
          stale-pr-label: 'stale'
```

On the `actions/stale` front, you add a couple of messages, some timings, and a label.

- `stale-pr-message` tells people what's about to happen; the PR seems to have wilted and it's going to get crushed
- `close-pr-message` explains why the PR got crushed when it gets auto-closed
- `days-before-pr-stale` is how long you wait before adding the `stale-pr-message`
- `days-before-pr-close` is how much longer you wait before crushing it
- `stale-pr-label` is the label that will be applied to stale PRs

## There are two doors

Two things will happen when you add this. People will realize they forgot all about the PR and will move it on and get it approved, merged, and closed. Or they won't, and it will be kicked out of the pub by Peggy Mitchell.

Either way, the dishwasher is neat and tidy, and all your plates and cups get clean.
