---
title: 'The JavaScript NIFE Pattern'
navMenu: false
pubDate: 2017-05-19T16:04:30+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - IIFE
    - JavaScript
    - NIFE
---

Most JavaScript developers are very familiar with the Immediately Invoked Function Expression (IIFE):

```javascript
(function () {
    var x = 'loaded';
    console.log(x);
}());
```

In this expression, we create a function that wraps all the enclosed code in its scope, and at the end we execute the function with the parentheses.

If you aren’t super-careful though, you may end up implementing the Never Invoked Function Expression pattern (NIFE):

```javascript
(function () {
    var x = 'loaded';
    console.log(x);
});
```

In this example, the ommission of the fantastically important parentheses `()` on the final line of code means the enclosed code will never ever run.

This is one of the most common errors in IIFE usage, and results in a deluge of questions such as “why does my JavaScript not execute”.