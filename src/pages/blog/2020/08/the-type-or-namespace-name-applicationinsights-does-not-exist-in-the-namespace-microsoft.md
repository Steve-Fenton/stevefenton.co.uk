---
layout: src/layouts/Default.astro
navMenu: false
title: The type or namespace name ApplicationInsights does not exist in the namespace Microsoft
pubDate: 2020-08-12T13:22:14+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - asp.net
    - 'c#'
    - mvc
---

If you uninstall the Application Insights package from a .NET Core MVC project, you might get a few errors as it can’t “remove all the references” that might have made it into your application. The changes to StartUp.cs will be pretty self-explantory, but elsewhere you will get something a bit more off-the-wall as it references .cshtml.g.cs files.

> Severity Code Description Project File Line Suppression State  
> Error CS0234 The type or namespace name ‘ApplicationInsights’ does not exist in the namespace ‘Microsoft’ (are you missing an assembly reference?) … Index.cshtml.g.cs

All you have to do to fix this is go and update your \_ViewImports.cshtml file to remove the App Insights references:

```
<pre class="prettyprint">
@inject Microsoft.ApplicationInsights....
```
Once you remove these, you’ll probably get a second layer of issues, from the stuff in your views that depended on this injection.

```
<pre class="prettyprint">
@Html.Raw(JavaScriptSnippet.FullScript)
```
Once you’ve chased through the list, you’ll find it’s easy to resolve – the hard bit is knowing you have to start in the \_ViewImports.cshtml file.