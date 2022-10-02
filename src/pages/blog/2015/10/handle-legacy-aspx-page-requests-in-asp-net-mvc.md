---
id: 1471
title: 'Handle legacy .aspx page requests in ASP.NET MVC'
pubDate: '2015-10-05T19:00:26+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1471'
permalink: /2015/10/handle-legacy-aspx-page-requests-in-asp-net-mvc/
categories:
    - Programming
tags:
    - .net
    - mvc
    - routing
---

If you have a public web application that you are upgrading from Web Forms to ASP.NET MVC, you may find yourself wanting to capture requests to the now obsolete .aspx addresses.

By default, these requests won’t be passed to your application so you won’t be able to catch them using a route. So to get hold of them in your application you’ll need to make a change to your Web.config file to ensure .aspx requests are sent to your application:

```
<pre class="prettyprint lang-xml"><!-- ... -->
<system.webServer>
	<handlers>
	  <!-- ... -->
	  <add name="AspxHandler" path="*.aspx" verb="GET" type="System.Web.Handlers.TransferRequestHandler" preCondition="integratedMode,runtimeVersionv4.0" />
	</handlers>
</system.webServer>
```

Once you have updated the Web.config, you can create a route to pass these requests to an action:

```
<pre class="prettyprint lang-csharp">public static void RegisterRoutes(RouteCollection routes)
{
    // ...

    routes.MapRoute(
        name: "AspxRoute",
        url: "{permalink}.aspx",
        defaults: new { controller = "LegacyRedirection", action = "Aspx" }
    );
}
```

And within your controller you can do whatever you like with the request, for example redirect it to the new address, or display content, or whatever you like.

```
<pre class="prettyprint lang-csharp">public class LegacyRedirectionController : Controller
{
    public ActionResult Aspx(string permalink)
    {
        ViewBag.PermaLink = permalink;
	//TODO: redirect, or fetch content - you choose! 
        return View();
    }
}
```