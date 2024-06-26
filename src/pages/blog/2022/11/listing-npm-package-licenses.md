---
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
    - Node
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

## Automatically check licenses

If you run this as part of your build process, you can fail the build if an unrecognised license appears in your dependencies. There's a flag to check this, which lets you pass a semi-colon-separated string of licenses:

```
--onlyAllow "Apache-2.0;ISC;MIT" 
```

If there's a package with a license you don't allow, you'll get a warning:

> Package "caniuse-lite@1.0.30001427" is licensed under "CC-BY-4.0" which is not permitted by the --onlyAllow flag. Exiting.

## License checker on this website

In my case, I run the following to drop the file into my downloads file:

```
npx license-checker --out ./public/downloads/licenses.csv --csv --onlyAllow "0BSD;BSD-2-Clause;BSD-3-Clause;CC-BY-4.0;ISC;MIT;Apache-2.0;UNLICENSED"
```

[You can download the license CSV](/downloads/licenses.csv) to see all the dependencies and licenses from my static site generator, Astro.

## Summary

There's more work to do other than check the licenses are acceptable for use. There's the whole issue of supply-chain security, but that's a story for another time!