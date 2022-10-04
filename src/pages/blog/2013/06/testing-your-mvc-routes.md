---
layout: src/layouts/Default.astro
title: 'Testing your MVC routes'
navMenu: false
pubDate: 2013-06-21T12:03:34+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - MVC
---

Everyone knows that is much easier to test a controller in MVC than it was to test “code behind” in Web Forms, but it is really easy to forget that routing rules are a rather important chunk of your logic. If the routing isn’t right, everything else fails. So you ought to be testing your MVC routes.

If you are using only the default route, you may not have tripped over routing issues such as trying to make the patterns unique, or getting things in the right order – but if you are adding multiple routes to your MVC application you will find it much easier if you write tests for them.

Testing your routes is ridiculously easy, so there really is no reason to avoid it. Here is an example test.

```csharp
[TestMethod]
public void DefaultRouteExpectControllerOnly()
{
    var context = new FakeHttpContext(requestUrl: "~/Fenton/Like");
    var routes = new RouteCollection();
    RouteConfig.RegisterRoutes(routes); // this is your real route config
    var routeData = routes.GetRouteData(context);
    Assert.IsNotNull(routeData);
    Assert.AreEqual("Fenton", routeData.Values["controller"]);
    Assert.AreEqual("Like", routeData.Values["action"]);
}
```

In this example, the only thing you need a test double for is HTTP Context – which allows you to pass in a pretend request address. You then use your real routing rules to get the route data and make sure it has been mapped as you expect.

This test actually covers the default routing rule, which is an important test because this may represent the most URLs in your application – you’ll want to be confident you haven’t accidentally replaced this with another route when you create your custom routes later.