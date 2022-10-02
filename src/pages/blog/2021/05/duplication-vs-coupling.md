---
id: 11522
title: 'Duplication vs Coupling'
pubDate: '2021-05-29T07:00:09+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=11522'
permalink: /2021/05/duplication-vs-coupling/
categories:
    - Programming
tags:
    - coupling
    - dry
    - duplication
---

There is a generally understood principle of programming that says *if you remove duplication, you introduce coupling*. For example, you have two classes that have similar code, so you create a function that they both call. Now the two classes are coupled to the function. You make one thing better, but something else gets worse. That’s a pain.

However, rather than sliding up and down the trade-off scale between duplication and coupling, we can use human ingenuity to make smart decisions.

### Coupling

Think of the coupling this way… it’s already there.

Back to our original example where we had two classes with similar code. If those two classes both have to change in response to some external factor, the coupling already exists. The problem is the coupling is vague. By turning this into explicit coupling by introducing something they both share, we take *the coupling that already exists* and we make it visible. The key point here is that *there is no new coupling, just increased visibility*.

Similarly, if there is no disguised-coupling bubbling away that we can bring to the surface with explicit coupling, we can probably live with the duplication.

And finally, it’s not duplication if it’s a language feature. There are codebases out there where duplication was attacked aggressively, resulting in language features being hidden behind incredibly abstract self-rolled coupling that didn’t exist in the code. Imagine replacing all if-statements with `RunOnCondition(predicate, action)` just because “they kind of look the same shape, so it must be duplication”.

### Summary

Unless the duplication represents coupling, think twice about introducing coupling.