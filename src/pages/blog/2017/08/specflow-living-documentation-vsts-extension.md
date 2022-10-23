---
layout: src/layouts/Default.astro
title: 'SpecFlow living documentation VSTS extension'
navMenu: false
pubDate: 2017-08-01T08:47:16+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - BDD
    - SpecFlow
---

SpecFlow is the defacto :abbr[BDD]{title="Behaviour-Driven Development"} tool for .NET programmers – and if you are using both SpecFlow and Azure DevOps then this article is for you.

There is a new Azure DevOps extension called [SpecFlow+LivingDoc](https://marketplace.visualstudio.com/items?itemName=techtalk.techtalk-specflow-plus&utm_source=fenton) that provides a simple build task that will generate documentation from your feature files.

Here is a quick run-down of the steps to use the extension…

1. Get a [trial license key from SpecFlow to try this out, or buy a license](http://specflow.org/plus/)
2. [Add the SpecFlow+LivingDoc VSTS Extension](https://marketplace.visualstudio.com/items?itemName=techtalk.techtalk-specflow-plus&utm_source=fenton)
3. Go to a build that has feature files and add the “Utilities -> SpecFlow+ build step”. Choose the project file that contains feature files.
4. Run the build

When the build is complete, the searchable feature files are made available in the “Test” link in the main menu, so head to “Test -> SpecFlow+” to see the results.

**Note!** The first time you open up this screen and choose a feature, you’ll see a prompt to add a license key. Look for the text “evaluation” in the top right corner and click it to enter the license details.

The features listed can be explored, or searched – and are displayed colour-coded to aid readability.

This is a great way to make your features business-visible.