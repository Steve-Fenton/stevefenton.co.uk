---
layout: src/layouts/Default.astro
navMenu: false
title: 'Just released tsUnit 1.6.0 with fakes'
pubDate: 2014-11-13T20:08:39+00:00
authors:
    - steve-fenton
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - TSUnit
    - TypeScript
---

Users of tsUnit who want to get stuck into some TypeScript 1.3 goodness will be pleased to hear that tsUnit 1.6.0 is now available on NuGet.

- [tsUnit on NuGet](https://www.nuget.org/packages?q=tsunit)
- [tsUnit on GitHub](https://github.com/Steve-Fenton/tsUnit)

As well as taking advantage of both the protected keyword and the new tuple types in TypeScript 1.3, the fake / stub / test double generation has had a major overhaul.

You can now use the FakeFactory to create a dependency if you don’t want to use a real piece of code.

Here is an example of creating a fake version of `MyClass`, which is like having a test double that just does default stuff (like return `undefined` for properties and `void` for functions).

```
var target = tsUnit.FakeFactory.getFake<MyClass>(MyClass);
```
And here is a version where we supply a stub for the `run` method, to make it just return the value we want (you can stub properties and methods in this way):

```
var target = tsUnit.FakeFactory.getFake<MyClass>(MyClass,
    ['run', function () { return true; }]
);
```
I would love to remove the repetition of supplying the type as a type argument and as the first argument in the method, but the type argument is erased so goes missing at runtime, so the parameter that accepts the type is needed at runtime to supply a reasonable test double.