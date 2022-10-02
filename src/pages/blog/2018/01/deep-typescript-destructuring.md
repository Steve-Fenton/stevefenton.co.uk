---
id: 3298
title: 'Deep TypeScript destructuring'
pubDate: '2018-01-25T08:45:29+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=3298'
permalink: /2018/01/deep-typescript-destructuring/
categories:
    - Programming
tags:
    - typescript
---

When you first encounter TypeScript (or JavaScript) destructuring it looks a little bit magic, especially in object destructuring where it looks like you are doing everything in a mirror (the names go on the right!). If you find destructuring a little confusing – strap yourselves in and we’ll rush our way to an example of deep destructuring.

### Array destructuring

If you want to get some items out of an array, you might write code that gets items from specific locations and maps them into a variable, like this:

```
<pre class="prettyprint lang-typescript">
const arr = [1, 1, 2, 3, 5, 8];

const a = arr[0];
const b = arr[1];
const c = arr[2];
```

This is especially common if you are using tuple types somewhere, as you want to extract the unnamed tuple values into well named variables pretty quickly in most cases.

You can reduce the amount of code you need to do this with a bit of array destructuring. The following code results in an identical outcome to the first example, variables `a=1, b=1, c=2`:

```
<pre class="prettyprint lang-typescript">
const arr = [1, 1, 2, 3, 5, 8];

const [a, b, c] = arr;
```

There are also a couple of neat tricks you can apply here.

#### The rest

Consider an example where you want to extract a couple of items, and then dump everything else into an `others` array:

```
<pre class="prettyprint lang-typescript">
const arr = [1, 1, 2, 3, 5, 8];

const a = arr[0];
const b = arr[1];
const others = arr.slice(2);
```

Once again, we can write less with destructuring, using a simple rest variable to grab everything else. In both cases, `others` contains `2, 3, 5, 8`:

```
<pre class="prettyprint lang-typescript">
const arr = [1, 1, 2, 3, 5, 8];

const [a, b, ...others] = arr;
```

#### Skipping

And the other important trick is that you can skip items, so if you don’t want the first one:

```
<pre class="prettyprint lang-typescript">
const arr = [1, 1, 2, 3, 5, 8];

const a = arr[1];
const b = arr[2];
const c = arr[3];
```

You can omit the name and effectively skip it (you can leave out items in any position):

```
<pre class="prettyprint lang-typescript">
const arr = [1, 1, 2, 3, 5, 8];

const [, a, b, c] = arr;
```

### Object destructuring

Object destructuring is similar (but remember that if you want to rename a property, your variable names are on the right, not the left). Here is the typical example of manual mapping:

```
<pre class="prettyprint lang-typescript">
const obj = {
  title: 'An object',
  description: 'Demonstrates some code.',
  category: 'Example'
}

const title = obj.title;
const description = obj.description;
```

And here is the destructuring version:

```
<pre class="prettyprint lang-typescript">
const { title, description } = obj;
```

And the version where we specify new variable names, rather than reusing the property names:

```
<pre class="prettyprint lang-typescript">
const obj = {
  title: 'An object',
  description: 'Demonstrates some code.',
  category: 'Example'
}

const { title: newTitle, description: newDescription } = obj;
```

This last example creates new variables named `newTitle` containing `obj.title`, and `newDescription` containing `obj.description`.

Rest variables work just the same in object destructing as they do in array destructuring; they put everything else into the rest variable.

### Deep object destructuring

Consider this trickier example – we have a nested object that we want to get a `title` and `description` from:

```
<pre class="prettyprint lang-typescript">
const obj = {
  title: 'An object',
  meta: {
    description: 'Demonstrates some code.',
    category: 'Example'
  }
}

const title = obj.title;
const description = obj.meta.description;
```

This doesn’t stop us from destructuring the values from the deep structure, we just need to mimic the nesting when we destructure:

```
<pre class="prettyprint lang-typescript">
const obj = {
  title: 'An object',
  meta: {
    description: 'Demonstrates some code.',
    category: 'Example'
  }
}

const { title, meta: { description } } = obj;
```

And you can still provide new variable names if you want to:

```
<pre class="prettyprint lang-typescript">
const obj = {
  title: 'An object',
  meta: {
    description: 'Demonstrates some code.',
    category: 'Example'
  }
}

const { title: newTitle, meta: { description: newDescription } } = obj;
```