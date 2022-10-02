---
id: 6407
title: 'Prevent AJAX requests making sessions infinite in ASP.NET MVC'
pubDate: '2019-09-04T09:40:31+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=6407'
permalink: /2019/09/prevent-ajax-requests-making-sessions-infinite-in-asp-net-mvc/
categories:
    - Programming
tags:
    - ajax
    - asp.net
    - 'c#'
    - mvc
---

If you are terminating inactive sessions in your ASP.NET MVC application and you add an AJAX polling call, the chances are you’ll make your sessions last forever thanks to the AJAX request bringing down an updated session cookie.

This is because the AJAX call will pull down an updated auth cookie and extend your timeout.

There’s a few ways to solve this, but perhaps the simplest is to ensure that you don’t send back updated auth cookies for your AJAX requests.

The simple version of this is shown below, but you might want to convert this into an Attribute to decorate your methods… the first line of code in this method will prevent the cookie being transmitted back with the AJAX response.

```
<pre class="prettyprint lang-csharp">
        [HttpPost]
        public JsonResult SomePolledMethod(int id)
        {
            // Don't allow polling to extend the session
            Response.Cookies.Remove(FormsAuthentication.FormsCookieName);

            return Json(new { id = id }, JsonRequestBehavior.DenyGet);
        }
```

By adding this, you should find your sessions last as per before you added polling.