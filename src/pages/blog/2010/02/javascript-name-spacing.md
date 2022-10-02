---
layout: src/layouts/Default.astro
navMenu: false
title: 'JavaScript Namespacing'
pubDate: 2010-02-03T22:11:14+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1059'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - javascript
---

This is just a quick article to demonstrate a quick bit of JavaScript namespacing.

Why would you do this? Well, this allows you to put functions and variables inside of an identifier. It acts like a “box of stuff” and prevents variable and function name conflicts. It also supplies a neat way to organise and access your code in logical blocks.

If you’re interested, here’s how you do it.

```
<pre class="prettyprint lang-javascript">
var MyNamespace = (function() {
    var myPrivateVariable = 'Private Variable';
   
    var myPrivateFunction = function () {
        return 'Private Function';
    }
   
    return {
        myPublicVariable: 'Public Variable',
        sayHello: function (name) {
            alert('Hello ' + name + '!');
        },
        sayGoodbye: function (name) {
            alert('Goodbye ' + name + '!');
        },
        publicFunction: function () {
            alert(this.myPublicVariable + ' ' +
                myPrivateFunction() + ' ' +
                myPrivateVariable)
        }
    };
}());

MyNamespace.sayHello('Steve');
MyNamespace.sayGoodbye('John');
MyNamespace.publicFunction();
```
Obviously, in this example it’s all a bit basic, but if you had JavaScript functions that you’d like to group together, this is a great way to do it – not a genuine name-space, but some distance towards organising your code.