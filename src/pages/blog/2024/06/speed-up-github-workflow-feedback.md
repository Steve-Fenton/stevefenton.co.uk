---
title: 'Speed up GitHub workflow feedback'
navMenu: false
pubDate: 2024-06-20
keywords: github,workflow,actions
description: Find out how to make your deployment process templatable in Octopus Deploy.
bannerImage:
    src: /img/topic/github/github-universe.png
    alt: The GitHub logo in space
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - Octopus Deploy
    - Platform Engineering
---

This article was originally posted on The New Stack - [Speed up GitHub workflow feedback](https://thenewstack.io/speed-up-github-workflow-feedback/), but they've kindly allowed to share it on my site, too.

In the Northern Hemisphere, it's time for spring cleaning. That includes your GitHub workflows. Here are three simple improvements you can make to speed up feedback, reduce CPU cycles, save some money and do a small thing to help the planet.

Lowering your costs and reducing wasted CPU cycles are benefits, but faster feedback will bring you something even better: developer joy. Focus on the developer experience benefits, with the other upsides being bonuses.

The three improvements are:

- Adding dependency caching
- Setting workflows to fail fast
- Cancelling outdated workflows

While updating your workflows, you can also update each action to the latest version. It's rare to open a workflow without finding it's still using something old, like actions/checkout@v1.

The examples below are based on a Node.js application with pnpm as the package manager. If you've made different choices, there are documentation links to help you make similar improvements.

## Dependency Caching

Even for an application with moderate dependencies, it can take time to download everything each time you run a workflow. This delays developer feedback and reduces satisfaction. We all want to know the state of a change as soon as possible, and continuous delivery tells us to deliver this in under five minutes.

For larger applications, it often feels like you're downloading half of the internet into your node_modules folder.

Dependency caching side-steps the problem of constantly downloading the same package versions every 10 minutes and uses items from the cache instead.

You can set up dependency caching in the "setup-node" action. You pass the name of your package manager, like "npm" or "pnpm," and the path to your package-lock file, which is used to generate a key.

```yaml
steps:
 - name: Checkout
   uses: actions/checkout@v4

- name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9.1.0
          run_install: false

- uses: actions/setup-node@v4
  with:
    node-version: '18'
    # Add dependency caching
    cache: 'pnpm'
    cache-dependency-path: 'pnpm-lock.yaml'
```

Changes to the package-lock file will result in packages being downloaded, but if the file is unchanged, you'll be skipping that extra work.

The GitHub docs for [caching dependencies](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows) will help you tailor this step to your workflow.

## Fail Fast

If your workflow is split into multiple jobs, it's worth failing fast to avoid spending time and money running jobs that are queued behind the failure. For example, if you run a build job followed by a test job, you can avoid running the tests when the build fails.

You can set the fail-fast strategy within your jobs.

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    # Add fail fast strategy
    strategy:
      fail-fast: true
```

You can check the fail-fast documentation for more information.

## Cancel in-progress Workflows

When you create a pull request and trigger workflows, adding another commit within the lifespan of one or more workflows is not uncommon. You can stop processing the outdated jobs using the [concurrency option](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#concurrency) to cancel in-progress work.

```yaml
on:
  push:

# Add cancel in-progress for a concurrency group
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```


When you add commits and new workflows are triggered, any in-flight workflows in the same group will be canceled. The group name can be any string or expression that identifies the collection of workflows that should cancel each other. Usually, you'd want to identify a group by the name of the workflow and the branch.

:img{src="/img/2024/06/github-cancel-in-progress.png" alt="Workflows running when a new one starts are cancelled"}

The "Deploy to Channel" workflows are canceled when a new workflow supersedes them. Over the course of a year, this could save hours or days of wasted processing.

## We're Helping Too

At Octopus Deploy, we wanted to see where we can help reduce developer friction for users of Octopus and GitHub. We added [OpenID Connect for GitHub Actions](https://roadmap.octopus.com/c/70-openid-connect-oidc-for-github-actions) last year to simplify integrations and remove the toil of manually rotating secrets. We recently launched the [Octopus Deploy GitHub app](https://github.com/marketplace/octopus-deploy).

And more recently, our [Octopus GitHub Copilot extension]|(https://octopus.com/docs/administration/copilot) was announced during Satya Nadella's keynote at Microsoft Build. You use the extension to ask questions and show information from the GitHub Copilot chat window in response to instructions such as:

```text
@octopus-ai-app show the dashboard for the "Default" space
```

This reduces context switching and lets developers remain in a flow state.

## Remove Paper Cuts

While some of these GitHub improvements might seem small, their effect over time can make a big difference to developer satisfaction. Trimming even a minute or two from the time it takes to run a workflow can make a big difference.

It also helps that the same improvements can reduce costs for your organization. Showing the business people you care about cost containment will help build the kind of relationships you need when it comes to removing other kinds of paper cuts, like hold-ups in your change approval process.

Finding and fixing small things can lead to great outcomes.
