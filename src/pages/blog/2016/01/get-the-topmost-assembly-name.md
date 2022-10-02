---
layout: src/layouts/Default.astro
navMenu: false
title: 'Get the topmost assembly name'
pubDate: 2016-01-23T06:00:50+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - 'c#'
---

This is just a useful snippet that will get you the top most assembly name. Especially useful if you have code in a NuGet package that will be consumed by some other library… and eventually by an application.

```
<pre class="prettyprint lang-csharp">public string GetTopLevelAssembly()
{
    StackFrame[] stackTraceFrames = new StackTrace().GetFrames();
    return stackTraceFrames
        .Select(f => f.GetMethod().ReflectedType.AssemblyQualifiedName)
        .Distinct()
        .Last();
}
```