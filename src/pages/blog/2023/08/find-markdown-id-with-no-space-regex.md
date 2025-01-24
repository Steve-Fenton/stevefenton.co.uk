---
title: 'Find markdown ids with no preceding space with RegEx'
navMenu: false
pubDate: 2023-08-29
keywords: markdown,regex
description: Use a RegEx in Visual Studio Code to find missing spaces in id markup in markdown.
bannerImage:
    src: /img/2022/10/vscode-regex.png
    alt: RegEx replace in VS Code
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Markdown
    - RegEx
---

I like to keep tabs on my RegEx solutions and today's challenge was to find a particular kind of markdown extension being used incorrectly.

If you use markdown, you'll want to extend it at some point (or you'll have to force your users to write an increasing amount of HTML, which defeats the point to some extent).

In the [Astro Accelerator](/blog/2023/07/astro-javascript-heap-out-of-memory), I've added extensions to support the following...

```markdown
A syntax for :span[inline elements].

:::div
Block elements (including nesting)
:::

## Custom attributes, like ids {#my-custom-id}
```

One potential problem is that people sometimes break a convention.

## Bad custom id

I have some bad custom ids on headings, which were causing an issue.

The headings should have been:

```markdown
## Heading {#custom-id}
```

But they were:

```markdown
## Heading{#custom-id}
```

The lack of space meant it wasn't converted into an id, but displayed as part of the heading.

## Finding all instances of the problem

I didn't want to just fix this instance, I wanted to find other similar mistakes. Time for VS Code and some RegEx.

```text
\S\{#
```

This will find any instances of `{#` that have a non-whitespace character `\S` before the `{`.

- `\S` something that isn't white space
- `\{` a curly bracket (escaped with a slash to avoid it being meaningful to RegEx as `{` is a special character)
- `#` a hash, so I'm only finding markdown ids that are bad

This found another six problem cases, so I can fix them at the same time.
