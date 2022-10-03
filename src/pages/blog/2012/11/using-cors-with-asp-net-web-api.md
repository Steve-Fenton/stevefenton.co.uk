---
layout: src/layouts/Default.astro
navMenu: false
title: 'Using CORS with ASP NET Web API'
pubDate: 2012-11-01T23:14:02+00:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=704'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'csharp'
    - cors
    - javascript
    - mvc
    - web-api
---

If you are writing an ASP.NET Web API and you want to call it from a JavaScript (CoffeeScript, TypeScript) program on another domain, here are the steps you need to take to make it happen. I know that you are smart and you know what you are doing, so I’m not bulking out this article with lectures on the dangers of cross-site requests from either the server or client perspective. There are tons of articles on this, which you will have found while searching for how to do it.

I’m going to divide things into two sections. Stuff you need to do in ASP.NET Web API on the server and stuff you need to do in JavaScript in your client.

### ASP.NET Web API

There are just a couple of things to add to your ASP.NET Web API project to enable CORS requests.

1. CorsMessageHandler  
    When you use CORS to make a request, the browser sends a pre-flight OPTIONS request before it sends the real request. The CorsMessageHandler intercepts the OPTIONS requests and sends the correct response to allow the CORS request. If you don’t respond correctly to the OPTIONS request, the browser will never send the real request – and you’ll be confused by what you see in your developer tools!
2. HandlerConfig  
    The handler configuration just registers the CorsMessageHandler in your global configuration.
3. Global  
    You need to call your HandlerConfig from the Application\_Start method in your Global.asax.cs file.
4. Web.Config  
    You may need to adjust your config file to allow the CORS OPTIONS request.

#### Code

All of the code for these three changes is listed below.

CorsMessageHandler.cs

```
<pre class="prettyprint lang-csharp">
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Threading.Tasks;
using System.Threading;
using System.Net;

namespace YourApplication.MessageHandlers
{
    public class CorsMessageHandler : DelegatingHandler
    {
        const string Origin = "Origin";
        const string AccessControlRequestMethod = "Access-Control-Request-Method";
        const string AccessControlRequestHeaders = "Access-Control-Request-Headers";
        const string AccessControlAllowOrigin = "Access-Control-Allow-Origin";
        const string AccessControlAllowMethods = "Access-Control-Allow-Methods";
        const string AccessControlAllowHeaders = "Access-Control-Allow-Headers";

        protected override Task<httpresponsemessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            return request.Headers.Contains(Origin) ?
                ProcessCorsRequest(request, ref cancellationToken) :
                base.SendAsync(request, cancellationToken);
        }

        private Task<httpresponsemessage> ProcessCorsRequest(HttpRequestMessage request, ref CancellationToken cancellationToken)
        {
            if (request.Method == HttpMethod.Options)
            {
                return Task.Factory.StartNew<httpresponsemessage>(() =>
                {
                    HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                    AddCorsResponseHeaders(request, response);
                    return response;
                }, cancellationToken);
            }
            else
            {
                return base.SendAsync(request, cancellationToken).ContinueWith<httpresponsemessage>(task =>
                {
                    HttpResponseMessage resp = task.Result;
                    resp.Headers.Add(AccessControlAllowOrigin, request.Headers.GetValues(Origin).First());
                    return resp;
                });
            }
        }

        private static void AddCorsResponseHeaders(HttpRequestMessage request, HttpResponseMessage response)
        {
            response.Headers.Add(AccessControlAllowOrigin, request.Headers.GetValues(Origin).First());

            string accessControlRequestMethod = request.Headers.GetValues(AccessControlRequestMethod).FirstOrDefault();
            if (accessControlRequestMethod != null)
            {
                response.Headers.Add(AccessControlAllowMethods, accessControlRequestMethod);
            }

            string requestedHeaders = string.Join(", ", request.Headers.GetValues(AccessControlRequestHeaders));
            if (!string.IsNullOrEmpty(requestedHeaders))
            {
                response.Headers.Add(AccessControlAllowHeaders, requestedHeaders);
            }
        }
    }
}
```
App\_Start/HandlerConfig

```
<pre class="prettyprint lang-csharp">
using System.Collections.ObjectModel;
using System.Net.Http;
using YourApplication.MessageHandlers;

namespace YourApplication
{
    public class HandlerConfig
    {
        public static void RegisterHandlers(Collection<delegatinghandler> handlers)
        {
            handlers.Add(new CorsMessageHandler());
        }
    }
}
```
Global.asax.cs

```
<pre class="prettyprint lang-csharp">
using System.Diagnostics.CodeAnalysis;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace YourApplication
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            HandlerConfig.RegisterHandlers(GlobalConfiguration.Configuration.MessageHandlers);
        }
    }
}
```
### JavaScript Changes

The essence of making things work in JavaScript is to ensure you set an “X-Requested-With” header. If you are using jQuery, this is built into the jQuery.ajax component. If you are rolling your own AJAX code, you need to use:

```
<pre class="prettyprint lang-javascript">
xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"];
```
If you are using jQuery, you’ll need to ask it nicely to do this for you:

```
<pre class="prettyprint lang-javascript">
jQuery.support.cors = true;
```
### SSL

If your ASP.NET Web API is delivered over SSL, the page calling will need to be SSL too if you want it to work in all browsers, so if the service address is HTTPS, the calling page needs to be HTTPS.

### I Want Cookies

If you want to allow cookies, you need to add a special header.

```
<pre class="prettyprint lang-csharp">
response.Headers.Add("Access-Control-Allow-Credentials", "true");
```
In JavaScript, you can set the withCredentials flag to true:

```
<pre class="prettyprint lang-javascript">
myXmlHttpRequest.withCredentials = true;
```
### Config File

You may come across a situation where the initial OPTIONS request never gets handled by your .NET application. The request might get a 200 OK response, but with the wrong headers to allow your cross-origin request to proceed. If you don’t get the 200 response, check that IIS allows the OPTIONS verb – but if you get the 200, but it isn’t hitting your code, you might need to add the OPTIONSVerbHandler line to the handlers section of your web.config file:

```
<pre class="prettyprint lang-xml">
<handlers>
  <remove name="OPTIONSVerbHandler"/>
  <!-- ... -->
</handlers>
```
### Summary

And that’s all there is to it (okay, there was quite a bit of code to copy and paste, but the principle of it all is very simple). Kudos to the guys who made things so configurable in ASP.NET MVC / ASP.NET Web API!