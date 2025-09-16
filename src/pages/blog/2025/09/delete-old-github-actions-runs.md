---
title: Automatically delete old GitHub Actions runs
navMenu: false
pubDate: 2025-09-16
keywords: github,actions,delete old runs
description: How to clear out old GitHub Actions runs automatically.
bannerImage:
    src: /img/topic/github/github-universe.png
    alt: A chrome rainbow Octocat GitHub logo floats in space.
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - GitHub
---

GitHub Actions are a great way to get stuff done. Prod a bit of code. Automation happens. Lovely.

Over time, though, you end up with lots of runs. I'm sure there are legitimate reasons to need to see whether that build you did on your 30th birthday worked, but that was two decades ago, and it's time to move on.

So you need to throw your old GitHub Actions into a salt bath, melt them down, and pull the plug. Thankfully, there's a template for that.

## The delete-old-actions action

There's an action called [delete-old-actions](https://github.com/yanovation/delete-old-actions) that does exactly what we need. It doesn't use a bath or salt, but it does bin off all your old runs. It's like a robot that cleans your house while you're at the beach.

Here's how I use it to clean out runs once they exceed a 30 day threshold.

```yaml
  clean:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: yanovation/delete-old-actions@v1
        with:
          token: ${{ secrets.CLEAN_ACTIONS_TOKEN }}
          days-ago: 30
```

In my case, I'm setting it to run after a successful build and on the same kit the rest of the action uses.

The step takes a `token`. It needs this to access the actions to delete them. I prefer creating a scoped token with minimal permissions instead of handing over the keys to the castle. You pop that in your usual secrets location for GitHub Actions.

It also takes a `days-ago` argument, which I've set to `30`.

## Dry runs

You can ask the action to do a dry run, where it will tell you what it would have deleted. This is useful to get a feel for the destruction before you mete it out.

```yaml
 - uses: yanovation/delete-old-actions@v1
        with:
          token: ${{ secrets.CLEAN_ACTIONS_TOKEN }}
          days-ago: 30
          dry-run: true 
```

## Keep some runs

It's possible you don't run your GitHub Actions that often, so you might want to make sure you keep a few runs even if they exceed the age you specify. You can use the keep-latest parameter to specify how many to hold onto.

```yaml
 - uses: yanovation/delete-old-actions@v1
        with:
          token: ${{ secrets.CLEAN_ACTIONS_TOKEN }}
          days-ago: 30
          keep-latest: 3
```

## A freshly vacuumed carpet

There's nothing like the plump underfoot feel of a freshly vacuumed carpet, and this is how you keep your GitHub Actions run list free of cat hair and dropped chocolate chip cookie crumbs.
