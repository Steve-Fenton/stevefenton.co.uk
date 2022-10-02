---
layout: src/layouts/Default.astro
navMenu: false
title: 'NUnit exception occurred while test discoverer was loading tests'
pubDate: 2018-02-15T12:11:24+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - 'c#'
    - nunit
---

If you are using NUnit 3+ with the handy test adapter that shows the tests in the Visual Studio Test Explorer, you might come across an issue loading the tests:

```
<pre class="prettyprint">
An exception occurred while test discoverer 'NUnit3TestDiscoverer' was loading tests. Exception: Could not load file or assembly 'nunit.engine, Version=3.5.0.0, Culture=neutral, PublicKeyToken=2638cd05610744eb' or one of its dependencies. The system cannot find the file specified.
```
The result of this is that the tests aren’t visible and you can’t run them.

The solution to this is to locate the following cache folder, and delete it. You’ll need to close Visual Studio while you do this.

`C:\Users\Your.Name\AppData\Local\Temp\VisualStudioTestExplorerExtensions\NUnit3TestAdapter.version`

When you restart Visual Studio, all should be well.