---
navMenu: false
title: C# 9 record types
pubDate: 2020-05-23T06:30:10+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
---

**Update**! Since this article was published, it is *almost certain* that the keyword for record types will actually be `record` not `data` as it was in this early preview. I’ve updated code examples to reflect this.

We have taken a quick look at [C# 9 Initializers and Immutability](/blog/2020/05/csharp-9-initializers-and-immutability/) and [C# 9 Non-Destructive Mutation](/blog/2020/05/csharp-9-non-destructive-mutation/). Let’s now look at the full transformation from an old class to a super character-light record type.

Our original record type is very much just a class with two auto-properties. It looks different to a normal class because we have the `data` keyword in there.

```csharp
public record class Book {
    public string Author { get; init; }
    public string Title { get; init; }
}
```

Most of the text in this code file is “not the stuff I wrote”. It’s the stuff that expands out when I tab out from a snippet.

Because this is such a common code-shape, the C# team has made it possible to not even type it out. If we assume on a record that we want the properties to be *public* and that we want them to have an auto *get* and *init* then we end up with just this…

```csharp
public record class Book {
    string Author;
    string Title;
}
```

This is a simple case and we’ve gone from 102 characters to 60 characters. My keyboard will last almost twice as long.

You can perform a similar trick if you want to force the parameters with a constructor.

```csharp
public record class Book (string Author, string Title) { }
```

Or you can mix and match…

```csharp
public record class Book (string Title) {
    string Author;
}
```

And finally, in the spirit of putting less stress on your hardware keys, new-ing up an object can now be done with less typing and less repetition.

```csharp
Book book = new ("The Monk");
```

Note that I didn’t say `new Book`. We all know I want a book because I literally typed the type at the start of the line. Nice.