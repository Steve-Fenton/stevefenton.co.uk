---
layout: src/layouts/Default.astro
navMenu: false
title: 'Allowing array or rest parameters using overloads in TypeScript'
pubDate: 2013-11-06T10:06:42+00:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=487'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - TypeScript
---

I was busy working on a TypeScript class and needed a method that could take either an array, or a number of arguments using a rest parameter.

The idea was that rest parameters are the friendly way of accepting “any number of arguments”, but if someone had an existing array I didn’t want them to have to unpack to pass in the values.

So I originally came up with using a function overload to get this result:

```
class Example {
    test(...strArray: string[]);
    test(strArray: string[]);
    test(strArray: string[]) {
        alert(strArray.length.toString());
    }
}
```
TypeScript jumped in at this point and told me that the signatures were not compatible. What?! They are both string arrays right?

No – actually it isn’t quite that simple. When you use rest parameters, TypeScript generates code inside of the function body that converts the arguments list into an array and assigns it all to the argument. This code is only generated if the rest parameter appears on the implementation signature. [Thanks to Ryan Cavanaugh for that information](http://stackoverflow.com/questions/19759851/typescript-overload-signature-not-compatible-with-rest-and-array-overloads/)!

So given the problem of TypeScript not generating the mapping code, I added it in myself, which means it is possible to accept both rest parameters and an array using the same function:

```
class Example {
    test(...strArray: string[]);
    test(strArray: string[]);
    test(strArray: any) {
        if (arguments.length > 1) {
            var x= [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                x[_i] = arguments[_i + 0];
            }
            strArray = x;
        }
        alert(strArray.length.toString());
    }
}
var example = new Example();
example.test('aa', 'bb', 'cc');
example.test(['aa', 'bb', 'cc']);
```