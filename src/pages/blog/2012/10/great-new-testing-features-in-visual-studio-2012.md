---
layout: src/layouts/Default.astro
navMenu: false
title: 'Great new testing features in Visual Studio 2012'
pubDate: 2012-10-03T23:40:22+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=723'
interface_sidebarlayout:
    - default
categories:
    - 'Visual Studio'
tags:
    - testing
---

Visual Studio 2012 has loads of new features aimed at integrating popular options that were previously supplied by third party extensions. Using a third party extension is a great way to get your hands on a missing feature, but if you have ever installed a number of extensions, you’ll notice the slow down you can get inside of Visual Studio.

What I’m really enjoying currently are related to the new testing features inside of Visual Studio 2012.

### Get Code Coverage

Code coverage is a really useful metric when you are working on legacy code. Your new code doesn’t need to be measured, because you’re rolling strict test-driven design!

So to get a handle on the legacy code, code coverage is useful – and it is built into Visual Studio under “TEST” &gt; “Analyze Code Coverage”. Once the tests have run, you can view the results and drill-down into the assembly you are interested in.

![Get Code Coverage](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/get-code-coverage.png)

If you want to see the code highlighted in Visual Studio to indicate whether each line is covered or not, just by clicking on the “Show Code Coverage Colouring” icon in the Code Coverage Results panel. Depending on your theme, you will get a “good” colour and a “bad” colour, which in the default dark theme are blue-ish and staw-ish respectively. You do lose syntax highlighting on the lines to prevent these background colours making code hard to read, but you don’t need it switched on all the time.

![Code Coverage](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/vs2012-code-coverage.png)

### Run Tests On Build

This feature will either speed up your existing cycle of building and testing, or it will enforce a test run where you don’t currently perform one but should. All you have to do is hit “TEST” &gt; “Test Settings” &gt; “Run Tests After Build” and each time you perform a build, the tests will fire automatically. Visual Studio is also clever enough to recognise whether you need to perform another test run, so if you build multiple times without changing anything, it won’t repeat the tests.

![Run Tests on Build](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/run-tests-on-build.png)