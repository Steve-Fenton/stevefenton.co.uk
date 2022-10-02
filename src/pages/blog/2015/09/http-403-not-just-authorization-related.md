---
id: 1462
layout: src/layouts/Default.astro
title: 'HTTP 403 is not just authorization related'
pubDate: 2015-09-29T08:19:42+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1462'
permalink: /2015/09/http-403-not-just-authorization-related/
categories:
    - Programming
tags:
    - http
    - rest
---

If you are integrating with an API that requires authorization and you get a HTTP 403 “Forbidden” response, your first instinct may be to start investigating your credentials and authorization methods. Before you do that, though, there is a simpler cause to eliminate from your inquiry.

The most common cause of the 403 status code in my experience is a bad URI.

So if the service is found at:

```
https://example.com/v2/customers/smith/john
```

And you attempt to access it at (note the missing “s” in customers):

```
https://example.com/v2/customer/smith/john
```

You may well get a 403.

It is always worth double-checking your URI before you start looking at the authorization (especially as completely incorrect authorization usually results in a 401 – a 403 would typically mean you have good credentials, but cannot access the resource, for example because of permissions).