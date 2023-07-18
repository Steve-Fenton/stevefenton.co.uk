---
title: 'JavaScript heap out of memory with Astro and GitHub Actions'
navMenu: false
pubDate: 2023-07-18
keywords: astro,javascript heap,memory,github actions
description: Find out how to solve JavaScript heap out of memory with Astro and GitHub Actions.
bannerImage:
    src: /img/2022/10/milky-way.png
    alt: The Astro rocket logo
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
    - CSS
---

I run this website on [Astro](https://astro.build) and I also run some work sites using Astro with my [Astro Accelerator](https://astro.stevefenton.co.uk/) project.

For all of these, I'm using [GitHub Actions](https://github.com/features/actions) to build and test the static site and either GitHub Actions for personal sites, or [Octopus Deploy](https://octopus.com) for important stuff, to deploy the site out. I'm hosting my site using GitHub pages, but my serious projects are pushed to different environments, so Octopus can manage the release process better.

## Build times and site size

The Astro team are working on performance for large sites, but my build times for some different sites are:

- Astro Accelerator: 89 pages in 12.7 seconds
- Steve Fenton: 2,821 pages in 231.08 seconds (about 4 minutes)
- A big documentation site: 2,294 pages in 1,530 seconds (about 25 minutes)

And the complete build and test times:

- Astro Accelerator: Build and test in 2 minutes
- Steve Fenton: Build and test in 6 minutes
- A big documentation site: Build and test in 32 minutes

Now, you might spot that my site and documentation site have very different build times despite having similar page numbers. There are two reasons for this:

- Using `.mdx` files with lots of imports is slower than plain `.md` files - 6-12x longer for a page
- There are some additional components for navigation that take extra time to render (and they change per-page)

## JavaScript heap out of memory

Everything was running smoothly until I made a minor change that resulted in a big red build error:

> JavaScript heap out of memory

Basically, the Node process running inside the GitHub Action failed to free up memory and ran out of memory to process the work of building the site. Experimenting with various scenarios led me to find a few reasons for this.

You might see this error outside of GitHub Actions, though I didn't experience it locally in this case.

### Give it more memory

A simple fix, and probably the first to try, is to give Node some more memory. You need to precede your build command with a call to set a bigger allowed memory allocation.

```bash
export NODE_OPTIONS=--max_old_space_size=4096
npm run test
```

This doubles the default memory and is likely to solve the problem. Here's the same fix, but inside the GitHub Action.

```yaml
      - name: Astro build
        run: |
          export NODE_OPTIONS=--max_old_space_size=4096
          npm run build
```

### Check for circular references

If this doesn't solve your problem, you should check for circular references that might be causing unfree-able memory in your application. You can use *madge* for this.

Install madge:

```bash
npm -g install madge
```

Look for circular references:

```bash
npx madge  --circular --extensions ts,tsx,astro,js,mjs ./src/
```

You can adjust the above command based on your project, for example you could specify your entry file:

```bash
npx madge  --circular ./start.js
```

### Check for greedy MDX files

And finally, check for greedy MDX files. My process for this was embarassingly unscientific. I ran task manager and watched the Node process at the same time as watching the output from `npm run build` in Astro.

What I found was the memory spiked when an `.mdx` file imported a large number of markdown files.

In Astro, each markdown file you use as a page needs frontmatter with a layout specified. Sometimes I'm lazy and decide not to bother, and I use a default layout component instead. For this project, the default layout meant all the imported `.mdx` files were assigned a layout and were processed as full pages, even though they are just includes. All of the imported pages had to be built to be imported, which meant holding lots of pages in memory at once. This caused the memory use to spike from around 2 GB up to over 3 GB - exactly the problem I was looking for.

I removed the default layout component from this site to solve the problem.

## Other reasons

You could write a custom Astro component that does something heavy that causes this. You'll need to rework it, or allocate more memory for the build process.

Let me know if you find other useful examples of this issue and I'll add them.
