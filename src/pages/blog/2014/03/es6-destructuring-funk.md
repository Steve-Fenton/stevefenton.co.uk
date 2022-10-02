---
id: 374
title: 'ES6 destructuring funk'
pubDate: '2014-03-17T22:30:39+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=374'
permalink: /2014/03/es6-destructuring-funk/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - javascript
---

Destructuring in JavaScript (coming is ES6 / Harmony (attempt 2)) allows you to break apart stuff, for example you can destructure an array into plain variables.

For example, you can positionally allocate values to variable names using the following code.

```
<pre class="prettyprint lang-javascript">var [name, , iq] = ['Steve', 'Fenton', 152];

// 'Steve 152'
alert(name + ' ' + iq);
```

The first element ends up in the name variable, the second is ignored (I left it blank as an example) and the third is allocated to the iq variable.

You can also do this with objects, instead of working with positions, you can work with the names, thus:

```
<pre class="prettyprint lang-javascript">var {lastName, iq} = {firstName: 'Steve', lastName: 'Fenton', iq: 152};
// 'Fenton 152'
alert(lastName + ' ' + iq);
```

When you use destructuring, you don’t get an error when something doesn’t exist – the variable just ends up with an undefined value, for example in this case where the object doesn’t contain a property named “modesty”.

```
<pre class="prettyprint lang-javascript">var {lastName, modesty} = {firstName: 'Steve', lastName: 'Fenton', iq: 152};
// 'Fenton undefined'
alert(lastName + ' ' + modesty);
```

Incidentally, I decided *not* to form a band based on this example, even though Steve 152 would have obviously been the best band ever.