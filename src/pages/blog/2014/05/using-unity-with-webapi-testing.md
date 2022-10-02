---
layout: src/layouts/Default.astro
navMenu: false
title: 'Using Unity with WebAPI Testing'
pubDate: 2014-05-05T22:17:16+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=359'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - unity
    - webapi
---

We are currently using WebAPI.Testing by Jonathan Channon to test an ASP.NET Web API project from the outside in (rather than testing the controllers, it tests from outside of the routing, which means you can test your routes and controllers in one hit).

We are using SpecFlow and NUnit, but this doesn’t apply specifically to them, just to WebAPI.Testing.

When we added in Unity to take care of our dependencies, it broke our tests. We found that we needed to handle the global configuration when we used WebAPI.Testing, which is easy to do – [you can read about the end-to-end integration tests for Web API here](http://martinmilsom.com/2014/04/29/end-to-end-integration-tests-for-web-api/).

To make the following code example possible, you need to extract the pertinent parts of the configuration in your ASP.NET Web API project into methods that your test code can see (i.e. a public method, or by using “InternalsVisibleTo”). You can then use these methods as normal within the ASP.NET Web API project – and also re-use them in your WebAPI.Testing tests:

```
<pre class="prettyprint lang-csharp">[Given(@"a call to the service")]
public void GivenACallToTheService()
{
    var config = GetConfiguration();
    browser = new Browser(config);
}

private static HttpConfiguration GetConfiguration()
{
    var config = Example.TestApi.GetConfig(new HttpConfiguration());
    config.DependencyResolver = Example.TestApi.UnityConfig.CreateResolver();
    return config;
}
```
Here is the Web API Config to show the extracted GetConfig method:

```
<pre class="prettyprint lang-csharp">public static class WebApiConfig
{
    public static void Register(HttpConfiguration config)
    {
        config = GetConfig(config);
    }

    public static HttpConfiguration GetConfig(HttpConfiguration config)
    {
        config.MapHttpAttributeRoutes();
        config.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{id}",
            defaults: new { id = RouteParameter.Optional }
        );
        return config;
    }
}
```
Here is the UnityConfig to show the extracted CreateResolver method:

```
<pre class="prettyprint lang-csharp">public static class UnityConfig
{
    public static void RegisterComponents()
    {
        GlobalConfiguration.Configuration.DependencyResolver = CreateResolver();
    }

    public static IDependencyResolver CreateResolver()
    {
        var container = new UnityContainer();

        ExampleTypeRegister.RegisterTypes(container);

        return new UnityDependencyResolver(container);
    }
}
```
I hope this helps if you come across this situation – I couldn’t find any advice on this topic.