---
layout: src/layouts/Default.astro
title: Stripping times from dates in C#
navMenu: false
pubDate: 2021-08-25T09:58:03+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - 'csharp'
---

This is a surprisingly common problem in C#, where you need to take a `DateTime` and strip off the “time” bit to leave you with a representation of a day. Currently, you can do it by creating a new `DateTime` and passing only the parts you want to keep, like year, month, and day.

```csharp
DateTime expiryDateOnly =
    new DateTime(expiryDate.Year, expiryDate.Month, expiryDate.Day);
```

## .NET 5

The solution in .NET 5 is to use the `Date` property of the `DateTime` object. This also returns a `DateTime`, like the original solution, but it has the time stripped.

```csharp
DateTime expiryDateOnly =
    expiryDate.Date;
```

Thank you Data Elemental for this solution.

## .NET 6

In .NET 6 we get an upgraded solution with some built in types. To solve our current case, we can use the `DateOnly` type, and there is an equivalent `TimeOnly` type too.

```csharp
DateOnly expiryDateOnly =
    DateOnly.FromDateTime(expiryDate);
```

These new types offer a similar benefit to typed identities (i.e. having a `ProductId` rather than an `int`). If you require a date-only date, you can’t be accidentally passed a date with a time.

I’m looking forward to updating my date code to remove all the manual mapping to date-only dates!