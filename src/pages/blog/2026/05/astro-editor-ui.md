---
title: A local CMS for editing Astro sites
pubDate: 2026-05-23
description: A little project for editing Astro sites
keywords: "astro,astro accelerator,cms,editor"
navMenu: false
bannerImage:
  src: /img/2022/10/astro.png
  alt: The Astro rocket logo
authors:
  - steve-fenton
categories:
  - Content Management
tags:
  - Astro
---

As a heavy Astro user, I'm pretty used to cranking out edits in my preferred code editor. Sometimes, though, a little bit of CMS user interface can be useful. For example, I dislike typing out the markdown to embed an image nicely (in a figure, with alt text, lazy loading, maybe a caption, and with a source set...).

When I'm writing a blog post, I also value just a smidge of formatting. Not a fully styled <abbr title="What You See Is What You Get">WYSIWYG</abbr> editor, but something that makes headings and blocks clear without adding too many distractions.

That's why I created myself a little local CMS that I can fire up from an Astro project when I need one.

## There when you need it

The CMS needs to be a layer that sits above the Astro site. It shouldn't interfere with the Astro core experience, which is a site stored in version control and made from markdown files.

The idea is that it's there where you need it, and gone when you don't.

You can spin it up add a blog post, taking advantage of the helpful shortcuts it provides. Then you just close it and carry on with your life.

:::figure

:img{ src="/img/2026/editor.png" alt="The starmark editor" loading="lazy" }

:::

## Helpful utilities

The list view has utilities that help you add content and re-order pages. No more updating the ordering by editing individual files.

The editor view shows your markdown in all it's raw glory, but styles it so headings look like headings and custom blocks are easy to see.

The media library sits on top of your `public/img` folder and makes managing images and adding them to pages really easy.

:::figure

:img{ src="/img/2026/media.png" alt="Media browser showing images" loading="lazy" }

:::

## A safe alpha

This is a safe alpha. Because you store your Astro site in version control, you can review all changes in your pending commits and decide if they are keepers.

Run this command in a terminal to fire it up and [tell me how you get on](https://github.com/Steve-Fenton/starmark/issues).

```bash
npx starmark
```

I'm trying it in earnest (I'm writing this post with it), so I'll be catching paper cuts along the way and publishing updates.
