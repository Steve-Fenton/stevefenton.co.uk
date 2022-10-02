---
layout: src/layouts/Default.astro
navMenu: false
title: 'Log to Datadog from .NET using Hound&#8217;s LogHound class'
pubDate: 2018-03-19T08:50:09+00:00
author:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"9650b4a65035";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/9650b4a65035";}'
image: /wp-content/uploads/2018/03/hound.png
categories:
    - Automation
    - Programming
tags:
    - 'c#'
    - logs
    - monitoring
---

If you are using Datadog, you know you can log to Datadog using the Windows event log, or by calling the DogStatsD interface on your local agent. When you are running in a non-machine context, such as an Azure App Service, it is likely you won’t be running an agent; so how do you log to Datadog? Using the Hound NuGet package, which provides a `LogHound` class that logs straight to Datadog.

### Quick start

Hound is written in .NET standard 2.0, which makes it pretty portable. You can get started in under 120 seconds using these steps.

First, install the NuGet package… there are lots of ways to do this these days, but I’ll show the package manager version here. Feel free to use a package explorer, or your preferred flavour of command. This is for version 0.1.2, which is current at the time of writing.

![Hound NuGet Package](https://www.stevefenton.co.uk/wp-content/uploads/2018/03/hound.png)

The icon for Hound is taken from the album cover of *Park it Where You Like*, by 90s band *dog!*

```
<pre class="prettyprint lang-bash">
PM> Install-Package Hound -Version 0.1.2
```
Second, store your Datadog API key somewhere as you’ll need that. I create a custom key so I can control access. You can add a separate key on the Datadog portal in Integrations -&gt; API -&gt; API Keys -&gt; New API Key. You only need an API key and not an application key for Hound.

![Datadog New API Key Screen](https://www.stevefenton.co.uk/wp-content/uploads/2018/03/datadog-new-api-key.png)

And finally, log your exception. The exception will be logged to Datadog via the API.

```
<pre class="prettyprint lang-csharp">
try
{
    // ...
}
catch (Exception ex)
{
    LogHound.LogException(apiKey, new HoundException("Unexpected Error! Byt see below for a better way to log messages!", ex));
}
```
### Better start

In the quick start example we wrapped the exception in a `HoundException`. A better way to write your application would be to put your base custom exception over the top of this class. That way, you can catch unwrapped sub-classes of `HoundException`, which gives you better output in Datadog.

So imagine having a an `AuthorException`, which is a sub-class of `MyCompanyException`, which in turn is a sub-class of `ApplicationException` – all you need to do is change `MyCompanyException` to inherit from `HoundException` – then you can improve your catch statement like this:

```
<pre class="prettyprint lang-csharp">
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

![Datadog Event Timeline](https://www.stevefenton.co.uk/wp-content/uploads/2018/03/datadog-exceptions.png)