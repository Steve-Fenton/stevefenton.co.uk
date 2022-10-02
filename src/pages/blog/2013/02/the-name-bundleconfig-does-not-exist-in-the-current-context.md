---
id: 651
title: 'The name BundleConfig does not exist in the current context'
pubDate: '2013-02-18T22:01:11+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=651'
permalink: /2013/02/the-name-bundleconfig-does-not-exist-in-the-current-context/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - mvc
---

Given that there are currently no results on The Web that give a good answer to the following error, I thought I’d help out and supply the information.

The error is…

“The name ‘BundleConfig’ does not exist in the current context”

Usually this means you have the following line of code in your Global.asax.cs file, perhaps in an ASP.NET MVC project.

```
<pre class="prettyprint lang-javascript">
BundleConfig.RegisterBundles(BundleTable.Bundles);
```

There are two possible reasons for this error.

### Namespace

The most obvious and easy to fix error will be that when you added your App\_Start/BundleConfig class, Visual Studio put in the namespace YourApp/App\_Start namespace. All of the other App\_Start classes will be in the YourApp namespace. So go edit:

```
<pre class="prettyprint lang-csharp">
namespace YourApp.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            //...
```

And change it to:

```
<pre class="prettyprint lang-csharp">
namespace YourApp
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            //...
```

### Optimization Package

The second most obvious reason will be that you don’t have the System.Web.Optimization assembly.

To fix this, right-click on your solution, click on “Manage NuGet packages for solution” and search for…

Microsoft ASP.NET Web Optimization Framework

Then just install the package and you’re good to go.