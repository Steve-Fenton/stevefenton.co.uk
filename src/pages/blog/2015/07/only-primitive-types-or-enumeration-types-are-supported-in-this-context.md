---
title: 'Only primitive types or enumeration types are supported in this context'
navMenu: false
pubDate: 2015-07-27T07:30:41+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - Linq
---

This error popped up and I’m sure that it is vague enough to catch me out again in the future.

> Additional information: Unable to create a constant value of type ‘System.Object’. Only primitive types or enumeration types are supported in this context.

There are two common causes for this error. One is obvious and the other less so.

## The Obvious One

Here is the obvious version. You are querying all your Customers. Each customer has a list of Books and you want all customers who have a copy of the cult-automation-classic “The Humans Are Dead”.

```csharp
var awesomeCustomers = customers
    .Where(c => c.Books.Contains(theHumansAreDead));
```

Oops! Contains can’t be used here… and the error almost makes sense. We can fix this using:

```csharp
var awesomeCustomers = customers
    .Where(c => c.Books.Any(b => b.Id == theHumansAreDead.Id));
```

## The Less Obvious One

The less obvious version is generated with the below code.

```csharp
var awesomeCustomers = customers
    .Where(c => c.Id.Equals(myId));
```

There is nothing much to connect the dots here, but the problem is caused by the use of Equals, rather than == in the Where expression. You can solve this using:

```csharp
var awesomeCustomers = customers
    .Where(c => c.Id == myId);
```

This may surprise some polyglot programmers because some languages require the use of Equals, rather than == in order to perform a value check rather than a reference check. In C# you are safe to use == on value types where both items are the same type ([the Equals method is recommended for reference types](http://blogs.msdn.com/b/csharpfaq/archive/2004/03/29/when-should-i-use-and-when-should-i-use-equals.aspx))