---
layout: src/layouts/Default.astro
navMenu: false
title: 'Code contracts fail to fire'
pubDate: 2012-10-09T23:30:50+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=714'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - aop
    - 'c#'
---

If you are using Code Contracts in .NET and you find that they aren’t running, there are a few simple checks to perform to work out why those clever little definitions aren’t working.

If you have used Code Contracts a couple of times, these are the most likely reasons the Code Contracts aren’t doing anything when you call a method that you think is being checked.

### Attribute Problem

It is highly likely that you’ve forgotten to add both of the required attributes – one to the interface and one to the contract definition.

```
<pre class="prettyprint lang-csharp">
[ContractClass(typeof(ContractsForIRepository<,>))]
public interface IRepository<T, in TId> where T : IEntity
{
    //...
    
[ContractClassFor(typeof(IRepository<,>))]
internal abstract class ContractsForIRepository<T, TId> : IRepository<T, TId> where T : IEntity
{
    //...
```
### Project Problem

It is also highly likely that you’ve forgotten to set up Code Contracts against your project in Visual Studio!

If you go to Project &gt; Properties and select the Code Contracts tab, you may have forgotten to switch them on! Here are the settings I generally use – everything not mentioned is not ticked!

- Assembly Mode: Standard Contract Requires
- Runtime Checking &gt; Perform Runtime Checking: Full
- Static Checking &gt; Perform Static Contract Checking: Yes
- Static Checking &gt; Check in Background: Yes
- Static Checking &gt; Show squiggles: Yes
- Static Checking &gt; Cache Results: Yes
- Static Checking &gt; Suggest Requires: Yes