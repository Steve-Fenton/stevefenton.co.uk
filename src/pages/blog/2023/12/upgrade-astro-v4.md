---
title: 'Upgrade Astro to v4'
navMenu: false
pubDate: 2023-12-07
keywords: astro,upgrade
description: How to upgrade Astro and Astro Accelerator to v4.
bannerImage:
    src: /img/2022/10/astro.png
    alt: The Astro rocket logo
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Astro
    - PNPM
---

Here's a quick guide to upgrading [Astro](https://astro.build) and [Astro Accelerator](https://astro.stevefenton.co.uk/) to version 4. I've aligned the Astro Accelerator versions to the Astro versions so it's clear what you're getting.

Astro is a modern version of a static site generator, in that it can build a static site like Hugo or Jekyll, but build with dynamic islands as a first class concept.

Astro Accelerator is a project I built with a bunch of additional Astro components and helpers. The idea is the HTML for all the sites that use Astro Accelerator is the same, but it's a clean semantic set of HTML that can be themed very differently.

I'm using PNPM, so all the examples are based on PNPM.

## Running the upgrade

To upgrade Astro and any standard extensions, run the command:

```bash
pnpm dlx @astrojs/upgrade

```

Then upgrade Accelerator using

```bash
pnpm theme
```

To avoid any clashes, upgrade any other references you have to Astro-related components. If you're just referencing the Accelerator, this has all been done for you. If you have added anything like a Rehype extension you should update it as Astro v4 has new versions of Vite, Rehype, etc.

## Troubleshooting

> astro Failed to parse Markdown file this.setData is not a function

I got this error, but it was down to having a package that was out of date. Updating the other packages in my `package.json` file resolved this issue.

The full Astro upgrade instructions can be found on the [Astro site](https://docs.astro.build/en/guides/upgrade-to/v4/).

Most other issues will be down to a deprecation, so check out the breaking changes and deprecations using the above link.