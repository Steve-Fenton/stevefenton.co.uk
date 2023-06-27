---
title: IISExpress.exe exited with access violation
navMenu: false
pubDate: 2020-07-31T18:18:24+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - ASP.NET
    - C-Sharp
    - Core
    - MVC
---

I was happily typing away at some ASP.NET Core controllers and views, calling a view component to render out some paging links, when this happened…

> The program iisexpress.exe’ has exited with code -1073741819 (0xc0000005) ‘Access violation’.

No exception visible in Visual Studio. No indication of where the error was. Nothing. The Internet supplied links to low level HTTPSYS issues, but surely this was something to do with my changes? I removed the call to the paging view component and everything worked. Yes. It was my code.

To cut a long story short, this Access Violation error is caused by a type problem. This may come in several flavours, but my particular example was pretty vanilla and easy to understand.

I have a method that generates a dictionary that can be used on a link, thus:

```html
<a asp-action="index" asp-all-route-data="@Model.GetRouteParameters(page)">Link Text</a>
```

The method hands back a dictionary with all the route parameters needed to render the page, with the adjustment to the page number. Simple right. So if my current page is `/Stuff/my-id?p=1`, I can use this to supply a link to `/Stuff/my-id?p=2` or whatever.

The model doesn’t do the work, it just calls something more general that does the work…

```csharp
public IDictionary<string, string> GetRouteParameters(int p)
{
    return Controls.GetRouteParameters(p);
}
```

Due to introducing some other use cases, it became necessary in that “Controls” class to make the page optional. That meant that my call chain for the existing links involved an `int` in this model, but the general purpose code beneath accepted an `int?`. This coercion into the nullable type was causing the issue. Severe.

The fix was simple (far simpler that finding what needed to be fixed). Use the same type throughout…

```csharp
// ------------------------------------------------------↧
public IDictionary<string, string> GetRouteParameters(int? p)
{
    return Controls.GetRouteParameters(p);
}
```

This might help someone in the future if they get this Access Denied crash. Probably me.