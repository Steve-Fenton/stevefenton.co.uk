---
id: 2851
layout: src/layouts/Default.astro
title: 'TypeScript Mighty Morphing Mapped Types'
pubDate: 2017-11-16T07:00:37+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=2851'
permalink: /2017/11/typescript-mighty-morphing-mapped-types/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"346016f075c8";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/346016f075c8";}'
categories:
    - Programming
tags:
    - typescript
---

Mapped types are an advanced type in TypeScript that lets you create a variation of another existing type. The basic example of a mapped type is demonstrated with the `Readonly` type below. This type takes whatever type is passed as a type argument, and returns a similar type, with each member being readonly.

```
<pre class="prettyprint lang-typescript">type Readonly = {
    readonly [P in keyof T]: T[P];
}
```

All mapped types look essentially like this example, but remove the `readonly` keyword and make some other use of the property `P` in the type `T`.

This is all only moderately exciting, but wait for a minute and we’ll build up to some more interesting applications. But first, there are some handy built-in mapped types you can use.

### Built-In Mapped Types

There are two very useful built-in mapped types, the first is `Partial`, which will give you back the weak version of any type (weak types are types that don’t require anything, for example empty types, or types where all members are optional). The second is the `Readonly` type we have already looked at.

```
<pre class="prettyprint lang-typescript">
type Address = {
    houseNumber: number,
    street: string,
    town: string,
    postCode: string
};

// All properties are optional
type WeakAddress = Partial<Address>;

// All properties are read-only
type ReadOnlyAddress = Readonly<Address>;
```

Whilst we’re talking about built-in read-only types, let’s quickly look at the `ReadonlyArray` type, which prevents operations that would modify the array:

```
<pre class="prettyprint lang-typescript">let a: Array = [1, 2, 3];
a.push(4); // ok
a[0] = 10; // ok
console.log(a.pop()); // ok
console.log(a.shift()); // ok

let b: ReadonlyArray = [1, 2, 3];
b.push(4); // no
b[0] = 10; // no
console.log(b.pop()); // no
console.log(b.shift()); // no
```

If you aren’t using this read-only array type yet… I’m pretty sure there are a ton of uses for it in your application.

### Mapped Types for String Literal Types

Now let’s look at something a bit more tricksy, but much more interesting. The next example creates a mapped type that will reduce a string literal type by removing items that are found in a second string literal type. In the example below, you can create a type that includes all cats that are not also foods, or all foods that are not also cats. What it can’t do is explain why people name cats after food.

```
<pre class="prettyprint lang-typescript">
type Remove<T extends string, U extends string> = ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T];

type Cats = 'Pickle' | 'Izzy' | 'Alfie';
type Food = 'Cheese' | 'Pickle' | 'Crackers';

// 'Izzy' | 'Alfie'
type CatsThatAreNotFood = Remove<Cats, Food>;

// 'Cheese' | 'Crackers'
type FoodsThatAreNotCats = Remove<Food, Cats>;
```

The cat called *Pickle* won’t appear in `CatsThatAreNotFood` because it appears in the `Food` type. This works in reverse, as only *Cheese* and *Crackers* make the cut for `FoodsThatAreNotCats`.

Want to take it a step further, get a list that contains everything that only appears in just one of the types, or everything that appears in both types…

```
<pre class="prettyprint lang-typescript">
// 'Izzy' | 'Alfie' | 'Cheese' | 'Crackers'
type UniqueFoodAndCats = CatsThatAreNotFood | FoodsThatAreNotCats;

// 'Pickle'
type CatsThatAreFood = Remove<Cats | Food, UniqueFoodAndCats>;
```

So far, things are pretty typetastic. But we’re not even finished yet.

### Further Use of the Remove Type

The `Remove` mapped type can be further used to remove and replace properties on a type. To illustrate this, we’ll use an `Animal` type that has a string `id`. The `RemoveProperty` mapped type creates a new animal with no `id` and the `ReplaceProperty` mapped type replaces the `id` with a numeric one.

```
<pre class="prettyprint lang-typescript">
type RemoveProperty<T, K extends keyof T> = { [P in Remove<keyof T, K>]: T[P] };
type ReplaceProperty<T, U> = { [P in Remove<keyof T, keyof U>]: T[P] } & U;

// { id: string, name: string, species: string }
type Animal = { id: string, name: string, species: string };

// { name: string, species: string }
type AnimalWithoutId = RemoveProperty<Animal, 'id'>;

// { id: number, name: string, species: string }
type AnimalWithNumericId = ReplaceProperty<Animal, { id: number }>;
```

### What the Map?!

All the examples used a simple “type”, but mapped types work with types, interfaces, classes, or even inline types. [Beware of basing types on classes though; you can break the stable abstractions principle](https://www.stevefenton.co.uk/2017/11/typescript-using-classes-interfaces/).