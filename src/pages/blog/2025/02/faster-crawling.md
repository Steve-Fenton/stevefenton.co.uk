---
title: Faster crawl tests using Linkinator
navMenu: false
pubDate: 2025-02-13
keywords: testing,automation,crawl
description: I switched my crawl tests from Playwright to Linkinator and sped them up a lot.
bannerImage:
    src: /img/2025/02/linkinator.png
    alt: Linkinator results for a crawl test
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Crawler
    - Node
    - Testing
---

To catch broken internal links and missing images or resources, I wrote a [crawl test in Playwright](/blog/2022/11/playwright-website-crawl/). It would start on the home page and follow links (visiting each one only once) to make sure they all existed. This caught lots of issues that would eventually have been someone messaging me to tell me something was missing. The only issue was the time it takes to run.

So, I sat down and replaced the test with Linkinator.

I'm working with a static site written in markdown. When the site is built (with Astro), the HTML files and other web content ends up in a `dist` folder. To test with Playwright, I supplied a command to start a basic web server so it could start it before running the tests.

## Adding a Linkinator test

First, we need to add Linkinator.

```bash
pnpm install linkinator
```

Then we add a script to the `package.json`, so there's a short-hand name for the command. We don't want to type this every time!

```json
{
    "scripts": {
        "crawl": "linkinator ./dist --skip \"^(?!http://localhost)\" --recurse  --verbosity error"
    }
}

```

Let's break down this command.

- `linkinator` is the command
- `./dist` is where all the web content can be found, so this is the root for the server to run
- `--skip` we don't want to crawl off-site addresses for this test, so we *exclude* everything that isn't on `localhost`
- `--recurse` follow all the links and resources
- `--verbosity` only report errors (you can adjust this if you like to watch your terminal scroll)

## Running the Linkinator crawl

To run the test, we must first make sure the site has been built. You'll need to run whatever command does this for your preferred generator. For me, it's Astro.

```bash
pnpm build
```

With the `dist` folder full of content, we can start the crawl:

```bash
pnpm crawl
```

:::figure
:img{src="/img/2025/02/linkinator.png" alt="Linkinator output shows 3,869 links checked in 9.068 seconds" loading="lazy"}
::figcaption[3,869 links checked in 9.068 seconds]
:::

In a few seconds, Linkinator will report back with the results. Thank you Linkinator.

## Summary

Linkinator is a fast way to check all your internal links and resources are healthy. It's super fast and can run its own web server to expose your static site during the test. Nice.
