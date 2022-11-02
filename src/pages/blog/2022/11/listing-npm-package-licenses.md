---
layout: src/layouts/Default.astro
title: 'Listing npm package licenses'
navMenu: false
pubDate: 2022-11-02
keywords: npm,node,package,dependencies,licenses
description: Find out the quickest way to list your npm package dependencies and licenses.
bannerImage:
    src: /img/2022/11/npm-dependencies.png
    alt: A spreadsheet listing dependencies and licenses
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Node.js
---

Part of being a responsible software developer is checking your dependencies. One of the most tedious tasks is checking licenses. If you're using Node.js and npm, you'll know that there's no such thing as "installing one package". Once you `npm install`, the floodgates are basically open.

However, a neat utility called [license-checker](https://github.com/davglass/license-checker/) can generate a report of your dependencies and their respective licenses. This speeds up the task a great deal.

## License checker

You can run license-checker with `npx`, with the following command:

```
npx license-checker --out licenses.csv --csv
```

This will generate a comma-separated file with an entry for each package, whether it's a direct dependency or a *friend of a friend*.

| module name                 | license    | repository                              |
|-----------------------------|------------|-----------------------------------------|
| @ampproject/remapping@2.2.0 | Apache-2.0 | https://github.com/ampproject/remapping |
| @astrojs/compiler@0.23.5    | MIT        | https://github.com/withastro/compiler   |
| @astrojs/compiler@0.29.5    | MIT        | https://github.com/withastro/compiler   |

In my case, I run the following to drop the file into my downloads file:

## License checker on this website

```
npx license-checker --out ./public/downloads/licenses.csv --csv
```

[You can download the license CSV](/public/downloads/licenses.csv) to see all the dependencies and licenses from my static site generator, Astro.

## Summary

There's more work to do other than check the licenses are acceptable for use. There's the whole issue of supply-chain security, but that's a story for another time!