---
id: 667
title: 'Getting the right set up for TypeScript'
pubDate: '2013-01-25T22:26:19+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=667'
permalink: /2013/01/getting-the-right-set-up-for-typescript/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - typescript
---

This is actually quite a rework of my original ideas, because I have worked with TypeScript for a long time now and can happily add the benefit of hindsight to my view of what makes a great TypeScript set up. This isn’t the one true way, but I have found that the following set up rocks the TypeScript…

Big shout out to [Mark Rendle](https://blog.rendle.io/), [Basarat Ali Syed](https://github.com/basarat) and [Ryan Cavanaugh](http://social.msdn.microsoft.com/profile/ryan%20%20cavanaugh/) for their input (directly and indirectly) – I really value what these people say about TypeScript.

So what is a good TypeScript set up…

### tsconfig.json

The start of a good TypeScript setup is your `tsconfig.json`. This is how you set up all your compiler options in a way that is IDE-agnostic. If you are using Visual Studio, adding a `tsconfig.json` disables the “TypeScript” tab in project settings and allows people who aren’t using Visual Studio to run with the same settings as you. All the great IDEs and editors that support TypeScript also support this configuration file.

Here is an example file, the most important bit being `"strict": true`. Most questions that start with “why didn’t TypeScript detect…” are answered by “because you weren’t using the strict flag”.

```
<pre class="prettyprint lang-json">
{
    "compileOnSave": true,
    "compilerOptions": {
      "target": "ES2015",
      "module": "umd",
      "strict": true,
      "experimentalDecorators": true,
      "noFallthroughCasesInSwitch": true,
      "noImplicitReturns": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true
    }
  }
```

### Modules

The more I use TypeScript, the more I see value in modules (rather than namespaces). My original working method was to use namespaces for small stuff, and modules for big stuff. The thing is though, at some point your small stuff will turn into bigger stuff. When you have to make a call about how big stuff is going to get, you start predicting the future. When you predict the future, you get it wrong. You also have to use modules to be effective when running on the server, so you then have to take this into account too.

This is all actually pointless and I recommend modules for everything.

> What if I want to flatten everything into a single file – do I have to use internal modules for this?

Nope. You can use tools to flatten your modules into a bundled file. These days, though, [maybe you shouldn’t be bundling your JavaScript](https://www.stevefenton.co.uk/2017/10/continuous-delivery-javascript-bundling/).

> Can I run my app everywhere if I use external modules?

Yes. That’s one of the key benefits. You compile it with `--module` flags to target `commonjs` for NodeJS, `--module amd` for use with RequireJS, or `--module umd` for both. You can also use `system` modules. Easy!