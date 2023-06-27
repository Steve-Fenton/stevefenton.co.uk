---
title: 'Playwright website crawl testing'
navMenu: false
pubDate: 2022-11-03
keywords: npm,node,playwright,testing,crawl
description: Discover how to test your statically generated site with a crawler test.
bannerImage:
    src: /img/2022/11/playwright-tests.png
    alt: GitHub Actions test results for Playwright tests
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
    - Playwright
---

I'm using Astro as a static site generator. I created a base project template called [Astro Accelerator](https://github.com/Steve-Fenton/astro-accelerator), which sits beneath three web projects I'm working on. I'm testing the template project with [Playwright](https://playwright.dev/), which is similar to Cypress, so just think *Jest with Selenium superpowers*. I don't usually test that much through the front end, but all the code does *is* create the front end, so it needs tyres kicked.

## Dynamic crawl test

A while back, I wrote a .net project called [Katelyn](https://github.com/Steve-Fenton/Katelyn). It was a slow crawler that would find its way around your website looking for trouble. This is the kind of thing I wanted to do within a dynamic Playwright test. Essentially, I wanted it to crawl my static site and find problems.

This kind of test finds *content* problems rather than *functional* problems. For example, I want to detect the following:

- Broken internal links in anchor tags
- Missing image sources
- Missing images in source sets

Later I might also check other common content errors, such as images with no `alt` attribute.

Before you unleash a crawler, you have to think about potential problems. Here's what I learned from Katelyn.

1. You should crawl each resource exactly once
2. You should avoid crawling external resources by default

If you don't keep tabs on resources you've crawled, you waste a lot of time fetching stuff you've already checked. External resources, they are more likely to fail than the local static crawl and you also need to ensure it's okay for you to hit those resources with automation.

Even if you decide to crawl external resources, you don't want to discover more resources from those external sites (i.e. you want to make sure that the link to a partner site is working, but you don't want to crawl the whole partner site and everything they link to). You would probably run crawls that include external stuff less frequently than the internal crawl, which goes straight into your continuous integration build.

So, we need to discover resources, filter out external ones, de-duplicate the internal ones, and make sure we can get to all the pages and images we find.

## Technology selection

There are already some decisions that form a starting point for this exercise. Astro uses TypeScript and includes Unified, Remark, and Rehype for parsing and rendering content and templates, and I've already selected Playwright to run my functional tests.

Initially, I wrote a Playwright-based test. I used `page.goto` to load pages and selectors to discover more things to crawl. The further I got into this testing, the more I felt like I wanted to get closer to the content in my tests. So, with a working version in Playwright, I switched things up and brought in Unified to generate an abstract syntax tree (AST) from the HTML pages, and native Node.js `fetch` calls to make requests.

Despite the technical switch, the test is still wrapped up as a Playwright test and reports alongside all the other specifications in my test suite.

## Psuedo code

Here's my psuedo code version of what I want to do.

1. Build the Astro site (generate static files)
2. Run the Astro preview (serve the static files locally)
3. Point the test at the home page (`localhost:3000`)

After this, things get recursive...

4. Fetch the page
5. Parse the HTML into an abstract syntax tree
6. Grab a list of links and images
7. Check all the images exist
8. Repeat steps 4-8 for the newly discovered pages

The module needs to keep tabs on the queue of discovered items not yet looked at. It also need to keep tabs on everything it *has* crawled to avoid duplicating effort.

## Key part: Unified

Unified is a good way to handle HTML without a browser and without regular expressions. You create a `unified` instance with a pipeline of handlers that do stuff. The key part is passing it a function that's going to find all the resources to crawl. We'll call the function `findUris`:

```typescript
function handleHtmlDocument(text: string) {
  return unified()
    .use(rehypeParse)
    .use(rehypeStringify)
    .use(findUris) // <-- The key bit
    .process(text)
}
```

## Key part: findUris

The boilerplate of a plugin is that you'll provide a function that accepts a `tree`, which represents the HTML document. You can then `visit` this tree with a function that looks at it (or changes it, though we don't make any changes).

Here's the shell of the plugin before we write code to extract stuff.

```typescript
function findUris(options = {}) {
  return (tree: any) => {
    visit(tree, 'element', (node) => {

    })
  }
}
```

You can look out for this bit in the full script at the end.

## The full test spec

Here's the entire contents of `crawl.spec.ts`. The trickiest bit in getting this to "working" was making sure the `async` code was handled correctly. One attempt saw the test finish while the crawl was still running, because I missed an `await` somewhere.

I'm pretty sure there's some refactoring to do now that I've got it working, but here's the glorious first attempt.

Notes:

