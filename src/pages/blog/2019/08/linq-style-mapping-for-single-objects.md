---
title: 'Linq style mapping for single objects'
navMenu: false
pubDate: 2019-08-25T14:19:27+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - C-Sharp
    - Linq
---

Linq is not just the go-to .NET library for handling IEnumerable data sources, it’s the inspiration for many successful and unsucessful attempts to reproduce the style in other languages.

When you have a class full of Linq and you find yourself wanting to simply map a single object to something else, you’ll find yourself writing the following linqesque expression, which doesn’t exist in Linq.

```csharp
TypeTwo result = typeOneInput.Select(t => new TypeTwo
{
    Id = t.Identity.ToGuid(),
    Title = t.Name
});
```

Because `typeOneInput` is a single `TypeOne` instance, not an enumerable collection of them; you’ll find the standard Linq `Select` isn’t available.

## Linq style mapping extension method

For simple mapping cases, you can write your own extension method to allow it, though. In this case, we’ll call it `Map` rather than `Select`.

```csharp
public static class MapExtensions
{
    public static T Map<TIn, T>(this TIn input, Func<TIn, T> mapper)
    {
        return mapper(input);
    }
}
```

## Using the mapper

You can now map things whenever you like!

```csharp
TypeTwo result = typeOneInput.Map(t => new TypeTwo
{
    Id = t.Identity.ToGuid(),
    Title = t.Name
});
```

## Full Linqyness

James Curran wrote to me to point out that if we name the mapping method `Select`, rather than `Map`, you get some additional Linq style goodness.

```csharp
TypeTwo result = from t in typeOneInput
                 select new TypeTwo
{
        Id = t.Identity.ToGuid(),
        Title = t.Name
};
```

Thanks James!

As an aside… read this if you’re wondering [why you can’t comment on posts](/blog/2011/09/blog-comments/) (from 2011).