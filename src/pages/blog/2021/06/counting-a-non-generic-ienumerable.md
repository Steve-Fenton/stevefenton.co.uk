---
title: Counting a non-generic IEnumerable
navMenu: false
pubDate: 2021-06-23T19:01:08+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - C-Sharp
---

You rarely come across them in 2021, but there is such a thing as a non-generic `IEnumerable`. They exist in `System.Collections` rather than `System.Collections.Generic`. Since .NET 2 pretty much everyone is full-on using generics as they are the best thing since curly-braces… but occasionally you find one and even more rarely you need to count it.

Now, you can’t just use `System.Linq` to count an `IEnumerable` because Linq works on your generics. However, Linq is a useful starting point because it’s basically a whole bunch of cool extension methods. We can create our own extension method to add `Count()` to an `IEnumerable`, such as the `SelectedItems` in a `MultiSelectList`.

Here’s the extension that does it, including a helper that allows us to dispose of the enumerator *if it is disposable*.

```csharp
public static class EnumerableExtensions
{
    public static int Count(this IEnumerable source)
    {
        if (source is ICollection collection)
        {
            return collection.Count;
        }

        int count = 0;
        var enumerator = source.GetEnumerator();

        DynamicUsing(enumerator, () =>
        {
            while (enumerator.MoveNext())
            {
                count++;
            }
        });

        return count;
    }

    public static void DynamicUsing(object resource, Action action)
    {
        try
        {
            action();
        }
        finally
        {
            if (resource is IDisposable disposable)
            {
                disposable.Dispose();
            }
        }
    }
}
```

To use this code, we just call it on our `IEnumerable`, like this…

```csharp
int count = multiSelectList.SelectedItems.Count();
```