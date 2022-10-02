---
layout: src/layouts/Default.astro
navMenu: false
title: 'Visual Studio refactoring shortcuts'
pubDate: 2013-09-12T10:55:14+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=512'
interface_sidebarlayout:
    - default
categories:
    - 'Visual Studio'
tags:
    - refactoring
---

After watching Uncle Bob playing a symphony of refactoring across his keyboard at Dev South Coast last night, I decided there was one short-cut I didn’t have and couldn’t live without: Widen Selection.

Widen selection, also known as expand selection, allows you to move your current selection outwards to the next lexical block. This is a really handy short-cut for refactoring as you can quickly grab a chunk of code before leaning on the extract-method refactoring to strip it out. This is the fastest way to [extract ’til you drop](https://sites.google.com/site/unclebobconsultingllc/home/articles/one-thing-extract-till-you-drop).

Having considered simply converting to Java and using IntelliJ for all my programming needs (an option I still haven’t discounted) I decided to check to see if there was a way of doing this in Visual Studio.

There isn’t.

There is, however, a plethora of plugins that will give you this option.

If you have ReSharper, you can use `CTRL` + `W` to widen the current selection and `CTRL` + `SHIFT` + `W` to narrow the selection.

If you don’t have ReSharper, grap [Coderush Xpress from DevExpress](https://www.devexpress.com/Products/CodeRush/), which uses (by default…) `CTRL` + `ALT` + `=` to widen and `CTRL` + `ALT` + `-` to narrow. Of course, a quick trip into “Options &gt; Shortcuts &gt; Selection” and you can map this to match IntelliJ and ReSharper and you’ll never have to remember the difference.