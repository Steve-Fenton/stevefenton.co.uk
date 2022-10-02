---
layout: src/layouts/Default.astro
navMenu: false
title: 'Check certificate expiry date in .NET Core'
pubDate: 2020-04-04T15:35:51+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - core
---

I needed to check the certificate expiry date in an NUnit test. The below snippet can be used to check any certificate properties, using a custom certificate validation callback. All you need to do is read the properties you are interested in within the callback so you can check them afterwards.

```
<pre class="prettyprint lang-csharp">
DateTime notAfter = DateTime.UtcNow;

var httpClientHandler = new HttpClientHandler
{
    ServerCertificateCustomValidationCallback = (request, cert, chain, policyErrors) =>
    {
        notAfter = cert.NotAfter;
        return true;
    }
};

using HttpClient httpClient = new HttpClient(httpClientHandler);
await httpClient.SendAsync(new HttpRequestMessage(HttpMethod.Head, url));
            
Assert.IsTrue(notAfter > DateTime.UtcNow.AddDays(60));
```

This code only depends on:

```
<pre class="prettyprint lang-csharp">
using NUnit.Framework;
using System;
using System.Net.Http;
using System.Threading.Tasks;
```