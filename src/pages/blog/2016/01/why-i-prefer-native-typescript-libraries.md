---
id: 1614
layout: src/layouts/Default.astro
title: 'Why I prefer native TypeScript libraries'
pubDate: 2016-01-07T20:23:14+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1614'
permalink: /2016/01/why-i-prefer-native-typescript-libraries/
categories:
    - Programming
tags:
    - typescript
---

The [Definitely Typed](http://definitelytyped.org/) project is nothing short of heroic, all those type definitions that have been created for free by the community, co-ordinated by people from the community – it it a genuinely monumental effort. If you need to consume a JavaScript library from your TypeScript application, you’ll be glad that this project exists because if you had to [create those definitions yourself](https://www.stevefenton.co.uk/2013/01/complex-typescript-definitions-made-easy/) it would consume a goodly portion of your day.

Despite this, consuming a JavaScript library along with an associated type definition has its drawbacks.

Firstly, it is nigh-on impossible to match a definition to a specific version of a dependency. For example, say you were using [amcharts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/amcharts), you can grab a version of the definition… but you’ll need to basically be using the latest version of TypeScript and the latest version of the library (because otherwise, you will struggle to find the historic version that matches what you are using). This is a real conundrum, because if you are using an older version of a library along with the latest version of TypeScript, you’re only hope is to find the version of the type definition that matches the version of the library and then update it to the version of the TypeScript language you are using. Painful.

There is no blame on the contributors or co-ordinators of the Defintely Typed project – in order to satisfy all of the possible combinations would require a million branches, which would be no more helpful and impossible to maintain.

But this is the reason that, given the choice, I’d rather consume a library written in TypeScript when I’m writing a TypeScript application. In some cases, this is simply a case of “pasting the library into a .ts file” and handling any compiler warnings – in others it means using a TypeScript alternative when one is available.