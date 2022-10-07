---
layout: src/layouts/Default.astro
title: 'Apply TypeScript types honestly'
navMenu: false
pubDate: 2018-02-26T08:40:30+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

TypeScript is optionally statically typed, which means you can still write dynamically typed expressions within your TypeScript programs. If you drop into a block of dynamic code, and then want to come back out into statically typed code – you’ll need to introduce the types, and are responsible for the correctness of the type you introduce. If you try to do this too early, you can cause your future self confusion – but not if you apply TypeScript types honestly.

I have already written an article on keeping code that queries the DOM honest (i.e. [why you never need to type-assert a DOM element type in TypeScript]\(/blog/2018/01/embracing-typescript-strict-mode/)). But this particular article concerns dynamic type honest.

## Sample function

Let’s use this example, which takes any object and converts each of the properties to a string.

The result of this function is that if you have:

```typescript
const objA = {
    A: 1,
    B: 2,
    C: 3
}
```

It will give you:

```typescript
const objB = {
    A: '1',
    B: '2',
    C: '3'
}
```

Here is the fully working example:

```typescript
function convertPropertiesToString<T>(obj: T): {[P in keyof T]: string } {
    let stringValues: {[P in keyof T]: string } = {};

    for (let key in obj) {
        stringValues[key] = JSON.stringify(obj[key]);
    }

    return stringValues;
}

const objA = {
    A: 1,
    B: 2,
    C: 3
}

const objB = convertPropertiesToString(objA);
```

## Compiler warning

The type used in this function, `{[P in keyof T]: string }`, essentially says “whatever properties exist on the input type will exist on the output type, but the properties will each contain a string”. But when we create the `stringValues` variable it doesn’t actually have any of the properties yet; in fact, you can’t guarantee it matches the type of `{[P in keyof T]: string }` until the for-loop is complete.

The compiler tells you this, so it is tempting to assert the type instead, like this (the difference is pretty subtle, so I have done a before and after that shows the *type annotation* moving across the the right of the equals sign and becoming a *type assertion*):

```typescript
    // Before
    let stringValues: {[P in keyof T]: string } = {};

    // After
    let stringValues = <{[P in keyof T]: string }> {};

    // Alternate After
    let stringValues: {[P in keyof T]: string } = {} as any;
```

Note: all three examples in the code block above are wrong, because they aren’t honest.

## Use types honestly

While this solves the compiler warning, it isn’t honest code. The type of `stringValues` is actually `{}` to start with, and within each iteration of the loop it grows closer to the target type. In other words, the type changes dynamically during this function. So honest code would admit that `stringValues` is the dynamic type, `any`. Like this:

```typescript
function convertPropertiesToString<T>(obj: T): {[P in keyof T]: string } {
    let stringValues: any = {};

    for (let key in obj) {
        stringValues[key] = JSON.stringify(obj[key]);
    }

    return stringValues;
}
```

## Conclusion

My making TypeScript types honest, the code is actually more readable and maintainable. In particular, we don’t need to repeat the return type in a type annotation or type assertion. This example is trivial, but there are more complex examples of diving into dynamic code to do cool stuff where the honesty would be even more important.

It is worth noting that the return value of the function remains unchanged. That is our promise to callers – by the time we have finished, the result will be an object much like the one you passed in, except all of the properties contain strings. Within the function, though, we are honest about the type being dynamic.