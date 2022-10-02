---
id: 861
layout: src/layouts/Default.astro
title: 'Automatically remove unused using directives on save in Visual Studio'
pubDate: 2012-02-14T16:58:06+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=861'
permalink: /2012/02/automatically-remove-unused-using-directives-on-save-in-visual-studio/
interface_sidebarlayout:
    - default
categories:
    - Programming
    - 'Visual Studio'
tags:
    - 'c#'
---

I like to keep my using directives tidy when I’m using Visual Studio. If you let them accumulate, they add noise to your code, slow down static analysis and they all need to be optimised out when you compile.

There is a built-in feature in Visual Studio that allows you to organise your using directives by removing the unused ones and sorting the rest.

![Visual Studio Remove and Sort](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/using_directives_1.png)

But there is a better way. Go and get yourself the PowerCommands for Visual Studio 2010 for free using Tools &gt; Extension Manager. Not only does this add some pretty handy menu options in Visual Studio, but it also allows you to automatically remove and sort using directives on save.

The options for PowerCommands are available through the normal Tools &gt; Options menu.

![Automatically Remove Unused Using Directives](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/using_directives_2.png)

Note – if you think PowerTools is removing using directives that it ought not to, make sure your code compiles. If it doesn’t compile, it may accidentally remove a using directive that is actually in use – I’ve seen this behaviour mostly with System.Linq. Also, bear in mind that the feature is actually built-in to Visual Studio – PowerTools is just triggering the feature on save, which is really handy.