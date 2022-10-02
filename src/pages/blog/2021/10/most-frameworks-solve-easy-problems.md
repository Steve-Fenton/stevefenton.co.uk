---
layout: src/layouts/Default.astro
title: Most frameworks solve easy problems
navMenu: false
pubDate: 2021-10-07T10:18:27+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - frameworks
---

As part of my ongoing [punk software thought process](/2020/07/the-software-punk-revolution/), I found myself thinking about frameworks. The conclusion of these thoughts was, I suppose, inevitable if you work backwords. What I realised was that *most frameworks solve easy problems*. When you think about frameworks in this way, it becomes clear that though it may take some additional hours in practice, most teams would benefit from writing their own framework to solve these easy problems. They will know their own solution infinitely better than grabbing some external framework, which are full of scenarios that don’t apply and are splattered with opinions that may or may not be valuable to the team.

Yes, there are some tools you can reach for that save *serious* amounts of investment. A great many can be found in standard libraries (not that many people seem to be looking there any more). In many cases, though, a folk framework would be healthier for the team and the organisation than some big, established, fixed framework that solves an easy problem.

Now, in many cases, an official framework will outperform your folk framework. This doesn’t matter, though, unless you *need* it to be super-high-performance. Software teams are quick to dismiss something on performance grounds despite the *n* in their O(*n*) problem being single-digit. Out of the ten, twenty, or thirty things you’ve packaged into your solution, how many of them truly need to be *that* fast? In some cases, the framework will perform below the performance you would get from writing something yourself.

This thought was originally directed at programming frameworks, but it applies equally to process frameworks. When *Team Elite* tore up their Scrum rulebook in 2014 and put together a process that worked for them, they became the first team I ever worked on to achieve a three-hour cycle time for features and had zero defects. Ever.

Work is better when the tool fits your hand.