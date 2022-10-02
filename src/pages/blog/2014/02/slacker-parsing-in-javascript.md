---
layout: src/layouts/Default.astro
navMenu: false
title: 'Slacker parsing in JavaScript'
pubDate: 2014-02-15T23:00:40+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=406'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - javascript
    - typescript
---

This is a really quick introduction to *Slacker Parsing* in JavaScript. Slacker Parsing involves the use of operators rather than conversion methods to change the type of a variable.

### Slacker Numbers

For example, the correct way to convert a string to a number in JavaScript is to use the parseInt function – not forgetting to tell the parseInt function that you are working with decimal numbers. The example below shows a classic parseInt scenario…

```
<pre class="prettyprint lang-javascript">
var str = '52';
var num = parseInt(str, 10);
alert(typeof num + ' ' + num);
```

In the above chunk of code, you end up with “number 52” being chucked into the alert dialog. Yay. Now here is the slacker parsing version, which can be used instead of parseInt or parseFloat if you have a string containing a valid number.

```
<pre class="prettyprint lang-javascript">
var str = '52';
var num = +str;
alert(typeof num + ' ' + num);
```

In this example, we just use the + operator. JavaScript will juggle the type to work with the operator and you’ll end up with a number, just like if you used parseInt. Well, not exactly like that… The + operator doesn’t care whether we are after an integer or a float, it just knows we need a number. The + operator also fails for strings that aren’t proper floats, like ’52.A65′. This can sometimes be a good thing as parseFloat results in “number 52”, which also isn’t what we want.

| str | parseInt | parseFloat | + |
|---|---|---|---|
| ’52’ | 52 | 52 | 52 |
| ‘52.65’ | 52 | 52.65 | 52.65 |
| ’52.A65′ | 52 | 52 | NaN |

### Slacker Booleans

If you want to convert something to a boolean, you normally have to test it, as per the below example, which is a common way of mapping a bit to a Boolean using 0 for false, and 1 for true:

```
<pre class="prettyprint lang-javascript">
var num = 1;
var bool = num === 1;
alert(typeof bool + ' ' + bool);
```

So in the above example we end up with “boolean true”. But if we bear in mind the rules of *truthy* and *falsey* we can double-bang our way using the slacker parsing version.

```
<pre class="prettyprint lang-javascript">
var num = 1;
var bool = !!num;
alert(typeof bool + ' ' + bool);
```

The double bang (!!) basically means “NOT NOT”, which converts the value to a boolean and keeps it from being inverted.

A useful variation of this is rather obtuse but entirely fun BANG! BANG! WIGGLE!, which Robert pointed out to me. This can be used to coerce the result of an indexOf call into a boolean:

```
<pre class="prettyprint lang-javascript">
var value = 'test';
var containsE = !!~value.indexOf('e');
```