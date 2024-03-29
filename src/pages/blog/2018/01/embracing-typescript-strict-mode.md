---
title: 'Embracing the TypeScript strict mode'
navMenu: false
pubDate: 2018-01-30T08:50:06+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

TypeScript has had the `strict` compiler option for a while now. It enables several more stringent checks, including two of my favourites: `noImplicitAny` and `strictNullChecks`. My summary of strict mode would be this…

> If using TypeScript is better than using plain JavaScript because of the compiler warnings, why wouldn’t you want to turn the compiler warnings dial up to ten?

Note: I have generalised some of my thoughts about TypeScript types under the phrase “honest code”. This article concerns honest code when working with DOM queries. I have another article that talks about [using TypeScript types honestly](/blog/2018/02/apply-typescript-types-honestly/).

## Strict mode and DOM

Let’s look at a real example. This is perfectly valid, error-free TypeScript code; until we switch on strict mode.

```typescript
const elem = document.getElementById('test');

elem.innerHTML = 'Hello World';
```

With strict mode enabled, we are warned that `elem` *could* be null. The type in chancy mode is `HTMLElement`, but in strict mode it is `HTMLElement | null`. In actual fact, any query for a DOM element could be null. So TypeScript can highlight all of the instances in our web application that touch a potentially null DOM element… eliminating this exception from the browser console.

## Don’t assert

As you can see from this example, we now have an error – but the error is also correct. If you have chosen strict mode, you ought to avoid defeating the helpful warning using a type assertion. Although this will make the code compile (by over-ruling the compiler), it won’t make the code work.

```typescript
// The way of the error!
const elem = <HTMLElement> document.getElementById('test');

elem.innerHTML = 'Hello World';
```

You might also be tempted to use a type assertion to narrow the type from `HTMLElement` to a specific kind of element, such as `HTMLInputElement`. There is more on that below, but the answer is still “don’t assert”.

## Type guard

A better fix would be to use a simple type guard, which you can also use to take action if the element doesn’t exist:

```typescript
const elem = document.getElementById('test');

if (elem) {
    elem.innerHTML = 'Hello World';
} else {
    // maybe you need to create an element, or log to your instrumentation
}
```

Inside of the if-statement, the compiler knows that `elem` definitely isn’t null, so the warning is gone.

## Element types

This also leads on to a similar common case, which is that many DOM queries give you a plain element, when you want a more specific one. For that, you can introduce a custom type guard, which will narrow the type from `HTMLElement | null` to the specific element of your choice. The example below demonstrates how to do this for the `HTMLInputElement`.

```typescript
function isInputElement(elem: HTMLElement | null): elem is HTMLInputElement {
  if (!elem) {
    // null
    return false;
  }

  return (elem.tagName === 'INPUT')
}
```

We can now update our original example to narrow using this custom type guard.

```typescript
const elem = document.getElementById('test');

if (isInputElement(elem)) {
    elem.value = 'Hello World';
} else {
    // maybe you need to create an element, or log to your instrumentation
}
```