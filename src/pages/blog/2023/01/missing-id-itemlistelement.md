---
layout: src/layouts/Default.astro
title: How to resolve missing field "id" (in "itemListElement.item")
navMenu: false
pubDate: 2023-01-24
keywords: structured data,search console,missing field
description: Find out to resolve missing field "id" (in "itemListElement.item") in your structured data.
bannerImage:
    src: /img/2022/12/neatly-arranged-boxes.png
    alt: An abstract stack of neatly arranged boxes
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Microdata
    - Structured Data
---

My website features breadcrumbs. They help users orient themselves within the site by representing the content within a hierarchy, but they can also help search engines understand how all the pages fit together.

The breadcrumbs are validated within Google Search Console, but a recent change caused an error to pop up:

> Missing field "id" (in "itemListElement.item")
> Items with this issue are invalid. Invalid items are not eligible for Google Search's rich results

This error was conufusing because the `id` shouldn't be needed for breadcrumbs. I'm using RDFa, so I have a `BreadcrumbList` that contains an `itemListElement` for each level, of type `ListItem`. However, you could get the same error using Microdata format as it maps to the same schema.

## Fixing breadcrumbs

The source of this issue was hard to find, but easy to fix. If you have two items with the same `href` or `url`, this will trigger the problem as the `href` acts as the `id` when you don't supply one.

Here's an example of how the breadcrumbs are intended to work:

1. `/` -> Home
2. `/tags/example/1/` -> The "example" tag "landing" page
3. `/tags/example/4/` -> The currently selected "example" tag page

The idea behind this is to supply a breadcrumb of **Home > Example > Page 4**.

However, because the "landing" page is Page 1, you could end up with **Home > Example > Page 1**. In this case, both "Example" and "Page 1" have the same `href`, `/tags/example/1/`.

To resolve this, the first page had to be adjusted to be **Home > Example**, without the "Page 1" breadcrumb. It's acting like a level-2 page, so it shouldn't have 3 levels of breadcrumbs.

## Summary

Although the error says `id`, it's actually the duplicate `href` that causes the problem as it's being used as an `id`.