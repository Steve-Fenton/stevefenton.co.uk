---
layout: src/layouts/Default.astro
title: 'Squash ASP.NET MVC ModelState errors into a string or JSON'
navMenu: false
pubDate: 2016-12-09T08:07:46+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - JSON
    - MVC
---

Once ASP.NET MVC has done all of the hard work of validating a model for you, you may find yourself wanting to squash the ModelState values into a string or JSON object. Because of the hierarchy, it might not be obvious at first glance how to do this, so your best bet would be to write it down on your blog so you can remember:

```csharp
string errors = JsonConvert.SerializeObject(ModelState.Values
    .SelectMany(state => state.Errors)
    .Select(error => error.ErrorMessage));
```