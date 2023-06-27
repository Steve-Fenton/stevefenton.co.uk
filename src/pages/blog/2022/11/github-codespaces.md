---
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

At [GitHub Universe](https://githubuniverse.com/), it was announced that individuals would all get of 60 hours GitHub Codespaces for free. This post was authored within GitHub Codespaces.

My website runs on [Astro](https://astro.build/), with [Astro Accelerator](https://github.com/Steve-Fenton/astro-accelerator).

My workflow is about as GitHub as it gets...

1. Make changes and commit them to GitHub
1. GitHub Actions runs the build
1. GitHub Actions performs the publish
1. GitHub Pages does the hosting

Codespaces transfers the first step into GitHub, too!

## About Codespaces

Codespaces go beyond the "edit on GitHub" feature by providing a fully operational development environment for you to work with. It has your code, editor, and a bunch of features that let you start coding.

You can work in your browser, or open the Codespace in Visual Studio Code, JetBrains Gateway, or JupyterLab.

I tested transfering my session between browser and local and it worked pretty smoothly. The first time you do this, you'll be prompted multiple times for extensions and permissions, but once you have it set up it is quite seamless.

To be honest, the in-browser experience is so good it is likely to become my default.

## Open the Codespace

When you first open GitHub Codespaces, it spins up an instance and presents you with Visual Studio Code within your browser. If you've used Visual Studio Code before, this is going to feel very familiar.

:::figure{.inset}
:img{src="/img/2022/11/create-codespace.png" alt="Click on 'Code' and then 'Create Codespace on main'"}
::figcaption[Create Codespace from GitHub]
:::

One of the first things I spotted was Codespaces detects my `npm build` script and kicks it off. I didn't want to run this right away, so a quick <kbd>CTRL</kbd> + <kbd>C</kbd> stopped the automatic run until I was ready to build it myself.

## Stopping the Codespace

There's an additional "Codespaces" button in the editor that opens the command palatte in Visual Studio Code. The option "Stop Current Codespace" stops the active session.

If you don't stop a session, it will automatically stop after 30 minutes of inactivity. This is good as it prevents you using up your free hours by forgetting to stop the Codespace.

## Working with files

Copying files and creating folders within the navigation panel works just as it would on your own machine. In addition, there are new options in the right-click menu for "Upload" and "Download", so you can push new files into Codespaces by uploading them from your machine.

This may well be the only "new thing" you need to know to get up and running with Codespaces!

## Building and running

You can run your build commands as usual, for example:

```
npm run build
```

My Codespaces build of 2,450 pages took 237 seconds on Codespaces vs 270 seconds locally, so a little faster! This was on the base machine type, which is 2-core, 4GB RAM. You can increase this to one of a range of options up to 16-core 128 GB RAM and further mega-sizes are available on request for 32-core machines and GPU machines.

But what about running the app? When you run things, they are made available on `localhost`, but Codespaces automatically exposes them on a special address.

```
npm run preview
```

Instead of browsing to `localhost:3000`, GitHub pops a message with a link to a port-forwarded address, such as `my-codespace-name-3000.preview.app.github.dev`.

:::figure{.inset}
:img{src="/img/2022/11/codespaces-localhost.png" alt="An editor prompt supplies an 'open in browser' link for your localhost address" loading="lazy"}
::figcaption[Open in browser to view your app]
:::

## Extensions and features

Your Visual Studio Code editor will be a plain install out of the box, though you can still install extensions.

Similarly, the machine it is running on won't necessarily have all your tools installed. You'll also need to adjust some commands, like using `clear` not `cls` if you've grown used to Windows commands.

None of this is a deal breaker and if you use Codespaces more often, you'll soon adapt.

## Code changes

The Codespace is listed in GitHub along with whether it is up-to-date or has uncommitted changes. This is going to be useful information if you are ever cleaning up old Codespaces. As long as there are no uncommitted changes, you're only going to lose configuration and temporary artifacts when you delete it.

## Costs

At the time of writing the free hours and additional cost per hour are a very reasonable:

| Machine | Free Hours | Cost Per Additional Hour |
|---------|------------|-------------------------:|
| 2 cores | 60         | $0.18                    |
| 4 cores | 30         | $0.36                    |
| 8 cores | 15         | $0.72                    |

Codespaces come with 15 GB of storage, with $0.07 per extra GB each month.

You can keep tabs on your usage [on your billing page](https://github.com/settings/billing).

:::figure{.inset}
:img{src="/img/2022/11/codespaces-usage.png" alt="Usage statistics for GitHub Codespaces" loading="lazy"}
::figcaption[Usage statistics]
:::

## Summary

Codespaces are a great way to have a portable development environment for your projects. Many individuals will find the 60 free hours sufficient for their personal projects and the cost-per-hour after the free hours is still attractive.

If you have an underpowered machine, you can immediately boost your productivity with base-tier performance that exceeds my 7th Gen CORE i5 personal laptop.

The free tier also makes it super-easy to try out Codespaces for yourself.