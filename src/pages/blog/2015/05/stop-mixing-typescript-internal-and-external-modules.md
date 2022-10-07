---
layout: src/layouts/Default.astro
title: 'Stop mixing TypeScript Internal and external modules'
navMenu: false
pubDate: 2015-05-28T23:52:05+01:00
authors:
    - steve-fenton

categories:
    - Programming
tags:
    - TypeScript
---

Update! People are still asking me about this, so I have updated my advice… to this: [Stop Mixing TypeScript Modules and Namespaces]\(/blog/2017/08/stop-mixing-typescript-modules-and-namespaces/).

Update! To help reduce confusion, internal modules are being renamed to “namespaces”. I also advise just as strongly that you avoid mixing namespaces and modules! Thanks to Mike Brocchi for suggesting the update.

Having answered the same question in slightly different forms almost every day this week, I thought it was time to just write an article and hopefully save a lot of time.

## Choose One

TL;DR – TypeScript has internal and external modules. When you write an application, you choose only **one** of these. You don’t mix them.

Stop mixing TypeScript internal and external modules. They aren’t designed to work together. They are mutually exclusive.

## No Choice

If you are using NodeJS, you don’t even have to choose. You must use external modules – so your code shouldn’t have the “module” keyword anywhere. The file *is* the module, so you don’t need to write the word “module”. Ever.

In fact, any environment that requires either CommonJS, AMD, or ECMAScript 6 modules is a no-choice environment. You are using external modules. Don’t use the “module” keyword. Seriously. Stop it.

## When to use Internal Modules

Don’t. If I could go back and re-write my books on TypeScript I would pretend that internal modules didn’t exist. I would take back all those pages and dedicate them to how to use external modules in your web pages, either using an AMD loader like RequireJS, or by running a minifier that crushed them all into a single file before I published them online.

The idea behind internal modules is sound – they represent the most commonly used method in professional JavaScript to keep variables out of the global scope. They reduce the global noise, reduce the chance of collisions, and help you organise you code.

Despite these sound origins, it is better to simply avoid them. External modules are even better at keeping things out of the global scope. They are also better suited to really big applications, by an immense distance.

## Summary

If you got this far and need a summary, please scroll back to the top and read the TL;DR note!