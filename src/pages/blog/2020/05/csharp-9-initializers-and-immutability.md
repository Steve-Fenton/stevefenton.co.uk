---
layout: src/layouts/Default.astro
title: C# 9 initializers and immutability
navMenu: false
pubDate: 2020-05-21T06:30:55+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - 'csharp'
---

There is currently a compromise in C# that means you can enable object initialization with getters and setters, or you can prevent external code mutating state by hiding the setter… but not both.

C# 9 gives us both with the `init` keyword.

Let’s look at before…

```csharp
public class Book {
    public string Author { get; set; }
    public string Title { get; set; }
}
```

You can initilize this object, but also change it’s state afterwards:

```csharp
Book book = new Book {
    Author = "Mathew Lewis",
    Title = "The Monk"
};

// Oh no - we don't want to allow this
book.Title = "The Bravo of Venice";
```

To prevent any mutation *after* the initialization, we just switch in `init` for `get`.

```csharp
public class Book {
    public string Author { get; init; }
    public string Title { get; init; }
}
```

We can now use the object initializer, but we can’t change the state afterwards. Hooray!