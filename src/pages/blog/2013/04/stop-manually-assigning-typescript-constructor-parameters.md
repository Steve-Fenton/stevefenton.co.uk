---
layout: src/layouts/Default.astro
navMenu: false
title: 'Stop manually assigning TypeScript constructor parameters'
pubDate: 2013-04-15T15:13:19+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=617'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - typescript
---

TypeScript is great – but it is different to other languages. It is worth spending a little time learning the differences, especially when it comes to the differences between JavaScript and TypeScript and the differences between C#, Java, and TypeScript.

One difference that I really like is automatic assignment of constructor parameters to the relevant property. So here is an example of some TypeScript code that I am seeing quite a lot.

```
class Person {
    private firstName: string;
    private lastName: string;
    
    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
```
This might well be how you do it in other languages, but it isn’t how you handle TypeScript constructor parameters… unless you really like typing the same thing quite a lot.

In particular we have four lines of code in the first attempt that you just don’t need in a TypeScript program, because the compiler can generate them for us. This is the logically identical equivalent of the Person class, written in *proper* TypeScript:

```
class Person {
    constructor(private firstName: string, private lastName: string) {
    }
}
```
The design time and compile time tooling and the resulting JavaScript output are all identical, but you need to write less code. You can [take a look at this on the TypeScript Playground](https://www.typescriptlang.org/play/#src=class%20Person%20{%0Aconstructor(private%20firstName%3A%20string%2C%20private%20lastName%3A%20string)%20{%0A}%0A}). Here is the JavaScript output for either example:

```
var Person = (function () {
    function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return Person;
})();
```
This works for any access modifier you add to TypeScript constructor parameters, so you can use this trick for public, protected, and private members that are being passed in as arguments.