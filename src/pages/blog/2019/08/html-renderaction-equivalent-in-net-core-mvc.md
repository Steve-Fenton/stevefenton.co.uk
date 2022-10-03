---
layout: src/layouts/Default.astro
title: 'Html.RenderAction equivalent in .NET Core MVC'
navMenu: false
pubDate: 2019-08-28T23:25:13+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - Core
    - MVC
---

If you were a fan of [ASP.NET MVC Widgets](/2017/11/asp-net-mvc-widgets-renderaction/) using `Html.RenderAction`, you might be a bit stunned that `RenderAction` is nowhere to be found in .NET Core. Don’t worry, though, because there is a `Html.RenderAction` equivalent in .NET Core MVC and it’s called View Components.

## View component class

The view component class is quite a lot like a controller. It inherits from the `ViewComponent` class and *should* be named \[Something\]ViewComponent as this is a convention. You grab a model and send it to a view in a very familiar way.

The View Component class always has an `Invoke` method.

```csharp
    public class NavigationViewComponent
        : ViewComponent
    {

        public IViewComponentResult Invoke()
        {
            SomeModel model = GetSomeModel();

            return View(model);
        }
    }
```

## Default view

The view needs to be placed in a special location. View Components views are placed in a folder structure according to the View Component name.

`/Views/Shared/Components/[ComponentName]/Default.cshtml`

Because my View Component class is called `NavigationViewComponent`, it goes in:

`/Views/Shared/Components/Navigation/Default.cshtml`

The view itself is just like any Razor view… so you’ll already know all about that!

## Rendering the action, er… Invoking the View Component

All you need to do to call out to the View Component is invoke it.

```html
<nav>
@await Component.InvokeAsync("Navigation")
</nav>
```

If you need to pass arguments, that’s easy too:

```html
<nav>
@await Component.InvokeAsync("Navigation", new { page = 3 })
</nav>
```

This will call out to the view component, which will go and get the data it needs, and render the content that will appear where you first invoked it.

## Summary

View Components are a neat way to implement Widgets in your .NET Core MVC application.