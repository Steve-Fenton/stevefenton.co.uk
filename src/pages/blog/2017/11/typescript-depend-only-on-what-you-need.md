---
id: 2978
title: 'TypeScript: Depend only on what you need'
pubDate: '2017-11-23T08:50:43+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=2978'
permalink: /2017/11/typescript-depend-only-on-what-you-need/
categories:
    - Programming
tags:
    - ood
    - typescript
---

This is a problem that is not unique to TypeScript, although it is perhaps easier to solve in TypeScript than in many other languages. It all comes down to one of the fundamental and fractal units of architecture… depend only on what you need.

There are two things that make this a hard principle to apply. The first is that people tend to write interfaces that directly describe classes. The second is that, when you have a good enough type to hand, it is easy to use it without thinking through the consequences.

So, let’s take a look at the problem we are dealing with. The code below contains a very innocent looking function. This function illustrates the problem nicely. It could be a method. It could be a constructor. It could exist in a TypeScript program anywhere you annotate a type, but it is most toxic when combined with functions, methods, and constructors.

### The problem function

```
<pre class="prettyprint lang-typescript">
function cellCount(battery: Battery) {
    return (!battery.cells) ? 0 : battery.cells.length;
}
```

Maybe this isn’t enough information to detect the problem… let’s have full disclosure and add some information to help reveal the problem. Here is how `Battery` is defined in this program:

```
<pre class="prettyprint lang-typescript">
interface Battery {
    kind: 'primary' | 'secondary';
    cellType: CellType;
    cells: Cell[];
    terminals: Terminals;
}
```

Now the problem becomes a little clearer. The function requires a `Battery` to be passed, but it only really depends on the `cell` property. Everything else in `Battery`, and in `CellType`, and in `Cell` is baggage that is only accidentally a dependency.

### Depend on less

Without breaking up the `Battery` interface (for now), we can depend on far less by simply requiring an object with the property `cells`, and where the `cells` property is an array. (You could go *all the way* by requiring only the `length` property on `cells` using `{ cells: { length: number } }`, but that borders on dogmatic).

```
<pre class="prettyprint lang-typescript">
function cellCount(battery: { cells: any[] }) {
    return (!battery.cells) ? 0 : battery.cells.length;
}
```

This allows *callers* to pass a wider variety of types, for example a structure that differs slightly from the original `Battery` type. Our original method does not care at all whether the argument passed has a `terminals` member. It doesn’t matter if we now call it with types that don’t have `terminals`. It also means our function is unlikely to start depending on other properties just because they are there.

It is healthy to be very accepting of wide types as inputs, just as it is healthy to return very specific types. This can be expressed in the follow terms; accept the most general type as an input, and return the most specific type you reasonably can (and prefer abstract types over concrete types).

I didn’t introduce a new type for `{ cells: any[] }` in this solution; but if I found myself repeating this type annotation, I’d probably name it by moving it into its own type.

### Where to spot this

As I mentioned earlier, you’ll find this in functions, methods, and constructors. With functions and methods, you should be able to review the required type by looking at the function or method body. When you know what you need to depend on, you can widen the type so it just represents the true dependencies.

You could even build the type gradually as you type out the method… you type your parameter as `(battery: { cells: never })` at first when you aren’t sure exactly what you need to depend on. This lets you refer to `battery.cells`, but not anything deeper. Then when you realise you need to use `battery.cells.length`, you can make the parameter require a little more… `(battery: {cells: any[]})`.

With constructors that accept dependencies (well done), you need to look through more code to see what is being used – but you can follow the same practice of gradually narrowing the type as you find you need to increase your dependence.

### Fractal principles

If you zoom up from this simple example, you’ll find the principle exists at many levels. It is called the Interface Segregation Principle at the object-oriented level, and the Common Reuse Principle at the architectural level. My favourite principles in programming are the ones that work at many levels.