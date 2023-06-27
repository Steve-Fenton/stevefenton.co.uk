---
title: 'TypeScript Dictarray options'
navMenu: false
pubDate: 2018-11-14T09:21:48+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

This is one of those cases where a question keeps cropping up, so lots of people are trying to do something that the TypeScript Compiler doesn’t like very much. Yes, it’s time to talk about the TypeScript Dictarray!

What’s a Dictarrary? It’s a dictionary that’s also an array. You know… one of these:

```typescript
const dictarray = [];
dictarray[0] = 'My string';
dictarray['key'] = 'My other string';

console.log(dictarray[0], dictarray['key']);
```

You see, it’s both an array with index numbers, and a dictionary of key/value pairs. But how do you create a type that represents this Dictarray? The following doesn’t work (and is the example that keeps cropping up… “why doesn’t TypeScript like my Dictarray interface?”

```typescript
interface Dictarray extends Array<string> {
    [index: number]: string;
    // Error - because of conflicts
    [key: string] : string;
}

const dictarray = [] as Dictarray;
dictarray[0] = 'My string';
dictarray['key'] = 'My other string';

console.log(dictarray[0], dictarray['key']);
```

The error is actually quite sensible. If you have an array type it contains members like `forEach` that doesn’t conform to your string keyed types: `[key: string] : string;`

Despite this, using the type kinda works, as shown in this example….

```typescript
interface Dictarray extends Array<string> {
    [index: number]: string;
    // Error - because an array contains keyed members that conflict with this
    [key: string] : string;
}

const dictarray = [] as Dictarray;
dictarray[0] = 'My string';
dictarray['key'] = 'My other string';

// Error! 1 is not a string
dictarray[1] = 1;

// Error! 2 is not a string
dictarray['key2'] = 2;

// a inferred a string
const a = dictarray[0];

// b inferred a string
const b = dictarray['key'];

console.log(dictarray[0], dictarray['key']);
```

All the type checking and inference above works. It errors when I try to assign numbers. It infers the correct type when I pull things out.

I’m tempted to supress the error using a [TypeScript Error Supression Comment](/blog/2017/11/dont-use-typescript-error-suppression-comments/):

```typescript
interface Dictarray extends Array<string> {
    [index: number]: string;
    // @ts-ignore: I'm creating a Dictarray!
    [key: string] : string;
}
```

If you are absolutely determined to create a Dictarray, this is probably the simplest way to do it. It might get knocked about by future versions of TypeScript, but it works today.

Alternatively, you could keep your stuff separate. Do you really need it all stuffed together so tightly?

```typescript
interface Dictarray {
    items: string[],
    dictionary: { [key: string]: string; }
}

const dictarray: Dictarray = {
    items: [],
    dictionary: {}
};

dictarray.items[0] = 'My string';
dictarray.dictionary['key'] = 'My other string';

console.log(dictarray.items[0], dictarray.dictionary['key']);
```

For those wot must… here is the actual Dictarray interface and example use!

```typescript
interface Dictarray<T> extends Array<T> {
    [index: number]: T;
    // @ts-ignore: I'm creating a Dictarray!
    [key: string]: T;
}

const dictarray = [] as Dictarray<string>;
```

So you can solve the problem in a couple of different ways. Choose wisely.