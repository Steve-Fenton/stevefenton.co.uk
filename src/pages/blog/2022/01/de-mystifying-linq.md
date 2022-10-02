---
layout: src/layouts/Default.astro
navMenu: false
title: 'De-mystifying Linq'
pubDate: 2022-01-24T13:53:36+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - 'c#'
    - linq
---

This post is a summary of the De-mystifying Linq session I ran on 24th January. The examples below were just on-the-spot examples created during the talk… The `System.Linq` namespace can seem a bit like magic, but it can be useful to demystify it by showing that it is actually just some C# code that we could write. In other words, the idea is absolute genius, but there is nothing in the implementation to scare us as we could write something similar. In this exercise, we’re going to write our own `Count` and `Where` implementations to show just how easy things can be.

### Test data

We’re going to drive the process from tests. Any old `IEnumerable` will do for our tests, so we’ll just create a list of ten items to test.

```
<pre class="prettyprint lang-csharp">
IEnumerable<Computer> computers = new List<Computer>
{
    new Computer { Id = 1, Name = "Computer 1", Power = "Medium" },
    new Computer { Id = 2, Name = "Computer 2", Power = "Medium" },
    new Computer { Id = 3, Name = "Computer 3", Power = "High" },
    new Computer { Id = 4, Name = "Calculator 4", Power = "Medium" },
    new Computer { Id = 5, Name = "Computer 5", Power = "Medium" },
    new Computer { Id = 6, Name = "Calculator 6", Power = "High" },
    new Computer { Id = 7, Name = "Computer 7", Power = "Medium" },
    new Computer { Id = 8, Name = "Calculator 8", Power = "Medium" },
    new Computer { Id = 9, Name = "Computer 9", Power = "Medium" },
    new Computer { Id = 10, Name = "Computer 10", Power = "Low" },
};
```
### Count

There is a useful Linq method that gives us a count. We’re going to create equivalents called `MyCount` that will do a plain count, and a count that takes a predicate (which will filter the items to be counted).

```
<pre class="prettyprint lang-csharp">
[TestMethod]
public void CountTests()
{
    Assert.AreEqual(10, computers.MyCount());
}

[TestMethod]
public void CountWithPredicateTests()
{
    Assert.AreEqual(10, computers.MyCount(computer => computer.Id > 0));

    Assert.AreEqual(3, computers.MyCount(computer => computer.Name.Contains("calculator", System.StringComparison.InvariantCultureIgnoreCase)));
}
```
When you can’t go and change code because it belongs to someone else, like the base class library or a third party, we can use extension methods to extend the behaviour of the external code. Neat. Extension methods have to be written within a public, static, and non-generic class. For example:

```
<pre class="prettyprint lang-csharp">
public static class EnumerableExtensions
{
}
```
The methods inside the class *can* be generic, which is absolutely fundamental here is we want our extension methods to work on lots of types, including ones we haven’t yet created.

The first argument in the extension method should be the `IEnumerable` we are going to operate over.

Here is our brace of `MyCount` extension methods. One takes a predicate to filter the items we count.

```
<pre class="prettyprint lang-csharp">
public static class EnumerableExtensions
{
    public static int MyCount<T>(this IEnumerable<T> items)
    {
        int count = 0;

        foreach (T item in items)
        {
            count++;
        }

        return count;
    }

    public static int MyCount<T>(this IEnumerable<T> items, Func<T, bool> predicate)
    {
        int count = 0;

        foreach (T item in items)
        {
            if (predicate.Invoke(item))
            {
                count++;
            }
        }

        return count;
    }
}
```
And that is our count implementation done. There is a bit more on the implications of the concept of count shortly…

### Where

This is usually the first Linq extension people use, but we are implementing it second as we need to count the output in our tests, which we needed `MyCount` for.

```
<pre class="prettyprint lang-csharp">
[TestMethod]
public void WhereTests()
{
    IEnumerable<Computer> result = computers.MyWhere(computer => computer.Id > 6);

    Assert.AreEqual(4, result.MyCount());
}
```
We can implement this using a very short extension method:

```
<pre class="prettyprint lang-csharp">
public static IEnumerable<T> MyWhere<T>(this IEnumerable<T> items, Func<T, bool> predicate)
{
    foreach (T item in items)
    {
        if (predicate.Invoke(item))
        {
            yield return item;
        }
    }
}
```
There are a couple of interesting parts here. The predicate has a type of `Func<T, bool>`. This just means it will take in a `T` (a computer) and return a `bool` (whether it matches our criteria).

We then call this filtering function using `predicate.Invoke(item)`, passing in the current item to be checked.

If it matches, we `yield return item`. The `yield` keyword is one of the best bits of Linq. It passes control back up to allow the matching item to be used. When the calling code loops back around, execution returns to the extension method to go find the next item. When Linq is used well, you end up holding onto just one thing at a time all the way up the stack. This keeps your memory consumption low.

### Readable predicates

Predicates can sometimes be a bit overwhelming. Even this simple example is a bit of an eyefull.

```
<pre class="prettyprint lang-csharp">
Assert.AreEqual(3, computers.MyCount(computer => computer.Name.Contains("calculator", System.StringComparison.InvariantCultureIgnoreCase)));
```
We can make things more readable by moving the actual predicate into a simple method that returns true or false.

```
<pre class="prettyprint lang-csharp">
private bool IsCalculator(Computer computer)
{
    return computer.Name.Contains("calculator", System.StringComparison.InvariantCultureIgnoreCase);
}
```
This method gives the concept a name and can be re-used (for example to get a count, and later to filter).

Our test code is now more readable.

```
<pre class="prettyprint lang-csharp">
Assert.AreEqual(3, computers.MyCount(IsCalculator));
```
We can also make sure things remaining readable if we chain the calls, but using new lines…

```
<pre class="prettyprint lang-csharp">
IEnumerable<SuperComputer> validSuperComputers = computers
    .MyWhere(IsSuperComputer)
    .MyMap(computer => new SuperComputer(computer))
    .MyWhere(supercomputer => supercomputer.IsValid);
```
Having one item per lines makes it read like an ordered pipeline.

### One at a time

The ability to handle one at a time is my favourite part of Linq – especially as this applies across the whole enumerable pipeline. It means you could be iterating a massive dataset from a database, but your memory consumption is low and stable throughout the whole process because you deal with one record, which is available for garbage collection once you have moved onto the next item.

[![Diagram shows previous item available for garbage collection, while current item is in memory and future items are not yet loaded into memory.](/img/2022/01/Linq.png)](https://www.stevefenton.co.uk/2022/01/de-mystifying-linq/linq/)

There are a few cases where you might wreck the concept of handling one item at a time. The most common is calling `.ToList()` on an `IEnumerable` as this pulls all results into memory. Another is using `if (items.Count() > 0)` as this needs to iterate all the items to get you the count; you should use `if (items.Any())`, which will return true as soon as the first item is found (in the worst-case scenario it would take the same amount of time as a count would – but the best case scenario is that it returns on the first item… it just depends on the position of the first matching item in the collection).

Another one to watch out for is ordering. There are special cases here (like Entity Framework as it converts the ordering instruction into SQL, so the database does the work, not your app), but you can’t order the whole collection without looking at all the items. If ordering is unavoidable, you should place the ordering after the filtering, but before any paging (skip and take).

### Summary

Linq is super-cool, but don’t fear it because it just a bunch of extension methods. The examples above show that they are simple in practice, though the *real* Linq extensions are undoubtedly better-written than these samples.

Understanding that we are just dealing with code blows out the mist of wonder and means we can think about Linq in the same way we think about other code.