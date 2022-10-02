---
layout: src/layouts/Default.astro
navMenu: false
title: 'Theme an ASP.NET MVC website with custom views'
pubDate: 2021-11-22T17:07:03+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - asp.net
    - 'c#'
    - mvc
---

We have a multi-tenant website that allows a single app to be deployed to a web farm to manage requests for ~1,000 different websites. Content and themes are looked up based on the host name. Traditionally, we used a component list to customise the HTML served for each theme, where you could set specific components for things such as navigation and apply the theme to that custom component. Recently we pivoted towards an alternative mechanism that allows themes to use a custom folder with HTML views.

In this article, I’ll explain how we serve custom HTML views for different themes for the following use cases.

1. A custom theme set, and
2. A sub-set that uses most of the views from a custom theme set, but overrides specific views

The project is ASP.NET full framework version (the project is quite mature).

Kudos to [Dave Beaumont](https://www.dave-beaumont.co.uk/) for the initial work on this, which formed the basis of the code in this article.

### Custom RazorViewEngine

By default, ASP.NET MVC has an opinion on where your views will be. It checks in a folder named after your controller for a file named after your action. For example `/Home/Index` will look for a file named `Index.cshtml` in the folder `/Views/Home/`. If it doesn’t find this view in this folder, it will check `/Views/Shared/`, and finally in `/Views/Error/`.

To implement custom themes, we create an additional folder for each theme, and for each partial set (which is a theme that might only contain one view that should override the parent theme). For the example, imagine we’ve added folders under `/Views/Bespoke/ThemeName/` and `/Views/Bespoke/PartialThemeName/` and the only files we have created is `../Home/Index.cshtml`.

To make these views discoverable in the normal way, we need to implement a custom `RazorViewEngine`. Let’s call our implementation `CustomViewEngine`.

We can wire up our custom view engine in the `Global.asax.cs` file in our `Application_Start` method, by clearing out the default engine and adding our own.

```
<pre class="prettyprint lang-csharp">
public void Application_Start(object sender, EventArgs e)
{
    AreaRegistration.RegisterAllAreas();

    ViewEngines.Engines.Clear();
    ViewEngines.Engines.Add(new CustomViewEngine());

    //... more configuration!
}
```

To implement a custom view engine, we create a class that inherits from `RazorViewEngine` and overrides the methods `FindPartialView` and `FindView`. Almost all the code in each of these methods will end up doing the same thing, so we’ll create a private method that does all the work.

```
<pre class="prettyprint lang-csharp">
public class CustomViewEngine 
    : RazorViewEngine
{
    public CustomViewEngine() 
        : base()
    {
        ViewLocationFormats = _defaultViewLocations.ToArray();
        PartialViewLocationFormats = _defaultViewLocations.ToArray();
        FileExtensions = new string[] { "cshtml" };
    }

    public override ViewEngineResult FindPartialView(ControllerContext controllerContext, string partialViewName, bool useCache)
    {
        // Custom Partial View implementation
    }

    public override ViewEngineResult FindView(ControllerContext controllerContext, string viewName, string masterName, bool useCache)
    {
        // Custom View implementation
    }
```

Because there is a subtle difference between the underlying `CreatePartialView` and `CreateView` method calls that we need to make after we decide which locations to search, we need to wrap these to pass into our shared method.

Some key points are explained after this full example…

```
<pre class="prettyprint lang-csharp">
public class CustomViewEngine 
    : RazorViewEngine
{
    private readonly IList<string> _defaultViewLocations = new List<string>
    {
        "~/Views/{1}/{0}.cshtml",
        "~/Views/Shared/{0}.cshtml",
        "~/Views/Error/{0}.cshtml",
    };

    public CustomViewEngine()
        : base()
    {
        ViewLocationFormats = _defaultViewLocations.ToArray();
        PartialViewLocationFormats = _defaultViewLocations.ToArray();
        FileExtensions = new string[] { "cshtml" };
    }

    public override ViewEngineResult FindPartialView(ControllerContext controllerContext, string partialViewName, bool useCache)
    {
        IView createPartialView(ControllerContext context, string location, string master) => CreatePartialView(context, location);

        return GetCustomView(createPartialView, useCache, controllerContext, partialViewName);
    }

    public override ViewEngineResult FindView(ControllerContext controllerContext, string viewName, string masterName, bool useCache)
    {
        IView createView(ControllerContext context, string location, string master) => CreateView(context, location, master);

        return GetCustomView(createView, useCache, controllerContext, viewName, masterName);
    }

    private ViewEngineResult GetCustomView(Func<ControllerContext, string, string, IView> createView, bool useCache, ControllerContext controllerContext, string viewName, string masterName = "")
    {
        string controller = controllerContext?.RouteData?.Values["controller"]?.ToString();
        string theme = controllerContext?.Controller?.TempData["Theme"]?.ToString().ToLowerInvariant() ?? string.Empty;
        string partialSet = controllerContext?.Controller?.TempData["PartialSet"]?.ToString().ToLowerInvariant() ?? string.Empty;
            
        // Used as a unique name for the cache
        string keyPath = Path.Combine(theme, partialSet, controller, viewName);

        if (useCache)
        {
            string cacheLocation = ViewLocationCache.GetViewLocation(controllerContext.HttpContext, keyPath);

            if (!string.IsNullOrWhiteSpace(cacheLocation))
            {
                return new ViewEngineResult(createView(controllerContext, cacheLocation, masterName), this);
            }
        }

        string[] viewLocationFormats = GetViewLocations(theme, partialSet);
            
        IList<string> searchedPaths = new List<string>();

        foreach (string rootPath in viewLocationFormats)
        {
            string currentPath = string.Format(rootPath, viewName, controller);

            if (FileExists(controllerContext, currentPath))
            {
                ViewLocationCache.InsertViewLocation(controllerContext.HttpContext, keyPath, currentPath);

                return new ViewEngineResult(createView(controllerContext, currentPath, masterName), this);
            }

            searchedPaths.Add(currentPath);
        }

        return new ViewEngineResult(searchedPaths.Distinct().ToList());
    }

    private string[] GetViewLocations(string theme, string partialSet)
    {
        List<string> locations = new List<string>();

        if (!string.IsNullOrWhiteSpace(partialSet))
        {
            locations.Add($"~/Views/Bespoke/{partialSet}/{{1}}/{{0}}.cshtml");
            locations.Add($"~/Views/Bespoke/{partialSet}/Shared/{{0}}.cshtml");
            locations.Add($"~/Views/Bespoke/{partialSet}/Error/{{0}}.cshtml");
        }

        if (!string.IsNullOrWhiteSpace(theme))
        {
            locations.Add($"~/Views/Bespoke/{theme}/{{1}}/{{0}}.cshtml");
            locations.Add($"~/Views/Bespoke/{theme}/Shared/{{0}}.cshtml");
            locations.Add($"~/Views/Bespoke/{theme}/Error/{{0}}.cshtml");
        }

        locations.AddRange(_defaultViewLocations);

        return locations.ToArray();
    }
}
```

### Key points

One incredibly important part of this example is the `keyPath` as this must contain enough information to make it unique. For example, if the `partialSet` variable was not included in this key, you would end up with the first request “winning the cache” and subsequent requests could use the wrong view.

If you change the uniqueness attributes in your own implementation, ensure the key is adjusted accordingly.

The second hugely important aspect of this example is the order of your view locations. You must put the most specific locations first and the default locations last. This is because they will be searched in the order you supply and as soon as a view is found, it will stop looking. This is why the entries are arranged with partial set views first, falling back to custom theme views, and finally to the default locations.

We have avoided writing near-identical code in the two overridden methods by capturing the key difference in local functions named `createPartialView` and `createView`, which we pass in to be used in the two places where the `ViewEngineResult` is created.

### Summary

Creating a custom view engine is a little tricky as there are a couple of traps waiting for you along the way. However, the flexibility it provides in terms of theme customisation is more than worth it.