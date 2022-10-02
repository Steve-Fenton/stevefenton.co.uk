---
layout: src/layouts/Default.astro
navMenu: false
title: 'Dynamically creating TypeScript classes based on a type argument'
pubDate: 2015-12-31T07:56:12+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - typescript
---

I have talked before about [highly dynamic instantiation of classes in TypeScript](/2014/07/creating-typescript-classes-dynamically/), for example when you know it’s name – but a common question that keeps coming up is:

> Why can’t I instantiate a class based on a type argument?

For example, people want to do this (this code won’t compile):

```
<pre class="prettyprint lang-typescript">class ExampleOne {
    hi() {
        alert('Hi');
    }
}

class Creator<T> {
    constructor() {

    }
    getNew() {
        return new T();
    }
}

var creator = new Creator<ExampleOne>();

var example = creator.getNew();
example.hi();
```
There are two reasons you can’t do this. A type argument is not a constructor, and type erasure removes it before runtime. As an aside, one of the values behind the TypeScript compiler that I liked the most back in October 2012 was how little it changed the code. If you were to target the latest version of the ECMAScript specification during compilation, all it would do is erase types. Transformations and additions solely served the purpose of keeping things working for older implementations of ECMAScript.

So you have to pass a constructor, but you can still use type arguments to provide type information, as per the below updated example.

```
<pre class="prettyprint lang-typescript">class ExampleOne {
    hi() {
        alert('Hi');
    }
}

interface ParameterlessConstructor<T> {
    new(): T;
}

class Creator<T> {
    constructor(private ctor: ParameterlessConstructor<T>) {

    }
    getNew() {
        return new this.ctor();
    }
}

var creator = new Creator(ExampleOne);

var example = creator.getNew();
example.hi();
```