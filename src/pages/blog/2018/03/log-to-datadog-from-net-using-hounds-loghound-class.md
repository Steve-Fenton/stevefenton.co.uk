---
layout: src/layouts/Default.astro
navMenu: false
title: Log to Datadog from .NET using Hound's LogHound class
pubDate: 2018-03-19T08:50:09+00:00
authors:
    - steve-fenton
bannerImage:
    src: /img/2018/03/hound.png
    alt: Hound
categories:
    - Automation
    - Programming
tags:
    - C-Sharp
    - Logs
    - Monitoring
---

If you are using Datadog, you know you can log to Datadog using the Windows event log, or by calling the DogStatsD interface on your local agent. When you are running in a non-machine context, such as an Azure App Service, it is likely you won’t be running an agent; so how do you log to Datadog? Using the Hound NuGet package, which provides a `LogHound` class that logs straight to Datadog.

## Quick start

Hound is written in .NET standard 2.0, which makes it pretty portable. You can get started in under 120 seconds using these steps.

First, install the NuGet package… there are lots of ways to do this these days, but I’ll show the package manager version here. Feel free to use a package explorer, or your preferred flavour of command. This is for version 0.1.2, which is current at the time of writing.

:img{src="/img/2018/03/hound.png" alt="Hound NuGet Package" loading="lazy"}

The icon for Hound is taken from the album cover of *Park it Where You Like*, by 90s band *dog!*

```cmd
Install-Package Hound -Version 0.1.2
```

Second, store your Datadog API key somewhere as you’ll need that. I create a custom key so I can control access. You can add a separate key on the Datadog portal in Integrations -> API -> API Keys -> New API Key. You only need an API key and not an application key for Hound.

:img{src="/img/2018/03/datadog-new-api-key.png" alt="Datadog New API Key Screen" loading="lazy"}

And finally, log your exception. The exception will be logged to Datadog via the API.

```csharp
try
{
    // ...
}
catch (Exception ex)
{
    LogHound.LogException(apiKey, new HoundException("Unexpected Error! Byt see below for a better way to log messages!", ex));
}
```

## Better start

In the quick start example we wrapped the exception in a `HoundException`. A better way to write your application would be to put your base custom exception over the top of this class. That way, you can catch unwrapped sub-classes of `HoundException`, which gives you better output in Datadog.

So imagine having a an `AuthorException`, which is a sub-class of `MyCompanyException`, which in turn is a sub-class of `ApplicationException` – all you need to do is change `MyCompanyException` to inherit from `HoundException` – then you can improve your catch statement like this:

```csharp
try
{
    throw new AuthorException("Sheridan Le Fanu");
}
catch (HoundException ex)
{
    LogHound.LogException(apiKey, ex);
}
catch (Exception ex)
{
    LogHound.LogException(apiKey, new HoundException("Unexpected Error!", ex));
}
```

This works better because:

- Exceptions are grouped in Datadog, so using specific exceptions will make monitoring easier
- You can set the severity of the exception inside exception classes that are derived from `HoundException`
- All the usual benefits of having custom exceptions!

Here is an example of Datadog’s output, with events displayed in the timeline, and grouped by type having been logged to Datadog.

:img{src="/img/2018/03/datadog-exceptions.png" alt="Datadog Event Timeline" loading="lazy"}