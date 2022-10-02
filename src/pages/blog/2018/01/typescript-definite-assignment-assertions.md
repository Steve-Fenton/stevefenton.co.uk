---
layout: src/layouts/Default.astro
navMenu: false
title: 'TypeScript definite assignment assertions'
pubDate: 2018-01-17T20:06:02+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - typescript
---

![Warning Triangle](https://www.stevefenton.co.uk/wp-content/uploads/2018/01/warning-triangle.png)TypeScript never stops improving, although most changes over the past year have been “non syntactical” – i.e. there have been a huge swathe of improvements to how types are handled, and a large slice of improvements to make the tooling even better. It has a been a while, though, since we got a new character to decorate our code. The wait is over, thanks to the TypeScript Definite Assignment Assertion. Let’s take a look at it with a short example.

### No definite assignment

The new feature is related to the following improved compile-time check. In the example below, I forgot to assign a value to the `wordsPerMinute` property. This can happen when you forget to add a default value, or when you forget to initialize it in the constructor, or (as below) when you forget to map a parameter to the property (remember, [you *don’t* need to manually map constructor parameters](https://www.stevefenton.co.uk/2013/04/stop-manually-assigning-typescript-constructor-parameters/)!).

```
class ArticleMeta {
    private wordsPerMinute: number;
    private secondsPerImage: number;

    constructor(wordsPerMinute: number) {
        this.secondsPerImage = 15;
    }
}
```
Whatever the reason, if you compile using the `strict` flag (I keep telling you to use it), you’ll get the following error, known as a definite assignment error because there is no definite assignment:

> app.ts(2,13): error TS2564: Property ‘wordsPerMinute’ has no initializer and is not definitely assigned in the constructor.

### Fixing, and definite assignment assertions

The correct fix is probably to assign `this.wordsPerMinute = wordsPerMinute` in the constructor – but in some cases, you may be doing something funky where the dependency will be resolved in a way the compiler is unable to determine.

When you need to allow a property with no definite assignment, you can use the *definite assignment assertion*. This is a very grand name for adding a bang (!) to the property name.

```
class ArticleMeta {
    private wordsPerMinute!: number;
    private secondsPerImage: number;

    constructor(wordsPerMinute: number) {
        this.secondsPerImage = 15;
    }
}
```
This will only work in TypeScript 2.7 and newer.

### Usage

On the whole, unless you have an iron-clad reason to use it – you’ll probably want to avoid the definite assignment assertion. In most cases, the real value of this feature lies in the part that detects unassigned properties.

<small>Warning Triangle, Public Domain. [Wikipedia](https://commons.wikimedia.org/wiki/File:Achtung.svg).</small>