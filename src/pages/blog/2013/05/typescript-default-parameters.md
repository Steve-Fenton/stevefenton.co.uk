---
layout: src/layouts/Default.astro
title: 'TypeScript default parameters'
navMenu: false
pubDate: 2013-05-24T14:15:05+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

Working with TypeScript isn’t the same as working with JavaScript or C# or Java or any other language that TypeScript has drawn inspiration from. This is a good and a bad thing. From a bad point of view, it means you have to learn some new tricks no matter what your background is, on the plus side you might find some funk that you couldn’t do elsewhere.

So in C# you can have default parameters, but they must be a compile-time constant. For example it can be “Whatever”, but it can’t be string.Empty. This isn’t usually a major problem in C#, but wouldn’t it be nice if you could have more flexibility that this?

In TypeScript, you can really go for it – for example you can use data from the instance, or from a method call or from pretty much anywhere. Here is a quick example:

```typescript
findLastIndex(predicate: (T) => boolean, index: number = this.length): number {
    for (var i = index; i > -1; i++) {
        if (predicate(this.list[i])) {
            return i;
        }
    }
    return -1;
}
```

You can ignore most of what you see here, it is taken from a TypeScript implementation of List&lt;T&gt;. The important bit is the second parameter, which has a default value of this.length. This is not a compile-time constant, but it is allowed in TypeScript. You could in fact use any of the following (and more along these same lines):

- `(index: number = this.length)`
- `(index: number = this.someMethod())`
- `(index: number = this.someDependency.someMethod())`
- `(index: number = StaticClass.someMethod())`

…and so on!

The reason that this is allowable in TypeScript is because the default parameter is converted into an in-method check, which means the code just runs inside the curly-braces at runtime. The check inspects the argument that has been passed and then makes the call to get the default value if needed. Check out the first line of the transpiled JavaScript.

```typescript
List.prototype.findLastIndex = function (predicate, index) {
    if (typeof index === "undefined") { index = this.length; }
    for(var i = index; i > -1; i--) {
        if (predicate(this.list[i])) {
            return i;
        }
    }
    return -1;
};
```

This means you get the syntactical sugar of default parameters with the in-method functionality of a manually written check.