- Use Node 18 or higher to use the global `fetch` function
- Node's `fetch` didn't like `localhost` and preferred `127.0.0.1`
- The `crawled` array is used to prevent duplicate crawling

```typescript
import { test, expect } from '@playwright/test';
import { unified } from 'unified';
import { visit } from 'unist-util-visit'
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';

const baseUrl = 'http://127.0.0.1:3000';
const startPath = '/';
const crawled: string[] = [];
let discoveredLinks: string[] = [];
let discoveredImages: string[] = [];

test('Crawl for bad URIs', async () => {

  async function crawl(url: string) {
    if (crawled.includes(url)) {
      return;
    }

    console.log(url);
    crawled.push(url);

    const response = await fetch(url);
    expect(response.status, `Expected a 200 OK response for page ${url}`).toBe(200);

    const text = await response.text();
    await handleHtmlDocument(text);
    await crawlImages();

    const links = [...new Set(discoveredLinks)];
    discoveredLinks = [];

    for (let i = 0; i < links.length; i++) {
      await crawl(links[i]);
    }
  }

  // Kick off the crawl
  await crawl(baseUrl + startPath);
  console.log('Crawl checked', crawled.length)
});

function handleHtmlDocument(text: string) {
  return unified()
    .use(rehypeParse)
    .use(rehypeStringify)
    .use(findUris)
    .process(text)
}

async function crawlImages() {
  const images = [...new Set(discoveredImages)];
  discoveredImages = [];

  for (let i = 0; i < images.length; i++) {
    console.log(images[i]);
    const response = await fetch(images[i]);
    expect(response.status, `Expected a 200 OK response for image ${images[i]}`).toBe(200);
  }
}

function addUri(collection: string[], uri: string) {
  if (uri.substring(0, 1) == '/') {
    collection.push(baseUrl + uri);
  }

  if (uri.indexOf(baseUrl) == 0) {
    collection.push(uri.split('#')[0]);
  }
}

function isString(s: string | any) : s is string {
  return typeof s === 'string';
}

function findUris(options = {}) {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties && isString(node.properties.href)) {
        addUri(discoveredLinks, node.properties.href);
      } else if (node.tagName === 'img' && node.properties) {

        if (isString(node.properties.src)) {
          addUri(discoveredImages, node.properties.src);
        }

        if (isString(node.properties.srcSet)) {
          (<string[]>node.properties.srcSet.split(','))
            .map(s => s.split(' ')[0])
            .forEach(s => addUri(discoveredImages, s));
        }
      }
    })
  }
}
```

I left all the logging in this example as it's reassuring to see a list of URIs that were crawled as part of the test. The output looks like this:

```
http://127.0.0.1:3000/
http://127.0.0.1:3000/i/x/astro-lighthouse.png
http://127.0.0.1:3000/i/400/astro-lighthouse.webp
http://127.0.0.1:3000/search/
http://127.0.0.1:3000/about/
http://127.0.0.1:3000/about/getting-started/
http://127.0.0.1:3000/about/themes/
http://127.0.0.1:3000/features/
http://127.0.0.1:3000/about/frontmatter/
http://127.0.0.1:3000/about/github-pages/
http://127.0.0.1:3000/features/flags/
http://127.0.0.1:3000/features/markdown/
http://127.0.0.1:3000/features/image-automation/
http://127.0.0.1:3000/features/header/
http://127.0.0.1:3000/i/x/screens/skiplinks.png
http://127.0.0.1:3000/i/400/screens/skiplinks.webp

...and so on...

Crawl checked 76

  ✓  4 [chromium] › crawl.spec.ts:13:1 › Crawl for bad URIs (3s)
```

You can see that it has crawled pages, image `src` attributes, and image `srcset` attributes. Adding picture elements and other resources would be trivial by extending the Unified plugin. The whole HTML syntax tree is available, and it's no additional effort to look for more things while the tree is being walked.

## Crawling a sub-directory

You can trigger a crawl at the sub-directory level by setting an appropriate `startPath`. Just keep in mind that if the sub-directory contains links back up to the top-level site, the crawler will find those and crawl them. You may need to adjust the filtering to limit tests to the one sub-directory.

```typescript
const baseUrl = 'http://127.0.0.1:3000';
const startPath = '/blog/';
```

## Summary

I'm running this crawl test within a larger Playwright test pack. Only the `test` and `expect` calls depend on Playwright, so you could easily port this to a different test framework. Especially anything that looks like Jest!

The crawl test finds common errors introduced in content. Typos in link and image paths are a common problem when publishing content through static site generators.

You can keep an eye on [crawl.spec.ts](https://github.com/Steve-Fenton/astro-accelerator/blob/main/tests/crawl.spec.ts) to see an improved version of this test as I refactor and extend it over time.