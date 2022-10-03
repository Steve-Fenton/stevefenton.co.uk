---
layout: src/layouts/Default.astro
navMenu: false
title: 'Invalid label JavaScript error'
pubDate: 2011-02-15T19:51:32+00:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=973'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - JavaScript
---

So I was busy refining my use of JavaScript immediate functions in order to use them like a namespace for functions and properties and I stumbled across one of the few cases where formatting matters in JavaScript.

Normally, whitespace really doesn’t matter very much as long as your syntax is tidy. If you want to wrap something over a few lines, no problem. If you want to put the whole world on a single line, no problem. As long as you don’t skip any semi-colons or other special characters, life is good.

Here is a quick example – all of these are identical as far as JavaScript is concerned.

```
<pre class="prettyprint lang-javascript">
function Example(name) { alert(name); }
// Is exactly the same as
function Example
(name)
{
    alert(
        name
    );
}
```
The second example is an extreme example just to demonstrate the point. In most cases, the formatting comes down to a couple of choices. Some people prefer to put their curly braces on a new line, other like the opening curly brace to be on the same line as the function (for example). On other occasions, people add new lines to make things more readable, like when a function accepts a lot of arguments or when instantiating a new array.

So here is an example of when this can all fall apart. The first example works… the second doesn’t. Can you spot the difference?

Working example:

```
<pre class="prettyprint lang-javascript">
var MyNamespace = (function() {
    return  {
        MyVariable : "Fenton",
        SayHello : function(name) {
            alert("Hello " + name + "!");
        },
        SayGoodbye : function(name) {
            alert("Message from " + this.MyVariable + " - Goodbye " + name + "!");
        }
    };
}());

MyNamespace.SayHello("Steve");
```
Broken example:

```
<pre class="prettyprint lang-javascript">
var MyNamespace = (function() {
    return  
    {
        MyVariable : "Fenton",
        SayHello : function(name) {
            alert("Hello " + name + "!");
        },
        SayGoodbye : function(name) {
            alert("Message from " + this.MyVariable + " - Goodbye " + name + "!");
        }
    };
}());

MyNamespace.SayHello("Steve");
```
The eagle-eyed among you will have noticed there is only one tiny change – the curly brace after the “return” keyword is on a new line. This actually causes an “invalid label” error in JavaScript. If you like your curly-braces on a new line, you are very likely to encounter this issue!

So if you ever get the “invalid label” error, check your curly braces and move them onto the same line as the return statement.

As an additional note, [JSLint](http://www.jslint.com/) does correctly pick up this error for you, so it is worth running your code past this excellent tool next time you get an odd error, such as this.