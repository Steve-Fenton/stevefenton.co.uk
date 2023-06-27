---
title: 'Writing modules for both Node.js and web browsers'
navMenu: false
pubDate: 2022-11-03
keywords: npm,node,modules
description: Find out how to write Node.js modules that also work in the browser.
bannerImage:
    src: /img/topic/nodejs/nodejs.png
    alt: The Node.js logo
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
    - Node
---

When writing a module for Astro, you'll find it runs in two modes. When you use `astro build` everything runs in Node.js but when you use `astro dev` your module runs in the browser. This means you need to write your NPM package to be compatible with both module systems.

The good news is Node.js supports ECMAScript-style module imports, so we don't need to come up with a way of satisfying CommonJS module loading.

Here's my solution so far, which certainly works within Astro.

## Module JavaScript

If you write your code in a module JavaScript file, with the `.mjs` file extension, Node.js will use ECMAScript module importing.

For example, in `index.mjs` you can use:

```javascript
import { getItem, setItem } from "./lib/Cache.mjs";

export async function example() {
  // Some code here that uses the cache.
}
```

## TypeScript

I originally wrote the NPM package in TypeScript, but I couldn't discover a configuration that would bend to my will. Instead, I switched this around so all the files are `.mjs` files, but I use the TypeScript compiler to generate the definitions.

I point the compiler at the `index.mjs` file and set flags for `--allowJs`, `--declaration`, and `--emitDeclarationOnly`. This creates a series of `.d.mts` files with the type information.

When I consume this NPM package from a TypeScript app, all the type information is present and correct.

Here's the full command using `npx`:

```
npx tsc index.mjs --allowJs --declaration --emitDeclarationOnly
```

I have kept some TypeScript `.ts` files that contain only types, which I use in the `.mjs` files in JSDoc comments:

```javascript
/**
 * Example
 * @param {import("../types/PagePredicate").PagePredicate} filter 
 * @returns {import("../types/Markdown").Markdown<Record<string, any>[]}
 */
export asyn function example(filter) {
  // ...
}
```

## Package files

I add the `.mjs` and `.d.mts` pairs to my package in the `files` section. Luckily most of the code is in the `lib` folder, so I don't have to add them all manually.

```javascript
  "files": [
    "index.mjs",
    "index.d.mts",
    "lib/*"
  ],
```

## Summary

In an ideal world, I would have wrangled the TypeScript compiler to get me this result from `.ts` files, but I get all the same benefits with only a little extra effort (JSDoc is undeniably more typing than TypeScript's type annotations).

Using `.mjs` files lets me write the same code to work as an NPM package and to run in web browsers.