---
layout: src/layouts/Default.astro
navMenu: false
title: 'Mocking NHJump In Your Unit Tests'
pubDate: 2010-09-16T20:41:33+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1005'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - nhibernate
    - nhjump
    - nmock
---

[NHJump](https://code.google.com/archive/p/nhjump/) is an excellent way to jump start your NHibernate implementation, giving you instant repositories and query definitions from the word go. Here is a quick bit of information on how you can go about stubbing and mocking the NHJump repository for the purposes of Unit Testing.

Please note… this is an initial draft and there may be a better way to do this! Also, these examples are in NMock2, which just happens to be what I am using today. You can easily transfer the idea to Rhino or Moq as you see fit.

First of all, these examples use the following mocks…

```
<pre class="prettyprint lang-csharp">
var mockery = new Mockery();
// This is a mock of the repository
IRepository myMockRepository = mockery.NewMock>();
// This is a mock of an executable query
IExecutableQuery _myMockExecutableQuery = mockery.NewMock>();
// This is a mock of an IValue
NhJump.Persistence.Batching.IValue myMockValue = mockery.NewMock>();
```

Stub the call on the IRepository (ById, ByTitle, All etc).

```
<pre class="prettyprint lang-csharp">
Stub.On(myMockRepository).Method("ById")
    .With(1)
    .Will(Return.Value(myMockExecutableQuery));
```

Stub the call to PrepareQuery (under the hood)

```
<pre class="prettyprint lang-csharp">
Stub.On(myMockRepository).Method("PrepareQuery")
    .WithAnyArguments()
    .Will(Return.Value(myMockExecutableQuery));
```

Stub the call to Enumerate (under the hood).

```
<pre class="prettyprint lang-csharp">
var myReturnValue = new List { myDomainObject };
Stub.On(myMockExecutableQuery).Method("Enumerate")
    .Will(Return.Value(myReturnValue));
```

You may find you also need to Stub other under-the-hood framework stuff, such as…

```
<pre class="prettyprint lang-csharp">
Stub.On(myMockExecutableQuery).Method("Unique")
    .Will(Return.Value(myMockValue));
```

And as you often get an IValue back from the repository, you’ll need to mock it like this:

```
<pre class="prettyprint lang-csharp">
Stub.On(myMockValue).GetProperty("Value").Will(Return.Value(myDomainObject));
```

If you have some tips and tricks that make this even easier, please shout and I’ll update the examples.