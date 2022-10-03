---
layout: src/layouts/Default.astro
navMenu: false
title: 'Obtaining a class name at runtime in TypeScript'
pubDate: 2013-04-22T15:10:06+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=612'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - TypeScript
---

A common question that crops up from time to time on TypeScript forums is how to check the type of a class at runtime using TypeScript.

This can be done, although a little differently to other languages. If you have an instance of a class, you can use the name of the constructor function to identify it.

```
class Display {
    name: string = '';
}

class Television extends Display {

}

class HiFi {

}

const tv = new Television();
const radio = new HiFi();

// Television
const tvType = tv.constructor.name;
alert(tvType);

// HiFi
const radioType = radio.constructor.name;
alert(radioType);
```
This is somewhat better than how we used to do it… for example my original article used a funky-ol-regex:

```
class Describer {
    static getName(inputClass) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((<any> inputClass).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }
}

class Example {
}

class AnotherClass extends Example {
}

var x = new Example();
var y = new AnotherClass();

alert(Describer.getName(x)); // Example
alert(Describer.getName(y)); // AnotherClass
```
If you are working with super-old browsers, you can use the describer class to get your types… but modern browsers support the constructor name mechansism, which is clearly simpler.