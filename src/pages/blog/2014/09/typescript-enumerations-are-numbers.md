---
layout: src/layouts/Default.astro
navMenu: false
title: 'TypeScript enumerations are numbers'
pubDate: 2014-09-12T20:56:08+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=283'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - typescript
---

Whilst [answering a question on Stack Overflow](http://stackoverflow.com/q/25762823/75525) I realised that TypeScript enumerations may well catch a few people out. In particular, this:

> “…Enum types are assignable to the Number primitive type, and vice versa, but different enum types are not assignable to each other…” – TypeScript Language Specification, 3.2.7

This means that you can use any arbitrary number in place of an enum, which means you might choose a number that doesn’t actually exist. For example:

```
enum BallType {
    pingPong,
    golf,
    tennis,
    soccer,
    basket
}

var ballType: BallType = 100;
```
Clearly, there are not enough ball types for 100 to be a valid choice as we have enough items to cover 0 – 4 only. Rather than treating the assignment of a number to the variable typed with the BallType annotation, the compiler allows this.

This is the area of hazard for TypeScript enums, but you can add in safety checks…

```
var ballType: BallType = 100;

if (typeof BallType[ballType] === 'undefined') {
    alert('No ball type for ' + ballType);
}
```
You might be a little upset about this implementation detail – but don’t throw the baby out with the bathwater because enums are still useful… not just because you get auto-completion for them and using enums instead of numbers prevents sync issues, but because they prevent this…

```
var ballType: BallType = SportType.pingPong;
```