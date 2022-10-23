---
layout: src/layouts/Default.astro
title: 'Test-driven development and duplication'
navMenu: false
pubDate: 2017-08-04T10:36:40+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - OOP
    - TDD
---

I have run a good number of test-driven development coding dojos (and behaviour-driven development ones), and participated in plenty of them too. The most common errors I have found can be classified as:

- Trying to find abstractions too early
- Drastic code changes under the banner of “refactoring”

Both of these problems are solved by practising the discipline of :abbr[TDD]{title="Test-Driven Development"} according to Kent Beck… and as rather excellently described by Sandi Metz and Katrina Owen in their book [99 Bottles of OOP](https://www.sandimetz.com/99bottles/). Other than Ian Cooper and Kent Beck, nobody else has had more of an impact on my TDD.

One of the great techniques in the book is the set of Flocking Rules. They are based on the idea of tacit rules followed by migratory birds; a very simple set of rules that, when followed, can guide very complex behaviours. The Flocking Rules for object-oriented programming are:

1. Select the things that are most alike
2. Find the smallest difference between them
3. Make the simplest change that will remove that difference

The real beauty of this technique is that you don’t attempt to eliminate all duplication in one “super-awesome refactoring to a pattern”, but instead leave both parts of the code present and active until they are identical. A snappy quote is required here, so I made one up…

> They both remain  
> ’til they’re both the same

I thoroughly recommend investing the $49 in your career by [purchasing the book](https://www.sandimetz.com/99bottles/).