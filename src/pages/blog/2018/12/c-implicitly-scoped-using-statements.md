---
layout: src/layouts/Default.astro
title: 'C# implicitly scoped using statements'
navMenu: false
pubDate: 2018-12-22T14:41:35+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - C-Sharp
---

This is a little gold nugget that is coming in C# 8 – implicitly scoped using statements.

On a simple level, it means that when you consume an `IDisposable` class your previously explicitly scoped using statements:

```csharp
using (var connection = GetConnection())
{
    // Use the connection, it will be disposed of at the end
}
```

Can now be implicit:

```csharp
using var connection = GetConnection();

// Use the connection, it will be disposed of at the end
```

This is especially nice if you are using a few disposable objects, because this always looked a bit odd:

```csharp
using (var connection = GetConnection())
using (var command = GetCommand(connection))
{
    // Use the connection, it will be disposed of at the end
}
```

So implicitly scoped using statements make things look more typical:

```csharp
using var connection = GetConnection();
using var command = GetCommand(connection);

// Use the connection, it will be disposed of at the end
```

You can also use it thus;

```csharp
using var command = GetCommand(using GetConnection());

// Use the connection, it will be disposed of at the end
```

You can still use explicit scope if you need to, but when you don’t need it, implicit scope is much more readable.