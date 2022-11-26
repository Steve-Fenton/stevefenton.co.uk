---
layout: src/layouts/Default.astro
title: 'Node, Jest, and ECMA Modules'
navMenu: false
pubDate: 2022-11-26
keywords: node,jest,testing,ecma modules
description: Find out how to run Jest tests for a Node module that uses ECMA style modules.
bannerImage:
    src: /img/topic/jest/jest.png
    alt: Jest logo features a jester's boot
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
    - Playwright
---

Here are some notes on running Jest tests for a Node module that uses ECMA style modules. It took longer than I hoped to get going, so that made me want to write it down.

## Modules

> Dude! I am totally to faded to deal with all the modules.

I have spent more time battling modules recently than I have spent doing any other programming task. Node has been hit by rapid developments externally in terms of the switch from callbacks to promise-based async code and it has also been troubled somewhat by modules.

Early modules using CommonJS were nice and simple. You called a `require()` function passing in the path to the module. If your environment didn't have a `require` you could write one, or grab one like RequireJS. Anyway, this is a digression. We eventually settled on ECMA-style modules, where you use `import ... from ...` syntax to load modules. This offers flexibility as you can import specific things, `import { oneThing } from ...` and alias the whole import `import * as Allthings from ...`.

If you're writing a Node module, you will have done battle with this. I'm writing [a module that will be both a Node module and run in a browser](https://www.stevefenton.co.uk/blog/2022/11/modules-node-and-browsers/) and things were tricky.

The long and short of things is that it's ECMA modules, running on Node v18, and I want to test it with Jest.

## Jest

Jest is a "works out of the box" test framework. Normally you just call Jest and it finds and runs your tests. You get used to the conventions so you don't need to write any configuration.

However, this doesn't fly for my project, which...

1. Uses ECMA imports
2. Has filed named `*.mjs`

So, for the first time ever, I had to write a `jest.config.js` file, with the following entries to bring `.mjs` into the mix...

```javascript
export default {
    moduleFileExtensions: [
      "mjs",
      "js",
    ],
    testRegex: `test\.mjs$`,
};
```

Also for the first time, I needed to write a tricky script for my `npm run test`, which asks Jest to use experimental modules:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js --collectCoverage
```

Thankfully, I can hide this in my `package.json` file:

```javascript
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js --collectCoverage"
  },
```

## Jest extension

I'm using the Jest extension for Visual Studio Code. This also usually works out of the box, but I needed to configure it a little for this scenario. Here's the workspace `settings.json` for the changes.

```javascript
    "jest.jestCommandLine": "npm run test --",
    "jest.showCoverageOnLoad": true
```

I'm pretty strict on code coverage, because if you get your test strategy right, uncovered code is deletable code (if my tests don't need it, my app doesn't need it). Where I have code that I want to exclude as it depends on some external gnarly thing, I mark it up with:

```javascript
/* istanbul ignore next */
```

Not only does this tell the code coverage tools I don't want to be told about the line of code, but it also signals to me that this integration point isn't covered by unit tests. I'll pay attention to that if I change the code later.

The Jest extension auto-runs the tests and adds coverage highlighting to the code editor, both of which I love. You keep your tests fast when they are running more often.

:img{src="/img/topic/jest/jest-coverage.png" alt="An example of Jest's code coverage output" loading="lazy"}

## Summary

Jest is a good test framework for this kind of stuff. It's usually zero-friction, but I needed a couple of backflips in this specific case to get things running smoothly.

Now it's running, it's a great experience.