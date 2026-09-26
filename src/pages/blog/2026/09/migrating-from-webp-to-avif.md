---
title: Migrating from WEBP to AVIF
subtitle: "The format is for looks as much as speed"
pubDate: 2026-09-26
description: An update on migrating from WEBP to AVIF across the site.
keywords: "webp,avif,astro"
navMenu: false
bannerImage:
  src: /img/topic/nature/dramatic-cloud.jpg
  alt: Photo by Steve Fenton. A very dark and brooding cloud is being dramatically lit from a sun that's low in the sky, making the golden lower section contrast with the dark top section.
authors:
  - steve-fenton
categories:
  - Programming
tags:
  - Images
---

This week I've been under the weather and I've mostly not moved. This afternoon I felt a little better and decided to start the brain's flywheel by knocking a task of my list; upgrading from WEBP to AVIF across my website.

This task is made easier because I run my site off [Astro Accelerator](https://astro.stevefenton.co.uk/), which is [Astro](https://astro.build) plus some utilities I wrapped around it. One set of utilities handles images. You can put images of whatever format you like in the `public/img` folder and a little utility creates resized versions of them in matching `public/i` collections, and it pops a little JSON file next to each image, which is used at build time to manage a few details around responsive source sets.

The utility has been happily generating WEBP images for some time and the format is still good. If you've compared WEBP to AVIF in detail, you've likely seen the newer format handles images just a bit better. The files tend to be a little smaller while looking more faithful to the original. That means it's an opportunity to improve image quality and speed things up a little.

As I've shared in other articles and podcast episodes, one of my pet hates is making a change to a codebase that doesn't bring the intended benefit. That means I have a test list with the following:

- The images should look better, this will be subjective and the word I'm after is "crisp"
- The images should be no larger than the WEBP images, ideally they should be smaller

So, we have an idea of what success looks like and have a budget set by the existing WEBP files.

## Updating the Accelerator

There are a few files involved in the image process, but generally speaking there's the `image.mjs` that handles image resizing and `custom-markdown.mjs` that renders image tags. They share the same `image-size.mjs` configuration, which says how big the resized images should be,

When you have a file named `cat-etiquette.png` you end up with a resized PNG fallback image, and three resized WEBP files (my set up means 400, 700, and 1000px widths). The source set added to images means the browser picks the most appropriate size if it supports the feature and format, or it shows the fallback.

So, I updated these files to switch out WEBP generation and display for AVIF (and fixed a little regex bug that surfaced in the image name substitutions).

Then I cleared out all the old images and json files and regenerated them all.

## It needed a second attempt

Having got the resizing working, I tested the results. The images passed the crisp-test, but when I measured the sizes, they were on the heavy side. Setting the image quality on the AVIF files to 90 looked great but failed the size budget test. That meant a quick switch down from 90 to 80 and a new attempt.

Visually, the images still had the required pop, but now they came in under the size budget.

| Image                 |      Webp |     Avif 90 |   Avif 80 |
| :-------------------- | --------: | ----------: | --------: |
| cat-etiquette         |      69.2 |        99.6 |      62.4 |
| steve-design-thinking |      16.7 |        16.3 |      13.3 |
| st-ives-skyline       |     157.0 |       190.0 |     135.0 |
| london-night-water    |     111.0 |       168.0 |     102.0 |
| rai-amsterdam         |     268.0 |       312.0 |     213.0 |
| desk-cat              |     118.0 |       153.0 |     102.0 |
| rego                  |      77.9 |        93.4 |      69.6 |
| gamification          |      59.8 |        95.6 |      57.5 |
| github-universe       |      46.9 |        76.2 |      43.1 |
| astro                 |      16.2 |        16.3 |      12.1 |
| npm                   |      10.4 |        14.0 |       9.3 |
| **Total**             | **951.1** | **1,234.4** | **819.3** |
| Change                |       0.0 |       283.3 |    -131.8 |

## Knowing when to stop

:::figure
:img{ src="/img/topic/nature/dramatic-cloud.jpg" alt="Photo by Steve Fenton. A very dark and brooding cloud is being dramatically lit from a sun that's low in the sky, making the golden lower section contrast with the dark top section." loading="lazy" }
:figcaption[A picture I took of a dramatic cloud.]
:::

I could squeeze the sponge harder, but I've saved more than 10% and images look better. That's enough to bank. WHenever I've used techniques like Impact Mapping, the clarity of knowing the target is great, but having a signal of when to stop is even more useful. If I really want to increase speed, I should create a "new map" of what success for that would look like, but I've hit the goal I needed.

My site isn't a visual feast of images. This is a place for words. Where you do find an image, it should be crisp and speedy. If you use Astro Accelerator, you can grab the latest version and re-generate your images to get the improvements.
