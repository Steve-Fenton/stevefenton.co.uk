---
title: Installing Playwright in GitHub Actions
navMenu: false
pubDate: 2025-09-07
keywords: playwright,github actions,installation
description: I was hitting a 20 minute timeout installing Playwright browsers after an upgrade, so here's how to streamline it.
bannerImage:
    src: /img/topic/playwright/playwright.png
    alt: A dramatic Playwright logo, which has two theatrical mask faces, one happy and one sad.
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - Playwright
---

I've been using Playwright to automate browser tests for ages. I also like to keep my dependencies up to date, so I dutifully ensure Playwright has a working browser installed before I run the tests. Today, I hit a wall where the latest updates just wouldn't complete the installation before GitHub Actions timed out.

A typical run is around 2 minutes, so this was a big jump.

Here's the section from my GitHub Action that installs the browsers. It has never been a problem before, but I'll explain how this is a little lazy and how I could streamline the installation to bring it under my 20-minute timeout.

```yaml
- name: Install Playwright Browsers
    run: npx playwright install --with-deps
```

This command is one you'll see everywhere. It pops out in command outputs, it pops out if you try and use the deprecated "Playwright install action", and you'll find it in documentation everywhere you do. It's a reasonable command because it will pretty much work for everyone, but it does it by installing more than you might be use.

## Install the browsers you use

In my Playwright config, I only run tests using Chromium. The stuff I'm testing doesn't require checks on lots of browsers. That means I don't need to install all browsers, I just need chromium.

So, that's my first optimization. Tell it what browsers I need.

```bash
npx playwright install chromium --with-deps
```

## Fewer dependencies

The next hurdle is that `--with-deps` flag. It installs too much stuff. I know I'm running on an ubuntu runner from GitHub, so let's install just the stuff that's likely missing, instead of all dependencies.

```bash
apt-get install -y libnss3 libatk-bridge2.0-0 libdrm2 libxcomposite1 libxdamage1 libxrandr2 libgbm1
```

This should be a bit lighter.

## The updated action

Here's my updated GitHub Action with the specific browser and removing the `--with-deps` in favour of installing a specific list of dependencies.

```yaml
- name: Install Playwright Browsers
    run: |
        npx playwright install chromium
        sudo apt-get update
        sudo apt-get install -y libnss3 libatk-bridge2.0-0 libdrm2 libxcomposite1 libxdamage1 libxrandr2 libgbm1
```

This brought the install time from over 20 minutes (it timed out) to below 10 minutes. A subsequent run was back around the 2 minute mark.
