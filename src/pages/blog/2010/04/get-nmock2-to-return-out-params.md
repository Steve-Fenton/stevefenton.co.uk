---
layout: src/layouts/Default.astro
title: 'Get NMock2 to Return Out Params'
navMenu: false
pubDate: 2010-04-29T21:41:44+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - Mocking
---

There are plenty of mocking frameworks out there, with Rhino Mocks and Moq leading the way. Personal preferences aside, I am currently working on a project that is using NMock2 for mocking and found that the following feature isn’t very well known.

In the process of adding unit tests to some legacy code, before I started making potentially breaking changes, I discovered that I needed my mock to return an out parameter. It wasn’t immediately obvious how to do this, but I did manage to work out how to make this happen.

I imagine there are other NMock2 users out there that will be looking for an answer to this question, so I thought I would share my solution.

The below method is an example of a typical method, which returns true or false, but also information about errors. You probably wouldn’t do things quite this way, but you will probably find things like this in your code base somewhere.

```csharp
result = _provider.NotifyChange(
    order,
    supplier,
    out errors
);
```

In order to set up a mock in NMock2, you would normally do something like this:

```csharp
Expect.Once.On(provider).Method("NotifyChange").Will(Return.Value(true));
```

But in our example, we need the out-parameter to be set, otherwise we’ll get an error. To get your mock to do this, follow this example:

```csharp
Expect.Once.On(provider).Method("NotifyChange")
    .Will(new SetNamedParameterAction("Errors", errors), Return.Value(true));
```

If you get a “no such parameter” message, check that you are passing in the parameter as declared on the method, not the name of the variable you are passing into the method (commonly, the method requires a parameter named “Errors” and you pass in “errors”, so you’ll need to use “Errrors”).