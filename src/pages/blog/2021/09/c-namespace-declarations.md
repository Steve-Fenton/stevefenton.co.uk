---
layout: src/layouts/Default.astro
navMenu: false
title: 'C# namespace declarations'
pubDate: 2021-09-06T07:50:56+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - 'c#'
---

Unlike my recent article on [Global Using Statement and Code Clues](https://www.stevefenton.co.uk/2021/08/global-using-statements-and-code-clues/), the new namespace declarations have no trade offs and you should just auto-fix them in your whole project and move on with your life. Here’s how we do namespace before namespace declarations:

```
<pre class="prettyprint lang-csharp">
namespace Fenton.Sample.UI
{
    public class Example
    {

    }
}
```
…and here is how we declare namespaces with namespace declarations (no curly braces, no nesting, just a semi-colon):

```
<pre class="prettyprint lang-csharp">
namespace Fenton.Sample.UI;

public class Example
{

}
```
Less nesting, happy days.