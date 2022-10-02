---
id: 2894
title: 'ASP.NET MVC widgets with RenderAction'
pubDate: '2017-11-18T08:50:25+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=2894'
permalink: /2017/11/asp-net-mvc-widgets-renderaction/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"dec1e7fccd4c";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/dec1e7fccd4c";}'
categories:
    - Programming
tags:
    - asp.net
    - 'c#'
    - mvc
---

This is a useful pattern that I have successfully employed a couple of times with ASP.NET MVC applications; creating Widgets with RenderAction.

The prevalent way to create a page in ASP.NET MVC is to grab a bunch of stuff in the controller and pass it into a view to be rendered. As the application grows, controllers tend to become mini data-aggregation integration services. At the same time, views gravitate towards using too much data because they can access so much stuff. If you are disciplined, you’ll solve some of these problems using partial views that depend on smaller models. If this is the extent of your problems, my pattern may not be terribly appealing just yet.

There are some additional benefits of creating Widgets with RenderAction.

- Configurable Layouts: you can dynamically add, move, and remove widgets. We stored the widgets in a database table against each user.
- Granular Exception Handling: you can handle exceptions per-widget, and report the exact widget configuration that errored
- Resilient Pages: if one widget fails for any reason, the rest of the page can still load
- Small, Manageable Widgets: each widget is entirely responsible for one small thing, and it lives on a controller that is responsible for one small area. This may map to your microservice architecture, for example.
- Small, Manageable, Cachable Data: widgets *can* have their own cache policies, giving you caching super-powers (caching small parts based on what data they need, how frequently they update, how frequently they are used, and so on).
- Optional smart CSS and JavaScript loading: just like you can name your MVC views using a convention, you can do the same with your CSS and JavaScript and create a schedule to pass to your module loaders / async loaders / bundlers etc.

The important idea behind Widgets with RenderAction is:

> Each Widget is passed the smallest amount of information possible to allow it to be responsible for its own data, view, CSS, and JavaScript.

That means you don’t pass a “Customer” to the “Customer Profile” widget. You pass the minimum you can get away with… perhaps just the Customer Id. The “Customer Profile” widget is an action that lives on your Customer controller. The Customer controller should be the only controller that deals with a Customer. The “Customer Profile” widget gets the tiny model it needs, forwards it to its tiny partial view and has any specific JavaScript and CSS in tiny files that live with the view. If you need to edit the “Customer Profile” widget, you need only look at the Controller Action, and the three UI files – each of which has just a few lines to manage.

Side note… this has been successfully managed with BEM, LESS, and TypeScript. The Widget pattern doesn’t demand any of these, but they help to solve other problems.

Let’s look at the practical parts.

### Widget model

The first thing we need is a simple Widget class, that will look familiar to any ASP.NET MVC programmer – because it minimally needs to store the information needed to render an action:

```
<pre class="prettyprint lang-c#">   public class Widget
    {
        public string Action { get; private set; }
        public string Controller { get; private set; }
        public object RouteValues { get; private set; }

        public Widget(string action, string controller, object routeValues)
        {
            Action = action;
            Controller = controller;
            RouteValues = RouteValues;
        }
    }
```

And for our top level page, we’ll have a collection of Widgets that we want to render:

```
<pre class="prettyprint lang-c#">    public class WidgetIndexModel
    {
        public IList Widgets { get; set; } = new List();
    }
```

### Primary controller

The default controller is responsible for one thing… getting a list of widgets and passing them to the primiary view. In the example below there are just two hard coded widgets, but in reality there will be a number of widgets and you’ll probably store them somewhere and retrieve them based on the request (for example, but host name, or some request parameter).

```
<pre class="prettyprint lang-c#">    public class PrimaryController : Controller
    {
        public ActionResult Index()
        {
            var model = GetWidgetIndexModel();

            return View(model);
        }

        private static WidgetIndexModel GetWidgetIndexModel()
        {
            var model = new WidgetIndexModel();

            model.Widgets.Add(new Widget("Horizontal", "Navigation", new { id = 1 }));
            model.Widgets.Add(new Widget("Erroring", "Widget", new { id = 1 }));

            return model;
        }
    }
```

### Primary view

The primary view is also relatively simple. It just loops through each widget and calls RenderAction, with a little exception handling. The exception handler calls logging with the widget details and the exception details, so you’ll always know exactly what went wrong if there is a problem (but depending on which widget exploded, you are likely to have a reasonable working page for your users still). The exception handler also emits a simple tag that can be used with [Katelyn Crawler](https://github.com/Steve-Fenton/Katelyn) to detect any problems with your web application. Because the pages are resilient to individual widget faults, they will be reporting a 200 status code and sending back a mostly-rendered page – but you’ll want to be able to treat those pages as errors when you test them.

```
<pre class="prettyprint lang-c#">@model Widget.Controllers.WidgetIndexModel
    
@foreach (var widget in Model.Widgets)
{
    try
    {
        Html.RenderAction(widget.Action, widget.Controller, widget.RouteValues);
    }
    catch (Exception ex)
    {
        Widget.Controllers.Logger.Log(widget, ex);
        <!-- KATELYN:ERRORS(1) -->
    }
}
```

All you need to do to change the layout is change the widgets-at-rest in your storage. You could serve different widgets for different requests, or re-order them, or show/hide them conditionally. This all belongs to the process of retrieving the widgets to be displayed.

### Performance of widgets with RenderAction

With a short-lived in-memory cache, you can eliminate all of the concerns you might have about multiple widgets potentially asking for the same data. This widget architecture has been proven on large multi-tenanted public websites, with the widget collection being generated by host name and with 30-50 widgets per page. Given most requests took way under 200ms, an in-memory cache that holds onto frequently accessed data for a very short time will prevent situations where “all 50 widgets ask for the same data” (this is not a situation that occurs if you are following the Widgets with RenderAction pattern closely). In reality, many applications don’t even need to introduce the cache. You’ll need to decide for yourself based on your own performance tests.

With the runtime performance all sorted, it is worth turning around the question and considering the development and maintenance benefts… which are enormous. Widgets with RenderAction massively reduce dependencies… including the accidental dependency of a view that needs to show a banner being passed half of the information in the database due to massive view models.

### Summary

The Widgets with RenderAction pattern is very easy to implement in ASP.NET MVC, and it immediately adds a level of dynamic templating that you would have thought would cost much more. The page resilience is no small benefit either. Even if you don’t hand total control of the widgets to an end user, there are plenty of benefits to keeping everything small and manageable.