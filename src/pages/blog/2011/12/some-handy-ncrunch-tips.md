---
layout: src/layouts/Default.astro
title: 'Some handy NCrunch tips'
navMenu: false
pubDate: 2011-12-07T17:14:43+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - NCrunch
---

I have spent a little time today setting up [NCrunch for Visual Studio](http://www.ncrunch.net/). NCrunch is a handy extension that runs all your tests (unit and integration) in the background while you code and reports any failures to you as they happen. It also shows you code coverage in the margin of your actual code files. This is awesome.

So once you have downloaded NCrunch, what do you do? Here are my top tips for a trouble-free first run.

Open up NCrunch options, from the NCrunch menu in the Visual Studio Toolbar. For all projects in your solution, set “CopyReferencedAssembliesToWorkspace” to true. This means that referenced projects will end up in the bin directory of the copy that NCrunch creates – this is important if you want stuff to run.

If you have signed assemblies and have used the dummy-file VS\_KEY hack, you need to include your dummy VS\_KEY files in your project so they get copied to the folder NCrunch uses to run the tests.

If something doesn’t appear to be working, open up the NCrunch options and set “LogToOuputWindow” to true and “LogVerbosity” to medium.

The final tip is to make use of the NCrunch Environment Variable wherever you need to do something special for NCrunch. In my case, I’m using it to point NCrunch at a local database for integration tests.

```csharp
return Environment.GetEnvironmentVariable("NCrunch") == "1" ?
    ConfigurationManager.AppSettings["ncrunchConnectionString"] :
    ConfigurationManager.AppSettings["dbConnectionString"];
```

These may seem like simple things, but knowing them now will save you a bit of time when you get started with NCrunch. I can’t over-state just how excellent this extension is, especially for TDD teams.