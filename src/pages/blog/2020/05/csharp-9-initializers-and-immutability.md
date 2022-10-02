---
id: 8503
title: 'C# 9 initializers and immutability'
pubDate: '2020-05-21T06:30:55+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=8503'
permalink: /2020/05/csharp-9-initializers-and-immutability/
categories:
    - Programming
tags:
    - .net
    - 'c#'
---

There is currently a compromise in C# that means you can enable object initialization with getters and setters, or you can prevent external code mutating state by hiding the setter… but not both.

C# 9 gives us both with the `init` keyword.

Let’s look at before…

```
<pre class="prettyprint lang-csharp">
public class Book {
    public string Author { get; set; }
    public string Title { get; set; }
}
```

You can initilize this object, but also change it’s state afterwards:

```
<pre class="prettyprint lang-csharp">
Book book = new Book {
    Author = "Mathew Lewis",
    Title = "The Monk"
};

// Oh no - we don't want to allow this
book.Title = "The Bravo of Venice";
```

To prevent any mutation *after* the initialization, we just switch in `init` for `get`.

```
<pre class="prettyprint lang-csharp">
public class Book {
    public string Author { get; init; }
    public string Title { get; init; }
}
```

We can now use the object initializer, but we can’t change the state afterwards. Hooray!