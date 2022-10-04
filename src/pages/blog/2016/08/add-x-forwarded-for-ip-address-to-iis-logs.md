---
layout: src/layouts/Default.astro
title: 'Add X-Forwarded-For IP address to IIS logs'
navMenu: false
pubDate: 2016-08-08T16:52:55+01:00
authors:
    - steve-fenton
categories:
    - Windows
tags:
    - IIS
    - Logs
---

If you are using a load balancer, the chances are your IIS Logs are full of entries with the IP address of your load balancer, rather than the IP address of your end user.

Most load balancers will allow you to send the IP address in an alternate header, for example the X-Forwarded-For header.

This header can be abused, so you may need to have a similar architecture to get the full benefit of this fix without opening yourself up to problems. In my case, the load balancer is public, but the web servers are all hidden behind it and cannot be accessed directly.

In IIS, open up the “Logging” module. I manage this at the server level, rather than at the individual site level. You will need to use “One log file per Site” for this to work for you.

In the Log File configuration, select the “Select Fields…” option.

In this view, you can add Custom Fields.

Add a new field:

- Log Field: X-Forwarded-For
- Source Type: Request Header
- Source: X-Forwarded-For

:img{src="/img/2016/08/iis-log-custom-fields.png" alt="Log X-Forwarded-For in IIS logs" loading="lazy"}

Don’t forget to hit “Apply” in the Logging module screen.

This will now log an additional column in your log file for the origin IP address.