---
layout: src/layouts/Default.astro
navMenu: false
title: 'Understand the intent before making changes'
pubDate: 2013-05-03T14:45:42+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=599'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - ddd
---

(Quick note… I didn’t know there was a good name for this when I wrote this article, but for more general reading on this check out Chesterton’s Fence.) There is a clever pattern in domain-driven-design whereby you create an object to represent identifiers in your model. For example, if you have a Client object, you replace the numeric id with an object called ClientId.

The reason for this is that it prevents incorrect ids being passed to method, because the methods don’t allow a general type, but require the specific id type.

Here is a quick example…

```
<pre class="prettyprint lang-csharp">
DeleteCustomer(customer.ProductId);
```

If both ProductId and CustomerId are integers, the compiler will allow this mistake. If the CustomerId was 1, and the ProductId was 2, we are in danger or deleting the wrong customer – and this could be a very tricky bug to un-pick (imagine it was an operation less obvious than delete – you could get some very strange behaviour in your system!)

So the idea behind the ClientId and ProductId objects is that the compiler can tell you that you can’t pass a ProductId argument because the method expects a parameter of type ClientId. Cracking.

So where can this go wrong… Imagine you start off with the following ClientId object:

```
<pre class="prettyprint lang-csharp">
public class ClientId : Int32Identity
{
    public ClientId(Int32 value)
    {
        Value = value;
    }
}
```

This is a very simple class that just wraps an Int32 in an object, so we can get type-checking.

A few weeks later, someone writes the following line of code and it makes them think that an improvement could be made…

```
<pre class="prettyprint lang-csharp">
myCustomer.Id = 1; // error
```

“Wouldn’t it be nice if I *could* write this line of code!” they might say. And off they go to add an implicit operator to the ClientId class. I slightly blame Jon Skeet for this, because every time someone reads his excellent “C# in Depth” book (which I heartily recommend) they get a bit over-excited about operators and extension methods.

So we end up with the following class:

```
<pre class="prettyprint lang-csharp">
public class ClientId : Int32Identity
{
    public ClientId(Int32 value)
    {
        Value = value;
    }
    
    public static implicit operator ClientId(int id)
    {
        return new ClientId(id);
    }
}
```

This does indeed mean we can directly assign the integer to the CustomerId, but it also ruins the entire intent of the code, because now we can pass any integer wherever a ClientId object is required and it will get converted implicitly.

So really, if the operator is to be added at all, it should be an explicit operator, so the programmer can see the intent of the design – which is “be careful to use the correct id”.