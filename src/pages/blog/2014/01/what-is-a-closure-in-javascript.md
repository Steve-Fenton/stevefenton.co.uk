---
layout: src/layouts/Default.astro
title: 'What is a closure in JavaScript'
navMenu: false
pubDate: 2014-01-13T23:23:13+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
---

If you want to sound like an expert in JavaScript, you only need a couple of phrases to hand. Using [scope](/blog/2011/09/a-quick-javascript-scope-lesson/), closure, [protoype and revealing modules](/blog/2013/12/javascript-prototype-vs-revealing-module-pattern/) will get you a long way without any need to prove you know what you are talking about. Largely, this is due to either a lack of understanding of these terms, or misunderstandings about them.

So here is the back-up information for those who want to know what a closure is in JavaScript.

A closure refers to a function that requires access to data outside of its local scope.

What this means is, if you have a function that accesses a variable outside of its immediate lexical scope, the interpreter will really cleverly keep a hold of the value of that variable in the right context. When you use it, the value will be what you would expect it to be.

Here’s some code.

```javascript
var example = function () {
    var myVariable = 4;
    var innerFunction = function () {
        return myVariable + 5;
    };
};
```

The variable, myVariable, really belongs to the example function. JavaScript is functionally-scoped, which means you cannot access myVariable outside of the example function. The nested function, though, is inside of the example function – so it can use myVariable.

When this code runs, a closure is created in order to store the “referencing environment” (which contains myVariable) along with the function so you can safely use it.

This becomes more relevant when you consider a function that returns another function.

```javascript
var example = function () {
    var myVariable = 4;
    var innerFunction = function () {
        return myVariable + 5;
    };
    return innerFunction;
};
var returnedFunction = example();
```

This is where the closure starts to earn some serious respect. When you use returnedFunction(), it has the referencing environment that contains myVariable and its value (which is still 4 in this case).

Now consider a prototype-based instance that returns functions that have the instance data available… and you can see what a powerful and useful feature this is.