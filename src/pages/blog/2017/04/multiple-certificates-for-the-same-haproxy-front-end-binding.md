---
layout: src/layouts/Default.astro
navMenu: false
title: 'Multiple certificates for the same HAProxy front-end binding'
pubDate: 2017-04-28T09:57:56+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - certificates
    - haproxy
    - tls
---

We have a smart website that allows a single mutli-tenant application to server requests for thousands of different domains. The content is keyed from the host name, so you only see the content for the website you are visiting. The volume is handled by a pair of HAProxy servers that sit over a web farm.

HTTPS is handled with multi-domain certificates, but as a multi-domain certificate grows it can become unwieldy.

For this reason, we wanted to split into multiple smaller certificates.

Our configuration before the change:

```
<pre class="prettyprint">
frontend fe-example
    mode http
    bind *:80
    bind *:443 ssl crt /etc/site-ssl/region1.pem
```
Our configuration after the change (note the additional `crt` keyword before the second certificate path).

```
<pre class="prettyprint">
frontend fe-example
    mode http
    bind *:80
    bind *:443 ssl crt /etc/site-ssl/region1.pem crt /etc/site-ssl/region2.pem
```
Important additional note – if you are running a pair of HAProxy servers, remember to upload the certificate to all of them *before* you change the configuration – otherwise the configuration will fail to reload on the second machine when the configuration is copied over.