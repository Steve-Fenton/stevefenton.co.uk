---
layout: src/layouts/Default.astro
navMenu: false
title: 'Classes and inheritance in TypeScript'
pubDate: 2012-10-02T23:46:15+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=728'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - TypeScript
---

Yesterday I wrote [a very brief introduction to TypeScript](/2012/10/TypeScript-Adds-Static-Typing-To-JavaScript/). Today, I’m going to talk more about some of the object orientation TypeScript can add to your JavaScript code.

The two topics for conversation today are classes and inheritance – topics that you’ll be familiar with if you are using a first class object oriented language, or one that supports it if you happen to have used those features.

Let’s look at an example of a class – a very contrived Car object!

```
class Car {
    private engineSizeCC: number;
    
    constructor(public engineSizeInLitres: number = 1.4, public milesPerGallon: number = 65) {
        this.engineSizeCC = engineSizeInLitres * 1000;
    }
    
    milesBeforeRefuel(gallonsInTank: number) {
        return this.milesPerGallon * gallonsInTank;
    }
}
```
And we can easily inherit from this general Car object…

```
class CorporateCar extends Car {
    milesBeforeRefuel(gallonsInTank: number) {
        var realMiles = super.milesBeforeRefuel(gallonsInTank);
        // Corporate drivers are really lazy about filling up!
        return realMiles * 0.8;
    }
}
```
This example demonstrates declaring a class, adding a private variable, adding public variables, adding types, adding default values, inheriting from a class and overriding a method – all in just a few lines of code.

We can call the code like this:

```
var myCar = new Car(1.6, 45);
var salesmansCar = new CorporateCar(1.6, 45);

document.write(
    "I have " + myCar.milesBeforeRefuel(10) + " left," +
    "We pretend that the salesman has " + salesmansCar.milesBeforeRefuel(10) + " left."
);
```
And we get the output “I have 450 left,We pretend that the salesman has 360 left”.

Like CoffeeScript, this will chuck out a smattering of JavaScript that is a bit harder to read than our short-hand but does the right job of containing our scope.

The generated script is below so you can see what the plain JavaScript looks like for this whole example:

```
<pre class="prettyprint lang-javascript">
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var Car = (function () {
    function Car(engineSizeInLitres, milesPerGallon) {
        if (typeof engineSizeInLitres === "undefined") { engineSizeInLitres = 1.4; }
        if (typeof milesPerGallon === "undefined") { milesPerGallon = 65; }
        this.engineSizeInLitres = engineSizeInLitres;
        this.milesPerGallon = milesPerGallon;
        this.engineSizeCC = engineSizeInLitres * 1000;
    }
    Car.prototype.milesBeforeRefuel = function (gallonsInTank) {
        return this.milesPerGallon * gallonsInTank;
    };
    return Car;
})();
var CorporateCar = (function (_super) {
    __extends(CorporateCar, _super);
    function CorporateCar() {
        _super.apply(this, arguments);
    }
    CorporateCar.prototype.milesBeforeRefuel = function (gallonsInTank) {
        var realMiles = _super.prototype.milesBeforeRefuel.call(this, gallonsInTank);
        return realMiles * 0.8;
    };
    return CorporateCar;
})(Car);
var myCar = new Car(1.6, 45);
var salesmansCar = new CorporateCar(1.6, 45);
document.write("I have " + myCar.milesBeforeRefuel(10) + " left," +
    "We pretend that the salesman has " + salesmansCar.milesBeforeRefuel(10) + " left.");
```