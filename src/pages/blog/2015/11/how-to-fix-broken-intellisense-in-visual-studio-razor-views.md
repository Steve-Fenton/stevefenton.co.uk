---
id: 1507
layout: src/layouts/Default.astro
title: 'How to fix broken IntelliSense in Visual Studio razor views'
pubDate: 2015-11-09T15:21:25+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1507'
permalink: /2015/11/how-to-fix-broken-intellisense-in-visual-studio-razor-views/
categories:
    - 'Visual Studio'
tags:
    - 'c#'
    - mvc
    - razor
---

I had an annoying issue in Visual Studio 2015 whereby the views lost all intellisense. Errors such as “The name model does not exist” and lack of assitance with HTML Helper methods were accompanied by red squiggly lines.

Most of the advice for fixing this is based on the assumption that the views are broken for the whole team, usually because the project config files are missing includes for the common namespaces needed in a Razor view… but when this is working for the whole team, with few exceptions it is clearly an IDE problem.

The issue is likely to be a bad component model cache. You can resolve it by deleting the cache files located in:

`C:\Users\your.name.here\AppData\Local\Microsoft\VisualStudio\14.0\ComponentModelCache`

The files will be recreated when you next launch Visual Studio, and they should now be error-free.