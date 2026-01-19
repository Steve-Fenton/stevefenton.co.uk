---
title: Naming TypeScript custom type guards
navMenu: false
pubDate: 2020-05-12T15:22:16+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
description: Ensure TypeScript custom type guard names and return types accurately reflect the checks performed to avoid misleading consumers.
---

This is a super quick one. Be super-careful about how you name your custom type guards to stop consumers falling into a trap. Basically, the name you give a custom type guard *and* the return type you specify form a kind of promise that you have to be able to keep. Take this example:

```typescript
function isCheckbox(elem: HTMLElement | null): elem is HTMLInputElement {
    return elem != null && elem.hasAttribute('checked');
}

const elem = document.getElementById('example');

if (isCheckbox(elem)) {
    console.log(elem.value);
}
```

If we apply our lessons in logical reasoning from the critical thinking part of our philosophy education, we find a flaw in this statement.

```
All checkboxes have a checked attribute
This element has a checked attribute
Therefore this element is a checkbox
```

Not only does a checkbox not necessarily have a checked attribute (i.e. when it is not checked, the attribute may be entirely absent), it is also true that other elements might have a checked attribute, even though they are not checkboxes.

A good example for this would be:

```
All swans have white feathers
This bird has white feathers
Therefore this bird is a swan
```

You can see that the first statement is wrong, because Cygnus Atratus has black feathers.

The last statement is also wrong, because a bird with white features may in fact be on of many birds, such as Anserini.

## Keep The Explicit Promise

The first problem in our example is that having a `checked` attribute doth not an `HTMLInputElement` make. Yet our code promises to determine if the element is an input. If we want to keep our promise, we need to check the element type.

```typescript
function isCheckbox(elem: HTMLElement | null): elem is HTMLInputElement {
    return elem != null
        && elem.tagName === 'INPUT';
}

const elem = document.getElementById('example');

if (isCheckbox(elem)) {
    console.log(elem.value);
}
```

We now satisfy the explicit promise `elem is HTMLInputElement`.

## Keeping the Implicit Promise

The second problem is that our type guard is called “isCheckbox”. Once again, the test *does not guarantee that we have a checkbox*.

There are two solutions to this. First and foremost is that in many cases, you should rename the type guard to make the implicit promise correct.

```typescript
function isInputElement(elem: HTMLElement | null): elem is HTMLInputElement {
    return elem != null
        && elem.tagName === 'INPUT';
}

const elem = document.getElementById('example');

if (isInputElement(elem)) {
    console.log(elem.value);
}
```

Your second option, once you are sure the first option doesn’t solve your problem, is to keep the implicit promise in your type guard.

```typescript
function isCheckbox(elem: HTMLElement | null): elem is HTMLInputElement {
    return elem != null
        && elem.tagName === 'INPUT'
        && elem.getAttribute('type') === 'checkbox';
}

const elem = document.getElementById('example');

if (isCheckbox(elem)) {
    console.log(elem.value);
}
```

## Honest Type Guards

We now have two tools available to make sure the promises made by type guards can be kept.

Making sure the explicit promise in the function declaration is being satisfied, and making sure the implicit promise in the name is being satisfied.