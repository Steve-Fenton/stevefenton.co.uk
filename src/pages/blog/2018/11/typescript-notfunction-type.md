---
layout: src/layouts/Default.astro
navMenu: false
title: 'TypeScript NotFunction type'
pubDate: 2018-11-24T12:09:48+00:00
authors:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:11:"e6ed852e0a7";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:50:"https://medium.com/@steve.fenton.co.uk/e6ed852e0a7";}'
categories:
    - Programming
tags:
    - typescript
---

I have been working out how to create a TypeScript NotFunction type for a while, in response to a Stack Overflow question. With the arrival of conditional types, I think there may be a way. It’s not perfect – but it does work.

The type works by taking all possible types and converting the type to `never` if it extends the `Function` type.

```
type NotFunction<T> = T extends Function ? never : T;
```
You can use this type to enforce “anything except functions” as shown below:

```
const x: NotFunction<typeof myVariable> = myVariable;
```
Here is a full working example:

```
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

```
// Error: string and function aren't assignable
const x: NotFunction<typeof aString> aFunction;
```