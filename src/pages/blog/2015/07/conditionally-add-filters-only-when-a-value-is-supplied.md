---
title: 'Conditionally add filters only when a value is supplied'
navMenu: false
pubDate: 2015-07-25T07:30:26+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - Linq
---

If you are converting a series of optional filters in a UI into an IQueryable, you’ll find yourself writing a lot of if-statements to only add a filter if a value is supplied.

```csharp
if (myNumber!= 0)
{
    query = query.Where(t => t.Number.Equals(myNumber));
}

if (myName!= 0)
{
    query = query.Where(t => t.Name.Equals(myName));
}
```

I have been using the following extension methods to clean up this act, it conditionally adds the filter only if a value has been supplied (note: in my case 0 always means nothing was selected…).

```csharp
/// <summary>
/// Conditionally adds a Where expression IF the property has a non-zero value
/// </summary>
/// <param name="query">An existing IQueryable<Vehicle> query.</param>
/// <param name="property">The property to be checked.</param>
/// <param name="predicate">The predicate to be used within the .Where() method.</param>
/// <returns></returns>
public static IQueryable<T> AddFilterIfValue<T>(this IQueryable<T> query, int property, Expression<Func<T, bool>> predicate)
{
    if (property > 0)
    {
        return query.Where(predicate);
    }

    return query;
}

/// <summary>
/// Conditionally adds a Where expression IF the property has a non-empty value
/// </summary>
/// <param name="query">An existing IQueryable<Vehicle> query.</param>
/// <param name="property">The property to be checked.</param>
/// <param name="predicate">The predicate to be used within the .Where() method.</param>
/// <returns></returns>
public static IQueryable<T> AddFilterIfValue<T>(this IQueryable<T> query, string property, Expression<Func<T, bool>> predicate)
{
    if (!string.IsNullOrWhiteSpace(property))
    {
        return query.Where(predicate);
    }

    return query;
}
```

You call it like this…

```csharp
query = query.AddFilterIfValue(myNumber, t => t.Number.Equals(myNumber));
```

And it can be chained, so you can do it like this…

```csharp
query = query
    .AddFilterIfValue(myNumber, t => t.Number.Equals(myNumber))
    .AddFilterIfValue(myName, t => t.Name.Equals(myName));
```

Additional note: don’t forget to use the returned value, i.e. this won’t work because you forgot to assign the returned query to a variable…

```csharp
query
    .AddFilterIfValue(myNumber, t => t.Number.Equals(myNumber))
    .AddFilterIfValue(myName, t => t.Name.Equals(myName));
```