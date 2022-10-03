---
layout: src/layouts/Default.astro
navMenu: false
title: 'The for loop hangover in foreach land'
pubDate: 2018-04-13T08:50:01+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - C-Sharp
    - JavaScript
---

If you are a curly-braces programmer of a certain vintage, you will have done this a great deal in the past.

```
<pre class="prettyprint lang-javascript">
for (let i = 0; i < shoes.length; i++) {
    const shoe = shoes[i];

    // Your actual code here
}
```
This was preferable to referencing the janky `shoes[i]` within the loop, when “shoe” is a better name.

However, most languages now support for-each loops, even if it is in some strange way like `for (... of ...)`.

That means we can loop and name in a single pass. Like this C# example.

```
<pre class="prettyprint lang-csharp">
foreach(var shoe in shoes) {
    // Your actual code here
}
```
But you can tell the programmers who have been around since before for-each, because they sometimes do this:

```
<pre class="prettyprint lang-csharp">
foreach(var shoe in shoes) {
    var s = shoe;

    // Your actual code here
}
```
They have, possibly out of habit, assigned the item to a variable inside the loop. This is a bad thing, because one of the two variables that you have created to represent a shoe won’t be named “shoe”. That means you have achieved the opposite of what this technique originally intended; give the variable a better name. Now it can happen either way around, but no matter which one you name badly you end up with a badly named variable. So the next time you write a for-each loop, don’t rename the variable with an additional assignment.