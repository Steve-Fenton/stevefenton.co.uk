---
title: 'Adding Unity to your Web API project'
navMenu: false
pubDate: 2013-06-10T12:09:46+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - MVC
    - Unity
---

Adding Unity V3 to your ASP.NET Web API project is so easy it very nearly hurts. Despite this, I can foresee a couple of “duh” moments if you don’t spot a couple of minor details.

To get started, you just open up the NuGet package manager, search online for Unity and select the appropriate version – there are versions for MVC and Web API – so in this case you select the Web API version, hit the install button and NuGet does very nearly everything. Very nearly.

## But Not Quite

To get going, you will need to add the following line to the Application\_Start method in Global.asax.cs

```csharp
Bootstrapper.Initialise();
```

Everything else has been done for you, so once you have added this line, you can start registering types inside of the Bootstrapper class and depend on them in your API controllers. This leads us to the next “duh” moment.

## API Controllers

When you install the Web API version of Unity, it only supplies funk to the Web API controllers. As you know, you can also have normal MVC controllers in your project, but these don’t get any love.

In order to get Unity involved in supplying dependencies to your MVC controllers as well as your Web API controllers, the easiest thing to do is add the MVC NuGet package on top. When you do this, you’ll get the option to replace Bootstrapper.cs – but **do not overwrite your Bootstrapper.cs file**… do this – just add the following to your existing file:

Before:

```csharp
public static void Initialise()
{
    var container = BuildUnityContainer();
    GlobalConfiguration.Configuration.DependencyResolver = 
        new Unity.WebApi.UnityDependencyResolver(container);
}
```

After:

```csharp
public static void Initialise()
{
    var container = BuildUnityContainer();
    DependencyResolver.SetResolver(new UnityDependencyResolver(container));
    GlobalConfiguration.Configuration.DependencyResolver = 
        new Unity.WebApi.UnityDependencyResolver(container);
}
```

You will need to have the following using statements:

```csharp
using System.Web.Http;
using System.Web.Mvc;
using DomainExample.Repository;
using Microsoft.Practices.Unity;
using Unity.Mvc4;
```

All of the other references and config changes will be done for you – but you can now register one list of types to re-use in all your controllers.