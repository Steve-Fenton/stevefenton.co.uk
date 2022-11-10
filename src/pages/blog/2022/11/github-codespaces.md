---
layout: src/layouts/Default.astro
title: 'Using GitHub Codespaces'
navMenu: false
pubDate: 2022-11-10
keywords: github,codespaces
description: Find out how to use GitHub Codespaces the first time.
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

At [GitHub Universe](https://githubuniverse.com/), it was announced that individuals would all get 60 hours GitHub Codespaces for free. This post was authored within GitHub Codespaces.

My website runs on [Astro](https://astro.build/), with [Astro Accelerator](https://github.com/Steve-Fenton/astro-accelerator).

My workflow is about as GitHub as it gets...

1. Make changes and commit them to GitHub
1. GitHub Actions runs the build
1. GitHub Actions performs the publish
1. GitHub Pages does the hosting

Codespaces transfers the first step into GitHub, too!

## Open the codespace

When you first open GitHub Codespaces, it spins up an instance and presents you with Visual Studio Code within your browser. If you've used Visual Studio Code before, this is going to feel very familiar.

:::figure
:img{src="/img/2022/11/create-codespace.png" alt="Click on 'Code' and then 'Create Codespace on main'"}
::figcaption[Create Codespace from GitHub]
:::

One of the first things I spotted was Codespaces detects my `npm build` script and kicks it off. I didn't want to run this right away, so a quick <kbd>CTRL</kbd> + <kbd>C</kbd> stopped the automatic run.

## Working with files

Copying files and creating folders within the navigation panel works just as it would on your own machine. In addition, there are new options in the right-click menu for "Upload" and "Download", so you can push new files into Codespaces by uploading them from your machine.

This may well be the only "new thing" you need to know to get up and running with Codespaces!

## Building and running

You can run your build commands as usual, for example:

```
npm run build
```

My Codespaces build of 2,450 pages took 237 seconds on Codespaces vs 270 seconds locally, so a little faster!

But what about running the app? When you run things, they are made available on `localhost`, but Codespaces automatically exposes them on a special address.

```
npm run preview
```

Instead of browsing to `localhost:3000`, GitHub pops a message with a link to `my-codespace-name-3000.preview.app.github.dev`.

:::figure
:img{src="/img/2022/11/codespaces-localhost.png" alt="An editor prompt supplies an 'open in browser' link for your localhost address"}
::figcaption[Open in browser to view your app]
:::

## Extensions and features

Your Visual Studio Code editor will be a plain install out of the box, though you can still install extensions.

Similarly, the machine it is running on won't necessarily have all your tools installed. You'll also need to adjust some commands, like using `clear` not `cls` if you've grown used to Windows commands.

None of this is a deal breaker and if you use Codespaces more often, you'll soon adapt.

## Not a summary

This article will change shortly after I have tried out a few other aspects of Codespaces.