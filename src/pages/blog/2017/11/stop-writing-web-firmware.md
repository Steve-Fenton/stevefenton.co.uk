---
layout: src/layouts/Default.astro
title: 'Stop writing web firmware'
navMenu: false
pubDate: 2017-11-30T08:50:47+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
    - TypeScript
---

:img{src="/img/2017/11/firmware.jpg" alt="Firmware"}

This has been a problem for a long time. It was a problem with jQuery, it was a problem with AngularJS, it is a problem right now with Angular, Aurelia, Vue, and React. None of these frameworks are at fault, but there is a huge industry-wide issue with people writing all of their code inside of the framework. Please… stop writing web firmware!

If you have an app that calculates monthly payments for a mortgage, the code that performs these calculations should not reference any of these web frameworks. The majority of your code should be entirely unaware of whether it will be used in an Angular app or a React app.

I have witnessed completely sane professional developers who craft clean Java or C# all day long somehow commit terrible crimes in JavaScript and TypeScript that they would never consider for a moment back on the “server side”. As more code moves into the front end, so must more of the practices we have applied to our back end code to make sure it lasts more than four years (for example 2010 to 2014).

## Web firmware

So consider all the code you write *inside* the framework as firmware. Any code you put *inside* the framework costs more than the same code placed *outside* the framework. Your *JavaScript* code is based on a language that has been around for over 20 years. Your *front-end framework* code is based on a framework that is lucky to be remembered after five years. So you can think of your framework code as being **more than 4x** more expensive to write. That’s the economics of your decision… and until something major happens on the front-end, the difference will only increase.

## Invest in your code

Placing most of your code *outside* takes minimal effort, especially if you’ve been writing clean back-end code half your life. It is especially easy when things like modules and module loaders arrive to give you an easy way to organise and load your code when you need it. So spend the 20 seconds it takes to place that important algorithm in a module, rather than in your Angular controller.

<small>Firmware Upgrade image [Wikimedia](https://commons.wikimedia.org/wiki/File:Firmware_upgrade.jpg)</small>