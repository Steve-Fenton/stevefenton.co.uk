---
title: 'Why TypeScript interfaces can extend classes'
navMenu: false
pubDate: 2013-06-19T12:04:58+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

When I originally discovered that [TypeScript interfaces can extend classes](/blog/2013/06/typescript-interfaces-can-extend-classes/), I thought it was novel – but lacking in real-world usages.

At the time, I had a solution with no problem, so for the sake of argument I tried to imagine what the problem might be. Perhaps you could point an interface at a third party class to ensure that your swappable implementation stayed in step with any changes to the original. Not a compelling reason to use this feature by any means.

So off I went, working with TypeScript generics, when I came across a situation wherein I wanted to specify multiple type constraints on a type argument.

I tried a few things, separated constraints with commas and moved things around until I was reasonably satisfied that TypeScript doesn’t support multiple constraints. I had a problem.

Of course, this is a genuine problem that can be solved by creating an interface to represent the constraint. The interface can inherit from the two classes you wanted to use in your multiple constraint declaration.