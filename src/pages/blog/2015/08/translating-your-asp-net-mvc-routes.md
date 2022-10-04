---
layout: src/layouts/Default.astro
title: 'Translating your ASP.NET MVC routes'
navMenu: false
pubDate: 2015-08-31T20:09:57+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - ASP.NET
    - C-Sharp
    - MVC
---

There are a ton of ways to localize your ASP.NET MVC application when it comes to the text your display on the page. When it comes to the URLs, though, it is not uncommon to see a site in one language with routes in another. It seems a real shame to see a website in French, with URLs in English.

So here is a fantastic way to translate your routes.

## RouteLocalization.Mvc

All the really hard stuff has already been taken care of in the awesome [RouteLocalization project](https://github.com/Dresel/RouteLocalization). So step one involves grabbing the appropriate version from NuGet (there is an ASP.NET MVC flavour named “RouteLocalization.Mvc” and an ASP.NET Web API flavour called “RouteLocalization.WebApi”).

## Attribute all the things

Everything is better in MVC if you use attribute routing. I saw a presentation on attribute routing by [Martin Milsom](http://martinmilsom.com/) and I haven’t looked back.

```csharp
[Route("MyController/MyAction", Name = "MyControllerMyActionRoute")]
public string MyAction() //...
```

In the example above, we have a basic route “MyController/MyAction” and I have also given it a name (which is optional, but more on that later).

When you are using attribute routing, you normally add the following line to your RouteConfig.cs RegisterRoutes method.

```csharp
routes.MapMvcAttributeRoutes(Localization.LocalizationDirectRouteProvider);
```

We will be adding some code after this line in a moment.

## Prepare for translations

Now that the application is all working in English, we need to add some configuration for the route translations.

Just after the “MapMvcAttributeRoutes” call in the RouteConfig.cs RegisterRoutes method, add the following language information.

First, a couple of variables to hold the default language (en in this case) and all of the accepted languages (for example en, de, fr, hu). There are various settings here that you can control, I have opted to…

- `AttributeRouteProcessing`: Use the attributes as the default and neutral routes (i.e. English as the default).
- `AddCultureAsRoutePrefix`: Keep the language out of the route (you can make it so the language appears as a route prefix, so /fr/MyController/MyRoute/ – I recommend that you do this if you display the languages on the same website as it allows search engines to treat the routes differently. If you have different host names for different languages, there is no need to add the route prefix).
- `AddTranslationToSimiliarUrls`: Add translations to similar URLs (i.e. if I translate the GET, the POST method will also work).

Then the magic happens – I call the extension method “localization.AddRoutesTranslation();”. The code for this is shown later in this article.

Finally, I set the “GetCultureFromHttpContextDelegate” up to use the language sent by the browser in the HTTP headers. Once again, if you are translating based on host names you won’t do this.

```csharp
const string en = "en";
ISet<string> acceptedCultures = new HashSet<string>() { en, "de", "fr", "hu" };

routes.Localization(configuration =>
{
    configuration.DefaultCulture = en;
    configuration.AcceptedCultures = acceptedCultures;
    configuration.AttributeRouteProcessing = AttributeRouteProcessing.AddAsNeutralAndDefaultCultureRoute;
    configuration.AddCultureAsRoutePrefix = false;
    configuration.AddTranslationToSimiliarUrls = true;
}).TranslateInitialAttributeRoutes().Translate(localization =>
{
    localization.AddRoutesTranslation();
});

CultureSensitiveHttpModule.GetCultureFromHttpContextDelegate = Localization.DetectCultureFromBrowserUserLanguages(acceptedCultures, en);
```

## Add translations

The translations are supplied via the static method “AddRoutesTranslation” below. I have supplied examples for both a named route and for a non-named route (I have supplied the same example in both – you would never add the same route twice like this, but it makes it easier to compare the two styles).

In particular, using names routes would make it easier to store the translations in an flat file, or a database, because you would just need to store “RouteName”, “Language”, and “RouteTranslation” columns.

```csharp
using MyApplication.Controllers;
using RouteLocalization.Mvc;

namespace MyApplication
{
    public static class RouteTranslations
    {
        public static void AddRoutesTranslation(this Localization localization)
        {
            // Named Routes
            localization.ForCulture("fr")
                .ForNamedRoute("MyControllerMyActionRoute")
                .AddTranslation("MonContrôleur/MonAction");

            // Controller Routes - Keep alphabetical to help the next developer
            localization.ForCulture("fr")
                .ForController<MyController>()
                .ForAction(x => x.MyAction())
                .AddTranslation("MonContrôleur/MonAction");
        }
    }
}
```

You need to repeat this for each route, in each language. From a code organisation perspective you could split it so that you group by route, with each language configured – or you could split it by language. The choice is yours and each has its plus points. Storing the routes in a database or file would keep the code minimal and give you an easy format to pass for translation if you aren’t doing them within the team.

Not only does the RouteLocalization project make your URLs translatable, it will also mean all your calls to the standard HTML helpers (like Url.Action) will get translated too. It could hardly be simpler.

Additional Note… if you want to get the culture from somewhere other than the browser culture, you can do that using the following code…

```csharp
CultureInfo cultureInfo = new CultureInfo("en-GB"); // <-- put your culture in here instead of en-GB!
System.Threading.Thread.CurrentThread.CurrentUICulture = cultureInfo;
System.Threading.Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(cultureInfo.Name);
```

This allows you to get the culture from some other place, like the querystring. It needs to happen early on in your pipeline… I have used it in the `Global.asax Application_AcquireRequestState` method.