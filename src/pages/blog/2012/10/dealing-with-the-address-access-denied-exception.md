---
layout: src/layouts/Default.astro
navMenu: false
title: 'Dealing with the address access denied exception'
pubDate: 2012-10-05T23:35:28+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=718'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - wcf
---

This article literally only exists because the link supplied in the System.ServiceModel.AddressAccessDeniedException didn’t work at all for me. The basic scenario is that you are debugging a WCF service in Visual Studio and you get this error:

System.ServiceModel.AddressAccessDeniedException: HTTP could not register URL http://+:8001/MyService/. Your process does not have access rights to this namespace (see http://go.microsoft.com/fwlink/?LinkId=70353 for details). —&gt; System.Net.HttpListenerException: Access is denied

This is really easy to solve. Close Visual Studio and re-open it using the “Run As Administrator” option. This will then give Visual Studio the access rights to run the service.