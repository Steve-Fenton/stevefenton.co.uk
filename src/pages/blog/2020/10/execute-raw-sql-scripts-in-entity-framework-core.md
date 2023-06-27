---
title: Execute raw SQL scripts in Entity Framework Core
navMenu: false
pubDate: 2020-10-13T07:00:36+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - C-Sharp
    - 'Entity Framework'
---

Most of the time, Entity Framework Core will just *do the right thing*. Every now and then, though, you’ll find that it’s doing something in a bit of a sticky way and you’ll want to take control. Usually it’s when you’re deleting a range on a table with cascading deletes.

Here’s an example of the Entity Framework code that will take a bit longer than you might want:

```csharp
_context.Checks
    .RemoveRange(_context.Checks.Where(c => c.OrganisationId == model.OrganisationId));

await _context.SaveChangesAsync();
```

Please be careful here, as there is a method called `ExecuteSqlRaw` that could end up allowing Bobby Tables to trash your database. The method you are looking for is `ExecuteSqlInterpolatedAsync`, which will automatically convert an interpolated string into a parameterised query.

```csharp
await _context.Database
    .ExecuteSqlInterpolatedAsync($"DELETE FROM Checks WHERE OrganisationId = {model.OrganisationId}");
```

In cases where your Entity Framework version was problematic or slow, this will run at the speed of `DELETE`. In my case, that’s about 30 seconds faster (as the Entity Framework one was taking 30 seconds).

You can also retrieve your items using a custom SQL statement, in cases where you need to get them from a view, or do something outside of the norm. The example below is overly simple, but you’ll see the idea. When you want your proper entities back, you run the SQL from the `DBSet` level, rather than on `_context.Database`.

```csharp
_context.Checks
    .FromSqlInterpolated($"SELECT * FROM Checks WHERE Organisation = {model.OrganisationId}");
```

The interpolated SQL methods are super useful and are a neat shortcut for setting up a command, adding command text, adding parameters, and all that ADO ephemera.