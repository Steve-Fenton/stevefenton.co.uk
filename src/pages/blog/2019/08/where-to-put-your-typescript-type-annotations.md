---
title: 'Where to put your TypeScript type annotations'
navMenu: false
pubDate: 2019-08-13T09:31:29+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

I have long held fast to a basic principle of [letting type inference do your work for you](/blog/2014/07/embrace-type-inference-in-typescript/). That means not adding type annotations unless you have a good reason to. I thought I would supply a bit more information on where to put your TypeScript type annotations and when they add value rather than noise.

The original two rules I used went like this…

- Don’t write a type-annotation if you can avoid it, and
- Only use type annotations to state a required type

So, if the compiler can infer the type and it chooses the exact same type you would have chosen, do nothing and get home early.

Now for the long version…

## Depend on less – Using type annotations

The one bear-trap to watch out for with full-on type inference is accidentally depending on too much. If you are following the advice so far, the only likely place you’ll step on this one is when you call a function or method and just accept the type it returns.

```typescript
function isAnchorElement(elem: HTMLElement | null) : elem is HTMLAnchorElement {
    return (elem != null && elem.nodeName === 'A');
}

function getAnchor(anchorId: string) : HTMLAnchorElement {
    const elem = document.getElementById(anchorId);

    if (isAnchorElement(elem)) {
        return elem
    }

    throw new Error('No anchor found for id ' + anchorId);
}

const target = getAnchor('link');
target.style.border = '1px solid aqua';
```

There isn’t much to complain about here, except when you consider what we depend on. Our `target` variable is quite specific, but we don’t need it to be. At the moment we only need it to be a `HTMLElement`, or if we want to be very specific; we only need it to be a `{ style: { border: string | null } }`. By being more specific with a type annotation, our code depends on less. This is the pragmatic solution in this case…

```typescript
const target: HTMLElement = getAnchor('link');
target.style.border = '1px solid aqua';
```

But in many other cases, going full-specific will give you benefits… imagine a method that is passed a `Customer`, but only needs the grab the phone number… you could write a method that just accepts… `{ phone: PhoneNumber }` rather than `customer: Customer`.

```typescript
const elem: { style: { border: string | null } } = getAnchor('link');
elem.style.border = '1px solid aqua';
```

You can read more about [depending only on what you need in TypeScript](/blog/2017/11/typescript-depend-only-on-what-you-need/).

## Choose where you want the error – Using type annotations

When it comes to choosing where to put a type annotation. Consider these two examples, which are basically the same except for where you get told about the issue.

You can be told about the error by the variable itself when you use a type annotation:

```typescript
function border(element: HTMLElement) : void {
    element.style.border = '1px solid aqua';
}

// Error here
let elem: HTMLElement = document.getElementById('id');

border(elem);
```

Or you can be told by a later line of code, which has a more strict requirement than the type that was inferred by leaving out the type annotation:

```typescript
function border(element: HTMLElement) : void {
    element.style.border = '1px solid aqua';
}

let elem = document.getElementById('id');

// Error here
border(elem);
```

In most cases, leaving out the type annotation is the best plan. The exceptions to the rule are functions / methods, where you can tell people what you need and what you return. If you put annotations anywhere, it’s parameters and return values.

I prefer to eliminate things like `null` earlier in my code, and often this means *in the things I call, not in the things that call them*. That means I’ll always prefer to return `HTMLElement` not `HTMLElement | null`, for example.

## Do it with code – Avoiding type annotations

Sometimes annotations and assertions are used in place of a defensive code. What happens is this… an assumption is made, the type makes the assumption invisible, later on something nasty happens. Here’s an example based on my article on [embracing the warnings the TypeScript compiler gives you in strict mode](/blog/2018/01/embracing-typescript-strict-mode/).

This is an example of doing it wrong… either with `const elem = <htmlelement> document.getElementById('test');</htmlelement>` or `const elem = document.getElementById('test') as HTMLElement;`:

```typescript
// The way of the error!
const elem = <HTMLElement> document.getElementById('test');

elem.innerHTML = 'Hello World';
```

The correct way is to do this using code, because the compiler is trying to tell you that you might not find an element with that id.

```typescript
const elem = document.getElementById('test');

if (elem) {
    elem.innerHTML = 'Hello World';
} else {
    // maybe you need to create an element, or log to your instrumentation
}
```

## Summary

So, all of this writing and the result is that type annotations are really best suited to function/method parameters and return values.

You *might* need them elsewhere, but most of the time you don’t.