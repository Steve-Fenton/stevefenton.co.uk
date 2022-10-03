---
layout: src/layouts/Default.astro
navMenu: false
title: 'Fakes, stubs, and shims in Visual Studio 2012'
pubDate: 2012-07-08T15:39:10+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=770'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'csharp'
---

Visual Studio 2012 has a really cool new feature called Fakes. It gives you two things for free, it gives you stubs and shims with minimal code needed to use them.

To generate these free stubs and shims, right-click on the reference to the assembly you are going to fake and select “Add Fakes assembly”.

### Stubs

Rather than use a mocking framework, you now use the compile-time generated stubs that Visual Studio made for you:

```
<pre class="prettyprint lang-csharp">
var stub = new StubIMyInterface()
{
    MyMethod = () => { return "My return value"; }
};

var target = new ClassToTest(stub);
```
### Shims

When you can’t refactor the code but need to test it, you can use a shim.

> “Isolating the brute force way” – Peter Provost.

Again, right-click on the reference to the assembly you want to shim and select “Add Fakes assembly”.

We then add a ShimsContext to prevent any shims from interfering with other tests and use the shim.

```
<pre class="prettyprint lang-csharp">
using (ShimsContext.Create())
{
    ShimMyClass.MyPropertyGet = () => "My return value";
    var result = target.MethodToTest();
}
```
Without the context, the shim would apply to everything in this app domain, for the rest of time, which would be a problem.