---
title: 'Using NDepend to get a grasp of your code'
navMenu: false
pubDate: 2012-09-04T00:11:39+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - 'Code Analysis'
    - CQLinq
    - NDepend
---

Whenever I land in a new team and get given a big chunk of source code to familiarise myself with, I like to crack open NDepend and run a full report. In particular, a quick browse through the Dependency Graph and a brief glance at the Abstractness Verses Instability Graph can tell you a lot about the style the code base has.

The Application Metrics can also be very telling, giving you an instant handle on the kind of code base you are dealing with by detailing the numbers of just about everything; lines of code, assemblies, namespaces types, methods and a great deal more.

Of course, once you’ve got a handle on exactly what you are dealing with, the rules summary gives you great indication of where to expend the clean-up effort. The default settings work best when you first start using NDepend, although you’ll almost certainly change the naming convention for static fields and instance fields, but when you do change these two rules you’ll realise how easy it is to change every rule in this product.

Once you have reigned in the codebase, I recommend revisiting the rules to make them more strict. Rather than 500 lines of code defining a method that is too big, why not reduce this number. Instead of 8 parameters being too many for a method, why not reduce it. It takes about 10 seconds to edit a rule written in CQLinq from:

```
warnif count > 0 from t in JustMyCode.Types where
   t.NbLinesOfCode > 500 ||
   t.NbILInstructions > 3000
   orderby t.NbLinesOfCode descending
select new { t, t.NbLinesOfCode,
    t.NbILInstructions, t.Methods, t.Fields }
```

To:

```
warnif count > 0 from t in JustMyCode.Types where
   t.NbLinesOfCode > 250 ||
   t.NbILInstructions > 1500
   orderby t.NbLinesOfCode descending
select new { t, t.NbLinesOfCode,
    t.NbILInstructions, t.Methods, t.Fields }
```

As you update the CQLinq statements, it indicates how many failures will result, which means you can adjust it and see what the impact will be.

And the best bit is that you can integrate NDepend into your build process using the NDepend console, which means you can fail your build if someone violates a critical rule.

NDepend is great for getting a handle on a new project and it is even better if you adjust it as you go to raise the bar on code quality throughout the lifetime of your product.