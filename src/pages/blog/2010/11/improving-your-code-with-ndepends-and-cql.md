---
layout: src/layouts/Default.astro
navMenu: false
title: 'Improving Your Code with NDepend and CQL'
pubDate: 2010-11-22T20:13:43+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=995'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - 'code analysis'
    - cql
    - ndepend
---

I have been talking a fair bit recently about code quality tools such as Resharper and NDepend. In this article, I will explain how to use one of the features of NDepend to improve your code quality.

On of my favourite features of NDepend is the suite of “code query language” tests, which run against your code and warn you about methods that are too long, too complex, uncommented or otherwise in need of refactor. Out of the box, there are lots of built-in code queries that run whenever you analyse your code and if these don’t suit you then you can adjust them to suit your in-house rules. Here is an example of a rule I changed, bearing in mind I’ve never used “CQL” before I found it rather simple…

Before…

```
<pre class="prettyprint lang-plain_text">
// <Name>Static fields should be prefixed with a 'm_'</Name>
WARN IF Count > 0 IN SELECT TOP 10 FIELDS WHERE
  !NameLike "^m_" AND
  IsStatic AND
  !IsLiteral AND
  !IsGeneratedByCompiler AND
  !IsSpecialName AND
  !IsEventDelegateObject
```
After…

```
<pre class="prettyprint lang-plain_text">
// <Name>Static fields should be prefixed with a '_'</Name>
WARN IF Count > 0 IN SELECT TOP 10 FIELDS WHERE
  !NameLike "^_" AND
  IsStatic AND
  !IsLiteral AND
  !IsGeneratedByCompiler AND
  !IsSpecialName AND
  !IsEventDelegateObject
```
As you can see, I’ve changed the rule for static fields from m\_ to simply \_ as that is the coding standard I am currently adhering to.

Not only was this edit incredibly easy – I could do it from within Visual Studio as NDepend runs inside of my development environment.

So that’s the kind of thing you can do with CQL and NDepend… how do you use it? That’s easy too. In Visual Studio, you hit ALT + F5 and the code analysis runs. You can open the CQL explorer by hovering over the NDepend icon in the bottom right of Visual Studio and selecting “Show CQL Explorer”. This brings up a dockable window with the categories of query, such as Code Quality, Naming Conventions and Encapsulation. Selecting one of these categories shows you a list of the tests performed and the number of failures (or a nice green light!) You can then click on one of the tests to see the query used (which you can edit) and the methods that fail the test. Now it is just a case of clicking on the method and re-factoring it to fix the problem.

When I started using NDepend this morning, it found a series of methods that failed various tests and each one I fixed did actually look and work much better afterwards. This has convinced me that NDepend isn’t a fluffy tool for making you feel very technical, it does actually contribute to a better, more maintainable code base.