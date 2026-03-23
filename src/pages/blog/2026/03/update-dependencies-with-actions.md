---
title: Update dependencies with custom actions
navMenu: false
pubDate: 2026-03-21
keywords: github actions,dependabot
description: "I wanted to replace dependabot with my own GitHub Action so I could get less noise for dependency updates."
bannerImage:
    src: /img/topic/github/github-universe.png
    alt: A chrome rainbow Octocat GitHub logo floats in space.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - GitHub
---

Having just asked dependabot to take care of [updating GitHub Actions dependencies](https://stevefenton.co.uk/blog/2026/03/auto-update-github-action-versions/), I sat thinking about dependabot's workflow for bumping package versions. You basically get a PR for each dependency and, well, it can get a bit noisy.

## The local fix needs more automation

I already have a little script that I use to update dependencies in my projects, which I can trigger with a quick `pnpm refresh`, so I got thinking about how I could replace dependabot's default behaviour with my own little script. I always add a refresh command to my projects and they always update dependencies, as well as taking care of other refreshment tasks.

On my website, it runs a script that refreshes Astro Accelerator to bring in updates as some of the files are copied into my website as part of the update. On other projects, it re-runs type generation or takes care of other similar things.

## Switching from dependabot to an GitHub Action

So, I wanted to take the great idea of dependabot, extend it a bit, and get a single pull request for the changes.

What I need to do was:

1. Checkout the code
2. Setup Node and PNPM
3. Install dependencies
4. Run my refresh script
5. Create a pull request with the changes

And I'd want to run this once a week, which is about how often I was asking dependabot to check dependencies.

Here's the GitHub Actions YAML that does this.

```yaml
name: Update Dependencies

on:
  schedule:
    - cron: '0 0 * * 1' # Every Monday at 00:00 UTC
  workflow_dispatch:

env:
  NODE_VERSION: 24
  PNPM_VERSION: 10.22.0

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v6
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: ${{ env.NODE_VERSION }}
       
      - name: Install pnpm
        run: npm install -g pnpm@${{ env.PNPM_VERSION }}

      - name: Install dependencies
        run: pnpm install

      - name: Run refresh script
        run: |
          git config --global user.name 'github-actions[bot]'
          git config --global user.email 'github-actions[bot]@users.noreply.github.com'
          pnpm run refresh
          
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v8
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          commit-message: "chore(deps): update dependencies"
          title: "chore(deps): automated dependency update"
          body: "Automated PR to update all dependencies via `pnpm refresh`."
          branch: update-dependencies
          base: main
```

## Once a week, press a button

As I check the process, I'll be checking the pull requests and pressing the merge button myself.

![A pull request containing dependency updates](/img/2026/03/update-deps-pr.png)

Once I've proven things out, I'll likely get this into a state where it will auto merge. I validate pull requests with a series of checks, so I'll know if something breaks. When all the checks pass, I should get things to merge without needing me to press a button.

## What about dependabot?

I'm still using dependabot, but to [keep an eye on my GitHub Actions](https://stevefenton.co.uk/blog/2026/03/auto-update-github-action-versions/) to see if they need to be bumped. I'm not using it for package dependencies.
