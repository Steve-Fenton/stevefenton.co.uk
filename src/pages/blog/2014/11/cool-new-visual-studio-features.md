---
layout: src/layouts/Default.astro
title: 'Cool new Visual Studio features'
navMenu: false
pubDate: 2014-11-12T20:12:39+00:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
---

Visual Studio had a big day today with the launch of the free Visual Studio Community edition (a full featured IDE that is free for non-enterprise use – i.e. some commercial use seems acceptable so read the fine print) and some announcements about Visual Studio 2015. Here are my highlights about Visual Studio 2015 in particular.

## Immediate Window

Ever tried to run LINQ or a lambda in the immediate window? It doesn’t work. Except in Visual Studio 2015 it will work. Awesome.

## Code Analysis

Code analysis information will now live alongside errors and warnings, so you won’t need a separate window for that information. The errors and warnings window also has some upgrades, including filtering.

## Perf Hints

Perf Hints will show performance information when you are debugging. If you hit F10, for example, it will show you how long it took to step over that line of code. If you have two breakpoints and F5 to continue from the first one, it will tell you how long it took to get to the next breakpoint. This is really useful.

## Lightbulb

The stuff that you are accustomed to seeing as CTRL + “.” options will now be made visible as a lightbulb on the left of the IDE (rather than as an inconspicuous one character underline). You can still open it wil CTRL + “.” or you can click on it – and you’ll find it has had major upgrades including a preview diff of the change Visual Studio will make for each option. The lightbulb is extensible, so expect some cool Visual Studio extensions for this feature… probably from Mads Kristensen.

## Layouts

You can save common layouts, so when you switch from your massive screen in the office to your tiny laptop screen in the coffee shop, you can easily switch the layout to suit by choosing from a list of layouts you have created.