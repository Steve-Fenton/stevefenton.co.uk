---
layout: src/layouts/Default.astro
title: 'Code contracts fail to fire'
navMenu: false
pubDate: 2012-10-09T23:30:50+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - aop
    - C-Sharp
---

If you are using Code Contracts in .NET and you find that they aren’t running, there are a few simple checks to perform to work out why those clever little definitions aren’t working.

If you have used Code Contracts a couple of times, these are the most likely reasons the Code Contracts aren’t doing anything when you call a method that you think is being checked.

## Attribute Problem

It is highly likely that you’ve forgotten to add both of the required attributes – one to the interface and one to the contract definition.

```csharp
[ContractClass(typeof(ContractsForIRepository<,>))]
public interface IRepository<T, in TId> where T : IEntity
{
    //...
    
[ContractClassFor(typeof(IRepository<,>))]
internal abstract class ContractsForIRepository<T, TId> : IRepository<T, TId> where T : IEntity
{
    //...
```

## Project Problem

It is also highly likely that you’ve forgotten to set up Code Contracts against your project in Visual Studio!

If you go to Project > Properties and select the Code Contracts tab, you may have forgotten to switch them on! Here are the settings I generally use – everything not mentioned is not ticked!

- Assembly Mode: Standard Contract Requires
- Runtime Checking > Perform Runtime Checking: Full
- Static Checking > Perform Static Contract Checking: Yes
- Static Checking > Check in Background: Yes
- Static Checking > Show squiggles: Yes
- Static Checking > Cache Results: Yes
- Static Checking > Suggest Requires: Yes