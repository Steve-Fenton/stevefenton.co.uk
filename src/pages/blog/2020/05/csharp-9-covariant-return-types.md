---
id: 8511
layout: src/layouts/Default.astro
title: 'C# 9 covariant return types'
pubDate: 2020-05-26T06:30:22+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=8511'
permalink: /2020/05/csharp-9-covariant-return-types/
categories:
    - Programming
tags:
    - .net
    - 'c#'
---

Just a quick note on a neat feature in C# 9 that will allow sub-classes to return a covariant return type… what?! Okay, it allows you to return a more specific, or narrower type.

For example, we used to have to return the same type…

```
<pre class="prettyprint lang-csharp">
// parent class...
public virtual Literature GetLiterature(...) 
{
    return new Literature();
}

// child class... returns a Book : Literature
// but the return type is still Literature
public override Literature GetLiterature(...)
{
    return new Book();
}
```

Well, now you can return the narrower type.

```
<pre class="prettyprint lang-csharp">
// parent class...
public virtual Literature GetLiterature(...)
{
    return new Literature();
}

// child class...
public override Book GetLiterature(...)
{
    return new Book();
}
```

The Book has to be a kind of Literature, but it allows the more specific type to be returned, rather than pretending we don’t know as much as we do.

This will actually save you having to reach for generics for this common case.