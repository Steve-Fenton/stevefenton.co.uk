---
layout: src/layouts/Default.astro
title: 'Traits vs Mixins'
navMenu: false
pubDate: 2018-11-16T19:16:52+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Mixins
    - Traits
---

Here is a quick disambiguation between Traits vs Mixins for programmers.

Mixins are now fairly well known. You can use mixins to add shared methods to your classes without inheriting from the class they live in. It’s an increasingly popular technique for sharing and extending code. Instead of inheriting from a single parent, you can include methods from many mixins.

So what are these Traits that everyone’s talking about since C# 8.0 was announced?

Traits are conceptually the same as mixins, allowing you to add shared methods to your class; but they are stateless. When you specify traits, you supply the behaviour and, optionally, any constraints you require the including class to satisfy.

Traits are a solution to the diamond problem of classic multiple inheritance. Where more than one include has a method with the same name, the including class must disambiguate the use.