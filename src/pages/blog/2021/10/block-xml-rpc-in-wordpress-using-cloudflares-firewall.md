---
title: Block XML RPC in WordPress using CloudFlare's firewall
navMenu: false
pubDate: 2021-10-25
keywords: xml rpc,wordpress,cloudflare,firewall
description: Find out how to block the WordPress XML RPC using CloudFlare's firewall.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - WordPress
---

There is a long-standing brute-force issue with the WordPress `/xmlrpc.php` file. You can (and probably should) switch this off in your website using an `.htaccess` rule. This stops the requests, but uses up your server resources to check and reject them. If you have Cloudflare, you can stop them at the firewall, which means your web server doesn’t even get hit for the request.

So, once you’ve changed your `.htaccess` to include this…

```xml
<Files xmlrpc.php>
order deny,allow
deny from all
</Files>
```
You should also set up a Cloudflare firewall rule like this:

1. Rule Name: Block XML RPC (xmlrpc.php)
2. Field: URI Path
3. Operator: contains
4. Value: xmlrpc.php
5. Then…: Block

Or, using the expression editor, enter `(http.request.uri.path contains "xmlrpc.php")`

:::figure{.inset}
:img{src="/img/2021/10/block-xmlrpc-on-cloudflare.jpg" alt="Block XML RPC on WordPress using Cloudflare" loading="lazy"}
::figcaption[Blocking XML RPC]
:::

Hit “DEPLOY” to set your rule live and then test it using the following:

```
<yourwebsite>/xmlrpc.php
```

and

```
<yourwebsite>//xmlrpc.php
```

This second item is a common attempt to get around blocking rules.