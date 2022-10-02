---
id: 8505
layout: src/layouts/Default.astro
title: 'C# 9 non-destructive mutation'
pubDate: 2020-05-22T06:30:26+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=8505'
permalink: /2020/05/csharp-9-non-destructive-mutation/
categories:
    - Programming
tags:
    - .net
    - 'c#'
---

There are some phrases in programming that feel like they belong in a superhero movie. Non-destructive mutation is just such as phrase. It refers to a concept in functional programming that means when you want to change the state of an object, you create a copy with the change – rather than changing the original.

Firstly, we need to use the new C# 9 record type, which is just a class preceded by the `data` keyword. Let’s continue the book example from the [C# 9 Initializers and Immutability article](https://www.stevefenton.co.uk/2020/05/csharp-9-initializers-and-immutability/).

```
<pre class="prettyprint lang-csharp">
public data class Book {
    public string Author { get; init; }
    public string Title { get; init; }
}

Book book = new Book {
    Author = "Mathew Lewis",
    Title = "The Monk"
};

Book anotherBook = book with { Title = "The Bravo of Venice" };
```

By creating the second book with the `with` keyword, we can choose to change one or more properties. The original book isn’t changed, we still have that. We also have our new book. That’s non-destructive mutation in C# 9 in a nutshell.

Now, the `with` keyword will create a shallow copy, going field by field and assigning the properties. That means reference type properties *will* end up being shared state by default. This matches what you would expect if you have used structs in C#. However, you can implement your own copy constructor (it just needs to be a constructor that takes an argument of the same type, a *Book* in our example). So, you can deep-copy if that’s what you need to do.