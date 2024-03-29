---
title: Visual Studio date and time string formatting improvements
navMenu: false
pubDate: 2021-10-26
keywords: c#,date,time,string,formatting
description: Find out how to format interpolated date strings in C#,
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - C-Sharp
    - Visual Studio
---

Either this is new, or it has been a long time since I last had to write a date out. Either way, I wanted to share the improvements I found had been made to Visual Studio when you decide to `.ToString` a date/time in your code.

It’s a pretty common occurrence to write a message that includes a date, and what you are ultimately aiming for is code a bit like this:

```csharp
string output = $"... {n.CreatedDate.ToString("yyyy-MM-dd HH:mm:ss")} ...";
```

This isn’t a tricky bit of code, but you have to remember that months are `M` and minutes are `m` and other arcane stuff like the difference between `M`, `MM`, `MMM`, and `MMMM` (it’s starting to sound rather tasty).

Visual Studio knows that you shouldn’t have to remember this stuff, so it now starts suggesting auto-complete entries *within your string literal*, as shown below.

:::figure{.inset}
:img{src="/img/2021/10/autocomplete-date-formats.jpg" alt="Auto completion of date format strings" loading="lazy"}
::figcaption[Autocomplete date formats]
:::

This is a big energy-saver as you no longer need to perform two or three feedback loops to refine your guessed date string.

Also, Visual Studio will hint the slightly tidier format specifier for interpolated strings, which results in the final code being:

```csharp
string output = $"... {n.CreatedDate:yyyy-MM-dd HH:mm:ss} ...";
```

Am I the last one to join this party?