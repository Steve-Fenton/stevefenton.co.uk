---
title: 'A quick JavaScript scope lesson'
navMenu: false
pubDate: 2011-09-22T17:46:03+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
---

## Lesson 1 – Global and Local

In this example, we first create a local variable called “scope”. This is available everywhere. We then create a function called “myObject” and declare another variable called “scope”. This is local to the function and overrides the global one.

If we get the value of scope from inside the function, we will get the local variable value (2), but everywhere else we get the global variable value (1)

```javascript
var scope = 1;
var myObject = function () {
    var scope = 2;
    alert("B: " + scope);
};
alert("A: " + scope);
myObject();
```

## Lesson 2 – Objects With Properties

The reason we called our function “myObject” is because we use functions as objects in JavaScript. In this updated example we have our global variable called “scope”, our local variable called “scope” and we also set “this.scope”, which is a property on “myObject”.

As we can see from this example, the global and local variables work just like before, with our new “this.scope” acting like a publicly accessible property on our object.

```javascript
var scope = 1;
var myObject = function () {
    var scope = 2;
    this.scope = 3;
    alert("B: " + scope);
};
var x = new myObject();
alert("A: " + scope);
alert("C: " + x.scope);
```

So if you want to have a “private” variable for your object that can only be accessed by the object, use the “var” keyword to define a local variable that can only be accessed within the scope of the function. If you want a public property, use the “this” keyword to add it as a property of your function that can be accessed publicly.

## Lesson 3 – Block Scope

Check out a new feature in JavaScript that didn’t exist at the time of writing… [JavaScript block scope](/blog/2014/03/let-there-be-block-scope/)!