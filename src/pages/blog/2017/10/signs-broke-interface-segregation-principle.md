---
layout: src/layouts/Default.astro
navMenu: false
title: 'Signs you broke the Interface Segregation Principle'
pubDate: 2017-10-12T09:15:49+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - 'c#'
    - ood
    - php
    - typescript
---

I have written quite a lot about how to follow SOLID principles, but one thing that can be useful is examples of where a principle is not being followed. What does your code look like when it wants to tell you something? Here are the signs that you broke the Interface Segregation Principle (ISP). Here is the principle:

> many client-specific interfaces are better than one general-purpose interface

And here is a hint that tells you you aren’t following the principle, although the example is written in C#, it applies equally to other OOP languages.

```
<pre class="prettyprint lang-csharp">
class JetPrinter : IPrinter {
    public void Print(Document document)
    {
        PrinterDriver.DoSomething(document);
    }

    public void Scan()
    {
        throw new NotImplementedException("Scan is not available on this printer");
    }

    public void Copy()
    {
        throw new NotImplementedException("Copy is not available on this printer");
    }
}
```
### ISP violation

Can you see the violation? Because the `IPrinter` interface has too many members, classes that implement the interface start throwing exceptions for the members that they don’t support. This is a classic signpost for ISP problems.

I solve this particular problem in [Pro TypeScript](https://www.stevefenton.co.uk/publications/pro-typescript/) by creating interfaces that group the features into a Printer, a Copier, and a Scanner. If your printer supports all three, it simply implements all three – but you can also implement different combinations.

When you follow the interface segregation principle, you’ll remove the proliferation of the `NotImplementedException`.