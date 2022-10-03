---
layout: src/layouts/Default.astro
title: 'The cost of the framework'
navMenu: false
pubDate: 2017-01-19T06:00:10+00:00
authors:
    - steve-fenton
categories:
    - Opinion
    - Programming
tags:
    - Frameworks
    - Toolkit
---

Frameworks and toolkits are great, because you get to do something complex in a very simple way – and that saves time. I use them – a lot. But I also understand the cost.

Let’s approach it from the stock answer everyone gets when they say “I’m trying to write something that does *x* but I can’t work out how to do *y*“:

> “Why would you write your own *X* when you could just use *X-Framework*?!!”

Actually, there is a really good reason to write one. The people that wrote the framework leaned things that the people who use the framework won’t learn by using it. If you write a unit testing framework, you learn things about language, design, and runtimes that people who *use* unit testing frameworks might never learn. If you write your own logging framework, you learn things about storage, consistency, and aggregation that people who use logging frameworks might never learn.

…and the things that you learn will directly benefit all of the other code that you write.

So you can use frameworks to accelerate your development and to keep your focus on your core domain; but never let someone tell you not to write one yourself!