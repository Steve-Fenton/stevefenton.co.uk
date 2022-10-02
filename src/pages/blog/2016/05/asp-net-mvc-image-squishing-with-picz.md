---
layout: src/layouts/Default.astro
navMenu: false
title: 'ASP.NET MVC image squishing with Picz'
pubDate: 2016-05-12T07:00:20+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - images
    - mvc
    - responsive
---

Responsive images have been around for a while and have wide browser support as well as a strong fallback story for older browsers. The one thing holding us back from using them is the manual workflow…

- Arrive at office
- Create images at different sizes
- Upload images
- Write an HTML tag listing all the image sizes and when they should be used
- Leave office for the day

Nobody wants to spend their life doing that… we need some automation. For ASP.NET MVC, I wrote Picz to do all this work for you.

There are two ways to use Picz. The first is the simple case, which I’ll explain below. Just bear in mind that if you have an existing MVC controller that handles images (for example if you store them in a database and serve them via a controller).

So here are the steps you need to take to switch from normal images to responsive images.

### NuGet

Install the Picz package from NuGet.

```
<pre class="prettyprint lang-powershell">PM> Install-Package Fenton.Picz
```
### Config

Add configuration for the lifetime of the images in the disk cache (to save yourself a whole lot of CPU).

```
<pre class="prettyprint lang-xml"><add key="PiczCacheDurationHours" value="48" />
<add key="PiczCachePath" value="E:\Temp\ImageCache\" />
```
### Controller

Add a controller to send image requests to Picz… this code does everything you need:

```
<pre class="prettyprint lang-csharp">using Fenton.Picz.Engine;
using System;
using System.Web.Mvc;

public class PiczController : Controller
{
    private readonly ImageResizer _imageResizer = new ImageResizer();

    [Route("Picz")]
    public ActionResult Picz(int s, string p)
    {
        var originalUrl = new Uri(Request.Url, p).AbsoluteUri;
        var replacement = _imageResizer.GetReplacementImage(s, originalUrl);
        return File(replacement.Path, replacement.MimeType);
    }
}
```
### Use it!

You can now make any image tag responsive by replacing:

```
<pre class="prettyprint lang-razor"><img 
    src="~/Content/landscape-mountains-nature-lake.jpeg"
    alt="Mountain Reflection" />
```
With the very similar Html Helper that Picz supplies:

```
<pre class="prettyprint lang-razor">@Html.Picz(
     "~/Content/landscape-mountains-nature-lake.jpeg",
     "100vw",
     new { alt = "Mountain Reflection" })
```
Picz will create your image tag with a responsive source set, and take care of supplying and caching the images at the appropriate sizes.