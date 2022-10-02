---
layout: src/layouts/Default.astro
navMenu: false
title: 'TypeScript index signatures are not type checked'
pubDate: 2017-11-28T21:11:21+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - typescript
---

TypeScript index signatures are not type checked (as you would expect). This problem was spotted by Clint Kennedy and having taken a thorough look into it… he’s right.

When you try to create an indexer, the compiler will force you to specify that the key is either a `string` or a `number`. You can’t use any other type… not even a type alias for one of these types. So a typical TypeScript index signature might look like this (where the key is a number):

```
const dictionary: { [key: number]: string } = {};
```
And if not, it probably looks like this (where the key is a string):

```
const dictionary: { [key: string]: string } = {};
```
### Type checking for index signatures

Given that you have to specify *either* `string` or `number`, you might then expect the TypeScript compiler to ensure that all uses specify a key of the correct type. I certainly fell into this trap! But take a look at these examples.

```
const dictionary: { [key: number]: string } = {};

dictionary[0] = 'test';
dictionary['str'] = 'test';
```
There are no errors in that example. The compiler is happy with both strings and numbers as keys, even though you said you wanted numbers.

Things are much the same in this example, which allows strings and numbers where the key is a string.

```
const dictionary: { [key: string]: string } = {};

dictionary[0] = 'test';
dictionary['str'] = 'test';
```
So, even though the compiler says you have to specify *either* `string` *or* `number`… it makes no practical difference which one you use, because it allows strings and numbers anyway.

This feels very strange, because you can’t be honest about this with a union type.

```
// Error: Index type must be string or number...
const c: { [key: string | number] } = {};
```
Why do we have to choose when it makes no difference?

As an aside, in a quest to make myself feel better about this example, I tried to create an “honest type” to use, so at least in name this would *feel* like a version of the truth. The compiler says no.

```
type indexerKey = string;

// Error: Index type must be string or number...
const dictionary: { [key: indexerKey]: string } = {};
```
### How to guarantee key types

Okay. I get it – if you put something in `dictionary[0]` and retrieve it from `dictionary[0]` it makes no difference whether it is a string or a number. Most of the time, dictionary access is based on the fact that your key is coming from *somewhere else*. The pattern is often deployed to handle the case of some external string being mapped to something concrete in our code.

However, sometimes you want to be more strict. In those cases, you need to deploy a class. This is the most sparse implementation of a `Dictionary` class that enforces the key type. So if you want something *like* a TypeScript index signature, but with type checking on the keys you can use…

```
class Dictionary<TKey extends string|number, TValue> {
    private items: { [key: string]: TValue } = {};

    get(key: TKey) {
        return this.items[<any>key];
    }

    set(key: TKey, value: TValue) {
        this.items[<any>key] = value;
    }

    containsKey(key: TKey) {
        return (typeof this.items[<any>key] !== 'undefined');
    }
}

const dictA = new Dictionary<string, string>();
dictA.set(0, 'test'); // Error
dictA.set('str', 'test');

console.log(dictA.get('str'));

const dictB = new Dictionary<number, string>();
dictB.set(0, 'test');
dictB.set('str', 'test'); // Error

console.log(dictB.get(0));
```
### Summary

So you can create your own type to give you strict type checking of keys, although it isn’t exactly the same as an index signature (because you have to wrap it within a class).