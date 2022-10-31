---
layout: src/layouts/Default.astro
title: 'Getting type safety for TypeScript promises'
navMenu: false
pubDate: 2017-11-21
modDate: 2022-10-18
keywords: type safety,typescript,promises
description: Find out how to get type safety in TypeScript when working with promises.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

This one has cropped up a couple of times, and I’m interested in this kind of problem. The problem goes like this. All your promises will either resolve or reject, but due to the alliteration, people sometimes use `(reject, resolve)` when they should be using `(resolve, reject)`. It is a simple mistake, but I’m interested in it because I'm curious why TypeScript didn’t catch the error.

The short answer is that TypeScript *will* catch this problem if you do things as shown below. Let’s use the following working example to play with.

```typescript
function go(isWorking: boolean): Promise<string> {
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            if (isWorking) {
                resolve('a string');
            } else {
                reject(new Error('It Broke'));
            }
        }, 200);
    });
}

go(true)
    .then((val) => console.log(val))
    .catch((err) => console.log(err));

go(false)
    .then((val) => console.log(val))
    .catch((err) => console.log(err));
```

Let’s start by recreating the error people have been reporting. Let’s switch the resolve and reject parameters:

```typescript
    return new Promise((reject, resolve) => {
        window.setTimeout(() => {
            if (isWorking) {
                resolve('a string');
            } else {
                reject(new Error('It Broke'));
            }
        }, 200);
    });
```

Immediately, TypeScript warns us that the argument of type ‘Error’ isn’t either a ‘string’ or a ‘PromiseLike<string>‘. Or in exact terms…</string>

```
Argument of type 'Error' is not assignable to parameter of type 'string | PromiseLike<string>'.
  Type 'Error' is not assignable to type 'PromiseLike<string>'.
    Property 'then' is missing in type 'Error'.
```

:::figure{.inset}
:img{src="/img/2017/11/promise-resolve-reject-error.png" alt="Promise Resolve/Reject Error" loading="lazy"}
::figcaption[TypeScript catches the incorrect parameter order]
:::

So how do we end up not being told about this problem by the compiler?

## No return type annotation

The first way to end up in a sticky puddle is to leave off the return type annotation on the function that returns your promise.

```typescript
function go(isWorking: boolean) { // <-- no return type
```

The return type is now inferred, and it lands on `Promise`. It now thinks you are *trying* to return a promise that resolves with your error object. Oops. The inference is correct, but it is based on the mix-up.

The fix is to add return type annotations to your functions and methods.

## Reason string / same types

The second way to gift yourself problems is to use string error reasons. Yes, the promise interface says you can use *anything* as your rejection reason, but your error-handling strategy should use a simple hierarchy of semantic error types.

If you use the same type of rejection as the successful type that resolves from the promise, the types are all compatible, and the compiler can’t help you. The most common case would be `Promise<string>` getting mixed up with a rejection string. Don’t be fooled into just thinking this is a string problem because it would happen whenever the reject and resolve types match in this way.

```typescript
if (isWorking) {
    resolve('a string'); // <-- a string
} else {
    reject('It Broke'); //  <-- also a string
}
```

The fix is to use rejection types based on the `Error` object.

## TypeScript Promises

Promises are fast becoming the de-facto pattern for async in TypeScript (and JavaScript) – so being disciplined about return type annotations and rejection types help you to win.