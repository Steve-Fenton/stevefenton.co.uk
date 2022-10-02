---
layout: src/layouts/Default.astro
navMenu: false
title: 'JavaScript Constructors are Just Functions'
pubDate: 2010-07-28T21:00:11+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1016'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - javascript
---

I was recently asked a question about JavaScript constructors, which highlighted to me that this statement isn’t as well known as it ought to be:

> JavaScript Constructors are Just Functions!

There is absolutely no difference between the two, except how you use them. It’s a bit like a pencil. In my hands it is a writing and drawing instrument, but to some people I know it’s a device for removing ear-wax.

So here are some examples to back up the statement. Firstly, a function…

```
<pre class="prettyprint lang-javascript">
function AddTwoNumbers(first, second) {
    return first + second;
}

// Use it as a function
var a = AddTwoNumbers(3, 5);

// Use it as a constructor
var b = new AddTwoNumbers(3, 5);
```

In this example, a will be equal to 8, but b will be a new object instance of “AddTwoNumbers”.

Obviously this is entirely useless behaviour. You should probably never write a dual function/constructor as it is no use to anyone, but the important thing to take away from this example is that a function is only ever a constructor when you call it with the “new” keyword.

Here is a more useful example where the variables passed to the constructor are stored as part of the object’s state, and then used when the `result` method is called.

```
<pre class="prettyprint lang-javascript">
function AddTwoNumbers(first, second) {
  this.first = first;
  this.second = second;
  return {
    result: function () {
      return first + second;
    }
  };
}

var b = new AddTwoNumbers(3, 5);

var c = b.result();
```