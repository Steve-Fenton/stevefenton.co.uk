---
layout: src/layouts/Default.astro
navMenu: false
title: 'TypeScript and the search for typeless code'
pubDate: 2013-03-10T15:41:36+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=631'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - typescript
---

There have been quite a few questions recently that suggest people aren’t getting the idea behind TypeScript – which is that it is JavaScript with static types. Specifying types is optional, but consistent types are not (i.e. if the compiler can infer the type, you can’t change the type later on).

I can’t quite work out what is powering the trend for questions and answers like this, but I’m very, very confused. The essence of the theme is that somebody is using TypeScript and they are trying to use something that doesn’t exist, for example…

```
const elem = document.getElementById('result');
elem.madeUp();
```
Of course, “madeUp” isn’t a method available on an HTMLElement. But I have used a library that adds it.

The correct answer to this is to extend the definition of HTMLElement – but this is the answer often given and often accepted:

```
const elem = <any> document.getElementById('result');
elem.madeUp();
```
This “cast to any” solution fixes ALL type warnings in TypeScript – but it is a ridiculous solution. Ask me why?

### Why does “Cast to Any” Suck?

Good question. If you use “cast to any” everywhere you need to use the madeUp method, you end up littering your code with this cast. When you later see the light and decide to define the type correctly, you’ll have to find and remove all of these casts, which will be all over the place. Yukky.

On top of this, if you are going to start casting everything to “any” just because static typing is just too hard – why the hell are you using a statically typed language when JavaScript is right there underneath it. It is like trying to write object-oriented code using Haskell.

I’m not saying you can’t use “any” to solve the problem, but I am saying don’t start casting stuff to “any” all over the shop.

So if you aren’t sure what “madeUp” returns and can’t be bothered to look it up, you can use the following simple definition to solve your issue, just making this one aspect dynamic, rather than all uses of the variable.

```
interface HTMLElement {
        madeUp(): any;
}

const elem = document.getElementById('result');
elem.madeUp();
```
Or you can make the dynamic-ness very local to the usage, once again meaning you don’t have to throw away all type information just for the sake of one call:

```
const elem = document.getElementById('result');
(<any>elem).madeUp();
```
So you get to use the “madeUp” method, without erasing all the type information from your selected HTMLElement and when you find out the full details you can extend the type information in a single place, rather than throughout your program.

Don’t cast to any. Learn how to add simple type definitions ([or complex type definitions](https://www.stevefenton.co.uk/2013/01/complex-typescript-definitions-made-easy/) if you know all the details) using the features supplied in the language!