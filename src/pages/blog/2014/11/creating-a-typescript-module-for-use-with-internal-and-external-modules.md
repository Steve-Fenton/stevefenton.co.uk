---
id: 253
layout: src/layouts/Default.astro
title: 'Creating a TypeScript module for use with internal and external modules'
pubDate: 2014-11-05T20:13:42+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=253'
permalink: /2014/11/creating-a-typescript-module-for-use-with-internal-and-external-modules/

categories:
    - Programming
tags:
    - tsunit
    - typescript
---

Updated! When I first started writing TypeScript for distribution as a package, I had a problem trying to distribute a single package for use in web applications, and on Node. The early versions of tsUnit (a unit-testing framework) were compiled and packaged separately for these two environments, with a hacky fix to append a line of code to the Node version that wasn’t required for the web version.

Essentially, I had an internal module version for web (now known as a namespaced version) and an external module version for Node (now known as a module version).

These days, I’m using modules, not namespaces. I don’t actually like namespaces very much when modules provide all of the benefits of namespaces, plus some extras. This means that since 2016 I have been able to create a package for both web applications and Node application using modules (formerly external modules) and the “UMD” module kind.

Other quick notes on packaging TypeScript code…

- I use NPM for packaging. I used to support both NPM and NuGet, but TypeScript packages belong on NPM.
- I package the JavaScript files and the generated “.d.ts” files. I don’t include the TypeScript files.
- I use a task runner (Gulp) to shift everything into a distribution folder to make packaging simpler.