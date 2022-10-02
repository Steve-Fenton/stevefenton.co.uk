---
id: 526
layout: src/layouts/Default.astro
title: 'New TypeScript toys to play with'
pubDate: 2013-08-06T11:29:15+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=526'
permalink: /2013/08/new-typescript-toys-to-play-with/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - typescript
---

I feel guilty already for trivialising the immense effort the TypeScript team are putting into the language in the childish title of this post. I don’t mean it that way – TypeScript is awesome, but today it got even more awesome.

TypeScript 0.9.1 has arrived and the major change is performance. The 0.9.1 compiler is designed to be much faster than the 0.9.0 compiler. This should solve problems for people with large programs.

Despite the big push on performance, they have managed to slot in some new features too.

### Type Reference Cannot Refer To Container ‘MyModule’

If you ever get this error, you will be pleased about the typeof support in TypeScript 0.9.1. This allows you to type a variable using modules and enumerations, as in the following example:

Before (Errors with “Type reference cannot refer to container ‘MyModule'”):

```
<pre class="prettyprint lang-typescript">
module MyModule {
    export function helloWorld() {
        alert('Hello World');
    }
}

var mod: MyModule = MyModule;
```

After (Works thanks to typeof):

```
<pre class="prettyprint lang-typescript">
module MyModule {
    export function helloWorld() {
        alert('Hello World');
    }
}

var mod: typeof MyModule = MyModule;
```

### ‘this’ Cannot Be Referenced In Initializers In A Class Body

Well. They can now! The following example, which gives the error message “‘this’ Cannot Be Referenced In Initializers In A Class Body” in previous versions, simply works in TypeScript 0.9.1 and above. Funky.

```
<pre class="prettyprint lang-typescript">
class ListenForClicks {
    constructor(public message: string) { }
    helloWorld = () => alert(this.message);
}

var listener = new ListenForClicks('Hello World');
document.onclick = listener.helloWorld;
```

### You Missed One

There are a couple of situations in TypeScript where you can catch yourself out and accidentally create a dynamic variable where you actually want it typed. You can find these situations using the [no implicit any compiler flag, which I talked about in July](https://www.stevefenton.co.uk/2013/07/TypeScript-No-Implicit-Any-Compiler-Flag/).

```
<pre class="prettyprint lang-powershell">
tsc --noImplicitAny app.ts
```

This will error whenever TypeScript has to decide that a variable is of the dynamic “any” type – so you can either make it explicit or give it a narrower definition.

Why do this? If you are using TypeScript for its static typing, this points out any parts of your program that are essentially “accidentally type free”.