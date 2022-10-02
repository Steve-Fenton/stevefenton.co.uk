---
id: 1344
title: 'An update on TypeScript circular dependencies'
pubDate: '2015-08-05T07:30:39+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1344'
permalink: /2015/08/an-update-on-typescript-circular-dependencies/
categories:
    - Programming
tags:
    - typescript
---

The discussion on circular dependencies when loading AMD modules has come up many times. The answer has always been that you have to refactor your program to remove the circular dependency as there is no way you can expect the module loader to solve this problem for you.

All of this is due to change as ECMAScript 6 allows for this scenario. The ECMAScript 6 module loader will supply bindings rather than executed values when you load your modules making circular references possible (although not necessarily desirable).

What does this mean for TypeScript? It depends. You can get all of this in one of the following ways:

- Target ES6 when you compile
- [Use SystemJS](https://github.com/systemjs/systemjs) (along with the SystemJS module kind), rather than AMD modules when you compile