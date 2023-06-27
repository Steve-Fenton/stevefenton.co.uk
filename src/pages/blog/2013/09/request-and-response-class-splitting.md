---
title: 'Request and response class splitting'
navMenu: false
pubDate: 2013-09-27T10:52:09+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - MVC
---

This is something I don’t seen done a lot in real life, so I thought I’d write briefly about it. This topic gets a lot of talk, but not much action and in reality I think schedule pressures are the most likely reason for this refactoring (and most others) never actually get considered.

I’m talking about encapsulation – and this word may well make you cease reading immediately. Yes, putting data and methods together in one place is encapsulation and we know all about that. Yet I still see the following code all over the place.

```csharp
public class Cat
{
    public int CatId;
    public FelineBreed Breed;
    public string Name;
}

//...

public Cat Add(Cat newCat)
{
    //...
}
```

You will see this kind of pattern often – you want to add a cat, so you create a new Cat object and pass it to the Add method. This is a really simple demonstration of the problem.

When I create a new cat to pass to the Add method, I am presented with three fields I can set: CatId, Breed and Name. Really, I don’t need (and shouldn’t) set the CatId.

Of course, I’m not just talking about identifiers – there are often many bits of data you are not expected to pass when creating a new object to store – but because we re-use the same object for saving as we do for presenting back, we end up accepting these additional things that we don’t need (or want) populated. At best, we are probably ignoring anything that gets passed, at worst, we are allowing someone to accidentally overwrite cat number 1, or we are going to get a duplicate key exception.

A better course of action is to split out the cat details so they can be used without the unnecessary data:

```csharp
public class CatDetails
{
    public FelineBreed Breed;
    public string Name;
}

public class Cat
{
    public int CatId;
    public CatDetails Details;
}

//...

public Cat Add(CatDetails newCat)
{
    //...
}
```

We can now accept some new cat details, which don’t even include any of the things we don’t want. We also re-use this details object on our full cat implementation – so we haven’t duplicated anything. When we want to add “eye colour”, we know we want to add that to CatDetails.

You should definitely be doing this for your public APIs, especially if you auto-generate your documentation.