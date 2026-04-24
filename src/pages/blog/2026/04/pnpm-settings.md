---
title: 'Using PNPM settings to tame unruly dependencies'
navMenu: false
pubDate: 2026-04-22
keywords: pnpm,npm,node,dependencies,typescript,workflow,best practices
description: "How to use PNPM settings to tame unruly dependencies"
bannerImage:
    src: /img/topic/npm/npm.png
    alt: The NPM logo on a colourful background
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - PNPM
---

You have probably faced the same dilemma. If you let you dependencies get out of date, the chances are you'll harbor a code vulnerability. If you update them too soon, you potentially introduce a malicious version with a supply chain attack.

This may leave you wondering whether you should update dependencies, or not.

Here's an adaptable strategy I apply to my PNPM dependencies that seeks the Goldilocks zone of "not too hot, not too cold" for dependency updates.

## Minimum release age

`minimumReleaseAge` sets a quarantine period (in minutes) that a new package version must sit in the registry before pnpm will install it. The value `10080` is exactly seven days. This gives the community time to catch regressions, supply-chain attacks, or accidental publishes before they land in your project.

## Minimum release age exclude

`minimumReleaseAgeExclude` lists packages that are exempt from the quarantine period above. Packages in this list are installed immediately, regardless of how recently they were published. In this case `astro-accelerator` and `astro-accelerator-utils` are first-party packages (I made them), so they don't need the same level of scrutiny as third-party dependencies.

Note: There's currently a [bug outstanding](https://github.com/pnpm/pnpm/issues/10361) in PNPM that means this setting isn't currently working!

## Trust policy

`trustPolicy` controls whether pnpm will install lifecycle scripts (pre/post-install hooks) for packages. Setting it to `no-downgrade` means packages that were previously allowed to run scripts can continue to do so, but newly added packages must be explicitly approved before their scripts will run. This prevents a supply-chain attack from sneaking malicious install scripts in through a new dependency.

## Block exotic subdeps

`blockExoticSubdeps` prevents packages from pulling in dependencies that use non-standard resolution (such as Git URLs, local `file:` paths, or custom registries) as sub-dependencies. Setting this to `true` ensures your entire dependency tree is resolved through the normal registry, making auditing and reproducibility much simpler.

## Example configuration

This configuration goes into your `pnpm-workspace.yaml` file.

```yaml
ignoreScripts: true
minimumReleaseAge: 10080
minimumReleaseAgeExclude:
  - astro-accelerator
  - astro-accelerator-utils
trustPolicy: no-downgrade
blockExoticSubdeps: true
```

## Serious dependency security

If you're working on a system where a malicious package could cause widespread damage, for example a regulated industry, or a tool vendor for tools used in sensitive areas like build pipelines where you have secrets that could be exfiltrated, you need to go a bit deeper.

The belt-and-braces approach to dependencies here would be that you review the changes to the packages you depend on. If you see something dodgy, not only should you not update the package, you should also raise the security concern so alarms can sound for everyone else.

Many organizations put an intermediary package manager in place so all internal apps pull from the approved source of packages instead of public repositories. A central team might update the packages with a deep review process, giving you extra confidence in your supply chain.

This may make you think twice about taking on a dependency as the review burden may exceed the cost of simply creating the code that does what you need.

## Why so serious?

We don't really take packages very seriously. But I want folks to think about it like this.

Your Git repo likely doesn't let a bunch of strangers view and update your code. You might accept contributions from strangers, but with a review process to make sure you check the code before you accept it.

Packages are basically strangers adding code to your system, so why would you treat them any differently?
