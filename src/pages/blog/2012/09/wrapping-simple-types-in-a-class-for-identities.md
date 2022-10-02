---
layout: src/layouts/Default.astro
navMenu: false
title: 'Wrapping simple types in a class for identities'
pubDate: 2012-09-04T00:14:08+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=750'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - ddd
---

This is something I discovered when looking through some code I inherited from someone and I had to investigate it to work out why it existed. You may have already come across something similar, in which case you will know the answer to this question: Which of these is better?

```
<pre class="prettyprint lang-csharp">
public Person GetPerson(int personId) {
```
Or

```
<pre class="prettyprint lang-csharp">
public Person GetPerson(PersonId personId) {
```
My initial thoughts were, why wrap an int in an object and make your life harder. But then the benefits of this approach began to win me over.

The first benefit to this approach is that it stops you from making a stupid mistake. It turns a massive cock up into a simple compiler error. This isn’t an uncommon mistake:

```
<pre class="prettyprint lang-csharp">
var person = GetPerson(company.ProfileId);
```
So some developer accidentally accepted the wrong autocompletion suggestion and used `ProfileId` instead of `PersonId`. They are both ints, so it all compiles. The only problem is that at runtime, weird stuff happens. This is not the simplest bug to track down, especially when at first the test data might not even show it (with a small set of test data, it is conceivable that the `ProfileId` would coincidentally be the same as the `PersonId` in a particular test scenario).

By enforcing a type of identifier, we would get a compiler error stating that `ProfileId` cannot be implicitly converted into a `PersonId`, we would fix it then and there and life would be great.

There are other benefits too.

When you get the 2,147,483,648th Person in your system and need to switch from Int32 to Int64 (or to an unsigned Int32 or a Guid or a string – that discussion is for another day) – you only need to change your `PersonId` class and whatever maps to it. You don’t need to chase parameters throughout your system to update them all.

This technique doesn’t just apply to identities. Consider situations where you are passing simple types that may cause confusion. For example, if you are passing width, height and depth to a method would it be better to have an object that represents this set of parameters that will make it more readable and less error prone:

```
<pre class="prettyprint lang-csharp">
var table = new Table(200, 300, 240);
```
Or:

```
<pre class="prettyprint lang-csharp">
var dimensions = new Dimensions {
    width: 200,
    height: 300,
    depth: 240
};
var table = new Table(dimensions);
```
So next time you are creating a domain object, consider also creating the identity as an object also and avoid using the simple type throughout your system. This concept is common in Domain Driven Design and with these benefits you can see why it is worth sticking the extra objects on the heap.