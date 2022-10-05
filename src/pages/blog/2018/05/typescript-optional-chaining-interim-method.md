---
layout: src/layouts/Default.astro
title: 'TypeScript optional chaining interim method'
navMenu: false
pubDate: 2018-05-17T07:00:36+01:00
authors:
    - steve-fenton
bannerImage:
    src: /img/2018/05/optional-chaining.jpg
    alt: A broken chain with rusty links
categories:
    - Programming
tags:
    - JavaScript
    - TypeScript
---

ECMAScript has an optional chaining proposal on the way (see [TC39 on GitHub](https://tc39.github.io/proposal-optional-chaining/)). It uses `?.` to chain together an expression in a way that forgives a breaking chain. For example, `myObj.items[0].data` can fail if `myObj` is null, or undefined, or doesn’t have an items member, or there are no entries in the items collection, or the first item doesn’t have a member named data! This will be adopted into TypeScript as soon as the syntax is agreed – but what do you do in the meantime when you want to use optional chaining in TypeScript?

:img{src="/img/2018/05/optional-chaining.jpg" alt="A broken chain with rusty links"}

## Optional chaining magic ˀ

This isn’t really magic and it doesn’t have to be called `ˀ`. This is just a function with a name that hints at a question mark with a valid ASCII character (the glottal stop). Let’s look at two functions that can solve the temporary lack of optional chaining.

The object we’re dealing with is shown below, followed by two functions that can be used to chain.

```typescript
interface MyObj {
    items: {
        data: string;
    } [];
}

// For example:
const myObj: MyObj = { items: [{ data: 'Data String' }] };

// Call without optional chaining
const result = myObj.items[0].data;
```

The first function, which we’ll call `ˀ` for now, allows you to interlace your statement with calls to this optional chaining mechanism.

```typescript
function ˀ<T>(obj: T, d: T = {} as T) : T {
    return (obj == null) ? d : obj;
}
```

This would be used as shown below:

```typescript
const result = ˀ(ˀ(ˀ(ˀ(myObj).items)[0]).data, 'Default');
```

The second option is to borrow the “try” pattern that is common in .NET:

```typescript
function tryˀ<T>(exp: () => T, d: T) {
    try {
        let val = exp();
        if (val != null) {
            return val;
        }
    } catch { }
    return d;
}
```

This would be used as shown below:

```typescript
const result = tryˀ(() => myObj.items[0].data, 'Default');
```

The first function is a bit messier to use, the second function isn’t strictly the same as optional chaining (but it’s close).

## Examples

Here are some examples of optional chaining in action using both of these functions.

Happy path – everything is there:

```typescript
const myObj: MyObj = { items: [{ data: 'Data String' }] };

// Data String
const result1 = ˀ(ˀ(ˀ(ˀ(myObj).items)[0]).data, 'Default');
// Data String
const result2 = tryˀ(() => myObj.items[0].data, 'Default');
```

No elements in the items array:

```typescript
const myObj: MyObj = { items: [] }

// Default
const result1 = ˀ(ˀ(ˀ(ˀ(myObj).items)[0]).data, 'Default');
// Default
const result2 = tryˀ(() => myObj.items[0].data, 'Default');
```

No items member:

```typescript
const myObj: MyObj = <MyObj>{};

// Default
const result1 = ˀ(ˀ(ˀ(ˀ(myObj).items)[0]).data, 'Default');
// Default
const result2 = tryˀ(() => myObj.items[0].data, 'Default');
```

Undefined object:

```typescript
let myObj: MyObj;

// Default
const result1 = ˀ(ˀ(ˀ(ˀ(myObj).items)[0]).data, 'Default');
// Default
const result2 = tryˀ(() => myObj.items[0].data, 'Default');
```

## Summary

This trick works in TypeScript and JavaScript. All you need to do is use whichever of the two options you prefer. When the feature lands for real you can easily find all places where you need to swap out the temporary chaining function.

<small>Chain image by [Aqua Mechanical on Flickr](https://www.flickr.com/photos/aquamech-utah/), [Attribution 2.0 Generic (CC BY 2.0)](https://creativecommons.org/licenses/by/2.0/)</small>