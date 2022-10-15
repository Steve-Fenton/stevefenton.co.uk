---
layout: src/layouts/Default.astro
title: 'Astro: Rollup failed to resolve import'
navMenu: false
pubDate: 2022-09-20
modDate: 2022-10-08
keywords: astro,components,import,failed to resolve
description: Find out how to resolve a "rollup failed to resolve import" error in Astro.
bannerImage:
  src: /i/x/2022/10/astro.png
  alt: The Astro rocket logo
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Astro
    - TypeScript
---

The most common issue I've encountered during `npm run build` in Astro relates to imports. The error messages for these might be either:

- rollup failed to resolve import
- No matching export in "module file" for import "member name"

Here are some common reasons for these errors.

## Rollup failed to resolve import

The most common cause for this is user error. If you mistype the path or name of the module you're importing, it will error. At least this is easy to fix.

In some rare cases, a local working version of Astro will fail on GitHub. I suspect this is usually caused by a case-only rename of a file.

For example:

1. You have a file named `language.astro`
2. You rename it to `Language.astro`
3. You update any imports to change the case from `m` to `M`
4. You run `npm run build` and it works
5. You commit the code to GitHub

This will fail when the build runs in GitHub actions because the filename you changed won't affect the file name in version control. It will still be named `language.astro`.

:::figure{.inset}
:img{src="/img/2022/09/suspect-file.png" alt="Suspect File is still shown with a lower case file name" loading="lazy"}
:figcaption[Hey! Why is this still lower-case?]
:::

You can fix this by performing a more substantial rename, for example, `language.astro` to `Language1.astro`.

You can commit the working version and then repeat the process to move from `Language1.astro` to `Language.astro`.

## No matching export for import

This one is still a work in process. The error occasionally crops up, yet the module's features work as expected. This means it must have imported as expected.

I've only seen this during `npm run dev`, and it doesn't break anything.

However, I'm always suspicious of such things, so I'll keep investigating and report back.
