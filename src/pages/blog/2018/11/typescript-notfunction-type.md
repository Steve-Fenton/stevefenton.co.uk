---
title: 'TypeScript NotFunction type'
navMenu: false
pubDate: 2018-11-24T12:09:48+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
description: Creates a `NotFunction<T>` type using conditional types to exclude functions from being assigned to a variable.
---

I have been working out how to create a TypeScript NotFunction type for a while, in response to a Stack Overflow question. With the arrival of conditional types, I think there may be a way. It’s not perfect – but it does work.

The type works by taking all possible types and converting the type to `never` if it extends the `Function` type.

```typescript
type NotFunction<T> = T extends Function ? never : T;
```

You can use this type to enforce “anything except functions” as shown below:

```typescript
const x: NotFunction<typeof myVariable> = myVariable;
```

Here is a full working example:

```typescript
type NotFunction<T> = T extends Function ? never : T;

const aFunction = (input: string) => input;
const anObject = { data: 'some data' };
const aString = 'data';

// Error: Functions aren't assignable to "never"
const x: NotFunction<typeof aFunction> = aFunction;

// OK
const y: NotFunction<typeof anObject> = anObject;
const z: NotFunction<typeof aString> = aString;
```

You also get compiler assistance if you accidentally use a different type on the left-hand and right-hand side of the expression (which is possible due to having to repeat yourself):

```typescript
// Error: string and function aren't assignable
const x: NotFunction<typeof aString> aFunction;
```