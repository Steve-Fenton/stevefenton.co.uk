---
id: 1751
title: 'Shorten your Linq expressions'
pubDate: '2016-04-14T06:00:11+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1751'
permalink: /2016/04/shorten-your-linq-expressions/
categories:
    - Programming
tags:
    - 'c#'
    - linq
---

There is an interesting style of Linq expression that I am seeing a lot in code, including open source projects. It isn’t a big deal, but it damages readability.

It looks like this:

```
<pre class="prettyprint lang-csharp">var result = someEnumerable.Where(e => e.IsCondition).FirstOrDefault();

var result = someEnumerable.Where(e => e.IsCondition).SingleOrDefault();

var result = someEnumerable.Where(e => e.IsCondition).Count();
```

Can you spot it? I call it the *Redundant “Where” Anti-Pattern*… All of these could be expressed as:

```
<pre class="prettyprint lang-csharp">var result = someEnumerable.FirstOrDefault(e => e.IsCondition);

var result = someEnumerable.SingleOrDefault(e => e.IsCondition);

var result = someEnumerable.Count(e => e.IsCondition);
```

Note how the tractor is pulling one less trailer!