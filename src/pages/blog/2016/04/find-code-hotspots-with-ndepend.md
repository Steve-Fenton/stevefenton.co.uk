---
layout: src/layouts/Default.astro
title: 'Find code hotspots with NDepend'
navMenu: false
pubDate: 2016-04-24T19:56:54+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - 'Code Analysis'
    - NDepend
---

One of the constant battles in software development is predicting where problems are in your code. There are lots of ways to cut up your codebase in order to predict where problems are likely to occur; I have been experimenting with some reports over check-in history in Visual Studio Team Services to find files with high churn, or that are coupled to other files on check-in, or are changed by lots of different people.

Writing custom reports over check-in data can be pretty hard work… so you can turn to one of many code analysis tools out there. This is why I’m talking about NDepend once again. I use lots of code analysis tools – the build in Visual Studio Code Analysis, StyleCop, Refactoring Essentials, and CodeMaid… my CPU hates me.

So why, when I have so many analysers am I turning to NDepend?

Simple: NDepend is the big boss man of analysers. It has a huge range of reports and rules to help find and fix problems in your code. This huge range of tools can be overwhelming – so here is a good place to start.

:img{src="/img/2016/04/ndepend-6-most-complex-method.png" alt="NDepend 6 Most Complex Method" loading="lazy"}

There is a menu in NDepend titled “METRIC”, with four fantastic options:

- Largest…
- Most complex…
- Most coupled…
- Most popular…

If are wondering where to start, choose one of these options and select “method”. When you are finished fixing your oversized methods, do the same and select “type”.

NDepend has plenty more to offer (I’ll be writing more on this soon) – but by running these eight reports you’ll be presented with a ton of code that may be a good candidate for refactoring.