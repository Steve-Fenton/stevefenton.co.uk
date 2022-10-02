---
layout: src/layouts/Default.astro
navMenu: false
title: 'Let there be block scope'
pubDate: 2014-03-07T22:38:06+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=382'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - javascript
---

As we all know, JavaScript is functionally scoped. No matter where you declare a variable within a function, it is hoisted to the top of that function and can be accessed anywhere inside of the function.

This is the source of a few surprises for programmers who are used to controlling scope with curly-braces.

```
<pre class="prettyprint lang-javascript">function scopeExample() {      
    scope = 'I am the same as the variable inside the for loop;'
    for (var i = 0; i < 1; i++) {
        var scope = 'Anywhere inside scopeExample will do.';
    }
    // 'Anywhere inside scopeExample will do.'
    alert(scope);
}
```
In the above example, the scope variable is the same variable everywhere within the function – even though it is declared within the for-block. This is because we have no block scoping…

Except in ECMAScript 6 we do… but not using the “var” keyword (imagine if they changed how that worked – the whole World Wide Web would return undefined!)

To avoid the problems of changing the scoping rules for “var” variabled, ECMAScript 6 introduces the (invented by Firefox) “let” keyword. Here is the updated example…

```
<pre class="prettyprint lang-javascript">function scopeExample() {      
    scope = 'You get me this time!'
    for (var i = 0; i < 1; i++) {
        let scope = 'You won\'t get me!';
    }
    // 'You get me this time!'
    alert(scope);
}
```
In this example, using “let” means that the scope variable inside of the for-loop is scoped to the for-loop. The alert no longer returns the value from within the for loop, but the value declared earlier. If that earlier scope variable didn’t exist, you’d get an error.

Of course, because there is no longer a “var” keyword to be hoisted to the top of the function, the first “scope” variable, which has neither “let” nor “var” before it is an implicit global! Watch out for that one.

So here is another example with less confusing variables… In this example you can see that scope isn’t defined because the “let” keyword was used.

```
<pre class="prettyprint lang-javascript">function scopeExample() {      
    for (var i = 0; i < 1; i++) {
        let scope = 'You won\'t get me!';
    }
    // Uh-oh... scope is not defined (brilliant!)
    alert(scope);
}
```
So now we have block-level scoping when we want it… all we need now is some browser support!