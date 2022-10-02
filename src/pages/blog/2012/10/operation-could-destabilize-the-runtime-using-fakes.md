---
layout: src/layouts/Default.astro
navMenu: false
title: 'Operation could destabilize the runtime using fakes'
pubDate: 2012-10-23T23:24:30+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=708'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
---

A while ago I wrote about [Fakes, Stubs and Shims in Visual Studio](https://www.stevefenton.co.uk/2012/07/Fakes-Stubs-And-Shims-In-Visual-Studio-2012/) and I have been chewing my own dog food by using them, rather than a mocking framework in my recent work.

When faking your own classes and interfaces, there isn’t much to talk about in this respect – things do seem to just work. The problems arise when you need to fake certain system classes, at which point you get the rather serious message:

> System.Security.VerificationException:  
> Operation Could Destabilize The Runtime

I received this error when using a fakes assembly to stub an HttpControllerContext and an HttpActionDescriptor, both of which reside in the System.Web.Http.Controllers namespace. I have heard of similar issues in other System.Web namespaces, such as MVC.

There is actually [an issue raised on Microsoft Connect](https://connect.microsoft.com/VisualStudio/feedback/details/740778/verificationexception-when-faking-mvc4-and-instantiating-controller-in-unit-test7) for this error message. The only slight hitch is that it has been deferred. So I opted to remove the fakes from my test.

Removing the calls to the StubHttpControllerContext and StubHttpActionDescriptor is not enough! You will still get errors. You will need to completely remove the fakes and potentially restart visual studio to clear the issues!

In my case, I had to substitute the fakes for Rhino Mocks while I await for a fix or a work-around!