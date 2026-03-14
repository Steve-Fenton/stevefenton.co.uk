---
title: Automatically update GitHub Action versions
navMenu: false
pubDate: 2026-03-14
keywords: github actions,dependabot
description: "Automatically update GitHub Action versions."
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - GitHub
---

You don't notice your GitHub Actions versions until you start getting warnings about things like "Node 20 is no longer supported". When you think about it, GitHub Actions are *yet another* dependency that needs to be kept up to date and present supply chain risks.

## Get Dependabot to do the work

The good news is, you can get Dependabot to keep your GitHub Actions up to date for you. You can add instructions for this to your `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

In my case I already had configuration for my pnpm dependencies:

```yaml
version: 2
updates:
  - package-ecosystem: "pnpm"
    directory: "/"
    schedule:
      interval: "weekly"
```

But it's trivial to add multiple updates to the same file:

```yaml
version: 2
updates:
  - package-ecosystem: "pnpm"
    directory: "/"
    schedule:
      interval: "weekly"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

## Automatic pull requests

When you first commit this file, you'll notice pull requests start appearing for your review.

![Dependabot pull request to update a GitHub Action version](/img/2026/03/dependabot-action-update.jpg)

```yaml
- name: Setup pnpm cache
    uses: actions/cache@v4 (-)
    uses: actions/cache@v5 (+)
```

This is a simple example of how you can use Dependabot to keep your GitHub Actions up to date. You can find more information about Dependabot in the [GitHub documentation](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates).
