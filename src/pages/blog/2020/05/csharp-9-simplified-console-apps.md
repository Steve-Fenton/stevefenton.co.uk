---
layout: src/layouts/Default.astro
navMenu: false
title: 'C# 9 simplified console apps'
pubDate: 2020-05-20T06:30:13+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - 'c#'
---

At Microsoft Build 2020, an interesting new “see less boilerplate” feature from C# 9 was demonstrated.

It removes all the code to create the class and static Main method, letting you just start typing your code. It makes your code way-less-nested (okay, two levels), but doesn’t miss any of your usual features.

For example, `args` is still available, and if you use an `await` it will work out the Main method (which you haven’t written) will need to be `async`.

Here’s an example…

```
<pre class="prettyprint lang-csharp">
using static System.Console;

WriteLine("Hey, I didn't write a class or method here!");
```

The concept behind this is to simplify that first-write experience to remove the cruft and focus everything on *your* code.

Check back for some more [C# 9 articles](https://www.stevefenton.co.uk/tag/c-sharp/) coming soon!