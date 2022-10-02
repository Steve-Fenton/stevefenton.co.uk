---
id: 12183
title: 'Block XML RPC in WordPress using CloudFlare&#8217;s firewall'
pubDate: '2021-10-25T09:28:59+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=12183'
permalink: /2021/10/block-xml-rpc-in-wordpress-using-cloudflares-firewall/
categories:
    - Programming
tags:
    - wordpress
---

There is a long-standing brute-force issue with the WordPress `/xmlrpc.php` file. You can (and probably should) switch this off in your website using an `.htaccess` rule. This stops the requests, but uses up your server resources to check and reject them. If you have Cloudflare, you can stop them at the firewall, which means your web server doesn’t even get hit for the request.

So, once you’ve changed your `.htaccess` to include this…

```
<pre class="prettyprint">
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

[![Block XML RPC on WordPress using Cloudflare](https://www.stevefenton.co.uk/wp-content/uploads/2021/10/block-xmlrpc-on-cloudflare-400x306.jpg)](https://www.stevefenton.co.uk/2021/10/block-xml-rpc-in-wordpress-using-cloudflares-firewall/block-xmlrpc-on-cloudflare/)

Hit “DEPLOY” to set your rule live and then test it using the following:

<yourwebsite>/xmlrpc.php</yourwebsite>

and

<yourwebsite>//xmlrpc.php</yourwebsite>

This second item is a common attempt to get around blocking rules.